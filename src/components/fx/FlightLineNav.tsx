'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * FlightLine — the deck IS a golf shot. Replaces the dot indicators with the
 * logo's trajectory arc: a glowing ball travels the path as you swipe, the
 * traveled portion of the arc lights up behind it, and the flag ignites when
 * you land on the last card. Same six buttons, handlers and aria-labels as
 * the dots it replaces.
 *
 * Ball/fill updates are direct attribute writes inside a self-stopping rAF —
 * no React state per frame.
 */

const PATH_D = 'M 14 40 Q 130 6 246 40';
const VB_W = 260;
const VB_H = 48;

// SSR-safe node positions (quadratic bezier at u = i/5); refined on the
// client to exact arc-length fractions so nodes sit where the ball rests.
const STATIC_NODES = [
  { x: 14, y: 40 },
  { x: 60.4, y: 29.12 },
  { x: 106.8, y: 23.68 },
  { x: 153.2, y: 23.68 },
  { x: 199.6, y: 29.12 },
  { x: 246, y: 40 },
];

interface Props {
  sections: { id: string; label: string }[];
  activeIndex: number;
  onSelect: (i: number) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function FlightLineNav({ sections, activeIndex, onSelect, scrollRef }: Props) {
  const measureRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<SVGGElement>(null);
  const [nodes, setNodes] = useState(STATIC_NODES);
  const shown = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const p = measureRef.current;
    if (!p) return;
    const total = p.getTotalLength();
    setNodes(
      sections.map((_, i) => {
        const pt = p.getPointAtLength((i / (sections.length - 1)) * total);
        return { x: pt.x, y: pt.y };
      })
    );
  }, [sections]);

  const paint = useCallback((prog: number) => {
    if (fillRef.current) fillRef.current.setAttribute('stroke-dashoffset', String(1 - prog));
    const p = measureRef.current;
    const b = ballRef.current;
    if (p && b) {
      const pt = p.getPointAtLength(prog * p.getTotalLength());
      b.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const target = () => {
      const max = el.scrollWidth - el.clientWidth;
      return max > 0 ? el.scrollLeft / max : 0;
    };
    const tick = () => {
      const t = target();
      shown.current += (t - shown.current) * 0.16;
      if (Math.abs(t - shown.current) < 0.0008) {
        shown.current = t;
        paint(t);
        raf.current = 0;
        return;
      }
      paint(shown.current);
      raf.current = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (reduced) {
        shown.current = target();
        paint(shown.current);
        return;
      }
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    shown.current = target();
    paint(shown.current);
    return () => {
      el.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [scrollRef, paint]);

  const landed = activeIndex === sections.length - 1;

  return (
    <div className="fixed-bottom-safe fixed left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 md:gap-2.5 rounded-full border border-[var(--hairline)] bg-[rgba(5,8,7,.6)] px-3 md:px-4 py-1">
      <span className="font-data font-bold text-[12px] md:text-[13px] tabular-nums text-trace" aria-hidden="true">
        {String(activeIndex + 1).padStart(2, '0')}
      </span>

      {/* Whole-strip tap handler: on touch widths the 36px node buttons would
          overlap (~27px spacing), so a strip tap maps to the nearest node.
          Direct button hits (desktop) are left to the buttons themselves. */}
      <div
        className="relative w-[150px] h-[30px] md:w-[240px] md:h-[44px]"
        onPointerUp={(e) => {
          if ((e.target as HTMLElement).tagName === 'BUTTON') return;
          const rect = e.currentTarget.getBoundingClientRect();
          const frac = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
          let best = 0;
          let bestDist = Infinity;
          nodes.forEach((n, i) => {
            const d = Math.abs(n.x / VB_W - frac);
            if (d < bestDist) { bestDist = d; best = i; }
          });
          onSelect(best);
        }}
      >
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
          {/* Base arc + measurement path */}
          <path ref={measureRef} d={PATH_D} fill="none" stroke="rgba(213,255,229,.22)" strokeWidth="1.5" />
          {/* Traveled portion lights up behind the ball */}
          <path
            ref={fillRef}
            d={PATH_D}
            fill="none"
            stroke="#45F0A6"
            strokeWidth="2"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
            style={{ filter: 'drop-shadow(0 0 4px rgba(69,240,166,.55))' }}
          />

          {/* Node stations */}
          {nodes.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={i === activeIndex ? 3.5 : 2.5}
              fill={i <= activeIndex ? '#45F0A6' : 'rgba(207,248,225,.35)'}
              style={i === activeIndex ? { filter: 'drop-shadow(0 0 6px rgba(69,240,166,.8))' } : undefined}
            />
          ))}

          {/* Flag at the landing node — ignites and waves on the last card */}
          <g key={landed ? 'lit' : 'dark'}>
            <line
              x1={246} y1={40} x2={246} y2={20}
              stroke={landed ? '#45F0A6' : 'rgba(213,255,229,.4)'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <polygon
              points="246,20 246,27.5 254,23.75"
              fill={landed ? '#45F0A6' : 'rgba(213,255,229,.4)'}
              style={landed ? {
                transformOrigin: '246px 27.5px',
                animation: 'flagWave .8s var(--ease-hud) .1s both',
                filter: 'drop-shadow(0 0 5px rgba(69,240,166,.7))',
              } : undefined}
            />
          </g>

          {/* The ball */}
          <g ref={ballRef}>
            <circle r="7" fill="rgba(69,240,166,.18)" />
            <circle r="3.5" fill="#C9FFE4" style={{ filter: 'drop-shadow(0 0 6px rgba(69,240,166,.9))' }} />
          </g>
        </svg>

        {/* Invisible hit areas — the same six buttons as before. Below md they
            are pointer-inert (the strip handler owns taps — overlapping 36px
            targets caused wrong-section taps) but stay keyboard/AT-activatable. */}
        {nodes.map((n, i) => (
          <button
            key={sections[i].id}
            onClick={() => onSelect(i)}
            aria-label={sections[i].label}
            aria-current={i === activeIndex ? 'true' : undefined}
            className="absolute w-9 h-9 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer pointer-events-none md:pointer-events-auto"
            style={{ left: `${(n.x / VB_W) * 100}%`, top: `${(n.y / VB_H) * 100}%` }}
          />
        ))}
      </div>

      <span className="font-data text-[10px] md:text-[11px] tabular-nums text-ink-mute whitespace-nowrap" aria-hidden="true">
        / {String(sections.length).padStart(2, '0')}
      </span>
    </div>
  );
}
