# Deployment Guide

## Live site (current)

| Domain | Server | Status |
|--------|--------|--------|
| **https://globalpetcab.ae** | `u432886921@217.21.85.101:65002` | Active — Hostinger hbuilds, deploys from GitHub |
| **https://bedreweb.com** | `u172903565@147.93.109.71:65002` | Legacy — old Aug 2026 build, not auto-synced |

The GitHub repo (`main` branch) is connected to **globalpetcab.ae** via Hostinger Git integration. Pushing to GitHub triggers a rebuild on the new server.

## Recommended deploy flow

1. Commit and push to `https://github.com/Sunilbedre/newpetcab.git` (`main`)
2. In Hostinger hPanel: **Websites → globalpetcab.ae → Deployments** — confirm build succeeded
3. Open https://globalpetcab.ae and verify

## Manual deploy (fallback)

```powershell
.\scripts\deploy-globalpetcab.ps1
```

## Legacy bedreweb.com scripts

`scripts/deploy-bedreweb.ps1` and `scripts/upload-bedreweb-now.ps1` target the **old server** only. Do not use them unless you intentionally deploy to bedreweb.com on `147.93.109.71`.

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
