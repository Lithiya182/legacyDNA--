import requests
import time

# Make sure your FastAPI server is running on port 8000!
API_URL = "http://127.0.0.1:8000/api/query"

questions = [
    "Which sponsor is the most reliable, and which one should we avoid?",
    "Why are we using Premium Catering Solutions for 2025?",
    "How did we fix our marketing strategy between 2023 and 2025?",
    "What recurring problem affected TechFest for multiple years?",
    "Did Global Systems Inc pay on time?"
]

print("🚀 Starting Automated Retrieval Test...\n")

for q in questions:
    print(f"❓ Question: {q}")
    try:
        start_time = time.time()
        response = requests.post(API_URL, json={"question": q})
        
        if response.status_code == 200:
            data = response.json()
            end_time = time.time()
            print(f"✅ Answer ({round(end_time - start_time, 2)}s):\n{data.get('answer')}")
        else:
             print(f"❌ API Error: {response.status_code} - {response.text}")
        print("-" * 50)
    except Exception as e:
        print(f"❌ Failed to reach API: {e}")
        print("-" * 50)