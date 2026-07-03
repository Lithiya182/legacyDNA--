# LegacyDNA - Final Judge Demo Script

**Speaker:** "Event teams lose millions in institutional knowledge every time a project manager graduates or leaves. LegacyDNA prevents organizational amnesia."

### Step 1: Upload (The Messy Data)
**Action:** Show the UI. Upload the TechFest reports and Sponsor notes.
**Speaker:** "Here we have standard, messy files from three years of TechFest. Meeting notes, sponsor contracts, and post-mortems."

### Step 2: Remember() (Ingestion)
**Action:** Click 'Process Documents'.
**Speaker:** "We aren't just saving files to a database. Our backend is using Cognee to parse these documents, extract the entities, and map the relationships into a vector memory graph."

### Step 3: Recall() (The Gold Question)
**Action:** Type into the Query box: *"What logistical mistakes repeated across multiple events?"*
**Speaker:** "Let's ask a question that would normally take a human hours of reading old emails to answer."
*(AI answers about Campus Bites failing in 23/24).*

### Step 4: Insights (Pattern Recognition)
**Action:** Navigate to the 'Insights Dashboard'.
**Speaker:** "Because Cognee structures the data, we don't even have to ask a question. The Insights API automatically detects patterns, like our 'Early marketing -> higher attendance' correlation."

### Step 5: Recommendations (Strategy)
**Action:** Highlight the Recommendations panel.
**Speaker:** "And it turns those insights into strategy, automatically recommending we book venues 60 days in advance based on the 2025 success."

### Step 6: Future Team Advice (The Closer)
**Action:** Type: *"Summarize the top 3 pieces of advice for the TechFest 2026 organizing team."*
**Speaker:** "With LegacyDNA, next year's team doesn't start from scratch. They start with the combined experience of every team that came before them."

---

**Note:** `forget()` (memory deletion / GDPR-style compliance) is implemented in the backend but not yet demo-tested end-to-end through the UI. Only include it live if it's been verified working beforehand — otherwise mention it conceptually without a live action.