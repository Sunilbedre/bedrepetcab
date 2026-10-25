# How you work with Cursor (no daily terminal)

## Your job

Describe changes in Cursor chat. That’s it.

## Cursor’s job

- Edit the site  
- Push to GitHub `main`  
- GitHub Action deploys to **globalpetcab.ae** (if `HOSTINGER_SSH_PASSWORD` secret is set)

## One-time (you do this once)

GitHub → **Settings → Secrets → Actions** → add **`HOSTINGER_SSH_PASSWORD`** (Hostinger SSH password).

## Preview

In the **Cursor agent**, open **Forwarded Ports → 3010**. Do not use `npm run local` on your Mac unless you want to.

## Live site

https://globalpetcab.ae
