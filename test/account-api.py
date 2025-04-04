import requests

BASE_URL = "http://localhost:3001"

def signup(username, password, email):
    url = f"{BASE_URL}/signup"
    payload = {
        "username": username,
        "passkey": password,
        "email": email
    }
    try:
        response = requests.post(url, json=payload)
        print("Signup Response:", response.status_code, response.json())
    except requests.exceptions.RequestException as e:
        print("Error during signup:", e)

def login(username, password):
    url = f"{BASE_URL}/login"
    payload = {
        "username": username,
        "passkey": password
    }
    try:
        response = requests.post(url, json=payload)
        print("Login Response:", response.status_code, response.json())
        return response.json().get("tokenid") if response.status_code == 201 else None
    except requests.exceptions.RequestException as e:
        print("Error during login:", e)

def userinfo(username, tokenid):
    url = f"{BASE_URL}/userinfo"
    payload = {
        "username": username,
        "tokenid": tokenid
    }
    try:
        response = requests.post(url, json=payload)
        print("Login Response:", response.status_code, response.json())
        return response.json() if response.status_code == 201 else None
    except requests.exceptions.RequestException as e:
        print("Error during login:", e)

if __name__ == "__main__":
    # Example usage
    signup("testuser", "testpassword123", "test@test.com")  # Replace with desired username and password
    token = login("testuser", "testpassword123")  # Replace with the same username and password
    print(userinfo("testuser", token) if token else "Failed to retrieve user info")  # Replace with the username and token obtained from login
