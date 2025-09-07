# services/dynamic_api_tool.py
import requests
import json
from typing import Dict, Any, Optional
from urllib.parse import urlencode

def dynamic_api_call(
    url: str,
    method: str = "GET", 
    params: Optional[Dict] = None,
    headers: Optional[Dict] = None,
    data_extraction_path: Optional[str] = None,
    description: str = ""
) -> Dict[str, Any]:
    """
    Generic API caller that LLM can use for any external API
    """
    try:
        if method.upper() == "GET":
            response = requests.get(url, params=params, headers=headers, timeout=10)
        elif method.upper() == "POST":
            response = requests.post(url, json=params, headers=headers, timeout=10)
        else:
            return {"error": f"Unsupported method: {method}"}
            
        response.raise_for_status()
        data = response.json()
        
        # Extract specific data if path provided
        if data_extraction_path:
            extracted = extract_json_path(data, data_extraction_path)
            return {"success": True, "data": extracted, "source": url, "description": description}
        
        return {"success": True, "data": data, "source": url, "description": description}
        
    except Exception as e:
        return {"success": False, "error": str(e), "source": url, "description": description}

def extract_json_path(data: Dict, path: str) -> Any:
    """Extract data using simple dot notation path"""
    try:
        keys = path.split('.')
        result = data
        for key in keys:
            if '[' in key and ']' in key:
                # Handle array access like "daily[0]"
                array_key = key.split('[')
                index = int(key.split('[')[1].split(']'))
                result = result[array_key][index]
            else:
                result = result[key]
        return result
    except:
        return data  # Return full data if path extraction fails
