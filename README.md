# Recipe Book (Frontend)

A React + Vite single-page app for the Full-Stack Recipe Book, styled with **Tailwind CSS v4**.
It talks to the [Recipe Book API](../recipe-book-api) using a shared Axios client that handles
HttpOnly cookies, CSRF tokens, and automatic refresh-token rotation.

## Stack

| Concern | Choice |
| --- | --- |
| UI | React 19 |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router |
| HTTP | Axios (single shared client) |
| Fonts | Fraunces (display) + Plus Jakarta Sans (body) |

## Theme

The UI uses a "warm kitchen editorial" theme. Design tokens (colors and fonts) are defined
once in `src/styles/global.css` inside the Tailwind `@theme` block, so utilities such as
`bg-spice-600`, `text-ink-800`, and `font-display` are available everywhere.

## Folder structure

```
src/
├── components/
│   ├── common/     # Brand, navbar, page header, recipe meta
│   ├── context/    # Auth context (user state, login, signup, logout)
│   ├── features/   # admin / auth / recipe feature components
│   └── ui/         # Reusable primitives: Button, Input, Modal, Table, ...
├── lib/            # axios client (cookies + CSRF + refresh) and cn() helper
├── pages/          # Route screens: auth, user, admin
├── services/       # One function per API endpoint
├── styles/         # Tailwind entry point + theme tokens
└── main.tsx        # Providers, router and route guards
```

Request flow: **Page → Feature component → Service → shared Axios client → API**.

## Local setup

```bash
npm install
Copy-Item .env.example .env      # PowerShell  (cp on macOS/Linux)
npm run dev                      # http://localhost:5173
```

`.env` must contain:

```
VITE_API_BASE_URL=http://localhost:7000/api
```

The API's `FRONTEND_URL` must be exactly `http://localhost:5173` so credentialed requests
(cookies) are allowed. Start the backend first and make sure it is migrated and seeded.

## Authentication summary

1. The app requests a CSRF token, then posts credentials to `/auth/v1/login`.
2. The API responds with Set-Cookie (HttpOnly access + refresh tokens).
3. `AuthProvider` restores the session on load via `/auth/v1/refresh-token` and `/auth/v1/session`.
4. On any `401`, the Axios client refreshes once, fetches a new CSRF token, and retries.
5. Tokens are never stored in `localStorage`; JavaScript cannot read the HttpOnly cookies.

## Routes

| URL | Screen |
| --- | --- |
| `/auth/login`, `/auth/signup` | Public auth screens |
| `/user` | USER recipe collection |
| `/recipe/:id` | USER recipe details |
| `/admin` | ADMIN all-recipes table |
| `/`, unknown | Redirect based on session/role |

## Production build

```bash
npm run build     # tsc -b && vite build → dist/
npm run preview   # serve the production build locally
npm run lint
```

## Deploy to Vercel

See the top-level **DEPLOYMENT-GUIDE.md**. Set the Vercel environment variable
`VITE_API_BASE_URL` to your Render API URL ending in `/api`, then redeploy. `vercel.json`
already configures the Vite framework, the `dist` output, and SPA rewrites.
