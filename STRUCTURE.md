# Project Structure Map

This document provides a high-level overview of the Progeta Technologies website codebase.

## Root Directory
- `src/`: Source code.
- `static/`: Static assets (images, icons).

## `src/routes/` (Pages & Routing)
| Path | Component | Description |
|------|-----------|-------------|
| `/` | `+page.svelte` | Landing Page (Hero, Pillars, Tracks Grid). |
| `/about` | `about/+page.svelte` | Mission, Story, Team. |
| `/articles/[id]` | `articles/[id]/+page.svelte` | Dynamic article viewer. |
| `/community` | `community/+page.svelte` | Community intake and "Extraction Procedure". |
| `/contact` | `contact/+page.svelte` | Contact form with Google Sheets integration. |
| `/events` | `events/+page.svelte` | List of community events. |
| `/games` | `games/+page.svelte` | Interactive Game Library. |
| `/modules` | `modules/+page.svelte` | Searchable module catalog. |
| `/pricing` | `pricing/+page.svelte` | Pricing for individuals and institutions. |
| `/tracks` | `tracks/+page.svelte` | Career tracks and Pathfinder. |
| `/workshops` | `workshops/+page.svelte` | Live Fire simulation workshops. |

## `src/lib/` (Core Logic & Data)
| Directory | Contents | Description |
|-----------|----------|-------------|
| `content/` | `*.ts` | **Data Source**. Contains arrays of objects for events, games, jobs, modules, etc. |
| `ui/` | `components/`, `actions.ts` | **Design System**. Reusable components (Card, Navbar, MagneticButton) and animations. |
| `games/` | `*` | **Game Logic**. Specific logic for the browser games. |
| `core/` | `*` | **Utilities**. Helper functions. |

## Key Technical Details
- **Framework**: SvelteKit
- **Styling**: Standard CSS with CSS variables for theming (Dark Mode/Glassmorphism).
- **Animations**: Custom `reveal` action using IntersectionObserver, plus standard Svelte transitions (`fly`, `fade`).
- **Data**: Static data loaded from `src/lib/content` (no external database for content, easy to edit via JSON/TS objects).
- **Forms**: Submitted via `fetch` to Google Apps Script.
