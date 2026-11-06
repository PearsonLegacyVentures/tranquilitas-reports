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


## Partner POCs and financial attribution (5 November 2026)

- Markets page includes a per-country **Points of contact** section with blank photo slots, contact and payment details, and permanent partner IDs.
- Contact names, phone numbers, photos, booking references and financial records are **not committed** to this public repository. Import the populated Tranquilitas private contacts CSV on your own device, using the **Import private contacts CSV** control.
- A per-partner ledger records service date, booking reference (no guest names), market/partner ID, currency, gross receipts, refunds, provider payout owed/paid, direct costs and settlement status. Amounts are not inferred from historical country tracker totals.
- Only Settled rows count in the cash-flow KPIs. Estimated retained contribution = gross received - refunds - provider payout owed - other direct costs. Outstanding payout = provider payout owed - provider payout paid. Different currencies are NOT combined. This is not an audited profit figure.
- All private contact and transaction data are **browser-local only** via localStorage. Export private CSV backups before clearing browser data or moving devices. There is no multi-user authentication, sync, or automatic bank reconciliation. Deploy an authenticated database before using as an official ledger or multiuser CRM.


### Encrypted, automatically loaded partner roster · November 6, 2026

- `data/poc-directory.enc.json` is AES-256-GCM encrypted and gzip-compressed, protected with a separately supplied passphrase. The source records are not committed as plaintext. The public GitHub repo itself remains public; the passphrase is a shared unlock secret, **not account authentication**.
- POC section within `markets.html` has a country picker and password-unlock form. After unlocking, all 24 contacts from the 18-page supplied PDF appear under the correct destination without manual CSV import. Blank profile photos may be supplied by management. Counters reflect verified source *entries* only, not evidence that partners remain active.
- `caribbean.html` now links its country rows to the corresponding POC section, and the main report contains a Partner POCs link. Country view remains available even before unlocking.
- Browser-only additions, edits, photos, and partner-level financial transactions are **not synchronized across users or devices**. The finance dashboard stays empty until reconciled provider-level transactions are entered; aggregate regional tracker values are not falsely assigned to any partner. Use private CSV export for backups.
- For a production multiuser CRM, implement Cloudflare Access/Supabase Auth and an access-controlled backend, avoid browser-only accounting and introduce audit logs, role-based permissions and verified settlement imports. Do not put the unlock phrase in repository files, environment configs served to clients, or public URLs.
