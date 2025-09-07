# from langchain.agents import initialize_agent, Tool, AgentType
# from langchain.chat_models import ChatOpenAI
# import httpx

# # Generic API caller tool that LLM can use dynamically
# async def api_caller(params: dict) -> str:
#     method = params.get("method", "GET").upper()
#     url = params.get("url")
#     headers = params.get("headers", {})
#     body = params.get("body", None)

#     async with httpx.AsyncClient() as client:
#         if method == "GET":
#             response = await client.get(url, headers=headers)
#         elif method == "POST":
#             response = await client.post(url, headers=headers, json=body)
#         else:
#             return f"Unsupported method: {method}"
#         return response.text

# tools = [
#     Tool(
#         name="api_caller",
#         func=api_caller,
#         description="Make HTTP API calls with method, url, headers, body"
#     )
# ]

# llm = ChatOpenAI(temperature=0)

# agent = initialize_agent(
#     tools,
#     llm,
#     agent=AgentType.OPENAI_FUNCTIONS,  # or OPENAI_CHAT_ZERO_SHOT_REACT_DESCRIPTION
#     verbose=True,
#     handle_parsing_errors=True
# )

# # Load PDF text from the URL (not shown here, use langchain PyPDFLoader or pdfplumber)

# pdf_text = "..."  # extracted from PDF URL dynamically
# question = "What is my flight number?"

# prompt = f"""
# You are an AI agent tasked with answering questions based on the following PDF rules:

# {pdf_text}

# Answer the question: {question}

# You can make API calls by invoking the tool 'api_caller' with JSON input including:
# - method: HTTP method (GET/POST)
# - url: API endpoint
# - headers: optional headers
# - body: optional JSON body

# Use the information and rules from the PDF to decide which API calls to make.

# Return the final answer only.
# """

# # Run the agent with prompt (pseudo code, you may want to create a conversation or chain)
# response = agent.run(prompt)

# print("Final Answer:", response)




import os
import io
import json
import asyncio
from typing import Dict, Any
import httpx
import pdfplumber
from dotenv import load_dotenv
import re

# LangChain >= 0.2 imports
from langchain_community.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.prompts import PromptTemplate
from langchain.tools import BaseTool



load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


# ===== Custom AsyncTool class for LangChain >= 0.2 =====
import json
from langchain.tools import BaseTool

class AsyncLangchainTool(BaseTool):
    coroutine: any

    async def _arun(self, *args, **kwargs):
        """Handle both string and args/kwargs input formats."""
        if args and isinstance(args[0], str):
            # If a raw string is passed
            try:
                params = json.loads(args[0])
            except json.JSONDecodeError:
                params = {"url": args[0].strip()}
        elif args and isinstance(args[0], dict):
            # If a dict is passed as first arg
            params = args[0]
        elif "args" in kwargs:
            # If LangChain sends {"args": [...]}
            params = kwargs["args"][0] if kwargs["args"] else {}
        else:
            params = kwargs

        return await self.coroutine(params)

    def _run(self, *args, **kwargs):
        raise NotImplementedError("Synchronous mode not supported.")




# ====== Tool: read_pdf ======
async def read_pdf_tool(params: Dict[str, Any]) -> str:
    url = params.get("url")
    if not url:
        return "ERROR: missing url"
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.get(url)
            resp.raise_for_status()
            pdf_bytes = resp.content
    except Exception as e:
        return f"ERROR: could not download PDF: {e}"

    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            text_parts = []
            for page in pdf.pages:
                t = page.extract_text()
                if t:
                    text_parts.append(t)
        full_text = "\n\n".join(text_parts)
    except Exception:
        full_text = f"[UNABLE_TO_EXTRACT_TEXT_LEN={len(pdf_bytes)}]"

    if len(full_text) > 15000:
        return full_text[:15000] + "\n\n[[TRUNCATED]]"
    return full_text


# ====== Tool: http_tool ======
async def http_tool(params: Dict[str, Any]) -> str:
    method = (params.get("method") or "GET").upper()
    url = params.get("url")
    headers = params.get("headers") or {}
    body = params.get("body")
    if not url:
        return "ERROR: missing url"

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            if method == "GET":
                r = await client.get(url, headers=headers, params=body)
            elif method == "POST":
                r = await client.post(url, headers=headers, json=body)
            else:
                return f"ERROR: unsupported method {method}"

            ct = r.headers.get("content-type", "")
            if "application/json" in ct:
                return json.dumps({"status": r.status_code, "json": r.json()}, indent=2)
            else:
                return json.dumps({"status": r.status_code, "text": r.text[:2000]}, indent=2)
    except Exception as e:
        return f"ERROR: http request failed: {e}"


# ====== Wrap tools ======
read_pdf_tool_wrapper = AsyncLangchainTool(
    name="read_pdf",
    description="Downloads a PDF from a URL and extracts its text. Input: {url: <pdf_url>}.",
    coroutine=read_pdf_tool,
)

http_tool_wrapper = AsyncLangchainTool(
    name="http_tool",
    description="Makes HTTP requests. Input JSON: {method,url,headers,body}.",
    coroutine=http_tool,
)


# ====== Agent Setup ======
def make_agent():
    llm = ChatOpenAI(temperature=0, model="gpt-4o-mini")
    tools = [read_pdf_tool_wrapper, http_tool_wrapper]

    prefix = """
You are a tool-using reasoning agent.
A user supplies:
- a URL to a PDF with rules or instructions
- a question about it

Your job:
1) Use `read_pdf` to fetch & extract PDF text.
2) From PDF text, decide steps needed to answer.
3) Use `http_tool` if PDF tells you to call an API.
4) Parse responses and give the correct final answer.
5) Do not invent endpoints.
"""
    prompt = PromptTemplate(
        input_variables=["pdf_url", "user_question"],
        template=prefix + "\n\nPDF URL: {pdf_url}\n\nQuestion: {user_question}\n\n",
    )

    agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        verbose=True,
        handle_parsing_errors=True,
    )
    return agent, prompt


# ====== Runner ======
def strip_markdown(text):
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    text = re.sub(r'\*(.*?)\*', r'\1', text)
    return text



async def run_agent_for_pdf(pdf_url: str, question: str):
    agent, prompt = make_agent()
    full_prompt = prompt.format(pdf_url=pdf_url, user_question=question)
    result = await agent.arun(full_prompt)

    # Try to parse as JSON
    try:
        data = json.loads(result)

        def clean_json(obj):
            if isinstance(obj, dict):
                return {k: clean_json(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [clean_json(v) for v in obj]
            elif isinstance(obj, str):
                return strip_markdown(obj)
            return obj

        return json.dumps(clean_json(data), ensure_ascii=False)

    except json.JSONDecodeError:
        # Fallback for plain text
        return strip_markdown(result)

