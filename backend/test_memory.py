import asyncio
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