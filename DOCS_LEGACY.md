# Kanzy Story Forge

Kanzy Story Forge is a React application built with TypeScript and Tailwind CSS that provides a platform for reading and interacting with stories.

## Project Structure

*   `src/App.tsx`: Main application component responsible for routing and UI providers.
*   `src/pages/`: Contains different pages of the application:
    *   `Index.tsx`: Redirects to the `Home` component.
    *   `Library.tsx`: Displays a library of books with search and category filtering.
    *   `Reader.tsx`: Allows users to read stories page by page, with text highlighting and audio playback.
    *   `ParentDashboard.tsx`: Shows statistics and activity for a selected child.
    *   `NotFound.tsx`: Displays a 404 error page.
*   `src/components/ui/`: Reusable UI components.
*   `src/lib/`: Utility functions.
*   `src/hooks/`: Custom hooks.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `vite.config.ts`: Vite build configuration.
*   `package.json`: Project dependencies and scripts.

## Key Components

*   **Routing:** The application uses `react-router-dom` for navigation between pages.
*   **UI Components:** The application uses a custom UI component library located in `src/components/ui/`.
*   **Data Fetching:** The application uses `@tanstack/react-query` for data fetching.
*   **Styling:** The application uses Tailwind CSS for styling.

## Purpose

The application provides a user interface for children to read stories and for parents to track their children's reading progress. The stories and user data are currently hardcoded, but the application can be extended to fetch data from an external API.
