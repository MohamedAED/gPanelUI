# gPanel Administration Client (Frontend)

A dynamic, highly decoupled **React 18 Single Page Application (SPA)** written in **TypeScript** and powered by **Vite**. This interface serves as the visual control plane for the gPanel Cloud Integration Hub, featuring secure Basic Auth bridging, responsive data grids, and live metadata workflows.

---

## 🏗️ Architecture & Component Stack
*   **Build Pipeline:** Vite + React + TypeScript
*   **Design Framework:** Material UI (MUI v6) featuring reactive responsive grid matrices.
*   **State Management Engine:** TanStack Query v5 (React Query) driving automated cache invalidation lifecycles.
*   **Form Management:** React Hook Form managing text state validation and inline typography-to-input editor toggles.
*   **Navigation Matrix:** React Router for decoupled public-to-protected application states.

---

## 🚀 Local Installation & Execution

Ensure Node.js LTS (v20+ recommended) is running on your localized system configuration path.

### 1. Component Dependency Installation
Pull the package manifests from the centralized package registry lockfile:
```bash
npm install
```

### 2. Start the Development Server
Mount the localized front-end system configurations:
```bash
npm run dev
```
The interface compiler will initialize, typically opening public network ports up locally at `http://localhost:3000`.

---

## 📡 Automated Network Interceptor Blueprint

This application relies on a unified central Axios middleware interceptor layer to capture localized global authentication state definitions and inject them automatically into data request payloads, eliminating manual authorization coding on daily views:

```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth');
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});
```

---

## 🗂️ Application Directory Layout

```text
gPanelUI/
├── src/
│   ├── api/          # Shared Global Axios Middleware Configurator
│   ├── components/   # Application Navigation Layouts, Modals, Elements
│   ├── context/      # Centralized In-Memory Authentication Providers
│   ├── hooks/        # Reactive Custom Queries and Mutations (TanStack Query)
│   ├── pages/        # Dynamic Routed Single-View Container Nodes
│   ├── types/        # Type-Safe Global Data Schema Formats
│   ├── App.tsx       # Secure Router Route Path Boundary Matrix
│   └── main.tsx      # System React-DOM Entry Execution Pipeline
├── package.json
└── vite.config.ts    # Application Port Layout Configuration Options
```

---

## 🛡️ Production Deployment Precautions

Ensure that artifact folders compiled during optimization checks do not taint remote branch systems. Verify that the localized project `.gitignore` includes:
```text
node_modules/
dist/
.eslintcache
*.local
```
