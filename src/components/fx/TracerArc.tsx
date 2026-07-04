'use client';

/**
 * The signature hero tracer: a neon ball-flight arc that draws itself across
 * the dark bay photo — launch, apex marker, landing ring. The path curves
 * right-to-left at the end: a literal baby draw.
 * Pure CSS/SVG animation (classes in globals.css); the parent remounts it
 * (key) to replay.
 */

const DESKTOP_PATH = 'M120 640 C 480 40, 980 -20, 1290 330';
// Portrait path tuned for the phone hero: launches lower-left, apex in the
// upper-middle air above the copy block, falls to the right edge with the
// late leftward bend of a draw.
const MOBILE_PATH = 'M26 632 C 120 300, 302 196, 358 372';

function Arc({ viewBox, d, apex, landing, className, idSuffix, showApexLabel = true, glow = true }: {
  viewBox: string;
  d: string;
  apex: { x: number; y: number };
  landing: { x: number; y: number };
  className: string;
  idSuffix: string;
  showApexLabel?: boolean;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
    >
      {glow && (
        <defs>
          <filter id={`tglow-${idSuffix}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* Halo underlay — carries the whole glow when the blur filter is off */}
      <path
        d={d}
        stroke={glow ? 'rgba(69,240,166,.14)' : 'rgba(69,240,166,.09)'}
        strokeWidth={glow ? 10 : 14}
        fill="none"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        className="tracer-path"
      />
      {!glow && (
        <path
          d={d}
          stroke="rgba(69,240,166,.2)"
          strokeWidth="7"
          fill="none"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="tracer-path"
        />
      )}
      {/* Neon core — feGaussianBlur is desktop-only (per-frame raster cost) */}
      <path
        d={d}
        stroke="#45F0A6"
        strokeWidth="2.5"
        fill="none"
        filter={glow ? `url(#tglow-${idSuffix})` : undefined}
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        className="tracer-path"
      />

      {/* Apex crosshair + micro label */}
      <g className="tracer-apex">
        <path
          d={`M${apex.x - 7} ${apex.y} H${apex.x + 7} M${apex.x} ${apex.y - 7} V${apex.y + 7}`}
          stroke="rgba(125,245,191,.9)"
          strokeWidth="1.5"
        />
        <line
          x1={apex.x} y1={apex.y + 10} x2={apex.x} y2={apex.y + 54}
          stroke="rgba(125,245,191,.4)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        {showApexLabel && (
          <text
            x={apex.x + 12} y={apex.y + 4}
            fill="#8FA398"
            fontSize="11"
            letterSpacing="1.5"
            style={{ fontFamily: 'var(--font-data)' }}
          >
            APEX 38 YD
          </text>
        )}
      </g>

      {/* Landing ring */}
      <circle
        cx={landing.x} cy={landing.y} r="16"
        stroke="#45F0A6" strokeWidth="1.5" fill="none"
        className="tracer-ring"
        style={{ transformOrigin: `${landing.x}px ${landing.y}px` }}
      />
    </svg>
  );
}

export default function TracerArc() {
  return (
    <div className="tracer-scene absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
      <Arc
        viewBox="0 0 1440 700"
        d={DESKTOP_PATH}
        apex={{ x: 740, y: 118 }}
        landing={{ x: 1290, y: 330 }}
        className="hidden md:block"
        idSuffix="d"
      />
      {/* Mobile: portrait arc, no feGaussianBlur (layered strokes carry the
          glow — per-frame blur is too expensive on phone GPUs) */}
      <Arc
        viewBox="0 0 390 844"
        d={MOBILE_PATH}
        apex={{ x: 196, y: 288 }}
        landing={{ x: 358, y: 372 }}
        className="md:hidden"
        idSuffix="m"
        showApexLabel={false}
        glow={false}
      />
    </div>
  );
}
