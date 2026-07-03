import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env BEFORE importing/using cognee
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Debug: confirm what cognee will actually see
print("LLM_PROVIDER:", os.getenv("LLM_PROVIDER"))
print("LLM_MODEL:", os.getenv("LLM_MODEL"))
print("LLM_API_KEY set:", bool(os.getenv("LLM_API_KEY")))

import cognee


async def main():
    print("Starting memory test...")

    await cognee.remember(
        "TechFest 2025 had 1200 attendees. Sponsorship outreach started 2 months early and resulted in 15 sponsors."
    )

    print("Memory stored.")

    result = await cognee.recall(
        "How many attendees did TechFest 2025 have?"
    )

    print("\nRecall Result:")
    print(result)


asyncio.run(main())