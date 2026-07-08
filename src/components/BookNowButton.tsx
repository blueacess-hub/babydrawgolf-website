'use client';

import { trackBookNowClick } from '@/lib/analytics';

interface BookNowButtonProps {
  location: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BOOKING_URL = process.env.NEXT_PUBLIC_TRACKMAN_BOOKING_URL || '#';

export default function BookNowButton({
  location,
  variant = 'primary',
  size = 'md',
  className = '',
}: BookNowButtonProps) {
  const isComingSoon = BOOKING_URL === '#';

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 font-data font-bold uppercase tracking-[.08em] rounded-btn transition-all duration-300 cursor-pointer';

  const variants = {
    primary:
      'bg-trace text-carbon-0 hover:bg-trace-hover hover:shadow-[var(--glow-cta)] hover:-translate-y-0.5 active:scale-[.98]',
    secondary:
      'bg-carbon-2 text-trace-soft border border-[var(--hairline)] hover:border-[rgba(69,240,166,.5)]',
    outline:
      'border border-[rgba(69,240,166,.6)] text-trace hover:bg-trace hover:text-carbon-0',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-[11px]',
    md: 'px-7 py-3 text-[12px]',
    lg: 'px-8 py-4 text-[13px]',
  };

  const handleClick = () => {
    trackBookNowClick(location);
  };

  if (isComingSoon) {
    return (
      <span
        className={`${baseStyles} ${variants.outline} ${sizes[size]} opacity-60 cursor-not-allowed ${className}`}
      >
        Coming Soon
      </span>
    );
  }

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      Sign Up Now
      <span aria-hidden="true">→</span>
    </a>
  );
}
