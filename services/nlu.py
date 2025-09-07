# services/nlu.py
from typing import Dict, Any, Optional
from adapters.llm_google_genai import llm_completion

NLU_PROMPT_TEMPLATE = """
You are an intent classifier and entity extractor for an agricultural AI assistant.

Return ONLY valid JSON in this format:
{{
  "intent": "<one of: weather_now, irrigation, pest_alert, crop_stress, mandi_price, policy_finance, static_info>",
  "entities": {{
    "crop": "<string or null>",
    "location": {{
        "lat": <float or null>,
        "lon": <float or null>,
        "admin_text": "<district/state text or null>"
    }},
    "pest": "<string or null>",
    "date_range": "<string or null>"
  }}
}}

User question: "{question}"
"""

def parse(question: str, context_location: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    prompt = NLU_PROMPT_TEMPLATE.format(question=question)
    raw = llm_completion(prompt)
    try:
        parsed = json.loads(raw)
    except Exception:
        # fallback if LLM returns invalid JSON
        parsed = {
            "intent": "static_info",
            "entities": {"crop": None, "location": context_location or {}, "pest": None, "date_range": None}
        }
    # merge provided context location if LLM left it null
    if context_location and not parsed["entities"]["location"]:
        parsed["entities"]["location"] = context_location
    return parsed
