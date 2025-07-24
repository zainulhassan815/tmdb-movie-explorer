# React Production-Ready Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust and feature-rich starter template for building modern, data-driven React applications. This project is configured with a powerful toolchain for UI development, data fetching, state management, and code quality to get you up and running quickly.

## Features

- **Framework**: [React](https://react.dev/) for building dynamic user interfaces.
- **Build Tool**: [Vite](https://vitejs.dev/) for a lightning-fast development experience and optimized production builds.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for beautifully designed, accessible, and composable components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and rapid UI development.
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) for powerful asynchronous state management, paired with [Axios](https://axios-http.com/) for HTTP requests.
- **URL State Management**: [nuqs](https://nuqs.47ng.com/) for type-safe management of state in URL query parameters.
- **Code Quality**: Linting and formatting enforced by [Biome](https://biomejs.dev/).
- **Git Hooks**: Pre-commit hooks with [Husky](https://typicode.github.io/husky/) to ensure code quality before commits.
- **Path Aliases**: Pre-configured with `@/*` for clean and maintainable import paths.
- **Environment Variables**: Centralized configuration using `.env` files.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

## Getting Started

Follow these steps to get your development environment set up.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-starter.git
cd react-starter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, you can modify the `.env` file with your specific configuration, such as API keys.

```env
# .env
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_API_ACCESS_TOKEN=your_secure_access_token
```

### 4. Setup Pre-Commit Hooks with Husky

Run the following command to generate required files needed to run pre-commit hook:

```bash
npm run prepare
```

## Available Scripts

This project comes with several pre-configured npm scripts:

- **`npm run dev`**: Starts the development server with Hot Module Replacement (HMR).
- **`npm run build`**: Bundles the application for production.
- **`npm run preview`**: Serves the production build locally to preview it before deployment.
- **`npm run lint`**: Lints the codebase using Biome to find and report issues.
- **`npm run lint:fix`**: Lints the codebase using Biome and apply possible fixes.

## Working with shadcn/ui

This project is already configured to use `shadcn/ui`. To add new components, you can use the `shadcn` CLI. For example, to add a button component:

```bash
npx shadcn@latest add button
```

The component will be added to the `src/components/ui` directory, and you can import it directly into your application.

## Code Style and Conventions

This project uses **Biome** to enforce a consistent code style and catch potential errors.

*   **Formatting**: Code is automatically formatted to ensure consistency (2-space indents, double quotes, etc.).
*   **Linting**: The linter helps prevent common mistakes and enforces best practices.
*   **File Naming**: All new files **must** use `kebab-case` (e.g., `my-component.jsx`, `api-utils.js`). This is enforced by a linting rule in `biome.json`.

## Folder Structure

Here is a high-level overview of the recommended project structure:

```text
src
├── api/              # Axios instances and API service definitions
├── app/              # Application pages or route components
│   ├── pages/        # Application pages
│   └── app.jsx       # Main application component
├── assets/           # Static assets like images, fonts, etc.
├── components/
│   ├── layout/       # Layout components (e.g., Header, Footer, Sidebar)
│   ├── ui/           # shadcn/ui components will be added here
│   └── shared/       # Shared components
├── config/           # Application configuration files
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and libraries (e.g., cn from shadcn)
├── index.css         # Global styles and Tailwind directives
└── main.jsx          # Application entry point
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
