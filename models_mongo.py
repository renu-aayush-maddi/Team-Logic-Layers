# models_mongo.py
from datetime import datetime
from typing import Dict, Optional, List

# Collection names used across the app
USERS_COLL = "users"
PROFILES_COLL = "profiles"
SESSIONS_COLL = "sessions"
JOBS_COLL = "jobs"
CHUNKS_COLL = "doc_chunks"

def user_doc(email: str, password_hash: str, name: Optional[str] = None, organization: Optional[str] = None, role: Optional[str] = None) -> Dict:
    return {
        "email": email,
        "password_hash": password_hash,
        "name": name or "",
        "organization": organization or "",
        "role": role or "",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

def profile_doc(user_id: str, preferred_tone: str = "formal", default_templates: Optional[List[Dict]] = None) -> Dict:
    return {
        "user_id": user_id,
        "preferred_tone": preferred_tone,
        "default_templates": default_templates or [],
        "timezone": None,
        "locale": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

def session_context_doc(session_id: str) -> Dict:
    return {
        "session_id": session_id,
        "data": {},  # e.g., {"last_job_id": "...", "last_template": {...}}
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

def job_doc(job_id: str, user_email: Optional[str], filename: str, upload_id: str) -> Dict:
    return {
        "job_id": job_id,
        "user": user_email,
        "filename": filename,
        "upload_id": upload_id,
        "status": "uploaded",
        "template": None,
        "num_pages": 0,
        "output_path": None,
        "llm_output": None,
        "error": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

def chunk_doc(upload_id: str, filename: str, page: int, text: str) -> Dict:
    return {
        "upload_id": upload_id,
        "filename": filename,
        "page": int(page),
        "text": text,
        "created_at": datetime.utcnow(),
    }
