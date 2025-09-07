# # services/agent_service.py
# import json
# from typing import Dict, Any, Optional
# from services.dynamic_api_tool import dynamic_api_call

# # Enhanced system prompt for your existing LLM
# # services/agent_service.py - CORRECTED VERSION
# # services/agent_service.py - TRULY DYNAMIC VERSION
# # services/agent_service.py - CORRECTED VERSION
# # AGENT_ENHANCED_PROMPT = """
# # You are an intelligent agricultural advisor with access to real-time data through APIs.

# # DECISION MAKING:
# # - If a question involves current conditions (weather, irrigation, pest timing), fetch real-time data
# # - If a question is about general practices or knowledge, use your existing expertise
# # - Always explain your reasoning

# # API CALL FORMAT:
# # When you determine real-time data would help, use:
# # API_CALL: {{"url": "appropriate_api_endpoint", "description": "why_this_data_helps"}}

# # THINK DYNAMICALLY:
# # - What specific data would make your answer more accurate?
# # - What time range is relevant? (current, 24h, 7 days?)
# # - What parameters matter for this specific question?

# # Construct API calls based on actual need, not templates.
# # """

# # services/agent_service.py
# DEFAULT_WORKING_APIS = {
#     "weather": {
#         "open_meteo": "https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7",
#         "nasa_power": "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,RH2M,PRECTOT&community=RE&longitude={lon}&latitude={lat}&start=20240101&end=20241231&format=JSON"
#     },
#     "location": {
#         "nominatim": "https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"
#     },
#     "soil": {
#         "soilgrids": "https://rest.soilgrids.org/soilgrids/v2.0/properties/query?lon={lon}&lat={lat}&property=phh2o&property=soc&depth=0-5cm&value=mean"
#     },
#     "elevation": {
#         "open_elevation": "https://api.open-elevation.com/api/v1/lookup?locations={lat},{lon}"
#     }
# }

# AGENT_ENHANCED_PROMPT = f"""
# You are an intelligent agricultural advisor with access to real-time data through APIs.

# RELIABLE APIs YOU CAN USE:
# Weather: {DEFAULT_WORKING_APIS['weather']['open_meteo']}
# Location: {DEFAULT_WORKING_APIS['location']['nominatim']}
# Soil: {DEFAULT_WORKING_APIS['soil']['soilgrids']}
# Elevation: {DEFAULT_WORKING_APIS['elevation']['open_elevation']}

# INSTRUCTIONS:
# 1. For weather/irrigation questions, use the weather API above
# 2. For soil questions, use the soil API above
# 3. You can also construct OTHER valid API URLs if you know reliable endpoints
# 4. Always replace {{lat}} and {{lon}} with actual coordinates
# 5. If you're unsure about an API, use the defaults above

# API_CALL FORMAT:
# API_CALL: {{"url": "complete_valid_url", "description": "what_this_fetches"}}

# Think about what data you need, then choose the most appropriate API endpoint.
# """






# def create_agent_prompt(base_prompt: str) -> str:
#     """Enhance existing prompt with agent capabilities"""
#     return base_prompt + "\n\n" + AGENT_ENHANCED_PROMPT

# def extract_api_calls(text: str) -> list:
#     """Extract API calls from LLM response"""
#     api_calls = []
#     lines = text.split('\n')
    
#     for line in lines:
#         if line.strip().startswith('API_CALL:'):
#             try:
#                 json_str = line.split('API_CALL:', 1)[1].strip()
#                 api_call = json.loads(json_str)
#                 api_calls.append(api_call)
#             except:
#                 continue
    
#     return api_calls

# def execute_api_calls(api_calls: list) -> Dict[str, Any]:
#     """Execute all API calls and return results"""
#     results = {}
#     sources = []
    
#     for i, call in enumerate(api_calls):
#         url = call.get('url', '')
#         description = call.get('description', f'API call {i+1}')
#         extraction_path = call.get('data_extraction_path')
        
#         result = dynamic_api_call(
#             url=url,
#             description=description,
#             data_extraction_path=extraction_path
#         )
        
#         results[f"api_call_{i+1}"] = result
#         if result.get('success'):
#             sources.append(result.get('source', 'External API'))
    
#     return {"api_results": results, "sources": sources}

# def format_api_results_for_llm(api_results: Dict[str, Any]) -> str:
#     """Format API results to send back to LLM"""
#     if not api_results.get("api_results"):
#         return ""
    
#     formatted = "\n\nAPI RESULTS:\n"
#     for call_name, result in api_results["api_results"].items():
#         if result.get("success"):
#             formatted += f"{result.get('description', call_name)}: {json.dumps(result['data'], indent=2)}\n"
#         else:
#             formatted += f"{result.get('description', call_name)}: FAILED - {result.get('error', 'Unknown error')}\n"
    
#     return formatted



import json
from typing import Dict, Any, Optional, List
from urllib.parse import urlparse
from services.dynamic_api_tool import dynamic_api_call


# Define your fallback (default) working APIs
DEFAULT_WORKING_APIS = {
    "weather": {
        "open_meteo": "https://api.open-meteo.com/v1/forecast?latitude={{lat}}&longitude={{lon}}&current_weather=true&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7"
    },
    "soil": {
        "soilgrids": "https://rest.isric.org/soilgrids/v2.0/properties/query?lon={{lon}}&lat={{lat}}&property=phh2o&property=soc"
    },
    "location": {
        "nominatim": "https://nominatim.openstreetmap.org/reverse?format=json&lat={{lat}}&lon={{lon}}"
    }
}

AGENT_ENHANCED_PROMPT = """
You are an intelligent agricultural advisor with access to real-time data through APIs.

RELIABLE APIs YOU CAN USE:
Weather (Open-Meteo): https://api.open-meteo.com/v1/forecast?latitude={{lat}}&longitude={{lon}}&current_weather=true&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7
Soil (SoilGrids): https://rest.isric.org/soilgrids/v2.0/properties/query?lon={{lon}}&lat={{lat}}&property=phh2o&property=soc
Location (Nominatim): https://nominatim.openstreetmap.org/reverse?format=json&lat={{lat}}&lon={{lon}}
market(agmarknet):https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001bb4b9686991d47e05a78b504d33fd430&format=json&filters[state]=&filters[commodity]=
INSTRUCTIONS:
1. For weather/irrigation questions, use the weather API above
2. For soil questions, use the soil API above
3. For location-based queries, use the location API above
4. For market price queries, use the Agmarknet API:
   - Extract 'state' and 'commodity' from the user's message or session context.
   - If either is missing, ask a concise follow-up to get the missing value(s).
   - Use the exact casing the API expects (e.g., 'Maharashtra', 'Tomato').
5. You may construct OTHER valid API URLs if you know reliable endpoints
6. Always replace {{lat}} and {{lon}} with actual coordinates from user location

API_CALL FORMAT:
API_CALL: {{"url": "complete_valid_url", "description": "what_this_fetches"}}

Generate REAL API URLs, not placeholders. Use the examples above as templates.
"""





def create_agent_prompt(base_prompt: str) -> str:
    """Enhance existing prompt with agent capabilities"""
    return base_prompt + "\n\n" + AGENT_ENHANCED_PROMPT

def extract_api_calls(text: str) -> List[Dict[str, str]]:
    api_calls = []
    for line in text.split('\n'):
        if line.strip().startswith('API_CALL:'):
            try:
                json_str = line.split('API_CALL:', 1)[1].strip()
                api_call = json.loads(json_str)
                api_calls.append(api_call)
            except Exception:
                continue
    return api_calls

def is_valid_api_url(url: str) -> bool:
    try:
        parsed = urlparse(url)
        if not parsed.scheme in ['http', 'https']:
            return False
        if not parsed.netloc:
            return False
        invalid_patterns = [
            'api_endpoint_for',
            'placeholder',
            'example.com',
            'lat_lon',
            'weather_api_endpoint'
        ]
        if any(pattern in url.lower() for pattern in invalid_patterns):
            return False
        return True
    except Exception:
        return False

def get_fallback_api_call(description: str, user_location: dict) -> Optional[Dict[str, str]]:
    desc_lower = description.lower()

    if any(word in desc_lower for word in ['weather', 'rain', 'temperature', 'precipitation']):
        if user_location:
            return {
                "url": DEFAULT_WORKING_APIS['weather']['open_meteo'].replace('{{lat}}', str(user_location['lat'])).replace('{{lon}}', str(user_location['lon'])),
                "description": f"Weather forecast (fallback) - {description}"
            }
    elif any(word in desc_lower for word in ['soil', 'ph', 'organic']):
        if user_location:
            return {
                "url": DEFAULT_WORKING_APIS['soil']['soilgrids'].replace('{{lat}}', str(user_location['lat'])).replace('{{lon}}', str(user_location['lon'])),
                "description": f"Soil data (fallback) - {description}"
            }
    elif any(word in desc_lower for word in ['location', 'address', 'place']):
        if user_location:
            return {
                "url": DEFAULT_WORKING_APIS['location']['nominatim'].replace('{{lat}}', str(user_location['lat'])).replace('{{lon}}', str(user_location['lon'])),
                "description": f"Location data (fallback) - {description}"
            }

    return None

def validate_and_fix_api_calls(api_calls: list, user_location: dict) -> list:
    fixed_calls = []
    print(f"🔍 Validating {len(api_calls)} API calls...")
    
    for call in api_calls:
        url = call.get('url', '')
        description = call.get('description', '')
        
        print(f"  📋 Checking URL: {url[:50]}...")
        
        # Fill in location parameters first
        if user_location and '{{lat}}' in url and '{{lon}}' in url:
            url = url.replace('{{lat}}', str(user_location['lat'])).replace('{{lon}}', str(user_location['lon']))
            call['url'] = url
            print(f"  ✅ Filled location: {url[:80]}...")

        # Validate URL
        if is_valid_api_url(url):
            fixed_calls.append(call)
            print(f"  ✅ Valid URL accepted")
        else:
            print(f"  ⚠️ Invalid URL detected, trying fallback...")
            fallback_call = get_fallback_api_call(description, user_location)
            if fallback_call:
                print(f"  ✅ Using fallback: {fallback_call['url'][:80]}...")
                fixed_calls.append(fallback_call)
            else:
                print(f"  ❌ No fallback available for: {description}")
    
    return fixed_calls

def execute_api_calls(api_calls: list) -> Dict[str, Any]:
    results = {}
    sources = []
    for i, call in enumerate(api_calls):
        url = call.get('url', '')
        description = call.get('description', f'API call {i+1}')
        extraction_path = call.get('data_extraction_path')

        result = dynamic_api_call(
            url=url,
            description=description,
            data_extraction_path=extraction_path
        )

        results[f"api_call_{i+1}"] = result
        if result.get('success'):
            sources.append(result.get('source', url))
    return {"api_results": results, "sources": sources}

def format_api_results_for_llm(api_results: Dict[str, Any]) -> str:
    if not api_results.get("api_results"):
        return ""
    formatted = "\n\nAPI RESULTS:\n"
    for call_name, result in api_results["api_results"].items():
        if result.get("success"):
            formatted += f"{result.get('description', call_name)}: {json.dumps(result['data'], indent=2)}\n"
        else:
            formatted += f"{result.get('description', call_name)}: FAILED - {result.get('error', 'Unknown error')}\n"
    return formatted

def remove_internal_lines(answer: str) -> str:
    return '\n'.join([
        line for line in answer.split('\n')
        if not line.strip().startswith('API_CALL:')
        and not line.strip().startswith('SESSION_UPDATE:')
        and line.strip() != ""
    ])
