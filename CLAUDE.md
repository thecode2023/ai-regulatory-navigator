# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Regulatory Navigator — helps companies identify which AI regulations apply to them based on where they operate, their industry, and how they use AI. Two apps in this repo:

1. **`navigator-app/`** — The main Next.js 15 app (App Router). Multi-step intake form → personalized risk scoring → compliance checklist → PDF export. This is the active development target.
2. **`manus-tracker/`** — Reference dashboard built by Manus (autonomous AI research agent). Contains the original regulatory data research. Read-only reference.

## Commands

### navigator-app (primary)

```bash
cd navigator-app
npm install
npm run dev            # Next.js dev server (port 3000)
npm run build          # production build (standalone output for Vercel)
npm run lint           # ESLint
```

### manus-tracker (reference only)

```bash
cd manus-tracker
pnpm install
pnpm dev              # Vite dev server on port 3000
pnpm build            # build client (Vite) + bundle server (esbuild)
pnpm check            # TypeScript type checking
```

## Architecture

### navigator-app (Next.js 15, App Router)

- **`src/app/page.tsx`** — Single-page app with state-driven view switching (intake form vs results)
- **`src/lib/regulations.ts`** — All 15 jurisdictions' regulatory data (copied from manus-tracker, canonical source)
- **`src/lib/types.ts`** — Core types: `Regulation`, `IntakeFormData`, `RiskAssessment`, `ChecklistItem`
- **`src/lib/scoring.ts`** — Risk scoring engine: combines regulation status, penalty severity, AI use cases, industry multipliers, and autonomous agent flags into a 1-100 score per jurisdiction
- **`src/components/intake/`** — 4-step form: JurisdictionStep → IndustryStep → AiUsageStep → ReviewStep
- **`src/components/results/`** — Results view: RiskOverview (score rings), RegulationCard (expandable details), ComplianceChecklist (interactive checkboxes), ExportButton (print-to-PDF)
- **Styling**: Tailwind CSS v4 with custom theme (navy/electric color palette), framer-motion animations, lucide-react icons
- **Path alias**: `@/*` → `src/*`

### manus-tracker (Vite + React 19, reference)

- **`client/`** — React 19 SPA (Vite, TypeScript, Tailwind CSS v4, wouter for routing)
  - `src/pages/Home.tsx` — Main dashboard page (single-page app, all state lives here)
  - `src/lib/regulationsData.ts` — All regulatory data as a static TypeScript array (no database)
  - `src/components/` — Dashboard components (Header, HeroBanner, StatsBar, ChartsSection, RegulationsTable, JurisdictionModal, ExecutiveSummary, Map, Footer)
  - `src/components/ui/` — shadcn/ui components (new-york style, Radix primitives)
  - `src/contexts/ThemeContext.tsx` — Dark/light theme support (defaults to dark)
- **`server/`** — Minimal Express server that serves the built SPA with client-side routing fallback
- **`shared/`** — Shared constants between client and server

**Key path aliases** (configured in `vite.config.ts`):
- `@` → `client/src`
- `@shared` → `shared`
- `@assets` → `attached_assets`

**UI stack**: shadcn/ui (new-york style) + Radix primitives + Tailwind CSS v4 + recharts for charts + framer-motion for animations + lucide-react for icons.

**Data model**: The `Regulation` interface in `regulationsData.ts` defines jurisdiction, status, risk classification, penalties, autonomous agent coverage, cross-border applicability, and sources. All data is hardcoded — there is no API or database.

## Manus-specific files

`vite.config.ts` contains Manus debug collector plugins (log collection, runtime). These are development-only and can be ignored for feature work.
