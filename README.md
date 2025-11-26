# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## App Overview

A small internal procurement frontend built with React and Vite. It implements a lightweight procure-to-pay flow where users can create purchase requests, approvers can approve/reject them, and creators (or staff) can upload receipts after approval. The app uses React Query for data fetching, Axios for HTTP calls to a backend API, and Supabase for storing uploaded files.

Key implemented features
- Authentication (login) and session persistence using a stored token validated via `GET /accounts/me`.
- Protected routes and automatic redirect to the login page when the token is invalid.
- Purchase requests list and detail view.
- Approver workflows: approve/reject actions (approver-level roles).
- Receipt upload flow: client uploads file to Supabase `purchase_orders` bucket, then notifies backend via `PATCH /requests/:id/upload-receipt` with JSON `{ receipt_url }`.
- Logout UX: profile dropdown with a confirmation prompt that calls `POST /accounts/logout`, then clears local token on success.
- Decisions modal (UI-only): displays approver decisions (falls back to dummy data until backend provides it).

## Setup & Run

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Environment variables

Create a `.env` (or use the provided `.example.env`) in the project root with the following entries set in your environment or Vite-compatible env file:

- `VITE_BACKEND_URL` – Base URL of the backend API (e.g. `https://api.example.com`).
- `VITE_SUPABASE_URL` – Supabase project URL used for storage uploads.
- `VITE_SUPABASE_ANON_KEY` – Supabase anon/public key for uploads.

Example (`.env`):

```
VITE_BACKEND_URL=https://api.example.com
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

Notes:
- The Supabase `purchase_orders` bucket is expected to be public for the current `getPublicUrl` usage. If you make the bucket private, update the upload flow to use signed URLs or server-side retrieval.
- The app reads `token` from `localStorage` to persist sessions. Make sure your backend issues a Bearer token at login and supports `GET /accounts/me` and `POST /accounts/logout`.

## Where to look in the code

- Authentication helpers: `src/service/auth.service.js`
- Session hook: `src/hooks/useUser.jsx`
- Protecting routes: `src/components/Protect.jsx`
- Purchase request APIs: `src/service/purchaseRequest.service.js`
- Supabase upload helper: `src/service/supabase.service.js` (function `uploadProformaToSupabase`)
- Purchase request details + receipt upload UI: `src/pages/PurchaseRequestDetails.jsx`
- Image/file picker UI: `src/components/ImageUploader.jsx`

## Development notes and TODOs

- The decisions model is represented in the UI; backend support for `pr.decisions` and real decision timestamps is pending.
- Consider making the Supabase bucket private and switching to signed URLs for greater security.
- Add upload progress and preview for receipts.

If you want, I can open a PR with these changes and add tests or screenshots for the UI flows.
## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
