# Cursor / agent instructions (Global Pet Cab)

## Which files are the LIVE site (Hostinger / globalpetcab.ae)

| Use this | Do not use for live preview |
|----------|-----------------------------|
| `.next/` (compiled) | `src/` folder |
| `server.js` | `next dev` unless explicitly asked |
| `live/trust-badges.json` + `npm run sync:live` | `src/components/TrustBar.tsx` alone |

**Local preview:** `npm run dev` → http://localhost:3010 (runs `server.js` + `.next`).

**Wrong preview:** `npm run edit` → old `src/` layout (~153KB HTML). Never use for Hostinger parity.

## Making content changes (e.g. trust badges)

1. Edit **`live/trust-badges.json`** (or run **`scripts/patch-trust-badges.mjs`** for bulk `.next` updates).
2. Run **`npm run sync:live`**.
3. Run **`npm run dev`** and confirm with **`bash scripts/check-local-preview.sh`**.
4. Commit **`.next`** changes and push **`main`** to deploy (needs `HOSTINGER_SSH_PASSWORD`).

Do **not** only change `src/` — that does **not** update what `npm run dev` shows.
