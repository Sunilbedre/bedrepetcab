# Deployment Guide

## Live site (current)

| Domain | Server | Status |
|--------|--------|--------|
| **https://globalpetcab.ae** | `u432886921@217.21.85.101:65002` | Active — Hostinger hbuilds, deploys from GitHub |
| **https://bedreweb.com** | `u172903565@147.93.109.71:65002` | Active — manual SSH deploy to `app-v2` (not Git-linked) |

The GitHub repo (`main` branch) is connected to **globalpetcab.ae** via Hostinger Git integration. Pushing to GitHub triggers a rebuild on the new server.

## Recommended deploy flow

1. Commit and push to `https://github.com/Sunilbedre/newpetcab.git` (`main`)
2. In Hostinger hPanel: **Websites → globalpetcab.ae → Deployments** — confirm build succeeded
3. Open https://globalpetcab.ae and verify

## Manual deploy (fallback)

```powershell
.\scripts\deploy-globalpetcab.ps1
```

## bedreweb.com (separate server)

`scripts/deploy-bedreweb.ps1` and `scripts/upload-bedreweb-now.ps1` deploy to `147.93.109.71` → `domains/bedreweb.com/nodejs/app-v2`. After deploy, hard-refresh the browser (`Ctrl+Shift+R`) — stale `_next/static` files in `public_html` can make the site look outdated.

**Do not run locally from** `F:\petcab\bedreweb.com\` — that is an old server download. Clone `newpetcab` instead.

## Environment variables

Copy `.env.production.example` to `.env` on the server. Required for production:

- `DATABASE_URL` — SQLite path or production DB
- Add JWT/admin secrets if using admin panel

The live app currently has no `.env` file and uses defaults from the example.

## Local development

```powershell
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000
