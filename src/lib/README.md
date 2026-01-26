# Library Directory (`src/lib`)

This directory contains the core logic, shared components, and content "database" for the application.

## Directory Structure

### `content/`
Acts as the text-based database for the site. Contains TypeScript files exporting arrays of objects used to populate pages.
- `articles.ts`: Blog posts/articles.
- `events.ts`: Community event listings.
- `games.ts`: Metadata for the Games Library.
- `jobs.ts`: Career tracks and job descriptions.
- `modules.ts`: Learning modules (Technical/Soft Skills).
- `workshops.ts`: Simulation workshop data.

### `ui/`
User Interface elements.
- `components/`: Reusable Svelte components (e.g., `Navbar`, `Footer`, `Card`, `MagneticButton`).
- `actions.ts`: Svelte Actions (e.g., `reveal`) for animations and behaviors.
- `theme/`: Global theme configurations (if applicable).

### `games/`
Logic and components specific to the browser-based games/simulations.

### `core/`
Core utilities and helper functions.
