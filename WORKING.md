# Workflow

| Command | What you see |
|---------|----------------|
| **`npm run dev`** | **Hostinger / live site** on http://localhost:3010 |
| `npm run edit` | Old `src/` only — **not** the live layout |
| **`npm run sync:live`** | Apply edits into **`.next`** (after changing `live/` or patch script) |

## Where to edit (important)

Changes in **`src/`** do **not** update the site you see with **`npm run dev`**.

For trust badges: edit **`live/trust-badges.json`**, run **`npm run sync:live`**, then **`npm run dev`**.

**You:** open **localhost:3010** (Cursor forwarded port **3010**).

**Cursor:** must edit **`.next`** / **`live/`** + **`sync:live`**, not only `src/`.
