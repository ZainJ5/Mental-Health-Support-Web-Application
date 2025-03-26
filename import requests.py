import requests
import json

API_KEY = "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"

response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "model": "deepseek/deepseek-r1:free",  
        "messages": [
            {
                "role": "user",
                "content": "What is the meaning of life?"
            }
        ]
    }
)

print(response.status_code)
print(response.json())









