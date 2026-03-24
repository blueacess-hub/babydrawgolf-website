'use client';

import { useEffect, useState } from 'react';
import BookNowButton from './BookNowButton';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-3 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <BookNowButton location="floating" size="md" className="w-full" />
    </div>
  );
}
