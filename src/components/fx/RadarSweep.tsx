'use client';

/**
 * "The iO under radar" — a vitrine-staged pure CSS/SVG scene for the
 * Simulator card: concentric radar rings, a rotating sweep, the ceiling-unit
 * silhouette with a breathing status LED, and one pinned metric callout.
 * Sweep rotation is transform-only, paused off-active (.amb), static <768px.
 */

export default function RadarSweep() {
  return (
    <div
      className="relative rounded-card overflow-hidden border border-line"
      style={{
        background: 'radial-gradient(120% 90% at 50% 22%, #10241A, #070908 72%)',
        boxShadow: 'var(--shadow-card), inset 0 0 0 1px rgba(69,240,166,.12)',
      }}
      aria-hidden="true"
    >
      {/* Breathing spotlight cone from above */}
      <div
        className="amb absolute inset-0 pointer-events-none"
        style={{
          background: 'conic-gradient(from 178deg at 50% -12%, transparent 43%, rgba(216,243,220,.06) 50%, transparent 57%)',
          animation: 'coneBreath 6s ease-in-out infinite',
        }}
      />
      {/* Floor light pool */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: 'radial-gradient(60% 90% at 50% 100%, rgba(69,240,166,.07), transparent 70%)' }}
      />

      <div className="relative mx-auto aspect-square max-w-[460px] p-6">
        {/* Radar rings */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
          <circle cx="200" cy="200" r="182" fill="none" stroke="rgba(69,240,166,.09)" strokeWidth="1" />
          <circle cx="200" cy="200" r="128" fill="none" stroke="rgba(69,240,166,.06)" strokeWidth="1" />
          <circle cx="200" cy="200" r="74" fill="none" stroke="rgba(69,240,166,.03)" strokeWidth="1" />
        </svg>

        {/* Rotating sweep — transform-only, cheap on phones too; paused
            off-active via .amb */}
        <div
          className="amb absolute inset-[6%] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgba(69,240,166,.16), transparent 26%)',
            WebkitMaskImage: 'radial-gradient(circle, black 58%, transparent 70%)',
            maskImage: 'radial-gradient(circle, black 58%, transparent 70%)',
            animation: 'radarSpin 7s linear infinite',
          }}
        />

        {/* Ceiling-unit silhouette + breathing LED */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
          <rect x="120" y="178" width="160" height="44" rx="10" fill="#0D100E" stroke="#26302A" strokeWidth="1" />
          <rect x="136" y="192" width="52" height="16" rx="4" fill="none" stroke="rgba(213,255,229,.14)" strokeWidth="1" />
          <circle cx="262" cy="200" r="4" fill="#45F0A6" className="amb" style={{ animation: 'ledBreath 3s ease-in-out infinite' }} />
        </svg>

        {/* Pinned metric callout */}
        <div className="absolute right-[2%] top-[16%] flex items-center">
          <div className="h-px w-6 bg-[rgba(125,245,191,.4)]" />
          <div className="hud-chip px-3 py-2">
            <p className="font-data text-[9px] font-medium tracking-[.15em] text-ink-mute uppercase">Launch</p>
            <p className="font-data font-bold tabular-nums text-trace-soft text-lg leading-none mt-0.5">
              11.2<span className="ml-0.5 text-[10px] font-medium text-ink-mute">°</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stage badge */}
      <div className="absolute top-4 left-4 hud-chip px-3 py-1.5">
        <p className="font-data text-[10px] font-medium tracking-[.18em] text-ink-mute uppercase">
          Powered by Trackman iO
        </p>
      </div>
    </div>
  );
}
