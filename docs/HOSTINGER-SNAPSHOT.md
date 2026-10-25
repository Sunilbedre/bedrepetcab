# Exact Hostinger live deploy snapshot

Copied from **globalpetcab.ae** server download (`live-20261024-111749`), **2026-10-24**.

This folder is what actually runs on Hostinger (compiled `.next`, not TypeScript `src/`).

## Run locally (production mode)

```bash
cd hostinger-live-deploy
npm ci --omit=dev
npx prisma generate
node server.js
```

## Edit the website

Edit **`src/`** in the repo root, then `npm run build`. This folder is a **reference backup** of live.

Do not commit `.env` from the server.
