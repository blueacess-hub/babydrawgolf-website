'use client';

import { useState } from 'react';
import { Check, Moon, Users } from 'lucide-react';
import pricingData from '@/data/pricing.json';
import { trackBookNowClick } from '@/lib/analytics';

const BOOKING_URL = process.env.NEXT_PUBLIC_TRACKMAN_BOOKING_URL || '';
const MEMBERSHIPS_URL = BOOKING_URL
  ? BOOKING_URL.replace(/\/booking\/?$/, '').replace(/\/$/, '') + '/memberships'
  : '';

function RateRow({ selected, onSelect, className, label, children }: {
  selected: boolean;
  onSelect: () => void;
  className: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Select ${label} rate`}
      className={`${className} group w-full cursor-pointer text-left transition-all duration-300 ${
        selected
          ? 'bg-[rgba(69,240,166,.09)] shadow-[inset_3px_0_0_#45F0A6]'
          : 'hover:bg-[rgba(69,240,166,.05)]'
      }`}
    >
      {children}
      <span
        className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
          selected
            ? 'border-trace bg-trace text-carbon-0 scale-100 opacity-100'
            : 'border-[var(--hairline)] scale-75 opacity-0'
        }`}
        aria-hidden="true"
      >
        <Check className="w-3 h-3" strokeWidth={3} />
      </span>
    </button>
  );
}

type MembershipCardProps = {
  selected: boolean;
  onSelect: () => void;
  location: string;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'style' | 'onClick' | 'onSelect'>;

function MembershipCard({ selected, onSelect, location, className, style, children, ...rest }: MembershipCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Select ${location.replace('membership-', '')} membership`}
      className={`${className} relative w-full text-left ${
        selected
          ? 'bg-[rgba(69,240,166,.10)] border-[rgba(69,240,166,.65)] shadow-[0_0_0_1px_rgba(69,240,166,.18),var(--shadow-card)]'
          : ''
      }`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectionCTA({ href, label, emptyLabel, location }: {
  href: string;
  label: string;
  emptyLabel: string;
  location: string;
}) {
  const baseStyles = 'relative w-full inline-flex items-center justify-center gap-2 px-7 py-3 font-data text-[12px] font-bold uppercase tracking-[.08em] rounded-btn transition-all duration-300';

  if (!href) {
    return (
      <button
        type="button"
        disabled
        className={`${baseStyles} cursor-not-allowed border border-[var(--hairline)] bg-carbon-1 text-ink-mute opacity-65`}
      >
        {emptyLabel}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBookNowClick(location)}
      className={`${baseStyles} cta-pulse cursor-pointer bg-trace text-carbon-0 hover:bg-trace-hover hover:shadow-[var(--glow-cta)] hover:-translate-y-0.5 active:scale-[.98]`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}

const memberships = [
  { tier: 'Birdie', price: '$99', unit: '/mo', hours: '8 hrs/month', extra: '$30/hr additional', highlighted: false, lux: false },
  { tier: 'Eagle', price: '$179', unit: '/mo', hours: '15 hrs/month', extra: '$30/hr additional', highlighted: true, lux: false },
  { tier: 'Ace', price: '$249', unit: '/mo', hours: 'Unlimited · 3-hr sessions', extra: 'Free guests anytime', highlighted: false, lux: true },
];

const included = ['Trackman iO simulator', '200+ courses', 'Swing analytics', 'BYOB welcome'];

export default function Pricing() {
  const [selectedRate, setSelectedRate] = useState<string | null>(null);
  const [selectedMembership, setSelectedMembership] = useState<string | null>(null);

  const selectedRateDetails = selectedRate === 'Night Owl'
    ? { tier: 'Night Owl', price: '$30', unit: '/hr' }
    : pricingData.find((tier) => tier.tier === selectedRate);
  const selectedMembershipDetails = selectedMembership === 'Founding 25'
    ? { tier: 'Founding 25', price: '$149', unit: '/mo' }
    : memberships.find((membership) => membership.tier === selectedMembership);
  const membershipHref = selectedMembershipDetails
    ? MEMBERSHIPS_URL || (selectedMembershipDetails.tier === 'Founding 25'
      ? `mailto:${'info@babydrawgolf.net'}?subject=${encodeURIComponent('Founding 25 — claim my spot')}`
      : '')
    : '';

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
            <p className="font-data text-[10px] text-ink-mute mb-2">Select a rate, then continue to booking.</p>
            <div
              className="bg-carbon-2 border border-line rounded-card shadow-[var(--shadow-card)] px-4 md:px-6 py-2"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
            >
              {pricingData.map((tier) => (
                <RateRow
                  key={tier.tier}
                  selected={selectedRate === tier.tier}
                  onSelect={() => setSelectedRate(tier.tier)}
                  label={tier.tier}
                  className="flex items-end gap-3 py-3.5 md:py-4 border-b border-[var(--hairline)] -mx-2 px-2 rounded"
                >
                  <div className="min-w-0">
                    <p className="font-data text-xs md:text-[13px] font-medium tracking-[.15em] text-ink uppercase">{tier.tier}</p>
                    <p className="font-data text-[10px] md:text-[11px] text-ink-mute mt-0.5">{tier.duration} — {tier.description}</p>
                  </div>
                  <div className="leader flex-1 mb-1.5 min-w-4" aria-hidden="true" />
                  <p className="shrink-0 font-data font-bold tabular-nums text-trace-soft group-hover:text-trace transition-colors duration-300 text-[26px] md:text-[32px] leading-none">
                    {tier.price}
                    <span className="text-[11px] md:text-xs font-medium text-ink-mute">{tier.unit}</span>
                  </p>
                </RateRow>
              ))}

              {/* Night Owl is a product, not a discount */}
              <RateRow
                selected={selectedRate === 'Night Owl'}
                onSelect={() => setSelectedRate('Night Owl')}
                label="Night Owl"
                className="flex items-end gap-3 py-3.5 md:py-4 -mx-2 px-2 rounded"
              >
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
              </RateRow>

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
                  <div aria-live="polite">
                    <SelectionCTA
                      href={selectedRateDetails && BOOKING_URL ? BOOKING_URL : ''}
                      label={selectedRateDetails ? `Continue — ${selectedRateDetails.tier} ${selectedRateDetails.price}${selectedRateDetails.unit}` : ''}
                      emptyLabel="Select a rate above"
                      location={`pricing-${selectedRate?.toLowerCase().replaceAll(' ', '-') || 'unselected'}-continue`}
                    />
                  </div>
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
            <p className="font-data text-[10px] text-ink-mute mb-2">Select a membership, then continue to signup.</p>
            {/* Founding 25 — pre-launch charter offer */}
            <button
              type="button"
              onClick={() => setSelectedMembership('Founding 25')}
              aria-pressed={selectedMembership === 'Founding 25'}
              className={`conic-ring relative block w-full text-left bg-[rgba(69,240,166,.07)] border rounded-card px-4 md:px-6 py-3 mb-3 transition-all duration-300 ${
                selectedMembership === 'Founding 25'
                  ? 'border-trace bg-[rgba(69,240,166,.13)] shadow-[0_0_0_1px_rgba(69,240,166,.18),var(--shadow-card)]'
                  : 'border-[rgba(69,240,166,.35)] hover:bg-[rgba(69,240,166,.11)]'
              }`}
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-data text-[10px] md:text-[11px] font-medium tracking-[.18em] text-trace uppercase">
                    Founding 25 — Pre-Opening Only
                  </p>
                  <p className="mt-1 text-xs md:text-[13px] text-ink-body font-normal">
                    Eagle benefits, <strong className="text-ink">locked for life</strong>. 25 spots. Pre-opening payments credit toward future dues.
                  </p>
                </div>
                <p className="shrink-0 font-data font-bold tabular-nums text-trace text-[24px] md:text-[28px] leading-none">
                  $149<span className="text-[11px] md:text-xs font-medium text-ink-mute">/mo</span>
                </p>
              </div>
              <p className="mt-1.5 font-data text-[10px] md:text-[11px] text-trace-soft">
                Select Founding 25
              </p>
            </button>

            <div className="space-y-3">
              {memberships.map((m, i) => (
                <MembershipCard
                  key={m.tier}
                  selected={selectedMembership === m.tier}
                  onSelect={() => setSelectedMembership(m.tier)}
                  location={`membership-${m.tier.toLowerCase()}`}
                  className={`${m.highlighted || m.lux ? 'conic-ring' : ''} ${m.lux ? 'ring-lux' : ''} sheen-host block bg-carbon-2 border border-line rounded-card px-4 md:px-6 py-3.5 md:py-4 cursor-pointer transition-all duration-500 hover:-translate-y-1 ${m.lux ? 'hover:border-[rgba(230,201,126,.5)]' : 'hover:border-[rgba(69,240,166,.4)]'}`}
                  data-reveal
                  style={{ '--i': i + 2 } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-display font-semibold uppercase tracking-wide text-lg md:text-[22px] ${m.lux ? 'tier-lux' : 'text-trace-soft'}`}>
                        {m.tier}
                      </span>
                      {m.highlighted && (
                        <span className="font-data text-[9px] md:text-[10px] font-medium tracking-[.12em] text-trace border border-[rgba(69,240,166,.35)] rounded px-2 py-0.5 uppercase">
                          Best Value
                        </span>
                      )}
                      {m.lux && (
                        <span className="font-data text-[9px] md:text-[10px] font-medium tracking-[.12em] text-[#E6C97E] border border-[rgba(230,201,126,.4)] rounded px-2 py-0.5 uppercase">
                          15 Members Only
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
                </MembershipCard>
              ))}
            </div>

            <div className="mt-4" aria-live="polite">
              <SelectionCTA
                href={membershipHref}
                label={selectedMembershipDetails ? `Continue — ${selectedMembershipDetails.tier} ${selectedMembershipDetails.price}${selectedMembershipDetails.unit}` : ''}
                emptyLabel="Select a membership above"
                location={`membership-${selectedMembership?.toLowerCase().replaceAll(' ', '-') || 'unselected'}-continue`}
              />
            </div>

            {/* Guest policy */}
            <div
              className="mt-3 md:mt-4 flex items-start gap-2.5 bg-[rgba(69,240,166,.06)] border border-[var(--hairline)] rounded-card px-4 py-3"
              data-reveal
              style={{ '--i': 5 } as React.CSSProperties}
            >
              <Users className="w-4 h-4 text-trace mt-0.5 shrink-0" />
              <p className="text-xs md:text-[13px] text-ink-body leading-relaxed font-normal">
                <strong className="text-ink">Bring friends!</strong> Every booking covers up to 4 players per bay — hourly and members alike (members: be present with your guests). All guests sign a waiver. Please keep your group to 4 so every player at the facility has a great experience.
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
