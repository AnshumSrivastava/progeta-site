# Games Library

**Route**: `/games`

## Purpose
An interactive, "app-like" interface for browsing and playing educational browser games/simulations. It mimics a platform like Steam or Discord.

## Data Source
- `src/lib/content/games.ts`: Contains the game metadata (title, description, cover image, category, etc.).

## Key Features
- **Sidebar Layout**: Fixed sidebar with categories (Ongoing Streaks, Cyber Ops, Soft Skills) and search.
- **Hero Section**: Displays the most recently played or featured game.
- **Interactive Grid**: Grid of game cards with hover effects and "Play" buttons.
- **State Management**: Filters games based on "last played" status or category.
- **Styling**: Uses strict `100vh` layout with `overflow-y: hidden` on the body for a desktop-app feel.
