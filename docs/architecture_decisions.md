## Decision Log -- Day 1
- Using .txt for datasets (reason: fastest for parser testing)
- SQLite for MVP (reason: no setup overhead)
- ~~Gemini for response generation~~ **SUPERSEDED — see Day 3 below**
- API contract changes made today: none yet -- pending Task 4 (API Contract Definition)

## Decision Log -- Day 3
- Switched LLM provider from Gemini to **Groq** (`llama-3.1-8b-instant`, via LiteLLM)
  - Reason: faster response times, generous free-tier rate limits for demo/testing volume
  - Trade-off: added need for a proactive throttle (`MIN_INTERVAL_SECONDS = 8`) in `cognee_service.py` to stay under Groq's TPM (tokens-per-minute) limit
- `MAX_CONTEXT_CHARS` tuned from 1500 → 3000 after gold-question testing showed 1500 was truncating relevant context for several questions
- Async correctness fixes applied to `CogneeService`: replaced blocking `time.sleep()` / sync `litellm.completion()` calls with `asyncio.sleep()` / `litellm.acompletion()` to avoid blocking the FastAPI event loop

## Decision Log -- Day 4 (2026-07-04)

**Findings from full-system audit:**

1. **`/api/insights` and `/api/recommendations` confirmed working** (both return HTTP 200 with real, evidence-backed content generated via `improve()`). Previously flagged as broken in earlier internal audit — now resolved.

2. **`/api/compare` is currently a hardcoded mock**, not a real Cognee-backed implementation:
   ```python
   return CompareResponse(
       differences="Mock differences between A and B.",
       ...
   )
   ```
   Decision: **out of scope for tomorrow's demo.** Not included in `demo_script.md`. Frontend should not surface a live "Compare" action during the judge demo. Revisit post-submission if time allows.

3. **Retrieval inconsistency identified in `recall()`.** Running the same 30 gold questions twice on the same day, with identical code and data, produced different pass/fail results on ~6 of 30 questions (see `docs/test_report.md`, both 2026-07-04 runs). Root cause suspected to be:
   - Duplicate document ingestion during testing (e.g. `techfest_2023.txt` ingested 4 separate times) diluting/reshuffling graph node ranking
   - `recall()`'s hard cap of top-5 retrieved chunks (`parsed_results[:5]` in `cognee_service.py`) — a relevant chunk shifting to position 6 disappears entirely
   
   Confirmed via direct `cognee.search()` call that the underlying memory graph is intact (117 nodes, 261 edges) — this is a ranking/retrieval issue, not data loss.
   
   Status: reported to Memory Engineer (Role 1) for investigation. Demo question set has been restricted to questions verified stable across multiple runs (see `demo_script.md`) until resolved.

4. **SQLite structured tables (`events`, `sponsors`, `insights`, `recommendations`) are unpopulated (0 rows).** `database.py`'s `init_db()` only creates the `documents` table — no code path in the current backend writes to the other four tables. All intelligence generation currently reads directly from Cognee's memory graph, bypassing SQLite entirely for anything beyond upload tracking.

   Decision: **not fixing today.** Not blocking for demo since Cognee's graph already serves all query/insight/recommendation needs. Documented as a known limitation in README rather than attempting a same-day fix this close to submission.

5. **`test_runner.py` had a scoring bug**: flagged any answer containing the substring "don't have" as EMPTY, even when it was a substantive answer with a minor caveat (e.g. "...the Student Ambassador program grew, though I don't have the exact date"). Fixed by only flagging short (<120 char), predominantly-negative responses as empty.

6. **Duplicate file uploads found in `backend/uploads/`** — several source files (sponsor reports, meeting notes, `techfest_2023.txt`) were ingested 2-4 times across testing sessions. Not cleaned up today given time constraints; flagged as a likely contributor to finding #3 above.