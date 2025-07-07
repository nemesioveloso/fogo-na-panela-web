# BaseProject

BaseProject is a starter template using **React 19**, **TypeScript** and **Vite**. It provides a minimal yet opinionated setup with popular libraries such as [MUI](https://mui.com/), [styled-components](https://styled-components.com/) and [React Router](https://reactrouter.com/).

This repository can be used as a foundation for new front‑end projects and already includes basic configuration for ESLint, Prettier and TypeScript.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173/` by default.

3. **Create a production build**

   ```bash
   npm run build
   ```

4. **Preview the build locally**

   ```bash
   npm run preview
   ```

## Scripts

| Script       | Description                           |
| ------------ | ------------------------------------- |
| `dev`        | Launches Vite in development mode     |
| `build`      | Type checks the project and builds it |
| `preview`    | Serves the production build locally   |
| `lint`       | Runs ESLint using the configured rules|
| `format`     | Formats the project with Prettier     |

## Folder Structure

```
src/
├─ api/        # API utilities
├─ auth/       # Authentication helpers
├─ config/     # Application configuration
├─ layouts/    # Shared layout components
├─ models/     # TypeScript models
├─ pages/      # Application pages
├─ routes/     # React Router configuration
├─ services/   # Reusable services
└─ utils/      # Utility helpers
```

Feel free to adapt this structure to your needs.

## Linting and Formatting

ESLint and Prettier are preconfigured to help keep a consistent code style. You may need to install the project’s dev dependencies before the linting command works:

```bash
npm install
npm run lint
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have improvements or fixes.

