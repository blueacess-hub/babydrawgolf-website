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
    'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 cursor-pointer';

  const variants = {
    primary: 'bg-primary text-white hover:bg-accent shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-primary-dark text-white hover:bg-primary shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  const handleClick = () => {
    trackBookNowClick(location);
  };

  if (isComingSoon) {
    return (
      <span
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} opacity-80 cursor-not-allowed ${className}`}
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
      Book Now
    </a>
  );
}
