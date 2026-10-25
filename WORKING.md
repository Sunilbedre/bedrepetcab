# How we work on Global Pet Cab (Git + live site)

## What is in this repo now?

This repo is the **Hostinger live app** (same as **https://globalpetcab.ae**):

- `server.js` — how the live server starts
- `.next/` — compiled website (what you see on the internet)
- `public/`, `prisma/`, `scripts/`

The old editable `src/` TypeScript tree was **removed** so you are not editing an outdated copy.

| Question | Answer |
|----------|--------|
| **Repo** | `https://github.com/Sunilbedre/finalglobalpetcab` |
| **Live site** | **https://globalpetcab.ae** (Hostinger) |

## Run locally (matches live)

```powershell
git clone https://github.com/Sunilbedre/finalglobalpetcab.git
cd finalglobalpetcab
npm ci --omit=dev
npx prisma generate
$env:PORT=3010
$env:HOSTNAME="0.0.0.0"
npm start
```

Open **http://localhost:3010**

## Can I change the website from this folder?

**Not as normal React/Next source** — there is no `src/` here, only compiled `.next` files.

To **edit pages properly**, you need the original TypeScript project (it was built from  
`E:\Pictures\petcabdubai-main\petcabdubai-main` on your PC). Copy that folder into the repo as `src/` plus `next.config.mjs`, `tailwind.config.js`, etc., then we can wire `npm run dev` again.

Until then you can:

1. **Small text tweaks** — risky edits inside `.next/server/app/*.js` (not recommended)
2. **Proper changes** — restore `petcabdubai-main` source, run `npm run build`, replace `.next/`, commit, deploy
3. **Fresh live download** — re-download from Hostinger and replace `.next/` if the server changed

## Deploy to globalpetcab.ae

Hostinger should run **`node server.js`** (or `npm start`), not `npm run build`, unless you add `src/` back.

1. Commit and push to **`finalglobalpetcab`** `main`
2. Hostinger hPanel → **globalpetcab.ae** → confirm deploy uses `npm start` / `node server.js`
3. Verify **https://globalpetcab.ae**

Manual fallback: `.\scripts\deploy-globalpetcab.ps1` (needs a local `npm run build` only if you have `src/` again).

## Backups (do not commit)

| Path | Purpose |
|------|---------|
| `live-server-full/` | Full server unzip (gitignored) |
| `globalpetcab-live-full.tar.gz` | Archive (gitignored) |
| `docs/HOSTINGER-SNAPSHOT.md` | Notes from server download |
