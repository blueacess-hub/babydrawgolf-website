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
    <section className="h-full flex flex-col justify-center bg-white pt-14 md:pt-0">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-12 w-full">
        <div className="text-center">
          <p className="text-primary font-semibold text-xs md:text-sm tracking-widest uppercase">Pricing</p>
          <h2 className="mt-1 md:mt-2 text-xl md:text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
          {/* Hourly Rates */}
          <div>
            <h3 className="text-sm md:text-lg font-bold text-primary-dark mb-2">Hourly Rates</h3>
            <div className="space-y-1.5 md:space-y-2">
              {pricingData.map((tier) => (
                <div key={tier.tier} className={`flex items-center justify-between rounded-lg md:rounded-xl px-3 md:px-5 py-2 md:py-3 ${tier.highlighted ? 'bg-primary-dark text-white' : 'bg-alt-bg'}`}>
                  <div>
                    <p className={`font-bold text-xs md:text-sm ${tier.highlighted ? 'text-white' : 'text-primary-dark'}`}>{tier.tier}</p>
                    <p className={`text-[10px] md:text-xs ${tier.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl md:text-2xl font-bold">{tier.price}</span>
                    <span className={`text-[10px] md:text-xs ${tier.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{tier.unit}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-text pl-1 pt-0.5">
                <Moon className="w-3 h-3 text-primary" />
                Late night midnight–6am: <strong className="text-primary-dark">$30/hr</strong>
              </div>
            </div>
            <div className="mt-2 md:mt-4 bg-alt-bg rounded-lg p-2.5 md:p-4">
              <div className="grid grid-cols-2 gap-1">
                {['Trackman iO simulator', '200+ courses', 'Swing analytics', 'BYOB welcome'].map((f) => (
                  <div key={f} className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-primary" />
                    <span className="text-[10px] md:text-xs text-primary-dark">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 pt-1 border-t border-gray-200">
                <span className="text-[10px] md:text-xs text-gray-text">🏌️ Bring your own clubs or rent ours:</span>
                <span className="text-[10px] md:text-xs font-bold text-primary-dark">$25/person</span>
              </div>
            </div>
          </div>

          {/* Memberships */}
          <div>
            <h3 className="text-sm md:text-lg font-bold text-primary-dark mb-2">Memberships</h3>
            <div className="space-y-1.5 md:space-y-2">
              {memberships.map((m) => (
                <div key={m.tier} className={`relative rounded-lg md:rounded-xl px-3 md:px-5 py-2.5 md:py-4 ${m.highlighted ? 'bg-primary-dark text-white ring-2 ring-primary/30' : 'bg-alt-bg'}`}>
                  {m.highlighted && <span className="absolute -top-1.5 right-3 bg-accent text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full">Best Value</span>}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className={`w-3.5 h-3.5 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className={`font-bold text-xs md:text-sm ${m.highlighted ? 'text-primary-light' : 'text-primary'}`}>{m.tier}</span>
                    </div>
                    <div>
                      <span className="text-xl md:text-2xl font-bold">{m.price}</span>
                      <span className={`text-[10px] md:text-xs ${m.highlighted ? 'text-white/70' : 'text-gray-text'}`}>{m.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Check className={`w-3 h-3 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className="text-[10px] md:text-xs">{m.hours}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className={`w-3 h-3 ${m.highlighted ? 'text-primary-light' : 'text-primary'}`} />
                      <span className="text-[10px] md:text-xs">{m.extra}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Guest policy */}
            <div className="mt-2 md:mt-3 flex items-start gap-1.5 bg-primary-light/50 rounded-lg px-3 py-2">
              <Users className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <p className="text-[10px] md:text-xs text-primary-dark leading-relaxed">
                <strong>Bring friends!</strong> Members can bring up to 3 guests per session. Member must be present. All guests sign a waiver.
              </p>
            </div>
            <p className="mt-1.5 text-[9px] md:text-[10px] text-gray-text/70 text-center">
              Priority booking &amp; 24/7 access. Cancel anytime. Ace limited to ensure availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
