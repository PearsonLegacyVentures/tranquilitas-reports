# Tranquilitas Intelligence

Historical operating intelligence and annual-report dashboard for Tranquilitas, 2024–2026.

## Architecture
Static, no-build HTML/CSS/JS application. Uses aggregated, non-guest-level data exported from authorized Wix Analytics reporting models. Data provenance, period coverage, and caveats are displayed in-app. The repository is currently public; do **not** commit customer identities, booking details, financial account information, API keys, or private credentials.

## Launch
Open `index.html` locally or connect this repository to Cloudflare Pages using the main branch, root directory, and no build command. Current dataset is stored in `data/wix-history.json`.

## Scope
Separate 2024–2026 source-site operating histories, quarterly/yearly reporting, acquisition, services, and conversion. Wix analytics revenue does **not** equal audited company income or cash receipts. Annual report analysis is management reporting, not statutory financial statements.

## Caribbean intelligence and market directory

- `caribbean.html`: aggregates 2026 first-party Caribbean Performance dashboard data (Telegram tracker) and the June 5, 2026 partner-price benchmarks from `index.massagebahamas.com`. Source snapshots are `data/caribbean-tracker.json` and `data/pricing-index.json`.
- `markets.html`: 21 listed/priced Caribbean destination and submarket pages, using verified country marketing URLs from `www.massagebahamas.com/locations` or separately deployed country sites. Nassau and Exuma appear as **distinct delivery markets**, not separate countries.
- Market presence, published partner pricing, tracker activity and confirmed staffed coverage **are separate measurements**. A site being listed does not confirm therapist capacity.
- Therapist-contact additions are **browser-local drafts**, persisted in this device's localStorage with CSV export/import; **not** remotely synchronized or centrally secured. No contact names, phones or emails are committed to GitHub. Do not treat this as a production multiuser CRM.
- Source country performance data: https://caribbean.massagebahamas.com/ (regional dashboard), sourced from the Tranquilitas_Caribbean_Tracker_Simplified sheet. This is **not** the marketing sites directory.
- User-facing marketing destinations: https://www.massagebahamas.com/locations and known regional domains.
- Index: https://index.massagebahamas.com/ (confirmed partner rates; St Barths EUR converted using the historic 2026-06-05 EUR/USD 1.164 reference, not live FX).
- Quarterly/annual reports should cite `report/CARIBBEAN_MARKETS_2026.md`, and never imply the $25,192 tracker log is verified collected cash.

## Still to configure

- For reliable automatic monthly updates, an unattended API credential and server-side scheduled integration must be configured. ChatGPT's temporary Wix connector token is not a credential usable by Cloudflare Pages or GitHub Actions. **The current website serves reporting snapshots.**
- Cloudflare Access must be enabled in the account and a secured database configured before therapist/contact records can be centrally managed. The Access API currently reports it is not enabled.
