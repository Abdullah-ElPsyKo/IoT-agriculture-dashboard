import requests

# Replace this URL with your Flask application's endpoint
url = "http://localhost:5000/data"

data = {
    "Date": "2023-01-01",
    "City": "Nairobi",
    "Temp": "24.5C",
    "Prec": "0mm",
    "SoilMoist": "22.3%",
    "Winds": "5mph"
}

response = requests.post(url, json=data)

print(f"Status Code: {response.status_code}")
print(f"Response Body: {response.text}")
