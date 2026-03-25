'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import BookNowButton from './BookNowButton';
import Logo from './Logo';

const navLinks = [
  { label: 'Our Story', id: 'our-story' },
  { label: 'Simulator', id: 'simulator' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Location', id: 'location' },
];

function goTo(id: string) {
  const fn = (window as unknown as Record<string, unknown>).__scrollToSection;
  if (typeof fn === 'function') (fn as (id: string) => void)(id);
}

export default function Navbar({ activeSection }: { activeSection?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-dark/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <button onClick={() => goTo('hero')} className="flex items-center cursor-pointer">
            <Logo color="white" height={40} className="h-8 lg:h-10 w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'text-white border-b-2 border-primary-light pb-0.5'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <BookNowButton location="nav" size="sm" />
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2 cursor-pointer" aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-primary-dark/98 backdrop-blur-lg absolute inset-x-0 top-14">
          <div className="flex flex-col items-center gap-5 py-6">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => { goTo(link.id); setMobileOpen(false); }} className="text-white text-lg font-medium cursor-pointer">
                {link.label}
              </button>
            ))}
            <BookNowButton location="nav-mobile" size="md" />
          </div>
        </div>
      )}
    </nav>
  );
}
