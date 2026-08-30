import Link from 'next/link';
import type { ReactNode } from 'react';
import siteData from '@/data/site.json';
import BookNowButton from './BookNowButton';
import Logo from './Logo';

const seoLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/memberships', label: 'Memberships' },
  { href: '/trackman-io', label: 'TrackMan iO' },
  { href: '/24-7-indoor-golf-cypress', label: '24/7 Golf' },
  { href: '/visit', label: 'Visit' },
  { href: '/faq', label: 'FAQ' },
];

export default function SeoPageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-carbon-0 text-ink">
      <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-[rgba(7,9,8,.94)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-5 lg:px-8">
          <Link href="/" aria-label="BABYDRAW GOLF home" className="shrink-0">
            <Logo color="white" height={36} className="h-8 w-auto" />
          </Link>
          <nav aria-label="Local golf information" className="ml-auto hidden items-center gap-5 lg:flex">
            {seoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-data text-[11px] font-medium uppercase tracking-[.1em] text-ink-mute transition-colors hover:text-trace-soft"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <BookNowButton location="seo-nav" size="sm" />
        </div>
        <nav aria-label="Local golf pages" className="flex gap-5 overflow-x-auto px-5 pb-3 lg:hidden">
          {seoLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 font-data text-[10px] font-medium uppercase tracking-[.1em] text-ink-mute"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[var(--hairline)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(69,240,166,.14),transparent_35%),linear-gradient(140deg,#111813,#070908_70%)]" />
          <div className="relative mx-auto max-w-5xl px-5 py-16 md:py-24 lg:px-8">
            <p className="font-data text-[11px] font-medium uppercase tracking-[.18em] text-trace-soft">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,7vw,5.25rem)] leading-[.98]">{title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-body md:text-xl">{intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookNowButton location="seo-hero" size="lg" />
              <a
                href="https://booking.trackmangolf.com/venues/baby-draw-golf/memberships"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-btn border border-[rgba(69,240,166,.45)] px-7 py-3.5 font-data text-[12px] font-bold uppercase tracking-[.08em] text-trace-soft transition-colors hover:bg-[rgba(69,240,166,.08)]"
              >
                View Memberships
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5 py-12 md:py-16 lg:px-8">{children}</div>
      </main>

      <footer className="border-t border-[var(--hairline)] bg-carbon-1">
        <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Logo color="white" height={34} />
              <p className="mt-3 text-sm text-ink-mute">{siteData.address.full}</p>
              <p className="mt-1 font-data text-xs uppercase tracking-[.12em] text-trace-soft">Open 24/7 · Unmanned · Self-Service</p>
            </div>
            <nav aria-label="Explore BABYDRAW GOLF" className="flex max-w-xl flex-wrap gap-x-5 gap-y-3">
              <Link href="/" className="text-sm text-ink-mute hover:text-ink">Home</Link>
              {seoLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-ink-mute hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-8 border-t border-[var(--hairline)] pt-6 text-xs text-ink-mute">
            © {new Date().getFullYear()} {siteData.name} ·{' '}
            <a href={`mailto:${siteData.email}`} className="text-trace-soft hover:underline">{siteData.email}</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
