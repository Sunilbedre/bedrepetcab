# Global Pet Cab Dubai (`globalpetcab.ae`)

Production Next.js app deployed on **Hostinger** — this repository matches the **live** site build (compiled `.next` + `server.js`).

## Quick start (local preview = live site)

```bash
npm ci --omit=dev
npx prisma generate
PORT=3010 HOSTNAME=0.0.0.0 npm start
```

Open **http://localhost:3010**

## Editing the site

This repo intentionally does **not** include the old Git `src/` tree (it was out of date vs live).

To change pages in TypeScript, add back your source project (see [WORKING.md](WORKING.md)) — typically from `petcabdubai-main` on your PC — then `npm run build` and commit the new `.next/` output.

## Docs

- [WORKING.md](WORKING.md) — daily workflow, deploy, restoring source
- [DEPLOYMENT.md](DEPLOYMENT.md) — Hostinger / GitHub deploy
