'use client';

import RadarSweep from './fx/RadarSweep';

const features = [
  { title: '200+ Virtual Courses', description: 'Play Pebble Beach, St Andrews, and more.' },
  { title: 'Full Swing Analytics', description: 'Ball speed, launch angle, spin rate, club path.' },
  { title: 'Slow-Mo Swing Replay', description: 'High-speed camera captures your swing for frame-by-frame analysis.' },
  { title: 'Practice Modes', description: 'Driving range, closest to pin, skills challenges.' },
  { title: 'Multiplayer Ready', description: 'Compete with friends in head-to-head rounds.' },
];

export default function Simulator() {
  return (
    <section className="relative min-h-full flex items-center pt-14 md:pt-0 carbon-weave">
      <div className="lightfield" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div data-reveal-group>
            <p
              className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase"
              data-reveal
              style={{ '--i': 0 } as React.CSSProperties}
            >
              03 — The Simulator
            </p>
            <h2
              className="mt-3 text-[clamp(2rem,5vw,3.5rem)]"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
            >
              Powered by <span className="text-trace">Trackman <span className="normal-case">iO</span></span>
            </h2>
            <div className="line-light mt-6 max-w-[320px]" data-reveal style={{ '--i': 2 } as React.CSSProperties} />
            <p
              className="mt-6 text-base md:text-[17px] text-ink-body leading-relaxed max-w-[58ch] font-normal"
              data-reveal
              style={{ '--i': 2 } as React.CSSProperties}
            >
              The world&apos;s leading golf simulator technology, trusted by PGA Tour professionals.
              Dual-radar tracking captures every aspect of your swing with tour-level accuracy.
            </p>

            {/* Feature strip — instrument list, no icons */}
            <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-x-6" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
              {features.map((f, i) => (
                <div key={f.title} className={`border-t border-[var(--hairline)] py-3 ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                  <h3 className="font-display font-semibold uppercase tracking-wide text-ink text-[13px] md:text-[15px] leading-tight">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-[11px] md:text-xs text-ink-mute leading-relaxed font-normal">{f.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The iO under radar — vitrine stage */}
          <div data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            <RadarSweep />
          </div>
        </div>
      </div>
    </section>
  );
}
