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
import FlightLineNav from '@/components/fx/FlightLineNav';

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
  // One-way visited flags drive the reveal system (never unset). Written
  // straight to the DOM — presentational only, no re-render needed.
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const markVisited = useCallback((i: number) => {
    const el = cardsRef.current[i];
    if (el && el.dataset.visited !== 'true') el.dataset.visited = 'true';
  }, []);

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
      markVisited(index);
      // Drives the AuroraField parallax — direct style write, no re-render.
      document.documentElement.style.setProperty('--deck-x', container.scrollLeft + 'px');
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [markVisited]);

  // React is alive: disarm the inline-script dead-man floor (layout.tsx) —
  // per-card reveals take over from here.
  useEffect(() => {
    const w = window as unknown as { __revealFloor?: number };
    if (w.__revealFloor) clearTimeout(w.__revealFloor);
    document.documentElement.removeAttribute('data-reveal-all');
    markVisited(0);
  }, [markVisited]);

  // Reveal a card as soon as it starts entering the viewport during a swipe
  // (the scroll handler's Math.round only flips at 50%) — and as a floor,
  // whenever it becomes the active card.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).dataset.visited = 'true';
        });
      },
      { root, threshold: 0.15 }
    );
    cardsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    markVisited(activeIndex);
  }, [activeIndex, markVisited]);

  // Pointer lightfield vars (desktop garnish; .lightfield is display:none on touch)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--lx', ((e.clientX / window.innerWidth) * 100).toFixed(1) + '%');
      document.documentElement.style.setProperty('--ly', ((e.clientY / window.innerHeight) * 100).toFixed(1) + '%');
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => { const n = Math.min(prev + 1, sections.length - 1); scrollToIndex(n); markVisited(n); return n; });
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => { const n = Math.max(prev - 1, 0); scrollToIndex(n); markVisited(n); return n; });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [scrollToIndex, markVisited]);

  useEffect(() => {
    (window as unknown as Record<string, unknown>).__scrollToSection = (id: string) => {
      const idx = sections.findIndex((s) => s.id === id);
      if (idx >= 0) scrollToIndex(idx);
    };
  }, [scrollToIndex]);

  const cards = [
    <Hero key="hero" active={activeIndex === 0} />,
    <OurStory key="our-story" />,
    <Simulator key="simulator" />,
    <Pricing key="pricing" />,
    <HowItWorks key="how-it-works" active={activeIndex === 4} />,
    <Location key="location" />,
  ];

  return (
    <>
      {/* Continuity light field behind the whole deck */}
      <div className="aurora-field" aria-hidden="true" />

      <Navbar activeSection={sections[activeIndex]?.id} />

      <div ref={scrollRef} className="horizontal-scroll">
        {cards.map((card, i) => (
          <div
            key={sections[i].id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="section-card vignette"
            data-active={i === activeIndex}
            data-visited="false"
          >
            {i > 0 && <div className="room-dim" aria-hidden="true" />}
            {card}
          </div>
        ))}
      </div>

      {/* Arrows — hidden on mobile, shown on md+ */}
      <button
        onClick={() => { if (!scrollRef.current) return; const w = scrollRef.current.clientWidth; const cur = Math.round(scrollRef.current.scrollLeft / w); if (cur > 0) scrollRef.current.scrollTo({ left: (cur - 1) * w, behavior: 'smooth' }); }}
        className={`hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-[var(--hairline)] bg-[rgba(16,24,18,.6)] text-ink-mute hover:text-trace-soft hover:border-[rgba(69,240,166,.5)] hover:-translate-x-0.5 transition-all duration-300 items-center justify-center cursor-pointer ${activeIndex === 0 ? 'md:hidden' : ''}`}
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => { if (!scrollRef.current) return; const w = scrollRef.current.clientWidth; const cur = Math.round(scrollRef.current.scrollLeft / w); if (cur < sections.length - 1) scrollRef.current.scrollTo({ left: (cur + 1) * w, behavior: 'smooth' }); }}
        className={`hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-[var(--hairline)] bg-[rgba(16,24,18,.6)] text-ink-mute hover:text-trace-soft hover:border-[rgba(69,240,166,.5)] hover:translate-x-0.5 transition-all duration-300 items-center justify-center cursor-pointer ${activeIndex >= sections.length - 1 ? 'md:hidden' : ''}`}
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* FlightLine — the deck is a golf shot */}
      <FlightLineNav
        sections={sections}
        activeIndex={activeIndex}
        onSelect={scrollToIndex}
        scrollRef={scrollRef}
      />

      <ChatButton />

      {/* Film grain lens layer */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
