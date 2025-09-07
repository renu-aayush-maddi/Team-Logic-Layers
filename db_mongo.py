# db_mongo.py
import os
from typing import AsyncGenerator
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB = os.getenv("MONGODB_DB", "template_engine_db")

_client: AsyncIOMotorClient | None = None

def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(MONGODB_URI)
    return _client

async def get_db() -> AsyncGenerator:
    client = get_client()
    db = client[MONGODB_DB]
    try:
        yield db
    finally:
        pass  # keep connection open for app lifetime

async def close_db():
    global _client
    if _client:
        _client.close()
        _client = None
