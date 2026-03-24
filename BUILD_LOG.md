# Build Log — AI Regulatory Navigator
## Built with Claude Code | Project G

This document captures the full build process — every Claude Code prompt, decision, and iteration.

---

### Setup Phase — March 24, 2026

**Environment:**
- macOS, Node.js v24.14.0
- Claude Code v2.1.81 (Opus 4.6, 1M context)
- Cursor IDE
- Manus (regulatory research)
- Vercel (deployment)

---

### Phase 1: Manus Autonomous Research

**Prompt sent to Manus:** Research AI regulations across 15 jurisdictions with 8 structured data points per jurisdiction.

**What Manus delivered:** Full structured dataset for 15 jurisdictions AND a complete React/TypeScript dashboard application. Exceeded expectations — we asked for research, it delivered a deployable product.

**Validation:** Identified 7 errors/gaps in Manus output (see MANUS_RESEARCH_LOG.md). Key issues: California SB 942 date context missing, EU fine structure misleading, Canada status mislabeled, missing OpenClaw/NemoClaw regulatory implications, missing Trump EO preemption risk.

**Deployed as Artifact 1:** https://ai-regulatory-navigator-8nrk.vercel.app

---

### Phase 2: Claude Code Build — Navigator App

**First prompt to Claude Code:**
"I'm building an AI Regulatory Navigator — a web app where companies input where they operate, what industry they're in, and how they use AI, then get a personalized map of which regulations apply to them with risk scores and a compliance checklist."

**What Claude Code built in 8 minutes 18 seconds:**
- Next.js 15 app with App Router, TypeScript, Tailwind CSS v4
- 4-step animated intake form (jurisdictions, industry, AI usage, review)
- Risk scoring engine with base scores, penalty severity, AI use case contributions, industry multipliers, autonomous agent bonuses, and cross-border applicability
- Results page with risk profile banner, score rings per jurisdiction, expandable regulation cards, interactive compliance checklist, and PDF export
- Hero landing page with "Start Assessment" CTA
- Footer with data verification date and methodology link
- "Built with Claude Code · Data researched by Manus" credit

**Key decisions:**
- Used Next.js over Streamlit for professional polish and Vercel-native deployment
- Dark mode UI to match the Manus tracker aesthetic and signal technical sophistication
- Risk scoring weighted toward enforcement status and autonomous agent coverage
- Regulatory data imported from Manus research output, keeping single source of truth

**Deployed as Artifact 2:** https://ai-regulatory-navigator.vercel.app

---

### The Portfolio Story

Two artifacts. One project. Two different AI tools.

- **Artifact 1** demonstrates orchestrating an autonomous AI agent (Manus) for complex research and critically evaluating its output — identifying 7 errors that needed correction
- **Artifact 2** demonstrates building and shipping production software with Claude Code, transforming raw research into an interactive tool people can actually use

The value isn't in either artifact alone — it's in the process: delegate, validate, enhance, ship.