# Angular Enterprise Monorepo

Welcome to the **Inventory Management System**! This workspace was generated using [Nx](https://nx.dev) and implements a robust, scalable Angular 22 architecture utilizing modern best practices (Standalone Components, Signals, Zoneless).

## 🚀 Architecture Overview

This monorepo is structured using the standard `apps/` and `libs/` grouping:

- **`apps/customer-portal`**: The main Angular frontend application.
- **`apps/mock-server`**: An Express server providing a full CRUD REST API.
- **`libs/features/inventory`**: A Smart component library containing the Inventory Management UI.
- **`libs/data-access/api`**: A headless library providing the `InventoryService` and strictly typed data models.
- **`libs/design-system/ui`**: A strict UI library containing reusable presentation components (`TableComponent`, `ButtonComponent`).
- **`libs/design-system/tokens`**: A headless SCSS library containing our design system tokens and helper functions.

## 🛠️ Setup & Development

### 1. Running the Mock Backend
We use a lightweight Express application as our mock API server. The database is stored completely in-memory, meaning **any created, updated, or deleted items will reset when the server restarts**.
```bash
npx nx serve mock-server
```
*The backend API runs on `http://localhost:3000/api`. The frontend is automatically configured to proxy `/api` requests to this port.*

### 2. Running the Frontend App
To start the Angular application (Customer Portal):
```bash
npm run start
```
*Navigate to `http://localhost:4200` to view the app.*

## 🧪 Testing and Linting

- **Linting**: Ensure strict module boundaries are respected.
  ```bash
  npm run lint
  ```
- **Testing**: Run unit tests across all libraries.
  ```bash
  npm run test
  ```
- **Build**: Ensure the production build succeeds.
  ```bash
  npm run build
  ```
