# # schemas.py
# from pydantic import BaseModel, EmailStr
# from typing import Optional, Dict, Any

# class SignupRequest(BaseModel):
#     email: EmailStr
#     password: str
#     name: Optional[str] = None

# class LoginRequest(BaseModel):
#     email: EmailStr
#     password: str

# class TokenResponse(BaseModel):
#     access_token: str
#     token_type: str = "bearer"

# class FarmerProfileRequest(BaseModel):
#     crops: Optional[str] = None
#     soil_type: Optional[str] = None
#     location_pref: Optional[str] = None
#     irrigation_method: Optional[str] = None
#     acreage: Optional[str] = None
#     custom_notes: Optional[str] = None

# class FarmerProfileResponse(FarmerProfileRequest):
#     pass

# class QuestionRequest(BaseModel):
#     question: str
#     location: Optional[Dict[str, Any]] = None
#     session_id: Optional[str] = None
    

# class AgentQuestionRequest(BaseModel):
#     question: str
#     session_id: Optional[str] = None
#     location: Optional[Dict[str, Any]] = None
#     enable_agent: bool = True  # Flag to enable agent mode


# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict

class SignupRequest(BaseModel):
    email: EmailStr
    name: Optional[str]
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str

class GenerateRequest(BaseModel):
    job_id: str
    sections: Optional[List[str]] = None
    tone: Optional[str] = "formal"

# Lightweight request for upload/generate endpoints (used by FastAPI forms)
class UploadResponse(BaseModel):
    job_id: str
    upload_id: str
    filename: str
    num_pages: int
