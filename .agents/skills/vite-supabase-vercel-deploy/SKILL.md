---
name: vite-supabase-vercel-deploy
description: >-
  Sets up Supabase client integration and deploys a Vite/React + Express/Node
  project to Vercel via GitHub. Covers Supabase client creation with correct
  env vars, Vercel zero-config architecture (serverless api/ entrypoint +
  vercel.json rewrites), environment variable configuration in the Vercel
  dashboard, diagnosing and fixing 404 deployment errors, and triggering
  production deployments through GitHub push. Use when a project needs
  Supabase connected and deployed live on Vercel.
---

# Vite + Supabase + Vercel Deployment Skill

## Overview

This skill guides an agent through the complete backend integration and
deployment pipeline for a **Vite/React + Express** project:

1. Installing and configuring the Supabase JS client
2. Setting up correct environment variables for both Vite (frontend) and Node (server)
3. Creating the Vercel zero-config serverless architecture
4. Pushing to GitHub to trigger automatic Vercel deployment
5. Diagnosing and fixing 404 or blank-page deployment errors

---

## Dependencies

No external skills are required. This skill uses:
- `npm` (Node package manager)
- `git` (version control)
- `npx vercel` (Vercel CLI)
- Supabase MCP tool (if available) for project/key verification

---

## Quick Start

Trigger this skill when the user says:
- "Connect Supabase to my Vercel project"
- "Deploy my Vite app to Vercel"
- "My Vercel site shows a 404 / blank page"
- "Set up the backend for my project"

---

## Workflow

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

Verify installed version:
```bash
npm list @supabase/supabase-js
```

> Use v2.x (current stable). Do NOT downgrade to v1.x unless the user explicitly requires it and provides a valid reason.

---

### Step 2: Create the Supabase Client File

Create `lib/supabase/supabaseClient.ts` with the following pattern:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided as environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public', // Change to custom schema if required
  },
});

export default {
  url: supabaseUrl,
  apiKey: supabaseAnonKey,
};
```

> **NEVER** use `$env/static/private` — that is SvelteKit only and will break Vite builds.
> **NEVER** use `process.env` in frontend files — Vite requires `import.meta.env`.

---

### Step 3: Set Up Environment Variables Locally

In `.env.local` (never commit this file), add **both** variants:

```env
# For Express/Node server-side usage
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_KEY

# For Vite frontend usage (VITE_ prefix required)
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Gemini AI (if applicable)
GEMINI_API_KEY=YOUR_GEMINI_KEY
```

Verify `.env.local` is in `.gitignore` before continuing:
```gitignore
.env*
!.env.example
```

---

### Step 4: Prepare the Express Server for Vercel

Modify `server.ts` (or `server.js`) to:
1. Export the `app` instance
2. Skip `app.listen()` when running inside Vercel

```typescript
// At the bottom of server.ts — replace the existing listen/start block with:
if (!process.env.VERCEL) {
  startServer(); // or app.listen(PORT, ...)
}

export default app;
```

---

### Step 5: Create the Vercel Serverless Entrypoint

Create `api/server.ts`:

```typescript
import app from "../server";

export default app;
```

> Vercel automatically detects any file inside the `api/` directory and
> compiles it as a serverless function (AWS Lambda). The file name becomes the
> route path (e.g., `api/server.ts` → `/api/server`).

---

### Step 6: Configure vercel.json (Zero-Config)

Create or replace `vercel.json` at the project root:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/server"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

> **Do NOT use a `builds` array** unless you have a specific reason. The `builds`
> key disables Vercel's automatic framework detection and causes blank pages
> because it bypasses the Vite build step.

---

### Step 7: Add Vercel Environment Variables (Dashboard)

1. Go to `https://vercel.com/dashboard`
2. Select the project → **Settings** → **Environment Variables**
3. Add each variable with **Production** and **Preview** checked:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` (your anon key) |
| `GEMINI_API_KEY` | `AIza...` (if applicable) |

> The **Development** environment may show a lock icon — this is normal and
> does not affect the live production deployment.

> If Vercel shows "variable already exists" — that means it was already saved
> successfully. Close the dialog and continue.

---

### Step 8: Authenticate Vercel CLI (if needed)

```bash
npx vercel login
```

Vercel will output a device URL:
```
Visit https://vercel.com/oauth/device?user_code=XXXX-XXXX
```

Open that URL in your browser and authorize the device. The CLI will confirm
`Congratulations! You are now signed in.`

---

### Step 9: Build and Deploy

**Option A: Via GitHub (recommended)**

```bash
git add .
git commit -m "chore: setup Supabase client and Vercel configuration"
git push origin main
```

Vercel detects the push and automatically builds and deploys.

**Option B: Manual CLI deploy**

```bash
npx vercel build --yes
npx vercel deploy --prebuilt
```

---

### Step 10: Verify Deployment

```bash
npx vercel list
```

Check the latest deployment shows `● Ready`. Confirm the production alias:
- `https://YOUR-PROJECT.vercel.app` — should return the app HTML, not a 404.

---

## Diagnosing 404 / Blank Page Errors

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `404: NOT_FOUND` from Vercel | `builds` array in `vercel.json` | Remove `builds`, use `rewrites` |
| Blank white page | Assets not found / wrong output dir | Check `dist/` exists; verify Vite build ran |
| "Build output contains no functions or static directory" | `builds` bypassed Vite | Remove `builds` key from `vercel.json` |
| Environment variable missing at runtime | Keys not added to Vercel dashboard | Add to Settings → Environment Variables, then redeploy |
| 404 on API routes | Express not exported correctly | Check `api/server.ts` exports `default app` |

---

## Common Mistakes

1. **Using `$env/static/private` in a Vite project** — This is SvelteKit-only. Always use `import.meta.env.VITE_*` for Vite frontend and `process.env.*` for Node/server code.

2. **Using the `builds` key in `vercel.json`** — This disables automatic framework detection and causes blank page or 404 errors. Use `rewrites` instead for Vite/React SPAs with an Express API.

3. **Missing `VITE_` prefix on environment variables** — Vite will not expose env vars to the browser unless the key starts with `VITE_`. Always add both versions (`SUPABASE_URL` for server AND `VITE_SUPABASE_URL` for frontend).

4. **Pasting code into the terminal** — Multi-line code belongs in files, not the terminal. Use the code editor to create/edit files; use the terminal only for CLI commands.

5. **Not redeploying after adding env vars** — Vercel environment variables only take effect on the next build. Always trigger a redeploy (via git push or dashboard) after saving new variables.
