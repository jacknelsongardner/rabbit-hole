import requests
import json

# Endpoint URL


url = "http://localhost:1337/v1/chat/completions"

headers = {
    "Content-Type": "application/json"
}

# Data to send in the POST request
payload = {
"messages": [
    {
    "content": f"You are taking text and creating json objects. Only respond in json format. Do not add any other text. If you do, I will stop responding. You are a JSON generator. You are a JSON generator. You are a JSON generator. Go exactly to the persons specifications regarding json schema.",
    "role": "system"
    },
    {
    "content": "Take this text : hass avacados 3ct 3.99 ($.43/count) : format : {'produce_name' : string, 'count': int, 'total_cost':float } Do not add any other text. If you do, I will stop responding.",
    "role": "user"
    }
],
"model": "llama3.2:1b",
"stream": False,
"max_tokens": 2048,
"stop": [
    "hello"
],
"response_format": {
    "type": "json_object"
  },
"frequency_penalty": 0,
"presence_penalty": 0,
"temperature": 0.7,
"top_p": 0.95
}

# Make the POST request
response = requests.post(url, headers=headers, data=json.dumps(payload))
#print(response)

try:
    result = response.json()
    content = result.get('choices', [{}])[0].get('message', {}).get('content', '')
    print(content)

    try:
        content_json = json.loads(content)
        print("Parsed JSON:", content_json)
    except json.JSONDecodeError as e:
        print("Error decoding JSON content:", e)
        
except Exception as e:
    print("Error parsing JSON response:", e)
    print("Response text:", response.text)
finally:
    print("Response status code:", response.status_code)
    print("Response headers:", response.headers)