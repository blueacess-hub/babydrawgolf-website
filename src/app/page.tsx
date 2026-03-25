'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import Simulator from '@/components/Simulator';
import Pricing from '@/components/Pricing';
import HowItWorks from '@/components/HowItWorks';
import Location from '@/components/Location';
import ChatButton from '@/components/ChatButton';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'location', label: 'Location' },
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = index * el.clientWidth;
    // Try smooth scroll first, fallback to direct assignment
    try {
      el.scrollTo({ left: target, behavior: 'smooth' });
    } catch {
      el.scrollLeft = target;
    }
    // Ensure it actually moved (some browsers block smooth scroll)
    requestAnimationFrame(() => {
      if (Math.abs(el.scrollLeft - target) > 100) {
        el.scrollLeft = target;
      }
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => { const n = Math.min(prev + 1, sections.length - 1); scrollToIndex(n); return n; });
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => { const n = Math.max(prev - 1, 0); scrollToIndex(n); return n; });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [scrollToIndex]);

  useEffect(() => {
    (window as unknown as Record<string, unknown>).__scrollToSection = (id: string) => {
      const idx = sections.findIndex((s) => s.id === id);
      if (idx >= 0) scrollToIndex(idx);
    };
  }, [scrollToIndex]);

  return (
    <>
      <Navbar activeSection={sections[activeIndex]?.id} />

      <div ref={scrollRef} className="horizontal-scroll">
        <div className="section-card"><Hero /></div>
        <div className="section-card"><OurStory /></div>
        <div className="section-card"><Simulator /></div>
        <div className="section-card"><Pricing /></div>
        <div className="section-card"><HowItWorks /></div>
        <div className="section-card"><Location /></div>
      </div>

      {/* Arrows — hidden on mobile, shown on md+ */}
      <button onClick={() => { if (!scrollRef.current) return; const w = scrollRef.current.clientWidth; const cur = Math.round(scrollRef.current.scrollLeft / w); if (cur > 0) scrollRef.current.scrollTo({ left: (cur - 1) * w, behavior: 'smooth' }); }} className={`hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg items-center justify-center hover:bg-white transition cursor-pointer ${activeIndex === 0 ? 'md:hidden' : ''}`} aria-label="Previous">
        <ChevronLeft className="w-5 h-5 text-primary-dark" />
      </button>
      <button onClick={() => { if (!scrollRef.current) return; const w = scrollRef.current.clientWidth; const cur = Math.round(scrollRef.current.scrollLeft / w); if (cur < sections.length - 1) scrollRef.current.scrollTo({ left: (cur + 1) * w, behavior: 'smooth' }); }} className={`hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg items-center justify-center hover:bg-white transition cursor-pointer ${activeIndex >= sections.length - 1 ? 'md:hidden' : ''}`} aria-label="Next">
        <ChevronRight className="w-5 h-5 text-primary-dark" />
      </button>

      {/* Dot indicators */}
      <div className="fixed bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 md:gap-2 bg-black/20 backdrop-blur-sm rounded-full px-2 md:px-3 py-1">
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => scrollToIndex(i)} className={`transition-all duration-300 rounded-full cursor-pointer ${i === activeIndex ? 'w-5 md:w-7 h-1.5 md:h-2 bg-white' : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/40 hover:bg-white/70'}`} aria-label={s.label} />
        ))}
      </div>

      <ChatButton />
    </>
  );
}
