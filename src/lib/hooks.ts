'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}

interface CountUpOpts {
  duration?: number;
  decimals?: number;
  delay?: number;
  active: boolean;
}

/**
 * rAF numeral count-up written straight to the DOM (no state per frame).
 * Snaps to the final value on unmount, tab-hide, or reduced motion.
 */
export function useCountUp(target: number, { duration = 1600, decimals = 0, delay = 0, active }: CountUpOpts) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const fmt = (v: number) =>
      v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

    if (reduced) {
      el.textContent = fmt(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const snap = () => { el.textContent = fmt(target); };
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    el.textContent = fmt(0);
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    const onVis = () => { if (document.visibilityState === 'hidden') { cancelAnimationFrame(raf); snap(); } };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      snap();
    };
  }, [target, duration, decimals, delay, active, reduced]);

  return ref;
}
