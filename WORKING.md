# How we work on Global Pet Cab (Git + live site)

## Simple answers

| Question | Answer |
|----------|--------|
| **Did we download the live server?** | **Yes** — full backup is on the machine that ran the Cloud Agent (`live-server-full/` + `globalpetcab-live-full.tar.gz`). |
| **Should that backup go on GitHub?** | **No.** It is ~771 MB–2.6 GB of `node_modules` + compiled `.next` — not editable source. |
| **What goes on GitHub?** | This folder: **`src/`**, `prisma/schema.prisma`, `public/`, configs — the **website you edit**. |
| **Which repo?** | **`https://github.com/Sunilbedre/finalglobalpetcab`** (canonical). Legacy: `newpetcab`. |

## One-time: put code on `finalglobalpetcab`

The Cloud Agent often **cannot push** to `finalglobalpetcab` until GitHub app access is granted. On **your PC**:

```powershell
git clone https://github.com/Sunilbedre/newpetcab.git
cd newpetcab
git pull
git remote add final https://github.com/Sunilbedre/finalglobalpetcab.git
git push -u final main
```

After that, clone **`finalglobalpetcab`** for all future work:

```powershell
git clone https://github.com/Sunilbedre/finalglobalpetcab.git
cd finalglobalpetcab
```

## Daily development

```powershell
npm ci
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

Open http://localhost:3000

## Deploy to globalpetcab.ae

1. Commit and push to **`finalglobalpetcab`** `main`
2. Hostinger hPanel → **globalpetcab.ae** → connect Git to **`finalglobalpetcab`**
3. Redeploy / confirm build

## Live server backup (downloaded from Hostinger)

| Location | Purpose |
|----------|---------|
| `hostinger-live-deploy/` | **Exact live deploy** in Git (~31 MB, no `node_modules`) — same as server |
| `live-server-full/` (local only, gitignored) | Full unzip including `node_modules` |
| `globalpetcab-live-full.tar.gz` (gitignored) | Archive of full server copy |

Missing live-only code was **recovered from the server `.next` build** into `src/` (e.g. `/api/places/search`, `placeSuggestions`, `MobilityServiceSection`).
