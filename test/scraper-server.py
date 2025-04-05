import requests
import json

def search_videos(search_term, last, topic):
    # Server URL
    url = 'http://localhost:2001/search'
    
    # Request payload
    payload = {
        'search': search_term,
        'topic': topic,
        'violence': False,
        'last': last,
        'sexuality': False,
        'bodynegativity': False,
        'advertisements': False
    }

    # Make POST request
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Parse response
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding response: {e}")
        return None

# Example usage
if __name__ == "__main__":
    result = search_videos(
        search_term="how to string a guitar",
        last="how to tune a guitar",
        topic="music"
    )
    
    if result:
        print("Videos:", result.get('videos'))
        print("Distracted:", result.get('distracted'))
        print("Appropriate:", result.get('appropriate'))