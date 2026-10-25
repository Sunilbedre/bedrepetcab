# Global Pet Cab Dubai — globalpetcab.ae

You **do not** need to run terminal commands for normal work.

## How you work (simple)

1. Tell **Cursor** what to change (text, pages, design).
2. Cursor edits the repo and **pushes to GitHub `main`**.
3. **GitHub automatically deploys** to Hostinger (after one-time setup below).
4. Open **https://globalpetcab.ae** — hard refresh if needed.

Preview while Cursor is working: use **Forwarded Ports → 3010** in the Cursor agent (not your Mac terminal).

## One-time setup (5 minutes, then never again)

So deploys run **without you**:

1. Open https://github.com/Sunilbedre/finalglobalpetcab/settings/secrets/actions  
2. **New repository secret**  
   - Name: `HOSTINGER_SSH_PASSWORD`  
   - Value: your Hostinger SSH password (hPanel → Advanced → SSH Access)  
3. Hostinger hPanel → **globalpetcab.ae** → **Node.js**  
   - App folder: `domains/globalpetcab.ae/hbuilds/manual-deploy/app`  
   - Start: **`npm start`**  
   - Save and **Restart** once  

After that, every push to `main` runs the deploy workflow.

## If live site looks old

In hPanel → Node.js → **Restart** (once). No terminal on your laptop.

Details: [DEPLOYMENT.md](DEPLOYMENT.md)
