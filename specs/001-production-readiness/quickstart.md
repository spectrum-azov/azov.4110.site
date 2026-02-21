# Quickstart: Production Readiness

**Feature**: 001-production-readiness  
**Date**: 2026-02-21  

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Ensure you have a `.env` file with the required variables:
   ```env
   VITE_GOOGLE_SHEET_ID=<your-sheet-id>
   VITE_APPS_SCRIPT_URL=<your-apps-script-url>
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Development Workflow

- Modify `src/App.tsx` or new structural components within `src/components/` (if extracted).
- Tailwind utilities are used for styling and breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- Run `npm run lint` before committing to ensure TypeScript types are correct.

## Testing Responsiveness & Validation

1. Open `http://localhost:5173/azov.4110.site/` in a browser.
2. Use browser developer tools (F12) to toggle device emulation.
3. Check viewports: 375px (Mobile), 768px (Tablet), 1024px, 1440px (Desktop).
4. Verify the application form validation triggers when submitting empty data, or invalid phone numbers.
