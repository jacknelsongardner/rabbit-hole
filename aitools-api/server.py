from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

import os
import requests
import json

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Configure port
app.config['SERVER_PORT'] = 2000



@app.route('/chat/raw', methods=['POST'])
def chat_raw():
    data = request.get_json()

    if 'message' not in data:
        return jsonify({'error': 'No message provided from user role'}), 400

    try:
        # Forward the request payload to the JAN API
        jan_api_url = 'http://host.docker.internal:1337/v1/chat/completions'
        response = requests.post(jan_api_url, json=request.get_json())

        # Return the response from the JAN API
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/chat/json', methods=['POST'])
def chat_with_schema():

    data = request.get_json()
    if 'instructions' not in data or 'schema' not in data:
        return jsonify({'error': 'Both "message" and "schema" fields are required'}), 400

    jan_url = "http://localhost:1337/v1/chat/completions"

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
        "content": f'{data["instructions"]} : format : {data["schema"]} Do not add any other text. If you do, I will stop responding.',
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
    response = requests.post(jan_url, headers=headers, data=json.dumps(payload))
    
    try:
        # Parse the response from the JAN API
        result = response.json()
        content = result.get('choices', [{}])[0].get('message', {}).get('content', '')

        try:
            # Attempt to parse the content as JSON
            content_json = json.loads(content)
            return jsonify({'json': content_json}), response.status_code
        except json.JSONDecodeError as e:
            # Handle JSON decoding errors
            return jsonify({'error': 'Error decoding JSON content', 'details': str(e), 'response_content': content}), 500
    except Exception as e:
        # Handle errors while parsing the JAN API response
        return jsonify({'error': 'Error parsing JSON response', 'details': str(e), 'response_text': response.text}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=app.config['SERVER_PORT'])