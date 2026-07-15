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

const MOBILE_QUERY = '(max-width: 767px)';

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
    if (window.matchMedia(MOBILE_QUERY).matches) {
      const card = cardsRef.current[index];
      if (!card) return;
      markVisited(index);
      setActiveIndex(index);
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

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
  }, [markVisited]);

  // The deck must ALWAYS open on the hero. Browsers — mobile Safari most
  // aggressively — restore the horizontal scrollLeft of this overflow
  // container across refresh and bfcache, dropping the visitor onto a random,
  // half-snapped card while React state still reads index 0. That is exactly
  // the "off-centre / different every refresh" instability. Kill it.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const home = () => {
      const el = scrollRef.current;
      cardsRef.current.forEach((card) => {
        if (card && card.scrollTop !== 0) card.scrollTop = 0;
      });
      if (window.matchMedia(MOBILE_QUERY).matches) {
        if (window.scrollX !== 0 || window.scrollY !== 0) {
          window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
        }
      } else if (el && el.scrollLeft !== 0) {
        el.scrollLeft = 0;
      }
      document.documentElement.style.setProperty('--deck-x', '0px');
    };

    let settleFrame = 0;
    let settleFrame2 = 0;
    let lateReset = 0;
    const settleHome = () => {
      home();
      cancelAnimationFrame(settleFrame);
      cancelAnimationFrame(settleFrame2);
      settleFrame = requestAnimationFrame(() => {
        settleFrame2 = requestAnimationFrame(home);
      });
      window.clearTimeout(lateReset);
      lateReset = window.setTimeout(home, 120);
    };

    settleHome();
    // iOS can restore nested overflow state after mount / first paint.
    const onLoad = () => settleHome();
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        settleHome();
        setActiveIndex(0);
      }
    };
    window.addEventListener('load', onLoad);
    window.addEventListener('pageshow', onShow);
    return () => {
      cancelAnimationFrame(settleFrame);
      cancelAnimationFrame(settleFrame2);
      window.clearTimeout(lateReset);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('pageshow', onShow);
    };
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

  // Mobile uses one normal document scroller. Track the section nearest the
  // top third of the viewport so the navbar and animation gates stay in sync
  // without nesting a vertical scroller inside the horizontal deck.
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!media.matches) return;
      const anchor = window.innerHeight * 0.32;
      let best = 0;
      let bestDistance = Infinity;
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const distance = rect.top <= anchor && rect.bottom > anchor
          ? 0
          : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));
        if (distance < bestDistance) {
          best = index;
          bestDistance = distance;
        }
      });
      setActiveIndex(best);
      markVisited(best);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', schedule);
    };
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
    const media = window.matchMedia(MOBILE_QUERY);
    let io: IntersectionObserver | null = null;
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) (e.target as HTMLElement).dataset.visited = 'true';
          });
        },
        { root: media.matches ? null : root, threshold: 0.15 }
      );
      cardsRef.current.forEach((el) => el && io?.observe(el));
    };
    observe();
    media.addEventListener('change', observe);
    return () => {
      media.removeEventListener('change', observe);
      io?.disconnect();
    };
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
      // Never steal arrow keys from form fields (e.g. the chat input)
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
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

      {/* FlightLine — desktop keeps the horizontal golf-shot navigation. */}
      <div className="desktop-flightline">
        <FlightLineNav
          sections={sections}
          activeIndex={activeIndex}
          onSelect={scrollToIndex}
          scrollRef={scrollRef}
        />
      </div>

      <ChatButton />

      {/* Film grain lens layer */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
