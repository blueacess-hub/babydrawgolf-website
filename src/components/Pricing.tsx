'use client';

import { Check, Moon, Star } from 'lucide-react';
import AnimateIn from './AnimateIn';
import pricingData from '@/data/pricing.json';

const memberships = [
  {
    tier: 'Birdie',
    price: '$99',
    unit: '/mo',
    hours: '8 hrs/month included',
    extra: '$30/hr for additional hours',
    description: 'Casual golfer — play twice a month',
    highlighted: false,
  },
  {
    tier: 'Eagle',
    price: '$179',
    unit: '/mo',
    hours: '20 hrs/month included',
    extra: '$25/hr for additional hours',
    description: 'Weekly player — best value per hour',
    highlighted: true,
  },
  {
    tier: 'Ace',
    price: '$249',
    unit: '/mo',
    hours: 'Unlimited hours',
    extra: '1 free guest hour/month',
    description: 'Serious golfer — unlimited 24/7 access',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-text max-w-2xl mx-auto">
            All sessions include full access to Trackman iO technology and
            clubs available on-site.
          </p>
        </AnimateIn>

        {/* Hourly Rates */}
        <AnimateIn direction="up" delay={0.1}>
          <h3 className="mt-14 text-center text-xl font-bold text-primary-dark">
            Hourly Rates
          </h3>
        </AnimateIn>

        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {pricingData.map((tier, i) => (
            <AnimateIn key={tier.tier} direction="up" delay={0.15 + i * 0.1}>
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  tier.highlighted
                    ? 'bg-primary-dark text-white shadow-2xl ring-4 ring-primary/30 scale-[1.02]'
                    : 'bg-alt-bg text-dark-text shadow-sm'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <p
                  className={`text-sm font-medium ${
                    tier.highlighted ? 'text-primary-light' : 'text-gray-text'
                  }`}
                >
                  {tier.tier}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span
                    className={`text-sm ${
                      tier.highlighted ? 'text-white/70' : 'text-gray-text'
                    }`}
                  >
                    {tier.unit}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    tier.highlighted ? 'text-white/80' : 'text-gray-text'
                  }`}
                >
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          tier.highlighted
                            ? 'text-primary-light'
                            : 'text-primary'
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Late Night callout */}
        <AnimateIn direction="up" delay={0.3}>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-text">
            <Moon className="w-4 h-4 text-primary" />
            <span>
              Late night &amp; early morning (midnight–6am):{' '}
              <strong className="text-primary-dark">$30/hr</strong>
            </span>
          </div>
        </AnimateIn>

        {/* Membership Tiers */}
        <AnimateIn direction="up" delay={0.2}>
          <h3 className="mt-16 text-center text-xl font-bold text-primary-dark">
            Memberships
          </h3>
          <p className="mt-2 text-center text-gray-text">
            Save more with a monthly plan — priority booking &amp; 24/7 access
            included.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {memberships.map((m, i) => (
            <AnimateIn key={m.tier} direction="up" delay={0.3 + i * 0.1}>
              <div
                className={`relative rounded-2xl p-7 h-full flex flex-col ${
                  m.highlighted
                    ? 'bg-primary-dark text-white shadow-2xl ring-4 ring-primary/30 scale-[1.02]'
                    : 'bg-alt-bg text-dark-text shadow-sm'
                }`}
              >
                {m.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                    Best Value
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <Star
                    className={`w-5 h-5 ${
                      m.highlighted ? 'text-primary-light' : 'text-primary'
                    }`}
                  />
                  <p
                    className={`text-sm font-bold ${
                      m.highlighted ? 'text-primary-light' : 'text-primary'
                    }`}
                  >
                    {m.tier}
                  </p>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{m.price}</span>
                  <span
                    className={`text-sm ${
                      m.highlighted ? 'text-white/70' : 'text-gray-text'
                    }`}
                  >
                    {m.unit}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    m.highlighted ? 'text-white/80' : 'text-gray-text'
                  }`}
                >
                  {m.description}
                </p>
                <div className="mt-5 space-y-2">
                  <div className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        m.highlighted ? 'text-primary-light' : 'text-primary'
                      }`}
                    />
                    <span className="text-sm font-medium">{m.hours}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        m.highlighted ? 'text-primary-light' : 'text-primary'
                      }`}
                    />
                    <span className="text-sm">{m.extra}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        m.highlighted ? 'text-primary-light' : 'text-primary'
                      }`}
                    />
                    <span className="text-sm">
                      Priority booking &amp; 24/7 access
                    </span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Fine print */}
        <AnimateIn direction="up" delay={0.4}>
          <p className="mt-8 text-center text-xs text-gray-text/70">
            All prices exclude applicable taxes. Memberships auto-renew
            monthly. Cancel anytime. Ace membership limited to ensure
            availability.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
