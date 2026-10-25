# Simple workflow

1. Ask Cursor to change the website.
2. Cursor edits **`src/`** and runs **`npm run dev`** on port **3010**.
3. Preview: **http://localhost:3010** (Cursor → Forwarded Ports → 3010).
4. When happy, Cursor pushes to GitHub → Hostinger deploy (after `HOSTINGER_SSH_PASSWORD` secret is set).

You do not deploy manually for each text change.
