# Reports UI/UX refinements — prompt playbook (16 Nov 2026)

Source reviewed: https://www.tiktok.com/@buildwithomar/video/7707450340576103702
Evidence: full spoken transcript plus timestamped video scene analysis. Seven successive prompts are paraphrased below; not a verbatim republication. The video depicts a generic desktop dashboard. Our implementation must reflect the existing Tranquilitas reporting product, not copy an unrelated UI.

## Seven sequential prompts for this application

### 1. Visual polish (0:03–0:08)
"Audit Tranquilitas Intelligence's existing interface. Improve typographic hierarchy, alignment, spacing rhythm, responsive layout, consistent cards, table readability, and clear focus states. Preserve the current Tranquilitas cream/ink/teal/gold visual identity and existing data, business logic, routes, and source notes. Don't replace functional views with placeholder content."

### 2. Group by relationship (0:11–0:15)
"Organize the interface by reporting tasks and relationships: executive performance, financial/quarterly history, service and customer demand, markets/partners, digital properties/acquisition, and reporting methodology. Keep key decision-support KPIs visible, label each period/source, and group closely related controls. Do not conflate Wix commerce with cash collected or market-site counts with staffed therapist coverage."

### 3. Primary-action microinteraction (0:17–0:28)
"For genuine primary actions such as Print report or Export CSV, add restrained hover/focus feedback and purposeful icon motion. Never change button text to false outcomes, imaginary invoice collection, or unsupported amounts. Do not create a send action where none exists. Respect prefers-reduced-motion and preserve touch/keyboard usability."
Video's example is an invoice button changing to a monetary-result label with an animated paper plane; that is illustrative only and must not be copied to reporting data.

### 4. Restrained frosted layers (0:30–0:41)
"On desktop, gently layer key panels using near-opaque white/cream backgrounds, delicate borders, subtle shadows and optional backdrop blur. Keep numerical text, charts and tables high-contrast and crisp. Avoid full-screen dark glass, heavy blur, degraded performance or decorative treatment on mobile and print views."

### 5. Secondary material into disclosures (0:43–0:51)
"Collapse genuinely secondary explanatory information into accessible native disclosure elements based on the order users complete their tasks. Always show KPI definitions and material source/financial caveats; never hide essential methodology, data gaps or settlement warnings. Keyboard, touch, print and screen-reader states must remain usable."

### 6. Group and label navigation (0:52–1:05)
"Consolidate sidebar destinations into labelled groups: Reporting, Markets & Partners, Digital Intelligence, and Sources. Show recognizable consistent icons with accessible labels. Keep the active page and its group visible. Preserve deep links and add a discoverable mobile menu; don't lose routes."

### 7. Compact search and command palette (1:05–1:20)
"Add a small topbar 'Search reports' affordance displaying Ctrl/Command-K. Opening it shows an accessible modal listing real report destinations and only actually supported actions, filtered as users type. Support pointer, keyboard, Escape, focus return and reduced motion. Do not invent search over private business records or implement nonfunctional buttons."

## Fit to the current repository
- Stack: static no-build HTML/CSS/JS. Pages: index.html, caribbean.html, markets.html, portfolio.html, channels.html.
- Existing brand CSS has editorial cream/ink/teal/gold values. Preserve these and high-contrast data visuals.
- Repo is public; do not commit customer or partner records, credentials, local storage contents, or financial account details.
- Reporting values, date windows, source-quality caveats, POC unlock and local-browser financial records remain untouched.
- Mobile navigation is currently hidden in the legacy stylesheet. A discoverable disclosure is an important usability fix.
- Reuse one shared CSS/JS enhancement rather than five independent implementations.

## Priority and acceptance checks
1. Nav groups + mobile discoverability: all existing links and active destinations remain available; no collisions on 320–1440px.
2. Command-K quick actions: works via click and keyboard, filters only the existing in-page/internal report links and actual buttons, handles Escape.
3. Layering + primary-action feedback: clear without novelty overload; printable report remains clean.
4. Optional future disclosures: only secondary materials, never core evidence or caveats.
5. Verify source values unchanged, CSP/script loading, cross-page links, exports, print, partner POC/import flows, and reduced-motion.

No live deployment is implied by this document. Review feature branch, perform mobile/desktop QA, then merge only after approval.