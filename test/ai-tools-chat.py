import requests
import json

def send_request_to_chat_with_schema(instructions, schema):
    url = "http://127.0.0.1:2000/chat/json"  # Replace with the actual server URL if different
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "instructions": instructions,
        "schema": schema
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()  # Raise an exception for HTTP errors
        print("Response JSON:", response.json())
    except requests.exceptions.RequestException as e:
        print("Request failed:", e)
    except json.JSONDecodeError as e:
        print("Failed to decode JSON response:", e)

# Example usage
instructions = 'answer hte question of yes or no. If yes, "answer" key should be yes. otherwise, no. : question: does query string a guitar match youtube result video titled how to string guitar'
schema = '{"answer": string}'
send_request_to_chat_with_schema(instructions, schema)