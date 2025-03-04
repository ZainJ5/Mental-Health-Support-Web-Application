import requests
import json

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": "Bearer sk-or-v1-e6318bdfe4fbe14fb5a15e003e5eedf81d66bcd245a001ca86f5bb91fcc3a9a7sk-or-v1-e6318bdfe4fbe14fb5a15e003e5eedf81d66bcd245a001ca86f5bb91fcc3a9a7sk-or-v1-e6318bdfe4fbe14fb5a15e003e5eedf81d66bcd245a001ca86f5bb91fcc3a9a7",
    "HTTP-Referer": "<YOUR_SITE_URL>",
    "X-Title": "<YOUR_SITE_NAME>", 
  },
  data=json.dumps({
    "model": "openai/gpt-4o", 
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ]
  })
)
