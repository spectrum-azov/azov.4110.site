# Implementation Plan: Production Readiness — Responsive Design & Form Validation

**Branch**: `001-production-readiness` | **Date**: 2026-02-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-production-readiness/spec.md`

## Summary

Make the 12th Special Forces Brigade recruitment site production-ready by:
1. Implementing responsive CSS breakpoints (320px – 2560px) across header, hero, vacancies grid, application form, and footer
2. Adding client-side form validation with inline Ukrainian error messages for required fields (last name, first name, phone) and Ukrainian phone format (+380XXXXXXXXX)
3. Implementing interactive consent checkbox (currently hardcoded as checked)
4. Adding a mobile navigation overlay menu
5. Updating HTML metadata (title, description, OG tags, `lang="uk"`)

Technology approach: All changes are CSS + React state logic within the existing single-file `App.tsx`. No new backend, no new dependencies. Tailwind CSS v4 responsive utilities (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) handle breakpoints. Form validation is pure React state with regex for phone numbers.

## Technical Context

**Language/Version**: TypeScript ~5.8.2, React 19, Node LTS  
**Primary Dependencies**: Vite 6.2, Tailwind CSS v4.1 (`@tailwindcss/vite`), Motion (framer-motion successor), Lucide React (icons), PapaParse (CSV parsing)  
**Storage**: Google Sheets (read via public CSV export, write via Google Apps Script — no change needed)  
**Testing**: Manual browser testing + device emulation at breakpoints (375px, 768px, 1024px, 1440px). No test framework currently configured.  
**Target Platform**: Static SPA on GitHub Pages (`https://spectrum-azov.github.io/azov.4110.site/`)  
**Project Type**: web (single SPA, no backend in production — `server.ts` is dev-only)  
**Performance Goals**: Page load < 3s on 3G; form validation feedback < 500ms  
**Constraints**: Static hosting only (GitHub Pages); no server-side validation; `no-cors` POST to Apps Script  
**Scale/Scope**: Single page, ~490 LOC in App.tsx, 3 sections (hero, vacancies, form + footer)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution is not yet customised (template placeholders only). No specific gates or constraints are defined. **PASS** — no violations possible against an unconfigured constitution.

**Post-Phase 1 re-check**: PASS — no constitution constraints to violate.

## Project Structure

### Documentation (this feature)

```text
specs/001-production-readiness/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A — no new API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── App.tsx              # Main application component (all UI + logic)
├── main.tsx             # React entry point
├── index.css            # Tailwind theme + custom utilities
└── vite-env.d.ts        # Vite type declarations

index.html               # HTML shell (metadata, lang, OG tags)
vite.config.ts            # Vite + Tailwind + React config
package.json              # Dependencies & scripts
server.ts                 # Dev-only Express server (NOT deployed)
.github/workflows/
└── deploy.yml            # GitHub Pages deployment
```

**Structure Decision**: Single SPA project. All source remains in `src/`. No new directories needed. The `App.tsx` monolith will be refactored into smaller component files under `src/components/` to improve maintainability:

```text
src/
├── components/
│   ├── Header.tsx           # Header + mobile menu overlay
│   ├── HeroSection.tsx      # Hero section
│   ├── VacanciesSection.tsx  # Tabs + vacancy card grid
│   ├── ApplicationForm.tsx  # Form with validation logic
│   └── Footer.tsx           # Footer
├── hooks/
│   └── useFormValidation.ts # Form validation hook
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── App.tsx                  # Composition root
├── main.tsx
├── index.css
└── vite-env.d.ts
```

## Complexity Tracking

> No constitution violations to justify — section intentionally left empty.
