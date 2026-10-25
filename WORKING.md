# Global Pet Cab — one workflow

## On your PC

```powershell
git clone https://github.com/Sunilbedre/finalglobalpetcab.git
cd finalglobalpetcab
npm ci --omit=dev
npx prisma generate
$env:PORT=3010
npm start
```

Open **http://localhost:3010** — same site as **https://globalpetcab.ae**.

## Change the website

Tell **Cursor** what to change (text, images, pages). We edit this repo, push to GitHub `main`, and Hostinger redeploys **globalpetcab.ae**.

You do not need a second folder, `npm run dev`, or `hostinger-live-deploy`.
