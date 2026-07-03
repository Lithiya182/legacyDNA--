# LegacyDNA Retrieval Test Report (Final)

**Generated:** 2026-07-03
**Tested by:** Role 4 (Product & Data Engineer)

---

## Summary

| Metric | Result |
|---|---|
| Total Questions | 30 |
| Fully Correct | 23 |
| Partial (grounded but incomplete) | 6 |
| Incorrect / No Answer | 1 |
| **Fully Correct Accuracy** | **77% (23/30)** |
| **Grounded Answer Rate** (Correct + Partial) | **96.7% (29/30)** |

**Two fixes applied mid-testing significantly improved these results:**
1. **Dataset completeness** — sponsor reports and meeting notes were initially missing from the live system; re-uploading them resolved 4 previously-failed questions.
2. **Context window increase** — `MAX_CONTEXT_CHARS` was raised from 1500 → 3000 in `cognee_service.py`, resolving 5 of 8 remaining retrieval-miss questions where the answer existed in memory but wasn't being surfaced.

The one remaining incorrect answer (Q19) is a minor logistical detail (Wi-Fi congestion on Day 2, 2025) — not a core fact, low priority to chase further given time constraints.

---

## Full Results

| # | Question | Verdict | Notes |
|---|---|---|---|
| 1 | Which sponsor paid earliest across all years? | ✅ Correct | TechCorp, accurate |
| 2 | Which sponsor should never be re-engaged and why? | ✅ Correct | StartupX default, accurate |
| 3 | How did TechCorp's commitment change 2023–2025? | ✅ Correct | Fixed after sponsor data re-upload — Gold→Platinum→Platinum |
| 4 | Did Global Systems Inc pay on time, and 2026 status? | ✅ Correct | Fixed after sponsor data re-upload |
| 5 | What tier was CloudNine in 2025? | ⚠️ Partial | Correct fact (Bronze) but answer is self-contradicting/confused |
| 6 | What mistake did we make with StartupX? | ✅ Correct | Matches source exactly |
| 7 | Who is the most reliable anchor sponsor? | ⚠️ Partial | Trails off before naming TechCorp explicitly |
| 8 | How much did TechCorp pay in 2024? | ✅ Correct | Fixed after sponsor data re-upload — exact $18,000 |
| 9 | Exact attendance for 2023, 2024, 2025? | ✅ Correct | 2,400 / 3,100 / 4,800 exact |
| 10 | Attendance growth rate 2024→2025? | ✅ Correct | 55%, correct calculation |
| 11 | Biggest single decision impacting 2025 attendance? | ⚠️ Partial | Genuinely ambiguous — source doesn't isolate one decision |
| 12 | Student Ambassador program change 2024→2025? | ✅ Correct | 12→40, exact |
| 13 | Why did TechFest 2023 have lowest attendance? | ✅ Correct | Fixed after context cap increase |
| 14 | Marketing lead time in 2024? | ✅ Correct | Fixed after context cap increase — "30+ days" |
| 15 | Did early marketing correlate with attendance? | ✅ Correct | Matches source |
| 16 | Which program drove 2025 signups? | ✅ Correct | Student Ambassador Program |
| 17 | What catering company ruined 2023/2024? | ✅ Correct | Fixed after context cap increase — Campus Bites |
| 18 | 2025 caterer performance? | ✅ Correct | Premium Catering Solutions, zero complaints |
| 19 | Day 2 logistics issue in 2025? | ❌ Incorrect | Wi-Fi congestion detail still not retrieved |
| 20 | Why was a workshop room double-booked in 2025? | ⚠️ Partial | Gives the general lesson, not the specific cause |
| 21 | Venue for TechFest 2025? | ✅ Correct | Grand Convocation Hall, exact |
| 22 | Largest single-session crowd? | ✅ Correct | Robotics keynote |
| 23 | Lesson on manual spreadsheet scheduling? | ✅ Correct | Fixed after context cap increase |
| 24 | Effect of relying on cheap food vendors? | ✅ Correct | Matches source |
| 25 | How does last-minute marketing affect the event? | ⚠️ Partial | Doesn't directly answer but pivots to a correct, related fact |
| 26 | Booth space without signed payment confirmation? | ✅ Correct | Fixed after sponsor data re-upload — quotes exact recommendation |
| 27 | Room scheduling advice for next year? | ⚠️ Partial | Gives generic advice, misses the specific "shared tool" detail |
| 28 | Minimum notice period for venue confirmation? | ✅ Correct | Fixed after context cap increase — 60 days |
| 29 | Who should be hired for catering next year? | ✅ Correct | Premium Catering Solutions |
| 30 | Top 3 advice for TechFest 2026 team? | ✅ Correct | Strong summary, aligns with real lessons — best demo closer |

---

## Recommended Demo Questions

These returned the strongest, most specific, most "wow"-worthy grounded answers — recommend building the live demo flow around a subset of these:

- Q2 — Which sponsor should never be re-engaged and why? (StartupX story)
- Q9 — Exact attendance for all 3 years (clean numeric growth)
- Q12 — Student Ambassador program change (concrete 12→40 detail)
- Q18 — 2025 caterer performance (problem→fix narrative)
- Q26 — Booth space without signed payment (quotes real evidence)
- Q30 — Top 3 advice summary (best closing "wow" moment)

---

## Notes for the Team

- **Role 1:** `improve()` is the next dependency — `/insights` and `/recommendations` are wired and waiting. Once complete, recommend re-running this same question set against those endpoints for evidence-mapping validation.
- **Role 2:** No backend changes needed based on this report — `/api/query` is stable and accurate.
- **Role 3:** Safe to treat Q2, Q9, Q12, Q18, Q26, and Q30 as reliable "known good" answers for UI testing/demo rehearsal.