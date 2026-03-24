'use client';

import { Check, Mail } from 'lucide-react';
import AnimateIn from './AnimateIn';
import pricingData from '@/data/pricing.json';

const hasPricing = pricingData.some(
  (t) => !t.price.includes('XX') && !t.price.includes('TBD')
);

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
            clubs provided on-site.
          </p>
        </AnimateIn>

        {hasPricing ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {pricingData.map((tier, i) => (
              <AnimateIn key={tier.tier} direction="up" delay={i * 0.15}>
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
        ) : (
          <AnimateIn direction="up" delay={0.15}>
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-6">
                {pricingData.map((tier) => (
                  <div
                    key={tier.tier}
                    className={`rounded-2xl p-6 text-center ${
                      tier.highlighted
                        ? 'bg-primary-dark text-white shadow-xl'
                        : 'bg-alt-bg text-dark-text'
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        tier.highlighted
                          ? 'text-primary-light'
                          : 'text-gray-text'
                      }`}
                    >
                      {tier.tier}
                    </p>
                    <p className="mt-2 text-2xl font-bold">{tier.duration}</p>
                    <ul className="mt-4 space-y-2 text-left">
                      {tier.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              tier.highlighted
                                ? 'text-primary-light'
                                : 'text-primary'
                            }`}
                          />
                          <span
                            className={
                              tier.highlighted ? 'text-white/80' : ''
                            }
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-lg font-semibold text-primary-dark">
                  Pricing will be announced soon
                </p>
                <p className="mt-2 text-gray-text">
                  Be the first to know when we open bookings.
                </p>
                <a
                  href="mailto:info@babydrawgolf.net"
                  className="mt-4 inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3 rounded-lg hover:bg-accent transition-colors shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Get Notified
                </a>
              </div>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
