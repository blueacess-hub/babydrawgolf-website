'use client';

import { Moon, Users } from 'lucide-react';
import pricingData from '@/data/pricing.json';
import BookNowButton from './BookNowButton';

const memberships = [
  { tier: 'Birdie', price: '$99', unit: '/mo', hours: '8 hrs/month', extra: '$30/hr additional', highlighted: false },
  { tier: 'Eagle', price: '$179', unit: '/mo', hours: '15 hrs/month', extra: '$30/hr additional', highlighted: true },
  { tier: 'Ace', price: '$249', unit: '/mo', hours: 'Unlimited · 3-hr sessions', extra: 'Limited to 15 members', highlighted: false },
];

const included = ['Trackman iO simulator', '200+ courses', 'Swing analytics', 'BYOB welcome'];

export default function Pricing() {
  return (
    <section className="relative min-h-full flex flex-col justify-center pt-16 md:pt-20 pb-20 md:pb-24 carbon-weave">
      <div className="lightfield" />
      <div className="relative max-w-6xl mx-auto px-5 md:px-6 lg:px-8 py-8 md:py-10 w-full">
        <div className="text-center" data-reveal-group>
          <p
            className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase"
            data-reveal
            style={{ '--i': 0 } as React.CSSProperties}
          >
            04 — Rates
          </p>
          <h2
            className="mt-2 md:mt-3 text-[clamp(1.9rem,4.5vw,3.25rem)]"
            data-reveal
            style={{ '--i': 1 } as React.CSSProperties}
          >
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 mt-5 md:mt-6">
          {/* Zone A — the rate board */}
          <div data-reveal-group>
            <h3
              className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase mb-2"
              data-reveal
              style={{ '--i': 0 } as React.CSSProperties}
            >
              Hourly Rates
            </h3>
            <div
              className="bg-carbon-2 border border-line rounded-card shadow-[var(--shadow-card)] px-4 md:px-6 py-2"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
            >
              {pricingData.map((tier) => (
                <div key={tier.tier} className="flex items-end gap-3 py-3.5 md:py-4 border-b border-[var(--hairline)]">
                  <div className="min-w-0">
                    <p className="font-data text-xs md:text-[13px] font-medium tracking-[.15em] text-ink uppercase">{tier.tier}</p>
                    <p className="font-data text-[10px] md:text-[11px] text-ink-mute mt-0.5">{tier.duration} — {tier.description}</p>
                  </div>
                  <div className="leader flex-1 mb-1.5 min-w-4" aria-hidden="true" />
                  <p className="shrink-0 font-data font-bold tabular-nums text-trace-soft text-[26px] md:text-[32px] leading-none">
                    {tier.price}
                    <span className="text-[11px] md:text-xs font-medium text-ink-mute">{tier.unit}</span>
                  </p>
                </div>
              ))}

              {/* Night Owl is a product, not a discount */}
              <div className="flex items-end gap-3 py-3.5 md:py-4">
                <div className="shrink-0">
                  <p className="font-data text-xs md:text-[13px] font-medium tracking-[.15em] text-trace uppercase flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5" /> Night Owl
                  </p>
                  <p className="font-data text-[10px] md:text-[11px] text-ink-mute mt-0.5">Late night midnight–6am</p>
                </div>
                <div className="leader flex-1 mb-1.5 min-w-4" aria-hidden="true" />
                <p className="shrink-0 font-data font-bold tabular-nums text-trace text-[26px] md:text-[32px] leading-none">
                  $30<span className="text-[11px] md:text-xs font-medium text-ink-mute">/hr</span>
                </p>
              </div>

              <div className="border-t border-[var(--hairline)] py-3.5 md:py-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {included.map((f) => (
                    <p key={f} className="text-xs md:text-[13px] text-ink-body font-normal">
                      <span className="text-ink-mute mr-1.5">—</span>
                      {f}
                    </p>
                  ))}
                </div>
                <p className="mt-2.5 text-[11px] md:text-xs text-ink-mute font-normal">
                  Bring your own clubs or rent ours: <span className="font-data font-bold text-ink">$25/person</span>
                </p>
                <p className="mt-1.5 text-[11px] md:text-xs text-trace-soft font-normal">
                  Per bay, not per person — split it with 3 friends and it&apos;s from ~$9/hr each.
                </p>
                <div className="mt-4">
                  <BookNowButton location="pricing" size="md" className="w-full cta-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Zone B — memberships */}
          <div data-reveal-group>
            <h3
              className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase mb-2"
              data-reveal
              style={{ '--i': 0 } as React.CSSProperties}
            >
              Memberships
            </h3>
            {/* Founding 25 — pre-launch charter offer */}
            <a
              href={`mailto:${'info@babydrawgolf.net'}?subject=${encodeURIComponent('Founding 25 — claim my spot')}`}
              className="conic-ring block bg-[rgba(69,240,166,.07)] border border-[rgba(69,240,166,.35)] rounded-card px-4 md:px-6 py-3 mb-3 hover:bg-[rgba(69,240,166,.11)] transition-colors duration-300"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-data text-[10px] md:text-[11px] font-medium tracking-[.18em] text-trace uppercase">
                    Founding 25 — Pre-Opening Only
                  </p>
                  <p className="mt-1 text-xs md:text-[13px] text-ink-body font-normal">
                    Eagle benefits, <strong className="text-ink">locked for life</strong>. 25 spots. Nothing charged until we open.
                  </p>
                </div>
                <p className="shrink-0 font-data font-bold tabular-nums text-trace text-[24px] md:text-[28px] leading-none">
                  $149<span className="text-[11px] md:text-xs font-medium text-ink-mute">/mo</span>
                </p>
              </div>
              <p className="mt-1.5 font-data text-[10px] md:text-[11px] text-trace-soft">
                Claim a spot →
              </p>
            </a>

            <div className="space-y-3">
              {memberships.map((m, i) => (
                <div
                  key={m.tier}
                  className={`${m.highlighted ? 'conic-ring' : ''} sheen-host bg-carbon-2 border border-line rounded-card px-4 md:px-6 py-3.5 md:py-4 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(69,240,166,.4)]`}
                  data-reveal
                  style={{ '--i': i + 2 } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-semibold uppercase tracking-wide text-trace-soft text-lg md:text-[22px]">
                        {m.tier}
                      </span>
                      {m.highlighted && (
                        <span className="font-data text-[9px] md:text-[10px] font-medium tracking-[.12em] text-trace border border-[rgba(69,240,166,.35)] rounded px-2 py-0.5 uppercase">
                          Best Value
                        </span>
                      )}
                    </div>
                    <p className="font-data font-bold tabular-nums text-ink text-[26px] md:text-[30px] leading-none">
                      {m.price}
                      <span className="text-[11px] md:text-xs font-medium text-ink-mute">{m.unit}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-xs md:text-[13px] text-ink-body font-normal">
                      <span className="text-ink-mute mr-1.5">—</span>
                      {m.hours}
                    </p>
                    <p className="text-xs md:text-[13px] text-ink-body font-normal">
                      <span className="text-ink-mute mr-1.5">—</span>
                      {m.extra}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Guest policy */}
            <div
              className="mt-3 md:mt-4 flex items-start gap-2.5 bg-[rgba(69,240,166,.06)] border border-[var(--hairline)] rounded-card px-4 py-3"
              data-reveal
              style={{ '--i': 5 } as React.CSSProperties}
            >
              <Users className="w-4 h-4 text-trace mt-0.5 shrink-0" />
              <p className="text-xs md:text-[13px] text-ink-body leading-relaxed font-normal">
                <strong className="text-ink">Bring friends!</strong> Members can bring up to 3 guests per session. Member must be present. All guests sign a waiver.
              </p>
            </div>
            <p className="mt-2.5 text-[10px] md:text-[11px] text-ink-mute/80 text-center font-normal" data-reveal style={{ '--i': 5 } as React.CSSProperties}>
              Priority booking &amp; 24/7 access. Cancel anytime. Ace capped at 15 members to keep bays available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
