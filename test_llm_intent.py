# test_llm_intent.py - NEW FILE
import asyncio
from main import classify_intent_with_llm

async def test_llm_intent_classification():
    """Test LLM-based intent classification"""
    
    user_location = {"lat": 28.7041, "lon": 77.1025}
    
    test_cases = [
        # Expected AGENT
        ("Should I water my tomatoes today?", user_location),
        ("Will it rain tomorrow?", user_location),
        ("What's the current weather?", user_location),
        ("Market prices for wheat today?", None),
        
        # Expected RAG
        ("What are benefits of crop rotation?", None),
        ("How to prepare soil for planting?", None),
        ("Symptoms of nitrogen deficiency", None),
        ("Best practices for organic farming", None),
    ]
    
    print("Testing LLM Intent Classification:")
    print("=" * 50)
    
    for question, location in test_cases:
        try:
            intent = await classify_intent_with_llm(question, location)
            print(f"'{question}' → {intent.upper()}")
        except Exception as e:
            print(f"'{question}' → ERROR: {e}")

if __name__ == "__main__":
    asyncio.run(test_llm_intent_classification())
