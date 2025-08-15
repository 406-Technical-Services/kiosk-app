# Seeley Station Kiosk — 406 Technical Services (Branded)

Static PWA kiosk app (ChromeOS / Linux / Windows). Ready for GitHub Pages + Squarespace DNS.

## Deploy (single-repo flow)

1. Create a repo in your org: https://github.com/406-Technical-Services/kiosk-app
2. Upload these files to `main`.
3. Settings → Pages → Deploy from branch → `main` / `/ (root)`.
4. Squarespace DNS (CNAME):
   - kiosk-dev.406techservices.com → 406-Technical-Services.github.io
   - kiosk.406techservices.com → 406-Technical-Services.github.io
5. GitHub → Settings → Pages → Custom domain:
   - Start with `kiosk-dev.406techservices.com` (Enforce HTTPS when ready).
   - Later switch to `kiosk.406techservices.com` or create a second Pages project.

## Chromebook policy
- OU `/Devices/Kiosk-Test` → Kiosk Web App URL: https://kiosk-dev.406techservices.com (Auto-launch ON)
- OU `/Devices/Kiosk-Prod` → Kiosk Web App URL: https://kiosk.406techservices.com (Auto-launch ON)

## Local dev
Open `index.html` in a local HTTP server (avoid file:// for service worker), e.g.:
```bash
python3 -m http.server 8080
```

## Kiosk launch (non-ChromeOS)

Linux (Chromium):
```bash
chromium-browser --kiosk --incognito --noerrdialogs --disable-translate --check-for-update-interval=31536000 https://kiosk-dev.406techservices.com
```

Windows (Edge):
```powershell
start msedge --kiosk https://kiosk.406techservices.com --edge-kiosk-type=fullscreen
```
