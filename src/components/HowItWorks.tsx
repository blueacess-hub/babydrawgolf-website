'use client';

import { useState } from 'react';
import { CalendarCheck, KeyRound, DoorOpen, MonitorPlay } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks';

const steps = [
  { icon: CalendarCheck, step: '01', title: 'Book Online', desc: 'Choose your date and time. Pay securely online.' },
  { icon: KeyRound, step: '02', title: 'Get Your PIN', desc: 'Receive a unique access PIN via email and the Trackman App.' },
  { icon: DoorOpen, step: '03', title: 'Walk In', desc: 'Enter the facility with your PIN code. The bay is ready.' },
  { icon: MonitorPlay, step: '04', title: 'Play', desc: 'The simulator starts automatically. Choose your course and enjoy!' },
];

/* Arc motif use #2: a dotted flight path threading the four steps, with a
   comet that flies it once per activation (SMIL animateMotion — remounted
   via key to replay). */
function FlightPlanArc({ run }: { run: number }) {
  return (
    <svg
      key={run}
      viewBox="0 0 1000 200"
      className="hidden lg:block absolute inset-x-0 top-[68px] w-full h-[200px] pointer-events-none"
      aria-hidden="true"
    >
      <path
        d="M 30 150 Q 500 -20 970 110"
        fill="none"
        stroke="rgba(69,240,166,.35)"
        strokeWidth="1.5"
        strokeDasharray="2 7"
      />
      {run > 0 && (
        <circle r="5" fill="#C9FFE4" style={{ filter: 'drop-shadow(0 0 6px rgba(69,240,166,.9))' }}>
          <animateMotion dur="1.8s" begin="0.4s" fill="freeze" path="M 30 150 Q 500 -20 970 110" />
        </circle>
      )}
      <circle
        cx="970" cy="110" r="14"
        fill="none" stroke="#45F0A6" strokeWidth="1.5"
        style={{
          opacity: 0,
          transformOrigin: '970px 110px',
          animation: run > 0 ? 'pulseRing .6s var(--ease-hud) 2.2s forwards' : 'none',
        }}
      />
    </svg>
  );
}

/* Topo contour backdrop (PuttView green-reading motif — static, free) */
function TopoContours() {
  return (
    <svg viewBox="0 0 1440 800" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={720 + i * 26}
          cy={430 - i * 14}
          rx={340 + i * 130}
          ry={170 + i * 70}
          fill="none"
          stroke="rgba(213,255,229,.045)"
          strokeWidth="1"
          transform={`rotate(${-8 + i * 2} 720 430)`}
        />
      ))}
    </svg>
  );
}

export default function HowItWorks({ active = false }: { active?: boolean }) {
  const reduced = useReducedMotion();
  // Replay the comet each activation — render-time previous-value comparison.
  const [seq, setSeq] = useState({ active, run: active ? 1 : 0 });
  if (seq.active !== active) {
    setSeq({ active, run: active ? seq.run + 1 : seq.run });
  }
  const run = seq.run;

  return (
    <section className="relative min-h-full flex items-center pt-14 md:pt-0">
      <TopoContours />
      <div className="lightfield" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-12 lg:py-16 w-full text-center">
        <div data-reveal-group>
          <p
            className="font-data text-[11px] font-medium tracking-[.18em] text-ink-mute uppercase"
            data-reveal
            style={{ '--i': 0 } as React.CSSProperties}
          >
            05 — Getting Started
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,5vw,3.5rem)]"
            data-reveal
            style={{ '--i': 1 } as React.CSSProperties}
          >
            How It Works
          </h2>
          <p
            className="mt-4 text-base md:text-lg text-ink-mute max-w-xl mx-auto font-normal"
            data-reveal
            style={{ '--i': 2 } as React.CSSProperties}
          >
            From booking to first swing in 4 simple steps.
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          <FlightPlanArc run={reduced ? 0 : run} />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" data-reveal-group>
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="relative text-center"
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
              >
                {/* Ghost numeral */}
                <p
                  className="font-data font-bold text-[52px] md:text-[64px] leading-none select-none"
                  style={{ color: 'rgba(69,240,166,.18)' }}
                  aria-hidden="true"
                >
                  {step.step}
                </p>
                <div className="-mt-6 md:-mt-7 w-16 h-16 md:w-[72px] md:h-[72px] mx-auto bg-carbon-2 border border-[rgba(69,240,166,.3)] rounded-full flex items-center justify-center relative shadow-[var(--shadow-card)]">
                  <step.icon className="w-7 h-7 md:w-8 md:h-8 text-trace" />
                </div>
                <h3 className="mt-4 font-display font-semibold uppercase tracking-wide text-lg md:text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink-mute text-[13px] md:text-sm leading-relaxed max-w-[220px] mx-auto font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 md:mt-12 text-ink-mute text-sm md:text-base font-normal" data-reveal>
          Need help? Contact us at{' '}
          <a
            href="mailto:info@babydrawgolf.net"
            className="text-trace-soft underline underline-offset-4 decoration-[rgba(69,240,166,.4)] hover:text-trace"
          >
            info@babydrawgolf.net
          </a>
        </p>
      </div>
    </section>
  );
}
