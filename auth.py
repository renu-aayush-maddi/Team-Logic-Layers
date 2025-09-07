# # auth.py
# import os
# import jwt
# import bcrypt
# from datetime import datetime, timedelta
# from fastapi import Depends, HTTPException
# from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
# from db_mongo import get_db

# JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
# JWT_ALG = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24h

# security = HTTPBearer()

# def hash_password(plain: str) -> str:
#     return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# def verify_password(plain: str, hashed: str) -> bool:
#     return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

# def create_access_token(sub: str) -> str:
#     now = datetime.utcnow()
#     payload = {
#         "sub": sub,
#         "iat": now,
#         "exp": now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
#     }
#     return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

# async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db=Depends(get_db)):
#     token = credentials.credentials
#     try:
#         payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
#         email = payload.get("sub")
#     except jwt.PyJWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     user = await db["users"].find_one({"email": email})
#     if not user:
#         raise HTTPException(status_code=401, detail="User not found")
#     return user



# auth.py
import os
from datetime import datetime, timedelta
from typing import Optional

import jwt
from fastapi import Depends, HTTPException, Request
from passlib.hash import bcrypt
from dotenv import load_dotenv

from db_mongo import get_db
from models_mongo import USERS_COLL
from motor.motor_asyncio import AsyncIOMotorDatabase

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "very-secret-key")
JWT_ALG = os.getenv("JWT_ALG", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # one week

def hash_password(password: str) -> str:
    return bcrypt.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.verify(password, hashed)

def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    now = datetime.utcnow()
    if expires_delta is None:
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": subject,
        "iat": int(now.timestamp()),
        "exp": int((now + expires_delta).timestamp()),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

async def get_current_user(request: Request, db: AsyncIOMotorDatabase = Depends(get_db)):
    """
    FastAPI dependency to retrieve current user from Authorization: Bearer <token>.
    Returns user dict or raises 401.
    """
    auth = request.headers.get("Authorization")
    if not auth or not auth.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = auth.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        user = await db[USERS_COLL].find_one({"email": email})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
