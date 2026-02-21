# Data Model: Production Readiness

**Feature**: 001-production-readiness  
**Date**: 2026-02-21  

## Entities

### Vacancy
Represents an available position for recruitment, fetched from Google Sheets.
- `id` (string): Unique identifier.
- `title` (string): Name/title of the vacancy.
- `category` ('combat' | 'rear'): The category of the vacancy.

### Application Submission
Data submitted by a potential recruit via the application form.
- `lastName` (string): Required. Candidate's last name (Прізвище).
- `firstName` (string): Required. Candidate's first name (Ім'я).
- `middleName` (string): Optional. Candidate's middle name (По батькові).
- `phone` (string): Required. Phone number matching Ukrainian format (+380XXXXXXXXX or similar).
- `telegram` (string): Optional. Telegram handle.
- `isMilitary` ('yes' | 'no'): Military status. Currently defaults to 'no'.

### FormValidationState
Client-side state for tracking validation errors.
- `lastName` (string?): Error message for last name.
- `firstName` (string?): Error message for first name.
- `phone` (string?): Error message for phone.
- `consent` (string?): Error message for the consent checkbox.
- `overall` (string?): General submission error.

## Transitions

- **Form Submission**: `Application Submission` is collected and validated against `FormValidationState`. On success, sent via POST to Google Apps Script. 
- **Validation**: On blur of required fields or on form submit, `FormValidationState` is populated if constraints are violated. Empty fields revert to a cleared state on correction.
