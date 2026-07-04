'use client';

import { useCountUp } from '@/lib/hooks';

/**
 * TrackMan-style readout chips for the hero launch sequence.
 * Values are a single consistent demo shot — a gentle draw.
 * Chips flicker on (hud-on) and numerals count up while the tracer flies.
 */

function Chip({ label, value, decimals, unit, i, active }: {
  label: string;
  value: number;
  decimals: number;
  unit: string;
  i: number;
  active: boolean;
}) {
  const ref = useCountUp(value, { duration: 1600, decimals, delay: 300 + i * 90, active });
  return (
    <div
      className="hud-chip px-3.5 py-2.5 md:min-w-[148px]"
      style={{ '--i': i } as React.CSSProperties}
    >
      <p className="font-data text-[9px] md:text-[10px] font-medium tracking-[.15em] text-ink-mute uppercase">
        {label}
      </p>
      <p className="mt-0.5 font-data font-bold tabular-nums text-trace-soft text-xl md:text-[28px] leading-none">
        <span ref={ref}>0</span>
        <span className="ml-1 text-[10px] md:text-[11px] font-medium text-ink-mute">{unit}</span>
      </p>
    </div>
  );
}

export default function HudReadout({ active }: { active: boolean }) {
  const chips = [
    { label: 'Ball Speed', value: 152.7, decimals: 1, unit: 'mph' },
    { label: 'Launch Ang', value: 12.8, decimals: 1, unit: '°' },
    { label: 'Spin Rate', value: 2647, decimals: 0, unit: 'rpm' },
    { label: 'Carry', value: 246, decimals: 0, unit: 'yd' },
  ];

  return (
    <div className="hud-seq flex md:flex-col flex-row flex-wrap gap-2 md:gap-2.5" aria-hidden="true">
      {chips.map((c, i) => (
        <Chip key={c.label} {...c} i={i} active={active} />
      ))}
      {/* The brand punchline chip */}
      <div className="hud-chip hud-stamp px-3.5 py-2.5 md:min-w-[148px]">
        <p className="font-data text-[9px] md:text-[10px] font-medium tracking-[.15em] text-ink-mute uppercase">
          Shot Shape
        </p>
        <p className="mt-0.5 font-data font-bold text-trace text-sm md:text-[15px] tracking-[.1em] leading-none">
          BABY DRAW
        </p>
      </div>
    </div>
  );
}
