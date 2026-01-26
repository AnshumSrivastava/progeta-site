# Contact Page

**Route**: `/contact`

## Purpose
Provides a way for users to get in touch for partnerships, support, or careers. It uses a custom form that submits data to a Google Apps Script endpoint.

## Key Features
- **Interactive Form**: Svelte-controlled inputs with validation.
- **Google Sheets Integration**: Submits data via `fetch` to a Google Apps Script Web App URL.
- **Animations**: Uses `fly` and `fade` transitions for a polished feel.
- **Theme**: "Glassmorphism" card design on a dark background with animated glow orbs.

## Configuration
- `GOOGLE_SCRIPT_URL`: The endpoint variable in `<script>` must be updated if the backend script is redeployed.
