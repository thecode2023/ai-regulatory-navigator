# Manus Research Log — AI Regulatory Navigator

## Research Brief 1: 15-Jurisdiction Regulatory Scan
- **Sent to Manus:** March 24, 2026
- **Status:** Complete
- **Time to complete:** ~15 minutes

## What Manus Delivered
- Structured regulatory data for all 15 jurisdictions with bill numbers, dates, penalties, and sources
- A full React/TypeScript dashboard application (not just data — a deployable product)
- Executive summary with 5 key findings
- 3 design concepts with documented reasoning

## Deployed Output
- **Live URL:** https://ai-regulatory-navigator-8nrk.vercel.app

## My Validation Notes
- **What Manus Got Right:**
  - EU AI Act details (Regulation 2024/1689, dates, penalty structure) — verified accurate
  - Canada AIDA death on order paper Jan 2025 — confirmed
  - Singapore's agentic AI framework (Jan 22, 2026) correctly identified as world's first
  - Colorado SB 24-205 delay to June 30, 2026 — confirmed
  - Texas TRAIGA effective date and penalty ranges — accurate
  - Indonesia UU PDP extraterritorial application — confirmed
  - Cross-border applicability correctly flagged for 13 of 15 jurisdictions

- **What Manus Got Wrong or Missed:**

  1. **California SB 942 effective date is WRONG.** Manus listed "Aug 2, 2026" for SB 942. The original law was set for January 1, 2026, but AB 853 (signed October 2025) delayed it to August 2, 2026. Manus got the final date right but the reasoning path is incomplete — it doesn't mention the AB 853 amendment that caused the delay, which matters for compliance planning. The original SB 942 date of Jan 1, 2026 should be noted for context.

  2. **EU AI Act maxFineUSD is understated.** Manus set maxFineUSD to €38M ($38M). But the actual fine is €35M OR 7% of global turnover, whichever is HIGHER. For a company like Google or Meta, 7% of turnover would be billions, not $38M. The $38M figure is misleading — it only represents the fixed floor. The data model should flag that the real exposure for large companies is uncapped in practical terms.

  3. **Canada's status should be "Dead" not "Draft."** Manus labeled Canada's AIDA as "Draft" status. But the bill didn't stall in draft — it died on the order paper when Parliament was prorogued in January 2025. "Draft" implies it's still being worked on. A more accurate status would be "Dead/Expired" with a note that Canada currently has NO dedicated AI legislation. Manus correctly noted this in the details text but the status label is misleading.

  4. **Missing: OpenClaw/NemoClaw regulatory implications.** Given that this tool is specifically about AI agent governance, Manus didn't mention that OpenClaw and the NemoClaw enterprise framework (announced at GTC March 2026) have specific regulatory implications — particularly in the EU (GPAI provisions), Singapore (agentic AI framework), and the UK (DRCF agentic AI call for views). This is a gap we'll address in the Claude Code enhanced version.

  5. **Missing: The Trump Executive Order conflict.** Manus mentions the March 2026 White House framework but doesn't flag the December 2025 Executive Order directing the AG to challenge state AI laws deemed inconsistent with federal policy. This creates significant uncertainty about whether Colorado, Texas, and California laws will survive federal preemption challenges. This is critical context for any company doing compliance planning.

  6. **Illinois BIPA maxFineUSD is misleading.** Listed as $5,000 per violation. While technically correct per violation, BIPA cases have resulted in settlements in the hundreds of millions (Facebook/Meta settled for $650M, BNSF Railway for $228M) because violations are calculated per-person-per-scan. The "$5,000" figure dramatically understates real exposure.

  7. **Indonesia enforcement body doesn't exist yet.** Manus correctly notes the BPDP is "being established" but still lists it as the enforcement body. In practice, as of March 2026, Indonesia has no operational AI/data protection enforcement agency, which is a critical practical detail for companies evaluating compliance risk there.

- **Sources I Verified Independently:**
  - EU AI Act Article 99 penalties — confirmed via official EU AI Act text
  - California SB 942 effective date delayed to Aug 2, 2026 via AB 853 — confirmed via A&O Shearman, King & Spalding
  - Trump Executive Order on AI federal preemption — confirmed via King & Spalding analysis
  - Illinois BIPA settlement history — confirmed via public records

- **Data I Had to Correct:**
  - Canada status: "Draft" → should be "Dead/No active legislation"
  - EU maxFineUSD: $38M is misleading — real exposure is percentage-based and uncapped for large companies
  - Added missing context: Trump EO preemption risk for US state laws
  - Added missing context: OpenClaw/NemoClaw regulatory implications

## Key Takeaway
Manus produced research-grade output AND a deployable application autonomously. The regulatory data quality was high — bill numbers, dates, and penalty amounts checked out against independent sources. The main limitation: the data is a static snapshot that requires manual updates as regulations evolve. This is the gap the Claude Code-built enhanced version will address.



