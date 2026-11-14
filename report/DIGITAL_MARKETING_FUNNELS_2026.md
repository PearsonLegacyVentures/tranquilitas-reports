# Digital Market Websites, Channels & Booking Funnels — Internal Reporting Source Register

**Assembled:** November 13, 2026 (Nassau local date)  
**Management portal:** https://reports.massagebahamas.com/  
**Reporting repo:** PearsonLegacyVentures/tranquilitas-reports (public; aggregates only)

## Website register

`data/website-portfolio.json`: **32** distinct country/city website custom domains present in connected Cloudflare Pages configuration (**21 Caribbean/Bahamas and 11 international**). Each entry contains country/market ID, URL, GitHub source, Cloudflare project, delivery-area summary and explicit coverage/analytics verification cautions.

**The distinct 32 are:** Bahamas (Nassau), Anguilla, Antigua & Barbuda, Aruba, Barbados, Belize, Bermuda, Bonaire, BVI, Cayman Islands, Curaçao, Dominica, Grenada, Jamaica, St Kitts & Nevis, St Lucia, St Vincent & Grenadines, St Barths, St Martin/Sint Maarten, Turks & Caicos, USVI; France, London/UK, NYC, Miami, Los Angeles, Spain, Italy, UAE, Las Vegas, Orlando, Palm Beach.

**Exuma** is an additional delivery and pricing submarket in the earlier dataset but not an additional independently deployed country website. Hence `markets.html` can show **33 market entries** without claiming **33 websites**. The existing pricing datasets remain untouched: published prices in the index do not confirm local therapist availability, a successful booking or cash collection.

Other owned business funnels are shown separately: Tranquilitas main Wix website, Massage Bahamas standalone, Bahamas Mobile Massage (known source; hosting/GA integration not independently confirmed), and the Caribbean dispatch app.

**Website architecture constraint:** Each public website has an independent customer booking/enquiry funnel. Management dashboard may open country websites in a new tab for review. Do **not** insert public cross-links, redirects or Wix booking CTAs on independent country sites.

## Marketing/channel register

`data/channel-intelligence.json` includes these categories and their tracking state:
1. Organic search — Google, Bing, Yahoo, DuckDuckGo, Ecosia
2. AI assistant discovery / referrals — ChatGPT and other AI source referrals when identifiable
3. Direct navigation / unattributed link traffic
4. Organic social — Facebook / Instagram and other social
5. Meta paid ads — platform spend **not accessible** in connected analytics tool until account selected
6. Google Ads and paid search — account-level spend **not connected**
7. Affiliates / referral partners (including GA4 source `BMM / affiliate`)
8. Destination tourism directories and hospitality partnerships (listing applications **not yet approved**, so no referral bookings inferred)
9. WhatsApp and direct enquiries — website CTAs exist; receipts and confirmed booking not consolidated
10. Booking and payment flow (Wix Bookings, country-specific request, WhatsApp or configured external booking)
11. Email and automated follow-up
12. QR / offline-to-digital traffic (some GA4 `qr-codes.io` referrals)
13. Repeat service, reactivation and retention
14. Offline / call / yacht or concierge-assisted leads

## Actual measurable GA4 source

Connected GA4 property: `properties/451831019`, Tranquilitas primary Wix site, timezone America/New_York, currency USD. **2026-10-14 through 2026-11-12**, **992 GA4 sessions**:

| Channel group | Sessions | GA4 key events |
| --- | ---: | ---: |
| Organic Search | 471 | 27 |
| Direct | 426 | 57 |
| AI Assistant | 31 | 5 |
| Affiliates | 29 | 0 |
| Unassigned | 16 | 0 |
| Organic Social | 13 | 3 |
| Referral | 5 | 2 |
| Cross-network | 1 | 0 |
| **Total** | **992** | **94** |

Individual source examples: Google organic 400 sessions; Bing organic 43; ChatGPT source 31; BMM / affiliate 29; Instagram `ig / social` 4; Facebook referral 8; QR-related referral 3. These are actual reported classification strings, not verified net new customer counts.

**Key events are NOT completed bookings.** 94 key events are recorded across:
- `begin_checkout` 31
- `ads_conversion_Purchase_1` 20
- `ads_conversion_Purchase_Page_load_www__1` 15
- `purchase` 14
- `ads_conversion_Begin_checkout_1` 10
- `add_payment_info` 4

Some events may refer to different points on the **same** guest journey and may be ad-tracking duplicates. GA4 attributed revenue is **not audited cash received**. These GA4 figures cover **only the main Wix site**, not all 32 country domains.

## Separate Wix Analytics snapshot

Source: existing `data/wix-breakdowns.json`, main Wix source site, 2026 YTD **through 2026-10-28**. The Wix traffic source report has **12,160 sessions**, including organic 6,511; direct 4,129; paid ads (unspecified platform) 805; social 531; referral 85; AI platform 74; Wix automations 20; Wix Google Ads 5. Wix conversion source report includes attributed confirmed bookings under its own Wix model; these values are not assumed paid in cash.

CTA click snapshot: `Book In-Spa Service` 1,504; `Book Mobile Service` 536. These are interactions, NOT booked services.

**Do not add Wix and GA4 totals.** Periods, populations and counting rules differ.

## Independent funnel map

1. **Wix Nassau spa:** discovery channel → Wix in-spa/mobile/service page → selected service + slot → Wix booking/checkout → confirmed appointment → treatment and actual settlement. Analytics connected (Wix and GA4) but event reconciliation incomplete.
2. **MassageBahamas.com standalone:** acquisition → its own mobile service page → booking/availability enquiry → independently configured confirmation and payments → service. This website is not automatically part of the Wix GA4 sample; preserve its separate booking line.
3. **32 country sites:** organic/AI/social/hotel partner → **that market's own website** → area and service information → website-specific form, WhatsApp or approved booking provider → local provider confirmation → payment/service. No inter-Tranquilitas consumer-site redirection.
4. **Caribbean dispatch:** request → island/provider matching → acceptance/arrival → guest payment or post-service collection → final settlement. Operational data are not currently merged with digital acquisition reporting.

## Measurement gaps / next implementation priorities

- Select appropriate Meta ad accounts in connected HYPD (currently none selected), connect Google Ads where applicable, map campaign UTM and actual ad spend.
- Connect all new country Search Console properties and privacy-compliant site-level analytics, **independently per website**.
- Per site use a consistent event taxonomy with proven transitions: `service_view` → `booking_start` → `enquiry_sent` → `booking_confirmed` → `service_completed` → `payment_settled`. Do not treat click as booking.
- Implement secure server-side reporting for private provider transactions, costs, refunds and settlements. Do not store guest names, medical details, phone numbers, PII or API keys in this public repository.
- Audit 32 booking funnels on mobile and desktop and validate actual form receipts without triggering chargeable guest payments.
- For tourism partners, record programme approvals, live URLs, tagged referrals and confirmed bookings after local legal/service verification.

**Data refresh:** This is a **manual dated snapshot**, not a background-synced dashboard. Updating the exported source files in GitHub updates the reports. Automation requires separately configured credentials and secure connectors.
