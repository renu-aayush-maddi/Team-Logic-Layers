<<<<<<< HEAD

# ==== helper.py ==== 
"""
Simplified helper module that:
 - Uses PyMuPDF (fitz) to extract text from PDF pages.
 - Provides multiple chunkers (atomic/parallel/semantic) and a unified text_split() that
   accepts a list of langchain.docstore.document.Document (extracted pages) and returns chunks.
 - Removed Google Drive OCR and related functions. If your PDFs are scanned images, run OCR locally
   (e.g., tesseract) and convert to searchable PDF before uploading.
"""

from langchain.docstore.document import Document
import re
import os
import time
from concurrent.futures import ThreadPoolExecutor
import fitz  # pip install pymupdf

=======
from langchain.docstore.document import Document
import re
import os
import json
import io
import time
# Google Drive API imports
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from google.auth.transport.requests import Request

from concurrent.futures import ThreadPoolExecutor
import os
from concurrent.futures import ThreadPoolExecutor
from langchain.docstore.document import Document
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
import asyncio
from dotenv import load_dotenv
from typing import List
import fitz  # pip install pymupdf
from concurrent.futures import ThreadPoolExecutor
from langchain.docstore.document import Document
from fastapi import Request, HTTPException
import requests
from bs4 import BeautifulSoup
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
t0 = time.time()

llm_router = ChatOpenAI(openai_api_key=OPENAI_API_KEY, model="gpt-4o-mini")
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
SECTION_PATTERN = re.compile(r'^((Section|Clause|Article)\s+[A-Za-z0-9.\-]+)', re.IGNORECASE | re.MULTILINE)
DEFINITION_PATTERN = re.compile(r'^(Definition[s]?[\sof]*[\w\s]*)[:\-]?', re.IGNORECASE | re.MULTILINE)
ITEM_PATTERN = re.compile(r'^\s*([0-9]+\.?|[a-z]{1,2}\)|[ivxlc]+\.?)', re.IGNORECASE)
TABLE_HEADING_PATTERN = re.compile(r'^(Table\s+of\s+\w+.*|Schedule\s+of\s+Benefits.*)', re.IGNORECASE)

<<<<<<< HEAD

def clean_heading(text):
    return ' '.join(text.strip().split())


# Parallel-friendly chunker used by text_split
def parallel_atomic_chunker(full_text, max_workers=4):
=======
def clean_heading(text):
    "Quickly normalize heading/section/definition lines"
    return ' '.join(text.strip().split())


def parallel_atomic_chunker(full_text, max_workers=4):
    """Splits full_text into parts and applies atomic chunking in parallel threads."""
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
    lines = full_text.splitlines()
    n = len(lines)
    if n == 0:
        return []

<<<<<<< HEAD
    part_size = max(1, n // max_workers)
    parts = ["\n".join(lines[i:i + part_size]) for i in range(0, n, part_size)]

    def process_part(text_part):
=======
    # Divide lines into roughly equal parts for parallel processing
    part_size = max(1, n // max_workers)  # Ensure at least 1 line per part
    parts = ["\n".join(lines[i:i + part_size]) for i in range(0, n, part_size)]

    def process_part(text_part):
        # Localized variables for this thread (to avoid shared state issues)
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
        section = None
        heading = None
        current_type = None
        chunks = []
        buffer = ""
        meta = {}

        lines_part = text_part.splitlines()
        for line in lines_part:
            line_clean = line.strip()
<<<<<<< HEAD
            sect_match = SECTION_PATTERN.match(line_clean)
            if sect_match:
                if buffer.strip():
                    chunks.append(Document(page_content=buffer.strip(), metadata=meta.copy()))
=======

            # Try to detect new section
            sect_match = SECTION_PATTERN.match(line_clean)
            if sect_match:
                if buffer.strip():
                    chunks.append(Document(
                        page_content=buffer.strip(),
                        metadata=meta.copy()
                    ))
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
                    buffer = ""
                section = clean_heading(line_clean)
                meta = {"section": section, "chunk_type": "section"}
                continue

<<<<<<< HEAD
            def_match = DEFINITION_PATTERN.match(line_clean)
            if def_match:
                if buffer.strip():
                    chunks.append(Document(page_content=buffer.strip(), metadata=meta.copy()))
                    buffer = ""
                heading = clean_heading(line_clean)
                meta = {"section": section or "", "parent_heading": heading, "chunk_type": "definition"}
                continue

            table_match = TABLE_HEADING_PATTERN.match(line_clean)
            if table_match:
                if buffer.strip():
                    chunks.append(Document(page_content=buffer.strip(), metadata=meta.copy()))
                    buffer = ""
                heading = clean_heading(line_clean)
                meta = {"section": section or "", "parent_heading": heading, "chunk_type": "table"}
                buffer += line_clean + "\n"
                continue

            item_match = ITEM_PATTERN.match(line_clean)
            if item_match and buffer:
                chunks.append(Document(page_content=buffer.strip(), metadata=meta.copy()))
                buffer = ""
                current_type = meta.get("chunk_type")
                if current_type in ["definition", "section"]:
                    meta = {"section": section or "", "parent_heading": heading or "", "chunk_type": "item"}
=======
            # Try to detect new definition
            def_match = DEFINITION_PATTERN.match(line_clean)
            if def_match:
                if buffer.strip():
                    chunks.append(Document(
                        page_content=buffer.strip(),
                        metadata=meta.copy()
                    ))
                    buffer = ""
                heading = clean_heading(line_clean)
                meta = {
                    "section": section or "",
                    "parent_heading": heading,
                    "chunk_type": "definition"
                }
                continue

            # Try to detect table heading
            table_match = TABLE_HEADING_PATTERN.match(line_clean)
            if table_match:
                if buffer.strip():
                    chunks.append(Document(
                        page_content=buffer.strip(),
                        metadata=meta.copy()
                    ))
                    buffer = ""
                heading = clean_heading(line_clean)
                meta = {
                    "section": section or "",
                    "parent_heading": heading,
                    "chunk_type": "table"
                }
                buffer += line_clean + "\n"
                continue

            # Try to detect itemized list
            item_match = ITEM_PATTERN.match(line_clean)
            if item_match and buffer:
                chunks.append(Document(
                    page_content=buffer.strip(),
                    metadata=meta.copy()
                ))
                buffer = ""
                current_type = meta.get("chunk_type")
                if current_type in ["definition", "section"]:
                    meta = {
                        "section": section or "",
                        "parent_heading": heading or "",
                        "chunk_type": "item"
                    }
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
                else:
                    meta = {"chunk_type": "item"}
            buffer += line + "\n"

<<<<<<< HEAD
        if buffer.strip():
            chunks.append(Document(page_content=buffer.strip(), metadata=meta.copy()))
        return chunks

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(process_part, parts))

    all_chunks = [chunk for chunk_list in results for chunk in chunk_list]
    return all_chunks


def load_pdf_file(pdf_path, max_workers=8):
    """Extract text from each PDF page using PyMuPDF and return list[Document]."""
=======
        # Flush any remaining buffer for this part
        if buffer.strip():
            chunks.append(Document(
                page_content=buffer.strip(),
                metadata=meta.copy()
            ))
        return chunks

    # Run parallel processing
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(process_part, parts))

    # Flatten the list of chunks from all threads
    all_chunks = [chunk for chunk_list in results for chunk in chunk_list]

    return all_chunks

def atomic_chunker(full_text):
    lines = full_text.splitlines()
    section = None
    heading = None
    clause = None
    current_type = None
    chunks = []
    buffer = ""
    meta = {}

    for i, line in enumerate(lines):
        line_clean = line.strip()

        # Try to detect new section
        sect_match = SECTION_PATTERN.match(line_clean)
        if sect_match:
            # Save any current buffer as chunk before starting new section
            if buffer.strip():
                chunks.append(Document(
                    page_content=buffer.strip(),
                    metadata=meta.copy()
                ))
                buffer = ""
            section = clean_heading(line_clean)
            meta = {"section": section, "chunk_type": "section"}
            continue  # Section heading line doesn't need to go into buffer

        # Try to detect new definition
        def_match = DEFINITION_PATTERN.match(line_clean)
        if def_match:
            if buffer.strip():
                chunks.append(Document(
                    page_content=buffer.strip(),
                    metadata=meta.copy()
                ))
                buffer = ""
            heading = clean_heading(line_clean)
            meta = {
                "section": section or "",
                "parent_heading": heading,
                "chunk_type": "definition"
            }
            continue

        # Try to detect table heading
        table_match = TABLE_HEADING_PATTERN.match(line_clean)
        if table_match:
            if buffer.strip():
                chunks.append(Document(
                    page_content=buffer.strip(),
                    metadata=meta.copy()
                ))
                buffer = ""
            heading = clean_heading(line_clean)
            meta = {
                "section": section or "",
                "parent_heading": heading,
                "chunk_type": "table"
            }
            buffer += line_clean + "\n"
            continue

        # Try to detect itemized list (for exclusions, etc.)
        item_match = ITEM_PATTERN.match(line_clean)
        if item_match and buffer:
            # Each previous buffer (item) emitted as chunk, start new one
            chunks.append(Document(
                page_content=buffer.strip(),
                metadata=meta.copy()
            ))
            buffer = ""
            # Set up metadata for next chunk
            current_type = meta.get("chunk_type")
            if current_type in ["definition", "section"]:
                # If under a section or definition, treat as clause/item
                meta = {
                    "section": section or "",
                    "parent_heading": heading or "",
                    "chunk_type": "item"
                }
            else:
                meta = {
                    "chunk_type": "item"
                }
        # Add current line to buffer
        buffer += line + "\n"

    # Flush any buffer left at end
    if buffer.strip():
        chunks.append(Document(
            page_content=buffer.strip(),
            metadata=meta.copy()
        ))
    return chunks

CHUNK_BOUNDARY_PATTERN = re.compile(
    r"""(
        (Section\s+\d+(\.\d+)*[:\s-]+.*)|
        (Clause\s+\d+(\.\d+)*[:\s-]+.*)|
        (Article\s+\d+(\.\d+)*[:\s-]+.*)|
        (Definition\s+of\s+[\w\s/()]+[:\s-]+.*)|
        (Table\s+of\s+Benefits.*)
    )""",
    re.IGNORECASE | re.VERBOSE
)

def semantic_regex_chunker(full_text, max_length=2000, overlap=400):
    '''Splits document text at semantic boundaries (sections, definitions, etc.) with overlap.'''
    matches = list(CHUNK_BOUNDARY_PATTERN.finditer(full_text))
    split_points = [m.start() for m in matches]
    if split_points and split_points[0] != 0:
        split_points.insert(0, 0)
    split_points.append(len(full_text))

    chunks = []
    for i in range(len(split_points) - 1):
        chunk_text = full_text[split_points[i]:split_points[i+1]].strip()
        if not chunk_text or len(chunk_text) < 100:
            continue

        pointer = 0
        while pointer < len(chunk_text):
            sub_chunk = chunk_text[pointer:pointer + max_length]
            actual_chunk = sub_chunk

            if pointer + max_length < len(chunk_text):
                period_pos = sub_chunk.rfind('. ')
                if period_pos != -1 and period_pos > max_length // 2:
                    actual_chunk = sub_chunk[:period_pos+1]

            meta = {}
            if re.search(r'table', actual_chunk, re.IGNORECASE):
                meta["contains_table"] = True
            if re.search(r'definition', actual_chunk, re.IGNORECASE):
                meta["type"] = "definition"
            if re.search(r"section|clause|article", actual_chunk, re.IGNORECASE):
                meta["type"] = "clause"

            chunks.append(Document(page_content=actual_chunk.strip(), metadata=meta))
            pointer += max_length - overlap

    return chunks


def load_pdf_file(pdf_path, max_workers=8):
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
    documents = []
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        raise ValueError(f"Failed to open PDF: {str(e)}")

    def extract_page(page_num):
        try:
            page = doc.load_page(page_num)
<<<<<<< HEAD
            page_text = page.get_text("text")
            return Document(page_content=page_text.strip(), metadata={"source": os.path.basename(pdf_path), "page": page_num + 1})
        except Exception as e:
=======
            page_text = page.get_text("text")  # Robust to font/compression issues
            # Add table extraction if needed (fitz has basic support via get_text("blocks"))
            return Document(page_content=page_text.strip(), metadata={"source": os.path.basename(pdf_path), "page": page_num + 1})
        except Exception as e:
            print(f"Error on page {page_num + 1}: {str(e)}")
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
            return Document(page_content="", metadata={"source": os.path.basename(pdf_path), "page": page_num + 1})

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        documents = list(executor.map(extract_page, range(doc.page_count)))
    doc.close()
    return documents


def extract_clause(text):
<<<<<<< HEAD
    import re
=======
    """Helper to extract clause or section references"""
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
    match = re.search(r'(Clause|Section|Article)\s+[\w.-]+', text, re.IGNORECASE)
    return match.group(0) if match else None


<<<<<<< HEAD
def text_split(extracted_docs, pdf_path=None):
    """
    Accepts either:
     - extracted_docs: list[Document] (preferred)
     - or a single string full_text
    Returns a list of langchain Document chunks with enriched metadata.
    """
    # If user passed a path by mistake, try to extract
    if isinstance(extracted_docs, str) and os.path.exists(extracted_docs):
        extracted_docs = load_pdf_file(extracted_docs)

    # If we were passed a list of Documents, join their page_content
    if isinstance(extracted_docs, list):
        full_text = "\n\n".join([d.page_content for d in extracted_docs if getattr(d, 'page_content', None)])
    else:
        full_text = str(extracted_docs)

    # Chunk using the parallel atomic chunker
    chunks = parallel_atomic_chunker(full_text)

    # Enhance metadata
=======
def get_google_drive_service():
    """Create and return authenticated Google Drive service"""
    # Get credentials from environment variable (deployment-safe)
    credentials_json = os.getenv("GOOGLE_CREDENTIALS_JSON")
    if not credentials_json:
        raise ValueError("GOOGLE_CREDENTIALS_JSON environment variable not set")
    
    try:
        credentials_info = json.loads(credentials_json)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in GOOGLE_CREDENTIALS_JSON: {str(e)}")
    
    SCOPES = ['https://www.googleapis.com/auth/drive']
    
    # Check if we have stored credentials
    creds = None
    token_file = 'token.json'  # This will be created after first auth
    
    if os.path.exists(token_file):
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)
    
    # If there are no (valid) credentials available, let the user log in
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_config(credentials_info, SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open(token_file, 'w') as token:
            token.write(creds.to_json())
    
    return build('drive', 'v3', credentials=creds ,cache_discovery=False)


def extract_text_with_google_ocr(pdf_path):
    """Extract text from PDF using Google Drive OCR"""
    try:
        service = get_google_drive_service()
        
        # Step 1: Upload PDF to Drive and convert to Google Doc (applies OCR)
        file_metadata = {
            'name': f'temp_ocr_{os.path.basename(pdf_path)}',
            'mimeType': 'application/vnd.google-apps.document'  # Converts to Doc with OCR
        }
        media = MediaFileUpload(pdf_path, mimetype='application/pdf', resumable=True)
        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        file_id = file.get('id')
        
        # Step 2: Export the OCR'd text as plain text
        request = service.files().export_media(fileId=file_id, mimeType='text/plain')
        fh = io.BytesIO()
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
        
        extracted_text = fh.getvalue().decode('utf-8')
        
        # Step 3: Clean up (delete temp file from Drive)
        service.files().delete(fileId=file_id).execute()
        
        return extracted_text
        
    except Exception as e:
        raise ValueError(f"Error with Google Drive OCR: {str(e)}")



def text_split(extracted_data, pdf_path):
    """
    Uses semantic (regex) chunking for improved question answering on policy/legal documents.
    """
    try:
        extracted_text = extract_text_with_google_ocr(pdf_path)
        full_text = extracted_text
    except Exception as e:
        print(f"Google OCR failed ({str(e)}), falling back to pdfplumber...")
        fallback_docs = load_pdf_file(pdf_path)
        print("Extraction time:", time.time() - t0)
        full_text = "\n\n".join([doc.page_content for doc in fallback_docs])

    # Now outside: Always assign chunks after full_text is set
    # chunks = semantic_regex_chunker(full_text)
    # chunks = atomic_chunker(full_text)
    chunks = parallel_atomic_chunker(full_text)

    # Enhance metadata for better retrieval and explainability
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
    for i, chunk in enumerate(chunks):
        clause = extract_clause(chunk.page_content)
        chunk.metadata["clause"] = clause if clause else "Unknown"
        chunk.metadata["chunk_id"] = i
<<<<<<< HEAD
        chunk.metadata["estimated_page"] = (i // 3) + 1
        if pdf_path:
            chunk.metadata["source_file"] = os.path.basename(pdf_path)

    return chunks
=======
        estimated_page = (i // 3) + 1
        chunk.metadata["estimated_page"] = estimated_page

    return chunks


def download_hugging_face_embeddings():
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-large",  # State-of-the-art OpenAI embeddings
        openai_api_key=os.getenv("OPENAI_API_KEY")
    )
    return embeddings


def is_binary_or_archive(url: str) -> bool:
    binary_exts = (".bin", ".zip", ".tar", ".gz", ".7z", ".rar")
    url_lower = url.lower()
    if url_lower.endswith(binary_exts):
        return True
    try:
        head = requests.head(url, allow_redirects=True, timeout=5)
        content_type = head.headers.get("Content-Type", "").lower()
        if any(x in content_type for x in [
            "application/octet-stream",
            "application/zip",
            "application/x-7z-compressed",
            "application/x-rar-compressed"
        ]):
            return True
    except Exception:
        pass
    return False



async def analyze_intent(url: str, questions: List[str]) -> str:
    prompt = f"""
You are an intent classifier for a multi-modal data processing system.
You will be given:
- A URL (could be a website, a document, or an API endpoint)
- A list of user questions

Your task:
Classify the intent into exactly one of the following categories:

1. "web_action"  
   Meaning: The task requires interacting with a live website, API, or system to extract data, get a token, scrape a page, or trigger an action.  
   Examples:  
   - "Get the session token from this login page"  
   - "Scrape the price from this product page"  
   - "Call this API and return the JSON"  

2. "advanced_document_process"  
   Meaning: The document itself contains dynamic references (like embedded URLs, API keys, or external links) that need to be fetched or processed before answering the question.  
   Examples:  
   - "What is my flight number?" where the PDF has a link to booking details  
   - "Get the latest balance" from a PDF with an API endpoint inside  
   - "Find the meeting location" when the doc says "See this link"  

3. "general_rag"  
   Meaning: This is a standard document Q&A task where the answer can be derived from static document content directly without extra web actions.  
   Examples:  
   - "Summarize the document"  
   - "List all sections in this file"  
   - "What does the second paragraph say?"  

Steps:
1. Check if the user request is about **actively interacting with an external live system** → choose "web_action".
2. If not, check if **the given document contains external references that must be fetched** to answer → choose "advanced_document_process".
3. If neither applies, default to "general_rag".

Now classify the following:

URL: {url}
Questions: {questions}

Respond with only one category name: "web_action", "advanced_document_process", or "general_rag".
"""
    # Pass this prompt to your LLM call here...


    # Pass prompt string directly to avoid type errors
    response = await asyncio.to_thread(llm_router.invoke, prompt)

    # Extract content from AIMessage
    intent = response.content.strip().lower()

    if intent not in ["web_action","general_rag","advanced_document_process"]:
        intent = "general_rag"

    return intent



async def dynamic_web_extraction(url: str, questions: List[str]) -> List[str]:
    try:
        print("[WEB EXTRACTION] Fetching webpage content...")
        res = requests.get(url)
        res.raise_for_status()
        html = res.text
        snippet = html[:500].replace("\n", " ").replace("\r", " ")

        prompt = f"""
        You are a web data extraction assistant.
        HTML snippet:
        \"\"\"{snippet}\"\"\"

        Questions: {questions}

        Return JSON extraction instructions with fields:
         - tag_names (list)
         - attribute_filters (dict, optional)
         - text_contains (optional)
         - regex_pattern (optional)
         - extraction_type ("text" or "attribute")
         - attribute_name (if attribute extraction)
        """

        llm_response = await asyncio.to_thread(llm_router.invoke, prompt)
        instructions_text = llm_response.content.strip()

        try:
            instructions = json.loads(instructions_text)
        except json.JSONDecodeError:
            instructions = [{"tag_names": ["code", "span", "div", "p"], "extraction_type": "text"}]

        soup = BeautifulSoup(html, "html.parser")
        extracted_texts = []

        for instr in instructions:
            tag_names = instr.get("tag_names", [])
            attr_filters = instr.get("attribute_filters", {})
            text_contains = instr.get("text_contains")
            regex_pattern = instr.get("regex_pattern")
            extraction_type = instr.get("extraction_type", "text")
            attribute_name = instr.get("attribute_name")

            for tag_name in tag_names:
                for tag in soup.find_all(tag_name, attrs=attr_filters):
                    content = tag.get_text(strip=True) if extraction_type == "text" else tag.get(attribute_name, "")
                    if not content:
                        continue
                    if text_contains and text_contains not in content:
                        continue
                    if regex_pattern and not re.search(regex_pattern, content):
                        continue
                    if len(content) > 32:
                        extracted_texts.append(content)

            if extracted_texts:
                break

        if not extracted_texts:
            raise ValueError("No matching tokens found.")

        return extracted_texts

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"[DYNAMIC EXTRACTION ERROR] {str(e)}")
    
    
    
>>>>>>> 809cc7dbcad3a17c96f6084921cee17d01c24b55
