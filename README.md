# GE Process Flow (PWA)
Gururaj Engineers Pvt. Ltd. department flows + checklists as an installable, offline-first app.
Plain HTML/CSS/JS. No PHP, no database, no Node. Workbox 7.4.1 is bundled locally.

## Edit the content
Change `assets/js/flows.js` only (format explained at the top of that file), then commit and push / re-upload.
Users get the update on their next open (a "Refresh" prompt appears if a new service worker is found).
Bump `SHELL_VERSION` in `sw.js` only if you add or remove a file listed in `SHELL_FILES`.

## Deploy option 1 — GitHub Pages (free, HTTPS, no server needed)
1. github.com → New repository → `ge-flow` → Create (Private repos need a paid plan for Pages; Public is fine as this contains no secrets).
2. Upload all files from this folder (including the hidden `.nojekyll`), or use git:
   `git init -b main && git add . && git commit -m "GE Process Flow" && git remote add origin https://github.com/<user>/ge-flow.git && git push -u origin main`
3. Repo → Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)` → Save.
4. After ~1 minute open `https://<user>.github.io/ge-flow/` and install from there.

## Deploy option 2 — Hostinger
File Manager → create `public_html/flow/` → upload everything → open `https://yourdomain/flow/`.

## Verify
Chrome DevTools → Application: manifest has no errors, `sw.js` is activated, Cache Storage has `ge-shell-v1`.
Switch Network to Offline and reload: the app still opens. Install via the Install button (iPhone: Share → Add to Home Screen).

## Live app
`index.html` is the working app (Sales Quotation → Sales Order → PR → PO → GRN, Work Order, Dispatch & Invoice, Service). `flows.html` holds the original flow charts and checklists.
Data is saved per device in the browser. Sharing between devices needs a backend.
