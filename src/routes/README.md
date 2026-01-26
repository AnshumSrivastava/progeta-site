# Routing Structure

This directory contains the file-system based routing for the Progeta Technologies website, built with SvelteKit.

## Core Files
- `+layout.svelte`: The main application shell. It includes the `Navbar`, `Footer`, `PageLoader`, and handles global effects like the mouse-tracking spotlight.
- `+page.svelte`: The landing page of the application. Features the animated logo, hero section, unique value proposition ("Three Pillars"), and entry points to other sections.

## Route Directory
| Route | Description |
|-------|-------------|
| `/about` | Mission statement, story, core values, and team introduction. |
| `/articles` | Dynamic route `[id]` for displaying individual content pieces. |
| `/community` | Overview of the community, "Ease of Extraction" steps, and intake flow. |
| `/contact` | Contact form integrated with Google Sheets/Apps Script. |
| `/events` | Lists community events and meetups. |
| `/games` | Interactive "Game Library" interface for educational browser games. |
| `/modules` | Searchable catalog of technical and soft-skill learning modules. |
| `/pricing` | Pricing tiers for individuals and institutions. |
| `/tracks` | Career tracks and "Pathfinder" interactive explorer. |
| `/workshops` | List of intensive "Live Fire" simulation workshops. |
