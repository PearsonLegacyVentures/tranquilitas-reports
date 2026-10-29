# TRANQUILITAS | CARIBBEAN PERFORMANCE & PRICING
### Management report source chapter · Prepared 28 October 2026

## Coverage
This chapter combines three **different** reporting lenses that must not be merged indiscriminately:

1. **Regional presence** — Tranquilitas Caribbean website market routes: https://caribbean.massagebahamas.com/
2. **Logged regional activity** — first-party `Tranquilitas_Caribbean_Tracker_Simplified` Google Sheet entries; tracker entry dates **12 January–26 March 2026**. These may be backfilled summaries and are **not confirmed treatment dates**.
3. **Published service-price benchmarks** — first-party Caribbean Wellness Pricing Index: https://index.massagebahamas.com/. Source code in `PearsonLegacyVentures/pricing-index`, prices valid as snapshot, not independently collected market competitors.

## Provisional regional tracker

| Reporting measure | Logged amount | Evidence status |
| --- | ---: | --- |
| Total service values marked OK | **$25,192.00** | Provisional; not reconciled to paid bookings |
| Accepted tracker entries | **34** | Distinct Telegram log entries, not individual bookings |
| Service quantities summed | **135** | Product units as logged, not unique guests |
| Modeled 15% commission amount | **$3,778.80** | Theoretical referral allocation, NOT collected cash |
| Entries marked Needs Review | **6** | Excluded from value totals |
| Countries/islands with accepted entries | **13** | Includes Exuma, part of The Bahamas |

### Leading territories by logged service value

| Territory | Recorded service value | Entries |
| --- | ---: | ---: |
| Curaçao | $5,590 | 4 |
| St Barths | $4,554 | 4 |
| Anguilla | $3,750 | 3 |
| Turks and Caicos | $3,440 | 4 |
| Saint Lucia | $2,498 | 4 |
| St Kitts and Nevis | $1,435 | 5 |

**Quality flags:** Two Curaçao entries appear possible duplicates (same territory, product, unit count, amount, and month) and require primary booking verification. An Exuma entry lists quantity six at $170 per treatment but recorded value $840 rather than $1,020. Do not silently correct totals. Some St Barths tracker entries are USD, while the separate pricing index lists EUR; compare without conversion only after checking invoice currency.

## Pricing index coverage

- **20 market records**, of which **16 are priced/active**, and **4 are labelled coming soon** by that separate pricing system.
- **123 published service-price observations** across Swedish, deep tissue, couples, and beach massage, in 60- and/or 90-minute formats.
- Native currency preserved: mainly USD; St Barths is in EUR. No current FX rate was inserted.
- The index stores Tranquilitas menu price snapshots; **do not label these as independently collected competitors' prices**.
- A priced listing does **not** imply therapist coverage, contracted demand, or fulfillment SLA.

## Decisions supported by the data

### 1. Prioritize verified sales, not revenue-sounding log totals
The first meaningful regional management KPI should be **completed, collected bookings net of therapist payout and delivery costs**. Current tracker values are directional evidence of demand and outreach, not profit.

### 2. Reconcile Curaçao first
The apparent double entries are material relative to its $5,590 logged service value. Obtain source booking references from Alex and confirm whether these are repeat services or duplicated logging.

### 3. Give Nassau and Exuma separate capacity management
The Bahamas should remain one jurisdiction for legal reporting but Nassau and Exuma should be separately visible delivery markets to avoid masking staffing and transportation feasibility.

### 4. Keep market presence, service prices and service capability distinct
The Caribbean website provides distribution reach; the pricing index provides retail reference prices; the therapist directory provides actual capability once contacts are verified. They are different stages of market readiness.

## Required EOY financial reconciliation

Before presenting regional revenue as *actual 2026 sales*, match each completed booking to: (a) booking/invoice identifier, (b) client-paid amount and currency, (c) settlement date, (d) therapist payout, (e) commission charged and received, (f) refunds/cancellations, and (g) country of delivery. Do not use the current tracker as booked, paid, or realized revenue until matched.

## Sources and references

- https://docs.google.com/spreadsheets/d/1xnOkiTnrOCBMvFnx2VdlocELUTWCA5BpuiS9gmjtInw/edit
- https://caribbean.massagebahamas.com/
- https://index.massagebahamas.com/
- https://github.com/PearsonLegacyVentures/pricing-index
- Historical data extracts: `/data/caribbean-tracker.json`, `/data/pricing-index.json`

**Publication standard:** suitable for the methodology appendix of Tranquilitas's eventual executive-level annual report. This is management information, **not** audited statutory financial reporting.
