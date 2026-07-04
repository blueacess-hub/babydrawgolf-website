interface LogoProps {
  color?: 'white' | 'dark';
  className?: string;
  height?: number;
}

export default function Logo({ color = 'white', className = '', height = 40 }: LogoProps) {
  const fill = color === 'white' ? '#EDF6F0' : '#1B4332';
  // The trajectory arc + flag are the brand signature — always tracer green
  // with a soft glow on dark; solid brand green in dark-on-light contexts.
  const arc = color === 'white' ? '#45F0A6' : '#1B4332';
  const arcStyle = color === 'white' ? { filter: 'drop-shadow(0 0 6px rgba(69,240,166,.5))' } : undefined;
  // Cropped viewBox to remove whitespace around content
  const vbX = 220, vbY = 105, vbW = 240, vbH = 110;
  const aspect = vbW / vbH;
  const width = height * aspect;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BABYDRAW GOLF"
    >
      {/* Arc: ball flight trajectory */}
      <g style={arcStyle}>
        <path
          d="M 417 133 Q 348.5 110, 250 134"
          fill="none"
          stroke={arc}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Flag pole */}
        <line
          x1="250" y1="134" x2="250" y2="119"
          stroke={arc}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Flag triangle */}
        <polygon points="250,119 250,126 257,122.5" fill={arc} />
      </g>
      {/* BABYDRAW */}
      <text
        x="340" y="174"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="41"
        fontWeight="300"
        letterSpacing="2"
        fill={fill}
      >
        BABYDRAW
      </text>
      {/* GOLF */}
      <text
        x="340" y="201"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="300"
        letterSpacing="11"
        fill={fill}
      >
        GOLF
      </text>
    </svg>
  );
}
