# TOMN Frontend (តំណ)

Bilingual (Khmer/English) frontend for **TOMN — Connecting People. Simplifying Services.**

This is a React + TypeScript + Vite application using Tailwind CSS, React Router, mock data, and local demo state. It is prepared for later integration with a Laravel REST API (`VITE_API_BASE_URL`) and Laravel Sanctum authentication.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- React Hook Form + Zod
- Zustand (state/persistence)
- Recharts (admin dashboard chart)
- Local mock data (no backend required)

## Implemented areas

- **Public:** Home, Service Directory, Service Details, Office Finder, AI Assistant, About, 404
- **Auth (demo):** Login, Register
- **Citizen portal:** Dashboard, Saved Services, Document Checklists, Profile
- **Admin portal:** Dashboard, Service Management, Service Editor (create/edit), Content Review, User Management, Audit Logs
- **Cross-cutting:** Bilingual KM/EN UI switcher, responsive layouts, mock search/filters, localStorage persistence for demo auth/language/saved/checklists/admin edits, route guards (demo), loading/empty states, toasts, confirmations, accessible labels/focus styles

## Prerequisites

- Node.js 20+ (recommended)
- npm

## Setup

```bash
cd frontend
npm install
```

Create a local env file if needed:

```bash
cp .env.example .env
```

`.env.example`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

## Run

```bash
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Demo accounts / notes

- Authentication is **mock/local only** (no real backend, no passwords stored). Register any user, or login with an existing demo email such as `admin@tomn.local` to access the admin portal; other demo users are available in mock data.
- Service, office, review, and statistics data are **demonstration data** and must not be treated as verified official information.
- Admin actions (create/edit/delete/review) persist to `localStorage` for demo purposes.
- AI assistant responses are mock, source-cited from approved demo service data, and include uncertainty/fallback behavior.

## Project structure

```
src/
  components/      # Reusable UI (common, navigation, etc.)
  contexts/        # I18n provider
  data/            # Mock data
  layouts/         # Public, Citizen, Admin layouts
  locales/         # km.json, en.json
  pages/           # public, auth, citizen, admin pages
  routes/          # App router
  services/        # API client & service access layer (mock now)
  store/           # Zustand app store (lang, auth demo, saved, checklists, toasts)
  types/           # TypeScript interfaces
  utils/           # i18n helper, storage helpers
```

## Backend integration (future)

- Replace mock implementations in `src/services/*` and data usage with calls via `src/services/api.ts` using `VITE_API_BASE_URL`.
- Use Laravel Sanctum for real authentication/authorization (server-side). Current route guards and role displays are demo-only.
- Keep TOMN trust rules: independent platform, no invented official data, show sources/verification dates, and require users to confirm with relevant authorities.
