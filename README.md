# LegacyDNA

**Organizational memory for event teams.** Every year, a new team plans the same festival from scratch — because the people who learned last year's lessons already graduated. LegacyDNA turns scattered event reports, meeting notes, and sponsor records into a queryable memory graph, so institutional knowledge survives team turnover.

## What it does

Upload messy, real-world documents — post-event reports, sponsor contracts, meeting notes — and LegacyDNA:
- **Remembers** them in a Cognee-powered memory graph (vector + graph hybrid)
- **Recalls** answers to natural-language questions, grounded in evidence
- **Improves** by extracting recurring success patterns and problems across documents
- Turns those patterns into **evidence-backed recommendations** for next year's team

## Architecture

```mermaid
flowchart TD
    A[Upload Document] --> B[Parse: PDF/DOCX/TXT]
    B --> C[SQLite: log metadata]
    B --> D["Cognee remember()<br/>add + cognify"]
    D --> E[(Memory Graph<br/>vector + graph store)]
    E --> F["Cognee recall()<br/>on user question"]
    F --> G[Groq LLM synthesis<br/>llama-3.1-8b-instant]
    G --> H[Grounded answer + sources]
    E --> I["Cognee improve()"]
    I --> J[Success patterns / recurring problems]
    I --> K[Evidence-backed recommendations]
```

## Tech Stack

- **Backend:** Python / FastAPI
- **Memory Layer:** [Cognee](https://www.cognee.ai/) (hybrid vector + knowledge graph)
- **LLM:** Groq (`llama-3.1-8b-instant`, via LiteLLM)
- **Metadata storage:** SQLite
- **Frontend:** Next.js

> Note: earlier design docs referenced Gemini for response generation. The team switched to Groq during implementation for speed and cost; this README reflects the current, actual implementation.

## API Endpoints

| Endpoint | Method | Status | Description |
|---|---|---|---|
| `/api/upload` | POST | ✅ Working | Upload + parse + ingest a document into memory |
| `/api/query` | POST | ✅ Working | Ask a natural-language question, get a grounded answer |
| `/api/insights` | GET | ✅ Working | Extract success patterns & recurring problems from memory |
| `/api/recommendations` | GET | ✅ Working | Generate evidence-backed recommendations |
| `/api/compare` | POST | ⚠️ Mocked | Not yet implemented — returns placeholder data |
| `/api/memory/{id}` | DELETE | ⚠️ Stub | `forget()` not yet implemented, returns HTTP 501 |
| `/api/history` | GET | ✅ Working | List all uploaded documents |

## How to Run Locally

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Requires a `.env` file with `GROQ_API_KEY` set.

## Memory Lifecycle

LegacyDNA implements Cognee's core memory lifecycle:

- **`remember()`** — ✅ Fully working. Ingests documents into the memory graph.
- **`recall()`** — ✅ Working. Retrieval accuracy ~77-90% on a 30-question gold-standard test set (see `docs/test_report.md`); some retrieval ranking inconsistency under active investigation.
- **`improve()` / memify** — ✅ Fully working. Powers both `/insights` and `/recommendations`.
- **`forget()`** — ⚠️ Not yet implemented. Endpoint exists and returns a clear "not implemented" response rather than failing silently.

## Known Limitations

Being upfront about what's not finished:

- **`/api/compare`** currently returns hardcoded mock data, not real Cognee-backed comparison.
- **`forget()`** is not implemented — no memory deletion lifecycle yet.
- **Structured SQLite tables** (`events`, `sponsors`, `insights`, `recommendations`) exist in the schema but aren't populated — all intelligence currently comes directly from Cognee's memory graph, not from SQLite. The `documents` table (upload tracking) works correctly.
- **Retrieval consistency:** some queries return different results across identical repeat runs, most likely due to duplicate document ingestion during testing affecting result ranking. Actively being investigated.
- Some evidence/source labels surface raw internal chunk descriptions rather than clean document names — cosmetic, doesn't affect answer accuracy.

## Testing

30 gold-standard questions across 5 categories (sponsors, attendance, logistics, lessons learned, recommendations) — see `docs/question_bank.md` and `docs/test_report.md` for full results and methodology.

## Team

- **Memory Engineer** — Cognee integration, memory lifecycle, retrieval quality
- **Backend Engineer** — FastAPI services, SQLite, API contracts
- **Frontend Engineer** — Next.js UI, evidence display, visualization
- **Product & Data Engineer** — dataset design, gold-question testing, demo & documentation

## Demo Flow

See `demo_script.md` for the full judge-facing walkthrough, and `docs/insight_scenarios.md` for expected answers to key demo questions.