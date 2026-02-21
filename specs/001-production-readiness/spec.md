# Feature Specification: Production Readiness — Responsive Design & Form Validation

**Feature Branch**: `001-production-readiness`  
**Created**: 2026-02-21  
**Status**: Draft  
**Input**: User description: "Update the site for production use. Ensure it works for diff screen sizes, application form validates data"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Responsive Layout Across Devices (Priority: P1)

A visitor opens the recruitment site on their mobile phone (320px–480px width). The page renders cleanly: the header collapses to a compact mobile layout with an accessible menu toggle, the hero section stacks vertically with readable text sizes, vacancy cards display in a single column, the application form fields stack vertically with touch-friendly tap targets, and the footer reorganises into a stacked layout. No horizontal scrolling occurs, and all interactive elements are easily tappable.

**Why this priority**: The majority of potential recruits in Ukraine will access the site via a smartphone. If the site is broken or hard to use on mobile, the organisation loses applicants.

**Independent Test**: Can be fully tested by resizing a browser window or using device emulation at common breakpoints (375px, 768px, 1024px, 1440px) and verifying that every section is fully visible, readable, and interactive.

**Acceptance Scenarios**:

1. **Given** a visitor on a 375px-wide mobile screen, **When** the page loads, **Then** all content is visible without horizontal scrolling, text is legible, and buttons are at least 44px tall for touch targets.
2. **Given** a visitor on a 768px-wide tablet screen, **When** the page loads, **Then** the layout adapts to a two-column grid where appropriate (hero, form fields), and the header provides full navigation.
3. **Given** a visitor on a 1440px-wide desktop screen, **When** the page loads, **Then** the layout uses the full-width grid (up to 4-column vacancy cards), and all sections are proportionally spaced.
4. **Given** a visitor on any screen size, **When** the visitor scrolls through the page, **Then** the fixed header remains visible, does not overlap content, and the menu is accessible.

---

### User Story 2 - Application Form Data Validation (Priority: P1)

A potential recruit fills out the consultation/application form. The system validates all required fields before submission: last name, first name, and phone number must be filled in. The phone number must follow a valid Ukrainian format (+380XXXXXXXXX or similar). Validation errors are shown inline next to each field with clear messages in Ukrainian. The form cannot be submitted until all required fields pass validation. The privacy/age consent checkbox must be actively checked before submission.

**Why this priority**: Invalid or incomplete submissions waste recruiter time and result in lost leads. Proper validation ensures data quality and improves the user's experience by providing immediate feedback.

**Independent Test**: Can be fully tested by attempting to submit the form with various combinations of empty, invalid, and valid field values and verifying error messages appear/disappear correctly.

**Acceptance Scenarios**:

1. **Given** an empty form, **When** the visitor clicks "Подати заявку", **Then** validation error messages appear next to each required field (last name, first name, phone) and the form is not submitted.
2. **Given** a form with an invalid phone number (e.g., "12345" or "abc"), **When** the visitor clicks submit, **Then** a specific error message indicates the phone format is incorrect (e.g., "Введіть номер у форматі +380XXXXXXXXX").
3. **Given** a form with all required fields filled correctly, **When** the visitor clicks submit, **Then** the form submits successfully and a success message is displayed.
4. **Given** a form where the privacy/age consent checkbox is not checked, **When** the visitor clicks submit, **Then** a validation error indicates the consent is required.
5. **Given** a partially filled form with errors, **When** the visitor corrects a field, **Then** the error message for that specific field disappears immediately (real-time validation).

---

### User Story 3 - Mobile Navigation Menu (Priority: P2)

A visitor on mobile taps the hamburger menu icon. A mobile navigation overlay or slide-out menu appears with options to navigate to sections of the page (Vacancies, Application Form) and the "Подати заявку" call-to-action button. Tapping outside the menu or pressing a close button dismisses it.

**Why this priority**: Navigation on mobile is essential for usability, but the page is a single-page layout where scrolling is the primary navigation method. This enhances rather than enables the experience.

**Independent Test**: Can be tested on a mobile viewport by tapping the hamburger menu, verifying all navigation items are visible and functional, and confirming the menu can be closed.

**Acceptance Scenarios**:

1. **Given** a visitor on a mobile (< 768px) viewport, **When** they tap the hamburger menu icon, **Then** a full-screen or slide-out navigation overlay appears with links to page sections.
2. **Given** the mobile menu is open, **When** the visitor taps a navigation link (e.g., "Вакансії"), **Then** the page scrolls to that section and the menu closes.
3. **Given** the mobile menu is open, **When** the visitor taps outside the menu or a close button, **Then** the menu closes smoothly.

---

### User Story 4 - Production-Ready Page Metadata (Priority: P2)

The site includes proper HTML metadata for production deployment: a descriptive page title in Ukrainian, meta description for search engines, Open Graph tags for social media sharing, proper favicon, and correct language attribute. The page title currently reads "My Google AI Studio App" which must be updated.

**Why this priority**: Professional metadata is required for credible production deployment and discoverability, but does not affect core functionality.

**Independent Test**: Can be tested by inspecting page source for correct meta tags and validating with social media debugger tools.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site, **When** the page loads, **Then** the browser tab shows a descriptive Ukrainian title (e.g., "Вакансії | 12-та бригада спеціального призначення НГУ").
2. **Given** a link to the site is shared on social media, **When** the platform fetches the page preview, **Then** it displays the correct title, description, and an appropriate image.

---

### Edge Cases

- What happens when the Google Sheet with vacancies is unreachable? The page should display gracefully without vacancy cards (empty state or error message) rather than breaking the layout.
- What happens when a visitor submits the form while offline? An appropriate error message should be displayed.
- What happens when extremely long text is entered into form fields? Fields should handle overflow gracefully without breaking the layout.
- What happens on very small screens (< 320px)? Content should remain readable with no overlapping elements.
- What happens when the vacancy list is empty for a selected tab (combat/rear)? An empty state message should be displayed instead of a blank area.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST render correctly on viewports from 320px to 2560px wide without horizontal scrolling.
- **FR-002**: The application form MUST validate that last name (Прізвище), first name (Ім'я), and phone number fields are non-empty before allowing submission.
- **FR-003**: The phone number field MUST validate against a Ukrainian phone number format (starting with +380 followed by 9 digits, or local formats like 0XX-XXX-XX-XX).
- **FR-004**: Validation error messages MUST appear inline next to each invalid field in Ukrainian.
- **FR-005**: The privacy/age consent checkbox MUST be actively toggled by the user (not pre-checked) and must be checked before the form can be submitted.
- **FR-006**: The header navigation MUST collapse into a functional mobile menu on screens narrower than 768px.
- **FR-007**: The vacancy card grid MUST adapt from 1 column (mobile) to 2 columns (tablet) to 4 columns (desktop).
- **FR-008**: All interactive elements (buttons, form inputs, links) MUST have a minimum tap target of 44×44 pixels on touch devices.
- **FR-009**: The page MUST include proper SEO metadata: descriptive title, meta description, Open Graph tags, and `lang="uk"` attribute.
- **FR-010**: The form MUST provide real-time validation feedback — errors should clear when the user corrects a field.
- **FR-011**: The site MUST display an appropriate empty state when no vacancies are available for the selected category.
- **FR-012**: The form MUST display a phone number input mask or placeholder indicating the expected format.

### Key Entities

- **Vacancy**: A position available for recruitment. Has a title, category (combat or rear), and a unique identifier. Sourced from a Google Sheet.
- **Application Submission**: User-submitted data including last name, first name, middle name (optional), phone number, Telegram handle (optional), and military status. Submitted to Google Apps Script.
- **Consent**: Explicit user agreement to the privacy policy and age confirmation (18–58 years).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The site renders without horizontal scrolling on all standard viewport widths (320px, 375px, 414px, 768px, 1024px, 1280px, 1440px, 1920px).
- **SC-002**: 100% of form submissions with missing required fields are blocked with inline validation errors before network request is made.
- **SC-003**: 100% of invalid phone number formats are rejected with a clear format hint.
- **SC-004**: Users can complete the application form on mobile in under 3 minutes.
- **SC-005**: All page sections (header, hero, vacancies, form, footer) are fully visible and properly laid out on every tested viewport.
- **SC-006**: The page title and meta description accurately describe the site's purpose in Ukrainian.
- **SC-007**: Form validation error messages appear within 500ms of the user's action (blur or submit).

## Assumptions

- The site will continue to be deployed on GitHub Pages as a static single-page application.
- The Google Sheet CSV export and Google Apps Script endpoints for form submission remain unchanged.
- The existing Tailwind CSS v4 + Vite + React tech stack is retained.
- The site's primary audience is Ukrainian-speaking; all user-facing text remains in Ukrainian.
- The existing colour scheme (corps-orange `#FF9F1C`, dark background `#050505`) is retained.
- Phone validation targets Ukrainian numbers only (international formats are out of scope).
- The consent checkbox is currently always pre-checked visually; it needs to become an interactive toggle.
