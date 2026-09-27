'use client';

import { useSyncExternalStore } from 'react';
import offer from '@/data/grand-opening.json';
import BookNowButton from './BookNowButton';

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 60_000);
  return () => window.clearInterval(timer);
}

function getSnapshot() {
  // Advertise advance bookings now; stop showing the offer at Houston midnight after Oct 4.
  return offer.enabled && offer.confirmedDates && offer.confirmedTerms
    && offer.bookingPriceVerified && Date.now() < Date.parse(offer.endsAt);
}

export function useGrandOpeningVisible() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default function GrandOpeningOffer({ placement }: { placement: 'hero' | 'pricing' }) {
  const visible = useGrandOpeningVisible();
  if (!visible) return null;

  return (
    <aside
      aria-label="Grand Opening Week offer"
      className={`border border-trace/40 bg-carbon-0/95 rounded-card p-5 md:p-6 ${placement === 'hero' ? 'mt-5 max-w-lg' : 'mb-5'}`}
    >
      <p className="font-data text-[11px] tracking-[.16em] uppercase text-trace">{offer.headline} · {offer.dateLabel}</p>
      <p className="mt-2 font-data text-4xl md:text-5xl font-bold text-ink tabular-nums">
        {offer.price}<span className="ml-2 text-sm font-normal text-ink-body">{offer.unit}</span>
      </p>
      <p className="mt-2 text-sm text-ink-body">All day · All 3 bays · Houston time</p>
      <p className="mt-1 text-xs text-ink-mute">For sessions September 28–October 4. Taxes and booking fees apply.</p>
      {placement === 'pricing' && <div className="mt-4"><BookNowButton location="grand-opening-pricing" size="sm" /></div>}
    </aside>
  );
}

export function GrandOpeningRate({ standardPrice }: { standardPrice: string }) {
  const visible = useGrandOpeningVisible();
  if (!visible) return <>{standardPrice}</>;
  return <><s className="block text-sm font-normal text-ink-mute">{standardPrice}</s><span>$19.90/hr</span></>;
}
