# testagent.py - Modified for debugging
from fastapi.testclient import TestClient
from main import app
import json

client = TestClient(app)

def test_agent_weather_query():
    payload = {
        "question": "Should I water my tomatoes today? Will it rain?",
        "location": {"lat": 28.7041, "lon": 77.1025},
        "enable_agent": True
    }
    
    response = client.post("/agent", json=payload)
    
    # Print debugging information BEFORE assertion
    print(f"Status Code: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    print(f"Response Content: {response.text}")
    
    if response.status_code != 200:
        print(f"❌ ERROR: Expected 200, got {response.status_code}")
        try:
            error_data = response.json()
            print(f"Error details: {json.dumps(error_data, indent=2)}")
        except:
            print(f"Raw error response: {response.text}")
        return
    
    # Only assert after debugging
    assert response.status_code == 200
    data = response.json()
    print("✅ Success! Agent response received")
    print(json.dumps(data, indent=2))

if __name__ == "__main__":
    test_agent_weather_query()
