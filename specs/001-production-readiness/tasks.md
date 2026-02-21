---
description: "Task list for feature implementation"
---

# Tasks: Production Readiness — Responsive Design & Form Validation

**Input**: Design documents from `/specs/001-production-readiness/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create directory structure for components, hooks, and types in src/
- [X] T002 Implement data models and interfaces in src/types/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Extract header and footer components into src/components/Header.tsx and src/components/Footer.tsx
- [X] T004 [P] Extract hero section into src/components/HeroSection.tsx
- [X] T005 [P] Extract vacancies section into src/components/VacanciesSection.tsx
- [X] T006 [P] Extract application form into src/components/ApplicationForm.tsx
- [X] T007 Update composition and imports in src/App.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Responsive Layout Across Devices (Priority: P1) 🎯 MVP

**Goal**: Ensure the site renders cleanly on viewports from 320px to 2560px with appropriate scaling and stacking.

**Independent Test**: Load the site and use browser DevTools to test widths 375px, 768px, 1024px, 1440px ensuring no horizontal scrolling or overlapping elements occur.

### Implementation for User Story 1

- [X] T008 [P] [US1] Apply responsive typography and grid breakpoints (sm:, md:, lg:, xl:) in src/components/HeroSection.tsx
- [X] T009 [P] [US1] Apply responsive columns to Vacancy cards and implement the empty state indicator in src/components/VacanciesSection.tsx
- [X] T010 [P] [US1] Update form fields to use flexible grid stacking for touch-friendly layout in src/components/ApplicationForm.tsx
- [X] T011 [P] [US1] Ensure all interactive elements have 44x44px minimum touch targets in src/components/Header.tsx and src/components/Footer.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Application Form Data Validation (Priority: P1)

**Goal**: Ensure all required fields (Last Name, First Name, Phone) are validated before submission with proper Ukrainian inline errors.

**Independent Test**: Try submitting the form empty, try inputting wrong phone numbers, try unchecking the consent box, and verify the correct error messages appear in Ukrainian.

### Implementation for User Story 2

- [X] T012 [P] [US2] Implement custom form validation logic and phone regex (^\(\+?38\)?0\d{9}$) inside src/hooks/useFormValidation.ts
- [X] T013 [US2] Update Consent checkbox to use controlled React state instead of static UI in src/components/ApplicationForm.tsx
- [X] T014 [US2] Integrate useFormValidation hook to block submission and show inline errors in src/components/ApplicationForm.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Mobile Navigation Menu (Priority: P2)

**Goal**: Implement an intuitive, full-screen mobile menu overlay for sub-768px screens.

**Independent Test**: Tap the hamburger menu icon on a mobile view, verify that the overlay works, links navigate properly, and scroll locked.

### Implementation for User Story 3

- [X] T015 [US3] Implement full-screen overlay component structure via framer-motion in src/components/Header.tsx
- [X] T016 [US3] Add navigation link logic (anchor scrolling + close menu toggle) within src/components/Header.tsx

**Checkpoint**: All interactive user stories should now be functional

---

## Phase 6: User Story 4 - Production-Ready Page Metadata (Priority: P2)

**Goal**: Include SEO tags, proper title, and language attributes in HTML metadata.

**Independent Test**: Check page source to verify title, description, and Open Graph meta properties.

### Implementation for User Story 4

- [X] T017 [P] [US4] Update index.html with language="uk" and descriptive page title
- [X] T018 [P] [US4] Add Open Graph meta tags (og:title, og:image, etc.) to index.html

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T019 [P] Code cleanup and removing unused variables across all files in src/components/
- [ ] T020 Run build (npm run build) to ensure successful deployment output without TypeScript errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 & US2 can proceed in parallel once Phase 2 is done.
  - US3 (Mobile Nav) extends Header, which is part of Phase 2.
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 - No dependencies
- **User Story 2 (P1)**: Can start after Phase 2 - No dependencies
- **User Story 3 (P2)**: Integrates into Header but testable independently
- **User Story 4 (P2)**: No dependencies, touches strictly index.html

### Parallel Opportunities

- All component extractions (T003-T006) can happen in parallel.
- Responsive styling updates in US1 can happen in parallel across components (T008-T011).
- T017 and T018 (US4) can be done anytime.

---

## Parallel Example: User Story 1

```bash
# Stylizing components concurrently:
Task: "T008 [P] [US1] Apply responsive typography and grid breakpoints... in src/components/HeroSection.tsx"
Task: "T009 [P] [US1] Apply responsive columns... in src/components/VacanciesSection.tsx"
Task: "T010 [P] [US1] Update form fields... in src/components/ApplicationForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Test US1 independently across devices
4. Demo mobile-readiness

### Incremental Delivery

1. Setup + Foundational -> Foundation ready
2. US1 -> Responsive layout -> Demo
3. US2 -> Form validation -> Demo
4. US3 -> Mobile Menu -> Demo
5. US4 -> Metadata updates
