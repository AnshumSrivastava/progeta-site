# Modules Catalog

**Route**: `/modules`

## Purpose
A searchable and filterable catalog of learning modules ("Technical" and "Soft Skills").

## Data Source
- `src/lib/content/modules.ts`: The source of truth for all modules.

## Key Features
- **Filtering**: Buttons to toggle between 'ALL', 'TECHNICAL', and 'SOFT SKILLS'.
- **Search**: Real-time search by title or category.
- **Reactive UI**: The grid updates automatically as filters/search change (`$: filteredModules = ...`).
- **Cards**: Displays each module using the shared `Card` component with an entry animation delay.
