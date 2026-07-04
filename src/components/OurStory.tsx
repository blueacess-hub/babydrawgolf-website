'use client';

import { Heart, Trophy, Users, Clock } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Born from Passion', desc: 'We are golfers first. This bay exists because we wanted one in our neighborhood.' },
  { icon: Users, title: 'Bridgeland Community', desc: 'Built for our neighbors — raising the game from Bridgeland to Cypress.' },
  { icon: Trophy, title: 'Compete & Grow', desc: 'Monthly tournaments, leagues, and Bridgeland-wide challenges.' },
  { icon: Clock, title: '24/7 Your Schedule', desc: 'No tee times, no waiting. Practice at midnight or 6am.' },
];

export default function OurStory() {
  return (
    <section className="relative min-h-full flex flex-col justify-center pt-14 md:pt-0">
      <div className="lightfield" />
      {/* Projector beam from top-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'conic-gradient(from 145deg at -5% -10%, transparent 42%, rgba(216,243,220,.05) 50%, transparent 58%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-10 lg:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Story */}
          <div data-reveal-group>
            <p
              className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase"
              data-reveal
              style={{ '--i': 0 } as React.CSSProperties}
            >
              02 — Our Story
            </p>
            <h2
              className="mt-3 text-[clamp(2rem,5vw,3.5rem)]"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
            >
              Built in Bridgeland,
              <br />
              for Bridgeland.
            </h2>
            <div className="line-light mt-6 max-w-[320px]" data-reveal style={{ '--i': 2 } as React.CSSProperties} />

            <p
              className="mt-6 text-base md:text-[17px] text-ink-body leading-relaxed max-w-[60ch] font-normal"
              data-reveal
              style={{ '--i': 2 } as React.CSSProperties}
            >
              We live in Bridgeland. We love golf. And we were frustrated — the nearest quality
              simulator was a 30-minute drive, always crowded, always on someone else&apos;s schedule.
              So we built BABYDRAW GOLF right here in our own community.
            </p>
            <p
              className="mt-4 text-base md:text-[17px] text-ink-body leading-relaxed max-w-[60ch] font-normal"
              data-reveal
              style={{ '--i': 3 } as React.CSSProperties}
            >
              We want to raise the level of golf across Bridgeland and Cypress — hosting monthly
              tournaments, organizing neighborhood leagues, and giving every golfer here access to
              the same Trackman iO technology the PGA Tour pros use.
            </p>

            {/* Pull-quote */}
            <blockquote
              className="mt-7 border-l-2 border-trace pl-5 font-display font-medium text-[22px] md:text-[26px] leading-snug text-ink"
              data-reveal
              style={{ '--i': 4 } as React.CSSProperties}
            >
              Whether you are picking up a club for the first time or grinding to break 80,
              this is your home course.
            </blockquote>
          </div>

          {/* Image + values */}
          <div data-reveal-group>
            <div
              className="img-grade-wrap relative rounded-card overflow-hidden border border-line shadow-[var(--shadow-card)] h-56 md:h-72"
              data-reveal
              style={{ '--i': 0 } as React.CSSProperties}
            >
              <img
                src="https://images.unsplash.com/photo-1505794718076-13e166c01a33?w=1600&q=80"
                alt="Golfer at full swing against the evening sky"
                className="img-grade kenburns amb w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 hud-chip px-3 py-1.5 z-[1]">
                <p className="font-data text-[10px] font-medium tracking-[.18em] text-ink-mute uppercase">
                  Your Home Course
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-5">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="sheen-host bg-carbon-2 border border-line rounded-card p-4 md:p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(69,240,166,.4)]"
                  data-reveal
                  style={{ '--i': i + 1 } as React.CSSProperties}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-[10px] bg-[rgba(69,240,166,.1)] flex items-center justify-center">
                    <v.icon className="w-4 h-4 md:w-5 md:h-5 text-trace" />
                  </div>
                  <h3 className="mt-3 font-display font-semibold uppercase tracking-wide text-ink text-sm md:text-[15px]">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs md:text-[13px] text-ink-mute leading-relaxed font-normal">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
