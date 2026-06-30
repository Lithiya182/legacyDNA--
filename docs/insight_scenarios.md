# Insight Scenarios

Scenario: Sponsor Reliability
Demo Question: "Which sponsor was the most reliable across all years?"
Expected Answer: TechCorp sponsored all three events, always paid before deadlines, and returned each year.
Supporting Files: sponsor_reports/techcorp.txt
Cognee Function Used: recall()

Scenario: Attendance Growth
Demo Question: "Why did attendance improve from 2023 to 2025?"
Expected Answer: Early marketing campaigns launched 30+ days before the event correlated with higher attendance each year.
Supporting Files: event_reports/techfest_2023.txt, event_reports/techfest_2024.txt, event_reports/techfest_2025.txt
Cognee Function Used: improve() / memify()

Scenario: Recurring Problem
Demo Question: "What problems kept repeating across events?"
Expected Answer: Food and logistics issues appeared in 2023 and 2024 but were resolved in 2025 after a vendor change to Premium Catering Solutions.
Supporting Files: event_reports/techfest_2023.txt, event_reports/techfest_2024.txt, meeting_notes/2024_post.txt
Cognee Function Used: improve()

Scenario: Success Strategy
Demo Question: "What made TechFest 2025 the most successful?"
Expected Answer: Three factors -- early promotion, student ambassador program, and a confirmed venue 60 days in advance.
Supporting Files: event_reports/techfest_2025.txt, meeting_notes/2025_pre.txt
Cognee Function Used: recall() + memify()

Scenario: Successor Recommendation
Demo Question: "What advice would you give next year's organizing team?"
Expected Answer: Launch marketing 30+ days early, book the venue 60 days in advance, and retain Premium Catering Solutions.
Supporting Files: All files
Cognee Function Used: memify() -> Gemini summary
