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


## 32-market website portfolio and digital funnel intelligence — 13 November 2026

- **`portfolio.html`** loads **`data/website-portfolio.json`**, an inventory of 32 separately configured destination websites (21 Caribbean/Bahamas markets; 11 international) from Cloudflare Pages. Domains, source repos, city/service zones and management links are browsable and exportable. Additional owned properties are shown separately, not counted as new countries.
- **`markets.html`** uses this registry alongside the existing Caribbean pricing and tracking files. It now presents all 32 website markets **plus Exuma as a delivery submarket**, totaling 33 rows. No existing prices, financial totals, encrypted partner POCs or local-browser ledger records were edited.
- **`channels.html`** loads **`data/channel-intelligence.json`** and shows actual GA4 acquisition sources, source/medium referrals, key-event types, Wix 2026 YTD booking attribution and CTA click snapshots. It also maps the independent Wix, Massage Bahamas, country website and dispatch booking funnels with clear known/unmeasured labels.
- **GA4 scope:** `properties/451831019` is the primary Wix property, **2026-10-14–2026-11-12**, not the combined 32 markets. Its 94 key events contain checkout starts, ad conversions and purchases; they are **not 94 confirmed bookings**. **Wix Analytics** is a separate source, 2026 YTD **through 2026-10-28**; do not add its figures to GA4 or infer net cash.
- **Missing integrations:** Meta ad accounts have not been selected in the connected analytics provider, Google Ads account reporting is unavailable, and GA4/GSC and confirmed booking conversions for all 32 country sites are not connected. The reporting UI identifies these gaps rather than inventing zero traffic or conversions.
- All customer-facing Tranquilitas websites retain their own **independent conversion funnels**. Links within the internal reports are for management review, not cross-promotion between consumer sites.
- **Security:** This GitHub repo and Pages deployment remain public; `noindex` is **not** access control. Keep patient/guest identities, passwords, account credentials and private financial transactions out of this reporting snapshot. For secure multiuser reports, add actual authentication and private data storage.
- Operating definitions and source caveats: [DIGITAL_MARKETING_FUNNELS_2026.md](report/DIGITAL_MARKETING_FUNNELS_2026.md).

## Weekly operations reconciliation (2026)

`operations.html` compares **six nonconsecutive** management weekly reports to independently retrieved date-scoped Wix metrics. `data/weekly-reconciliation.json` preserves the correct, final report versions, aggregated completed engagements, collections, therapist payouts, outstanding source documents, and country-level commission settlement status. These weekly collections **must not** be added to Wix annual sales. Commission records separate **reported paid**, **invoiced/due**, **recorded but unverified**, and **modeled** amounts. On November 18 the Zoho mailbox confirmed the existence of September/October monthly PDFs and November 2–15 weekly PDFs, but the connected Zoho mail action does not expose attachment bytes; the contents were not used.
