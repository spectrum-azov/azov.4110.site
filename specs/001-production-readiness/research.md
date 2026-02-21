# Research: Production Readiness — Responsive Design & Form Validation

**Feature**: 001-production-readiness  
**Date**: 2026-02-21  
**Status**: Complete

---

## R1: Responsive Breakpoint Strategy with Tailwind CSS v4

**Decision**: Use Tailwind CSS v4's built-in responsive prefixes with the project's existing `@theme` configuration.

**Rationale**: Tailwind v4 provides mobile-first responsive utilities out of the box. The project already uses `@tailwindcss/vite` v4.1 plugin. No additional configuration needed — default breakpoints (`sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`) align with the spec's tested viewports (375, 768, 1024, 1440).

**Alternatives considered**:
- Custom CSS media queries: Rejected — would duplicate Tailwind's system and increase maintenance overhead.
- CSS Container Queries: Rejected — overkill for a single-page layout; browser support is good but adds unnecessary complexity.

**Key findings**:
- Tailwind v4 uses `@theme` block for design tokens (already configured in `index.css`)
- Responsive prefixes work as `sm:`, `md:`, `lg:`, `xl:`, `2xl:` — mobile-first approach
- The current codebase already uses `md:` and `lg:` prefixes partially (hero grid, form grid, footer grid)
- Missing: `sm:` breakpoints for small tablets, vacancy grid intermediate step, header mobile adaptation
- The hero text uses `text-6xl md:text-8xl` — needs `text-4xl sm:text-5xl md:text-6xl lg:text-8xl` for smoother scaling

---

## R2: Ukrainian Phone Number Validation Pattern

**Decision**: Use a regex pattern that accepts:
- International format: `+380XXXXXXXXX` (12 digits total with +)
- Local format: `0XXXXXXXXX` (10 digits)
- Formatted variants: `+38 (0XX) XXX-XX-XX`, `0XX-XXX-XX-XX`, `(0XX) XXX XX XX`

**Rationale**: Ukrainian mobile numbers use the +380 country code followed by a 2-digit operator code and 7-digit subscriber number. Users type phone numbers in varied formats — stripping non-digits and validating the core pattern is the most robust approach.

**Regex**: 
```
Normalisation: strip all non-digit characters except leading +
Validation: /^(\+?38)?0\d{9}$/
```

This matches:
- `+380501234567` → strip → `+380501234567` → matches `+380XXXXXXXXX`
- `0501234567` → strip → `0501234567` → matches `0XXXXXXXXX`
- `+38 (050) 123-45-67` → strip → `+380501234567` → matches

**Alternatives considered**:
- Strict +380 only: Rejected — users commonly type without the country code
- `libphonenumber`: Rejected — heavy dependency (200KB+) for a single-country validation
- HTML `pattern` attribute: Rejected — doesn't provide the inline Ukrainian error messages required by spec

---

## R3: Form Validation Approach (Client-side)

**Decision**: Custom React hook (`useFormValidation`) with per-field validation state, triggered on blur + submit.

**Rationale**: The spec requires:
- Inline errors next to each field (FR-004)
- Real-time validation — errors clear on correction (FR-010)
- Validation on submit blocks submission (FR-002)
- Consent checkbox must be interactive (FR-005)

A custom hook gives full control over error messages in Ukrainian and validation timing without adding a library dependency.

**Implementation approach**:
```typescript
interface ValidationErrors {
  lastName?: string;
  firstName?: string;
  phone?: string;
  consent?: string;
}

// Validate on blur (field loses focus) and on submit
// Clear individual error when user corrects the field (onChange)
// Block submission if any errors exist
```

**Alternatives considered**:
- React Hook Form + Zod: Rejected — adds two dependencies (~30KB) for a simple 5-field form; overengineered
- Formik: Rejected — even heavier; designed for complex multi-step forms
- HTML5 native validation: Rejected — cannot customise error messages to Ukrainian; inconsistent cross-browser UX

---

## R4: Mobile Navigation Overlay Design

**Decision**: Full-screen overlay menu triggered by hamburger icon, with smooth slide-in animation using Motion library.

**Rationale**: The site already imports `motion` from `motion/react` and uses it for animations. A full-screen overlay maximises touch targets and provides a premium feel matching the site's dark aesthetic.

**Implementation approach**:
- Toggle `isMenuOpen` state (already exists in code)
- Render a `motion.div` overlay with `AnimatePresence` for enter/exit transitions
- Include navigation links: Вакансії, Подати заявку, section anchors
- Close on link tap (scroll to section + close), close button (X icon), or backdrop click
- Prevent body scroll when menu is open

**Alternatives considered**:
- Slide-out drawer from right: Considered viable but full-screen overlay is simpler and more in-line with the military aesthetic
- Bottom sheet: Rejected — unconventional for navigation on a recruitment site

---

## R5: SEO Metadata & Open Graph Tags

**Decision**: Update `index.html` with proper Ukrainian metadata.

**Rationale**: Current `index.html` has `lang="en"` and title "My Google AI Studio App" — both incorrect for production. Open Graph tags needed for social sharing.

**Implementation**:
```html
<html lang="uk">
<head>
  <title>Вакансії | 12-та бригада спеціального призначення НГУ</title>
  <meta name="description" content="Відкриті вакансії 12-ої бригади спеціального призначення Національної Гвардії України. Бойові та тилові посади. Подати заявку онлайн.">
  <meta property="og:title" content="Вакансії | 12-та бригада спеціального призначення НГУ">
  <meta property="og:description" content="Відкриті вакансії 12-ої бригади спеціального призначення Національної Гвардії України.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://azov.army/wp-content/uploads/2025/04/korpus-azov-696kh696.png">
  <meta property="og:url" content="https://spectrum-azov.github.io/azov.4110.site/">
</head>
```

---

## R6: Consent Checkbox Interactive Toggle

**Decision**: Replace the static "always-checked" checkbox with a controlled React state toggle.

**Rationale**: Current code (lines 385-392 of `App.tsx`) renders a static orange box with a check icon — it's purely visual and not interactive. The spec requires the checkbox to be unchecked by default and actively toggled by the user (FR-005).

**Implementation**:
- Add `consentChecked: boolean` to form state (default: `false`)
- Toggle on click of the checkbox area
- Validate on submit: if not checked, show inline error "Необхідно погодитись з умовами"
- Visual: unchecked = empty border box, checked = filled orange box with check icon

---

## R7: Empty State for Vacancies

**Decision**: Display a Ukrainian-language message when no vacancies exist for the selected tab.

**Rationale**: Spec edge case requires an empty state instead of blank area (FR-011). Current code renders an empty grid with no indication.

**Implementation**: Conditional rendering when `filteredVacancies.length === 0`:
```tsx
<div className="text-center py-16 text-gray-400">
  <p className="text-xl">Наразі немає відкритих вакансій у цій категорії</p>
  <p className="mt-2 text-sm">Перевірте іншу категорію або поверніться пізніше</p>
</div>
```

---

## R8: Touch Target Sizing (44×44px minimum)

**Decision**: Ensure all interactive elements meet the 44×44px WCAG minimum via Tailwind padding/sizing utilities.

**Rationale**: Required by FR-008 for mobile usability. Current buttons mostly meet this via `py-3`, `py-4`, `py-6` padding. Key areas to audit:
- Radio buttons (custom 24px circles — need 44px tap area via padding on label)
- Consent checkbox (20×20px — need 44px tap area)
- Social media footer icons (40×40px — increase to 44px)
- Mobile hamburger menu button (no explicit sizing)

**Implementation**: Add `min-h-[44px] min-w-[44px]` to interactive elements, or increase padding on wrapping labels/buttons.
