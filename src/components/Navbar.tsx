'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import siteData from '@/data/site.json';
import BookNowButton from './BookNowButton';
import InstagramIcon from './InstagramIcon';
import Logo from './Logo';

const sections = [
  { label: 'Home', id: 'hero' },
  { label: 'Our Story', id: 'our-story' },
  { label: 'Simulator', id: 'simulator' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Location', id: 'location' },
];

const navLinks = sections.slice(1);

function goTo(id: string) {
  const fn = (window as unknown as Record<string, unknown>).__scrollToSection;
  if (typeof fn === 'function') (fn as (id: string) => void)(id);
}

export default function Navbar({ activeSection }: { activeSection?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const onHero = !activeSection || activeSection === 'hero';
  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === (activeSection ?? 'hero')));
  const currentSection = sections[activeIndex];
  const sectionProgress = ((activeIndex + 1) / sections.length) * 100;

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
            <a
              href={siteData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-mute hover:text-trace-soft transition-colors p-1"
              aria-label="Follow BABYDRAW GOLF on Instagram"
              title="Instagram @baby_drawgolf"
            >
              <InstagramIcon className="w-[18px] h-[18px]" />
            </a>
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

      {/* Persistent chapter readout — mirrors the golf HUD language and makes
          the current card unambiguous while swiping or scrolling. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`pointer-events-none absolute right-3 sm:right-6 lg:right-8 top-[calc(100%+0.5rem)] transition-[opacity,transform] duration-300 ${
          mobileOpen ? 'opacity-0 -translate-y-1 md:opacity-100 md:translate-y-0' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="sr-only">
          Section {activeIndex + 1} of {sections.length}: {currentSection.label}
        </span>
        <div
          className="hud-chip min-w-[154px] md:min-w-[176px] px-3 py-2 bg-[rgba(7,9,8,.78)] backdrop-blur-[10px] shadow-[0_8px_30px_rgba(0,0,0,.28)]"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between gap-3 font-data uppercase">
            <span className="tabular-nums whitespace-nowrap">
              <span className="font-bold text-[11px] md:text-xs text-trace-soft">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[9px] md:text-[10px] text-ink-mute">
                {' '} / {String(sections.length).padStart(2, '0')}
              </span>
            </span>
            <span className="text-[9px] md:text-[10px] font-medium tracking-[.13em] text-ink whitespace-nowrap">
              {currentSection.label}
            </span>
          </div>
          <div className="mt-1.5 h-px overflow-hidden bg-[rgba(213,255,229,.12)]">
            <span
              className="block h-full bg-trace shadow-[0_0_8px_rgba(69,240,166,.65)] transition-[width] duration-500"
              style={{ width: `${sectionProgress}%` }}
            />
          </div>
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
            <a
              href={siteData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-data text-base font-medium uppercase tracking-[.12em] text-ink hover:text-trace-soft transition-colors"
              aria-label="Follow BABYDRAW GOLF on Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
              Instagram
            </a>
            <BookNowButton location="nav-mobile" size="md" />
          </div>
        </div>
      )}
    </nav>
  );
}
