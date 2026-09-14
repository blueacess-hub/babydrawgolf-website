'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ATTRIBUTION_KEY, attributedBookingUrl, resolveAttribution, type BookingAttribution as Attribution } from '@/lib/booking-attribution';

export default function BookingAttribution() {
  const pathname = usePathname();
  useEffect(() => {
    let stored: Attribution | null = null;
    try { stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || 'null'); } catch { /* Storage is optional. */ }
    const attribution = resolveAttribution(window.location.href, document.referrer, stored, Date.now());
    try { sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution)); } catch { /* Booking must still work. */ }
    const originals = new Map<HTMLAnchorElement, { original: string; decorated: string }>();
    function decorate(anchor: HTMLAnchorElement) {
      const href = anchor.getAttribute('href') || '';
      const previous = originals.get(anchor);
      const original = previous?.decorated === href ? previous.original : href;
      const placement = anchor.dataset.bookingLocation || anchor.closest('[id]')?.id || 'link';
      const decorated = attributedBookingUrl(original, attribution, pathname, placement);
      if (decorated === original && !previous) return;
      originals.set(anchor, { original, decorated });
      if (href !== decorated) anchor.setAttribute('href', decorated);
    }
    function scan(root: Node) {
      if (!(root instanceof Element)) return;
      if (root instanceof HTMLAnchorElement) decorate(root);
      root.querySelectorAll<HTMLAnchorElement>('a[href*="booking.trackmangolf.com"]').forEach(decorate);
    }
    scan(document.body);
    // Includes streamed Caddie links and mobile CTAs without intercepting navigation.
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'attributes' && record.target instanceof HTMLAnchorElement) decorate(record.target);
        record.addedNodes.forEach(scan);
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['href'] });
    const onLink = (event: Event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      if (anchor instanceof HTMLAnchorElement) decorate(anchor);
    };
    document.addEventListener('click', onLink, true);
    document.addEventListener('auxclick', onLink, true);
    document.addEventListener('contextmenu', onLink, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onLink, true);
      document.removeEventListener('auxclick', onLink, true);
      document.removeEventListener('contextmenu', onLink, true);
      for (const [anchor, { original, decorated }] of originals) {
        if (anchor.getAttribute('href') === decorated) anchor.setAttribute('href', original);
      }
    };
  }, [pathname]);
  return null;
}
