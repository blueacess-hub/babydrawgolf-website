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
  const onHero = !activeSection || activeSection === 'hero';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color] duration-300 ${
        onHero && !mobileOpen
          ? 'bg-gradient-to-b from-[rgba(7,9,8,.72)] to-transparent border-b border-transparent'
          : 'bg-[rgba(7,9,8,.95)] md:bg-[rgba(7,9,8,.92)] border-b border-[var(--hairline)] md:backdrop-blur-[10px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <button onClick={() => goTo('hero')} className="flex items-center cursor-pointer" aria-label="Home">
            <Logo color="white" height={40} className="h-8 lg:h-10 w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={`relative font-data text-[12px] font-medium uppercase tracking-[.12em] transition-colors cursor-pointer py-1 ${
                  activeSection === link.id ? 'text-trace-soft' : 'text-ink-mute hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[1.5px] w-4 bg-trace origin-left transition-transform duration-300 ${
                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
            <BookNowButton location="nav" size="sm" />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-ink p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[rgba(7,11,9,.97)] border-b border-[var(--hairline)] absolute inset-x-0 top-14">
          <div className="flex flex-col items-center gap-5 py-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  goTo(link.id);
                  setMobileOpen(false);
                }}
                className={`font-data text-base font-medium uppercase tracking-[.12em] cursor-pointer ${
                  activeSection === link.id ? 'text-trace-soft' : 'text-ink'
                }`}
              >
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
