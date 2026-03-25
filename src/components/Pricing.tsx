'use client';

import { Check, Moon, Star } from 'lucide-react';
import pricingData from '@/data/pricing.json';

const memberships = [
  { tier: 'Birdie', price: '$99', unit: '/mo', hours: '8 hrs/month', extra: '$30/hr additional', highlighted: false },
  { tier: 'Eagle', price: '$179', unit: '/mo', hours: '20 hrs/month', extra: '$25/hr additional', highlighted: true },
  { tier: 'Ace', price: '$249', unit: '/mo', hours: 'Unlimited', extra: '1 free guest hr/mo', highlighted: false },
];

export default function Pricing() {
  return (
    <section className="h-full flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 w-full">
        <div className="text-center">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase">Pricing</p>
          <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Hourly Rates */}
          <div>
            <h3 className="text-lg font-bold text-primary-dark mb-3">Hourly Rates</h3>
            <div className="space-y-2">
              {pricingData.map((tier) => (
                <div key={tier.tier} className={`flex items-center justify-between rounded-xl px-5 py-3 ${tier.highlighted ? 'bg-primary-dark text-white' : 'bg-alt-bg'}`}>
                  <div>
                    <p className={`font-bold text-sm ${tier.highlighted ? 'text-white' : 'text-primary-dark'}`}>{tier.tier}</p>
                    <p className={`text-xs ${tier.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{tier.price}</span>
                    <span className={`text-xs ${tier.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{tier.unit}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs text-gray-text pl-2 pt-1">
                <Moon className="w-3.5 h-3.5 text-primary" />
                Late night midnight–6am: <strong className="text-primary-dark">$30/hr</strong>
              </div>
            </div>
            <div className="mt-4 bg-alt-bg rounded-xl p-4">
              <p className="text-xs text-gray-text">All sessions include:</p>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {['Trackman iO simulator', '200+ courses', 'Swing analytics', 'Clubs on-site'].map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-primary-dark">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Memberships */}
          <div>
            <h3 className="text-lg font-bold text-primary-dark mb-3">Memberships</h3>
            <div className="space-y-2">
              {memberships.map((m) => (
                <div key={m.tier} className={`relative rounded-xl px-5 py-4 ${m.highlighted ? 'bg-primary-dark text-white ring-2 ring-primary/30' : 'bg-alt-bg'}`}>
                  {m.highlighted && <span className="absolute -top-2 right-4 bg-accent text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Best Value</span>}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className={`font-bold text-sm ${m.highlighted ? 'text-primary-light' : 'text-primary'}`}>{m.tier}</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold">{m.price}</span>
                      <span className={`text-xs ${m.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{m.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Check className={`w-3.5 h-3.5 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className="text-xs">{m.hours}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className={`w-3.5 h-3.5 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className="text-xs">{m.extra}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-gray-text/70 text-center">
              Priority booking &amp; 24/7 access. Cancel anytime. Ace limited to ensure availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
