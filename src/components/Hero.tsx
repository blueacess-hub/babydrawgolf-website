'use client';

import { useState } from 'react';
import BookNowButton from './BookNowButton';
import TracerArc from './fx/TracerArc';
import HudReadout from './fx/HudReadout';

export default function Hero({ active = true }: { active?: boolean }) {
  // Remount the launch sequence each time the card re-activates so the
  // tracer + HUD replay. Render-time previous-value comparison (no effect).
  const [seq, setSeq] = useState({ active, launch: active ? 1 : 0 });
  if (seq.active !== active) {
    setSeq({ active, launch: active ? seq.launch + 1 : seq.launch });
  }
  const launch = seq.launch;

  return (
    // min-h-full + justify-end (not h-full + overflow-hidden): in short
    // viewports (phone landscape) the section grows and the card's own
    // y-scroll takes over instead of clipping the headline unreachably.
    <section className="relative min-h-full flex flex-col justify-end">
      {/* Bay photo, graded + slow Ken Burns push.
          Mobile gets a purpose-shot portrait (golfer facing the sim screen);
          desktop keeps the wide bay photo. <picture> loads only the match. */}
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/hero-mobile.jpg" />
          <img
            src="https://images.pexels.com/photos/31212256/pexels-photo-31212256.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="img-grade kenburns amb absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
        </picture>
      </div>
      {/* Bottom-weighted scrim melts the photo into the page */}
      <div className="absolute inset-0" style={{ background: 'var(--scrim-hero)' }} />
      <div
        className="absolute inset-0 hidden md:block"
        style={{ background: 'linear-gradient(90deg, rgba(7,9,8,.5), transparent 55%)' }}
      />
      <div className="lightfield" />

      {/* Launch sequence: tracer arc + HUD readouts (replays per activation) */}
      <div key={launch} className="absolute inset-0 pointer-events-none">
        <TracerArc />
        <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 hidden md:block">
          <HudReadout active={active} />
        </div>
      </div>

      {/* Copy — bottom-left anchored by the section's justify-end */}
      <div className="relative z-10">
        <div
          className="px-5 md:px-16 lg:px-24 max-w-3xl pb-[calc(88px+env(safe-area-inset-bottom))] md:pb-[calc(110px+env(safe-area-inset-bottom))]"
          data-reveal-group
        >
          {/* Broadcast eyebrow */}
          <div
            className="flex items-center gap-3 font-data text-[10px] md:text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase"
            data-reveal
            style={{ '--i': 0 } as React.CSSProperties}
          >
            <span className="inline-block w-6 h-px bg-[var(--hairline)]" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <span
                className="amb inline-block w-1.5 h-1.5 rounded-full bg-rec"
                style={{ animation: 'liveDot 2s ease-in-out infinite' }}
                aria-hidden="true"
              />
              PRE-OPENING
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <span className="hidden min-[430px]:inline">Bridgeland · </span>
              Cypress TX — Opening Mid-August
            </span>
          </div>

          <h1
            className="mt-3 md:mt-4 text-[clamp(2.3rem,10.5vw,3rem)] md:text-[clamp(2.75rem,8.5vw,6rem)]"
            data-reveal
            style={{ '--i': 1 } as React.CSSProperties}
          >
            Your Private Golf Bay.
            <br />
            <span className="text-trace" style={{ textShadow: 'var(--glow-text)' }}>
              Opening Mid-August.
            </span>
          </h1>

          <p
            className="mt-3 md:mt-5 text-[15px] md:text-lg text-ink-body max-w-[52ch] leading-relaxed"
            data-reveal
            style={{ '--i': 2 } as React.CSSProperties}
          >
            Three private bays. Tour-level Trackman iO. Sign up now for
            priority access before we open in mid-August 2026. 24/7
            self-service access after launch.
          </p>

          <p
            className="mt-2 font-data text-[11px] md:text-xs text-trace-soft uppercase tracking-[.12em]"
            data-reveal
            style={{ '--i': 3 } as React.CSSProperties}
          >
            Expected opening: mid-August 2026
          </p>

          <div className="mt-5 md:mt-8" data-reveal style={{ '--i': 4 } as React.CSSProperties}>
            <BookNowButton location="hero" size="lg" className="cta-launch cta-pulse" />
          </div>

          {/* Mobile: full TrackMan readout grid below the CTA */}
          <div key={`m-${launch}`} className="mt-4 md:hidden">
            <HudReadout active={active} compact />
          </div>
        </div>
      </div>

      {/* Mobile swipe cue */}
      <div
        className="md:hidden absolute right-4 bottom-[calc(27px+env(safe-area-inset-bottom))] z-10 font-data text-[10px] tracking-[.2em] text-ink-mute uppercase pointer-events-none"
        aria-hidden="true"
      >
        Swipe{' '}
        <span className="amb inline-block" style={{ animation: 'swipeNudge 2s ease-in-out infinite' }}>
          →
        </span>
      </div>
    </section>
  );
}
