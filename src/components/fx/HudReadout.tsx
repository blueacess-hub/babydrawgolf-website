'use client';

import { useCountUp } from '@/lib/hooks';

/**
 * TrackMan-style readout chips for the hero launch sequence.
 * Values are a single consistent demo shot — a long, gentle draw
 * (180 mph ball speed ≈ tour long-drive power; numbers stay physically
 * coherent: flatter launch, lower spin, 296 carry).
 * Chips flicker on (hud-on) and numerals count up while the tracer flies.
 */

export const DEMO_SHOT = [
  { label: 'Ball Speed', value: 180.0, decimals: 1, unit: 'mph' },
  { label: 'Launch Ang', value: 11.2, decimals: 1, unit: '°' },
  { label: 'Spin Rate', value: 2350, decimals: 0, unit: 'rpm' },
  { label: 'Carry', value: 296, decimals: 0, unit: 'yd' },
];

function Chip({ label, value, decimals, unit, i, active, compact }: {
  label: string;
  value: number;
  decimals: number;
  unit: string;
  i: number;
  active: boolean;
  compact?: boolean;
}) {
  const ref = useCountUp(value, { duration: 1600, decimals, delay: 300 + i * 90, active });
  return (
    <div
      className={compact ? 'hud-chip px-2.5 py-1.5' : 'hud-chip px-3.5 py-2.5 md:min-w-[148px]'}
      style={{ '--i': i } as React.CSSProperties}
    >
      <p className={`font-data font-medium tracking-[.15em] text-ink-mute uppercase ${compact ? 'text-[8px]' : 'text-[9px] md:text-[10px]'}`}>
        {label}
      </p>
      <p className={`mt-0.5 font-data font-bold tabular-nums text-trace-soft leading-none ${compact ? 'text-[17px]' : 'text-xl md:text-[28px]'}`}>
        <span ref={ref}>0</span>
        <span className={`ml-1 font-medium text-ink-mute ${compact ? 'text-[9px]' : 'text-[10px] md:text-[11px]'}`}>{unit}</span>
      </p>
    </div>
  );
}

export default function HudReadout({ active, compact = false }: { active: boolean; compact?: boolean }) {
  if (compact) {
    // Mobile: 2x2 data grid + full-width shot-shape stamp
    return (
      <div className="hud-seq grid grid-cols-2 gap-1.5 max-w-[300px]" aria-hidden="true">
        {DEMO_SHOT.map((c, i) => (
          <Chip key={c.label} {...c} i={i} active={active} compact />
        ))}
        <div className="hud-chip hud-stamp col-span-2 px-2.5 py-1.5 flex items-center justify-between">
          <p className="font-data text-[8px] font-medium tracking-[.15em] text-ink-mute uppercase">
            Shot Shape
          </p>
          <p className="font-data font-bold text-trace text-[13px] tracking-[.12em] leading-none">
            BABY DRAW
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hud-seq flex md:flex-col flex-row flex-wrap gap-2 md:gap-2.5" aria-hidden="true">
      {DEMO_SHOT.map((c, i) => (
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
