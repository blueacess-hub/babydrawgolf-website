# Website → Trackman campaign attribution

Implemented 2026-09-14. Owner: Baby Draw Golf only.

## What this does

- Decorates only HTTPS links for `booking.trackmangolf.com/venues/baby-draw-golf` and its public child pages. Admin, other venues and other hosts are untouched.
- Carries incoming `utm_source`, `utm_medium`, `utm_campaign` and `utm_content` into booking and membership links. Keeps deliberate tags already on a destination link.
- When no campaign exists, generates `bdg_<source>_<medium>_<website-page>` (e.g. `bdg_google_referral_pricing`). This makes the channel/page distinguishable in Trackman's **SessionCampaignName** column.
- Adds the current page and CTA placement to `utm_content` when no original content tag exists.
- Keeps attribution for up to 30 minutes in per-tab sessionStorage across website navigation; new explicit UTMs or Google paid-click markers override it. No persistent customer/session identifier is created.
- No raw referrer URL, search query, click ID, email, name or arbitrary website pathname is forwarded. Labels are bounded and filtered. Mark QA links `utm_source=qa&utm_medium=test&utm_campaign=bdg_qa_YYYYMMDD` and exclude these campaigns from business reports.
- Covers regular, new-tab, keyboard and context-menu links, including dynamically inserted membership CTAs and Caddie links. It does not prevent navigation, introduce a booking interstitial, or change booking products/prices.

## Measurement and limits

Use Vercel Production Analytics for website visitors/pages. Use Trackman Booking & Payments → Reporting → **Web Traffic Report** for campaign-attributed users, purchases and purchase revenue.

Live on 2026-09-14, Trackman's report exposed: SessionCampaignName, Page Views, Page Views Per Session, Total Users, Purchases, Purchase Revenue. This supports aggregate campaign conversion reporting; it is not an order-ID-level attribution export.

- Google referrer is labeled `google / referral`, **not asserted to be organic or non-brand**. Missing referrers remain `direct / none` (unknown source, not proof of a typed URL).
- Existing paid campaigns are preserved, including Meta's numeric campaign IDs. Existing campaign names take precedence over generated page names; `utm_content` detail is not exposed by the current Trackman report.
- Vercel's visitors and Trackman's Total Users use different identity/measurement methods. Do not divide Trackman purchases by Vercel visitors and call it a verified website conversion rate. Even purchases / Total Users is purchases per user, not unique purchaser conversion.
- Trackman Purchase Revenue is analytics-reported revenue, not cash received, net revenue or owner profit. Reconcile finances separately against payment/ledger records.
- Website click custom events/GA4 and Trackman order-ID joins are **not** added by this change. Vercel Hobby currently exposes no custom events; no paid-plan upgrade was made.
- No backfilling of old `(direct)` purchases. No guarantee of cross-device identity, tracking-blocker coverage, or instantaneous report refresh. Consent/ad blockers and disabled JavaScript may prevent attribution.
- Link transfer is testable without purchase; do not place a paid or fake booking to test. Final reporting acceptance requires `bdg_qa_*` appearing in Web Traffic Report after Trackman's processing, followed by an actual non-QA attributed purchase when one occurs.

## Validation and rollback

Run `node --test scripts/booking-attribution.test.mjs`, `npm run lint`, `npm run build`. In Chrome, open a QA-tagged homepage, navigate to `/pricing`, and inspect outgoing booking and membership URLs. Verify production similarly; inspect the loaded Trackman URL, but do not add to cart or pay.

Check report the next day and again after the first genuine attributed purchase. If links break, membership targets change, or tags contain private data, revert this attribution commit and redeploy; the untagged booking links are the fallback. Rollback does not erase collected campaign rows.

Official report guide: https://support.trackmangolf.com/hc/en-us/articles/38065699316891-Reports-How-to-Use-the-Web-Traffic-Report

Trackman purchase webhooks require support enablement and additional payload/security verification; no webhook integration or permissions were created here.
