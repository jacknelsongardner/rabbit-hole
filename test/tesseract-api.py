import requests

# Example code to test the OCR API
def test_ocr_api():
    url = "http://localhost:2000/ocr/all"
    image_path = "tests/example.png"  # Replace with the path to your test image

    with open(image_path, 'rb') as image_file:
        files = {'image': image_file}
        response = requests.post(url, files=files)

    if response.status_code == 200:
        print("OCR API Response:")
        print(response.json())
    else:
        print(f"Error: {response.status_code}")
        print(response.json())

if __name__ == "__main__":
    test_ocr_api()