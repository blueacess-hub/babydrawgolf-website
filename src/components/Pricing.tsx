'use client';

import { Check } from 'lucide-react';
import BookNowButton from './BookNowButton';
import AnimateIn from './AnimateIn';
import pricingData from '@/data/pricing.json';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-text max-w-2xl mx-auto">
            Choose the option that fits your game. All sessions include full
            access to Trackman iO technology and clubs.
          </p>
        </AnimateIn>

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
                          tier.highlighted ? 'text-primary-light' : 'text-primary'
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <BookNowButton
                    location="pricing"
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    className="w-full"
                  />
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
