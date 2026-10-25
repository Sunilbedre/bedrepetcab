# Global Pet Cab Dubai

## Localhost = same files as Hostinger (live site)

```bash
git pull origin main
npm ci --omit=dev
npx prisma generate
npm run dev
```

Open **http://localhost:3010** (in Cursor: **Forwarded Ports → 3010**).

This runs the **Hostinger build** (`server.js` + `.next`), not the old `src/` folder.

## When Cursor changes the site

1. Cursor edits files (usually under `src/` for big changes, or the live `.next` for small updates).
2. You check **http://localhost:3010** after Cursor restarts **`npm run dev`**.
3. When ready for live: Cursor pushes → GitHub deploys to **globalpetcab.ae**.

## Do not use by mistake

- **`npm run edit`** — old `src/` dev mode (different layout). Only if Cursor asks for it.

## Still seeing the old site on localhost?

| Symptom | Cause | Fix |
|--------|--------|-----|
| Page feels “old”, ~153KB | `next dev` on 3010 | Stop it; run **`npm run dev`** only |
| “Verified Google” badges | Wrong server or old git | `git pull` then **`npm run dev`** |
| Check | — | `bash scripts/check-local-preview.sh` |

**Live site not updated?** See **[DEPLOY-HOSTINGER.md](./DEPLOY-HOSTINGER.md)** — you must add GitHub secret `HOSTINGER_SSH_PASSWORD` once, then re-run the deploy workflow and restart Node in hPanel.
