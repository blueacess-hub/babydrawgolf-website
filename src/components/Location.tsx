'use client';

import { MapPin, Clock, Car, Plus } from 'lucide-react';
import { useState } from 'react';
import faqData from '@/data/faq.json';
import siteData from '@/data/site.json';
import Logo from './Logo';

export default function Location() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const mapSrc =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55394.77842697!2d-95.7!3d29.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCypress%2C+TX!5e0!3m2!1sen!2sus!4v1';

  return (
    <section className="relative min-h-full flex flex-col pt-16 md:pt-20">
      <div className="lightfield" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-8 md:py-12 w-full flex-1">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
          {/* Left — Map + Info */}
          <div className="flex flex-col gap-4" data-reveal-group>
            <div data-reveal style={{ '--i': 0 } as React.CSSProperties}>
              <p className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase">
                06 — Visit Us
              </p>
              <h2 className="mt-2 text-[clamp(1.9rem,4.5vw,3rem)]">Find Us in Cypress</h2>
            </div>

            <div
              className="map-dark relative rounded-card overflow-hidden border border-line shadow-[var(--shadow-card)] h-44 md:h-60 lg:h-72"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BABYDRAW GOLF Location"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(69,240,166,.04)' }} />
              <div className="absolute bottom-3 left-3 hud-chip px-3 py-1.5 pointer-events-none">
                <p className="font-data text-[10px] font-medium tracking-[.15em] text-ink-mute uppercase">
                  29.97° N · 95.69° W
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 md:gap-8" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
              {/* 24/7 as jewelry */}
              <div className="shrink-0 pr-5 md:pr-8 border-r border-[var(--hairline)]">
                <p className="font-data text-[10px] font-medium tracking-[.2em] text-ink-mute uppercase">Open</p>
                <p className="font-data font-bold tabular-nums text-trace-soft text-[44px] md:text-[56px] leading-none mt-1">
                  24/7
                </p>
                <p className="font-data text-[9px] md:text-[10px] tracking-[.15em] text-ink-mute uppercase mt-1">
                  Self-Service
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-trace mt-0.5 shrink-0" />
                  <div>
                    <p className="font-display font-semibold uppercase tracking-wide text-ink text-xs md:text-[13px]">Address</p>
                    <p className="text-ink-mute text-xs md:text-[13px] font-normal">Suite 501, Oakhouse Business Park, Cypress, TX</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-trace mt-0.5 shrink-0" />
                  <div>
                    <p className="font-display font-semibold uppercase tracking-wide text-ink text-xs md:text-[13px]">Hours</p>
                    <p className="text-ink-mute text-xs md:text-[13px] font-normal">24/7 Self-Service</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-trace mt-0.5 shrink-0" />
                  <div>
                    <p className="font-display font-semibold uppercase tracking-wide text-ink text-xs md:text-[13px]">Parking</p>
                    <p className="text-ink-mute text-xs md:text-[13px] font-normal">Free on-site</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — FAQ */}
          <div className="flex flex-col" data-reveal-group>
            <h3
              className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase mb-3"
              data-reveal
              style={{ '--i': 0 } as React.CSSProperties}
            >
              FAQ
            </h3>
            <div data-reveal style={{ '--i': 1 } as React.CSSProperties}>
              {faqData.map((item, i) => (
                <div key={i} className="border-t border-[var(--hairline)] last:border-b">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between py-3 md:py-3.5 text-left cursor-pointer group"
                  >
                    <span
                      className={`font-semibold text-sm md:text-[15px] pr-3 transition-colors duration-200 ${
                        openFaq === i ? 'text-trace-soft' : 'text-ink group-hover:text-trace-soft'
                      }`}
                    >
                      {item.question}
                    </span>
                    <Plus
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-45 text-trace' : 'text-ink-mute'
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    inert={openFaq !== i}
                    className="overflow-hidden transition-all duration-200"
                    style={{ maxHeight: openFaq === i ? '200px' : '0', opacity: openFaq === i ? 1 : 0 }}
                  >
                    <p className="pb-3 md:pb-4 text-ink-mute text-[13px] md:text-sm leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative bg-[rgba(7,9,8,.8)] border-t border-[var(--hairline)] py-3 md:py-5 px-5 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-5">
            <Logo color="white" height={22} className="md:h-8" />
            <span className="text-ink-mute font-data text-[10px] md:text-xs hidden sm:inline">{siteData.address.full}</span>
            <a href={`mailto:${siteData.email}`} className="text-trace-soft font-data text-[10px] md:text-xs hover:text-trace hover:underline underline-offset-2">
              {siteData.email}
            </a>
          </div>
          <p className="text-ink-mute font-data text-xs">
            &copy; {new Date().getFullYear()} {siteData.name}
          </p>
        </div>
      </div>
    </section>
  );
}
