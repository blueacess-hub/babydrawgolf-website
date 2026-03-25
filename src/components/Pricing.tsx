'use client';

import { Check, Moon, Star, Users } from 'lucide-react';
import pricingData from '@/data/pricing.json';

const memberships = [
  { tier: 'Birdie', price: '$99', unit: '/mo', hours: '8 hrs/month', extra: '$30/hr additional', highlighted: false },
  { tier: 'Eagle', price: '$179', unit: '/mo', hours: '20 hrs/month', extra: '$25/hr additional', highlighted: true },
  { tier: 'Ace', price: '$249', unit: '/mo', hours: 'Unlimited hours', extra: 'Free guests anytime', highlighted: false },
];

export default function Pricing() {
  return (
    <section className="min-h-full flex flex-col justify-center bg-white pt-14 md:pt-0">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-8 py-10 md:py-16 w-full">
        <div className="text-center">
          <p className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase">Pricing</p>
          <h2 className="mt-2 md:mt-3 text-2xl md:text-4xl lg:text-5xl font-bold text-primary-dark tracking-tight">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 mt-6 md:mt-10">
          {/* Hourly Rates */}
          <div>
            <h3 className="text-base md:text-xl font-bold text-primary-dark mb-3">Hourly Rates</h3>
            <div className="space-y-2 md:space-y-3">
              {pricingData.map((tier) => (
                <div key={tier.tier} className={`flex items-center justify-between rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 ${tier.highlighted ? 'bg-primary-dark text-white' : 'bg-alt-bg'}`}>
                  <div>
                    <p className={`font-bold text-sm md:text-base ${tier.highlighted ? 'text-white' : 'text-primary-dark'}`}>{tier.tier}</p>
                    <p className={`text-xs md:text-sm ${tier.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl md:text-3xl font-bold">{tier.price}</span>
                    <span className={`text-xs md:text-sm ${tier.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{tier.unit}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-text pl-1 pt-1">
                <Moon className="w-3.5 h-3.5 text-primary" />
                Late night midnight–6am: <strong className="text-primary-dark">$30/hr</strong>
              </div>
            </div>
            <div className="mt-3 md:mt-5 bg-alt-bg rounded-lg p-3 md:p-5">
              <div className="grid grid-cols-2 gap-2">
                {['Trackman iO simulator', '200+ courses', 'Swing analytics', 'BYOB welcome'].map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs md:text-sm text-primary-dark">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 pt-2 border-t border-gray-200">
                <span className="text-xs md:text-sm text-gray-text">🏌️ Bring your own clubs or rent ours:</span>
                <span className="text-xs md:text-sm font-bold text-primary-dark">$25/person</span>
              </div>
            </div>
          </div>

          {/* Memberships */}
          <div>
            <h3 className="text-base md:text-xl font-bold text-primary-dark mb-3">Memberships</h3>
            <div className="space-y-2 md:space-y-3">
              {memberships.map((m) => (
                <div key={m.tier} className={`relative rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-5 ${m.highlighted ? 'bg-primary-dark text-white ring-2 ring-primary/30' : 'bg-alt-bg'}`}>
                  {m.highlighted && <span className="absolute -top-2 right-3 bg-accent text-white text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full">Best Value</span>}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className={`font-bold text-sm md:text-base ${m.highlighted ? 'text-primary-light' : 'text-primary'}`}>{m.tier}</span>
                    </div>
                    <div>
                      <span className="text-2xl md:text-3xl font-bold">{m.price}</span>
                      <span className={`text-xs md:text-sm ${m.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{m.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className="text-xs md:text-sm">{m.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className="text-xs md:text-sm">{m.extra}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Guest policy */}
            <div className="mt-3 md:mt-4 flex items-start gap-2 bg-primary-light/50 rounded-lg px-4 py-3">
              <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs md:text-sm text-primary-dark leading-relaxed">
                <strong>Bring friends!</strong> Members can bring up to 3 guests per session. Member must be present. All guests sign a waiver.
              </p>
            </div>
            <p className="mt-2 text-[10px] md:text-xs text-gray-text/70 text-center">
              Priority booking &amp; 24/7 access. Cancel anytime. Ace limited to ensure availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
