import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import SeoPageShell from '@/components/SeoPageShell';
import faqData from '@/data/faq.json';

const baseUrl = 'https://babydrawgolf.net';

const pageDetails = {
  pricing: {
    title: 'Indoor Golf Pricing in Cypress, TX',
    description: 'See BABYDRAW GOLF hourly bay rates from $30 to $55 in Cypress, TX. Prices are per private Trackman iO bay for up to four players.',
    eyebrow: 'Transparent bay rates',
    heading: 'Indoor Golf Pricing in Cypress, TX',
    intro: 'Hourly play starts at $30 per private bay. One booking covers up to four players, and every bay includes Trackman iO, 200+ virtual courses, and swing analytics.',
  },
  memberships: {
    title: 'Indoor Golf Memberships in Cypress, TX',
    description: 'Compare BABYDRAW GOLF Birdie, Founding 25, Eagle, and Ace memberships with 24/7 access to private Trackman iO bays in Cypress.',
    eyebrow: '24/7 member access',
    heading: 'Indoor Golf Memberships in Cypress, TX',
    intro: 'Choose monthly included hours or unlimited play. Membership is capped to protect bay availability, and every plan includes 24/7 access.',
  },
  'trackman-io': {
    title: 'TrackMan iO Golf Simulator in Cypress, TX',
    description: 'Practice, play virtual courses, and review detailed ball and club data on private TrackMan iO simulator bays at BABYDRAW GOLF in Cypress.',
    eyebrow: 'Tour-level indoor golf technology',
    heading: 'TrackMan iO Golf Simulator in Cypress, TX',
    intro: 'Every private bay at BABYDRAW GOLF uses TrackMan iO for virtual golf, focused practice, and detailed swing feedback — available around the clock.',
  },
  '24-7-indoor-golf-cypress': {
    title: '24/7 Indoor Golf in Cypress, TX',
    description: 'Book private indoor golf in Cypress any time, day or night. BABYDRAW GOLF is open 24/7 with online booking and self-service PIN access.',
    eyebrow: 'Golf on your schedule',
    heading: '24/7 Indoor Golf in Cypress, TX',
    intro: 'BABYDRAW GOLF is open 24/7. Reserve a private bay online, receive your unique entry PIN, and play during your booked time without waiting for a front desk.',
  },
  visit: {
    title: 'Visit BABYDRAW GOLF in Cypress, TX',
    description: 'Find BABYDRAW GOLF at 20049 House Hahl Rd Ste 501, Cypress, TX 77433. Open 24/7 with free on-site parking and self-service entry.',
    eyebrow: 'Bridgeland · Cypress, Texas',
    heading: 'Visit BABYDRAW GOLF in Cypress, TX',
    intro: 'Find our three private TrackMan iO bays at 20049 House Hahl Rd Ste 501 in Cypress. The facility is open 24/7 with free on-site parking.',
  },
  faq: {
    title: 'Indoor Golf FAQ',
    description: 'Answers about BABYDRAW GOLF bookings, PIN entry, pricing, memberships, equipment, guests, virtual courses, and 24/7 access in Cypress.',
    eyebrow: 'Plan your first visit',
    heading: 'BABYDRAW GOLF FAQ',
    intro: 'Quick answers about booking, 24/7 PIN access, memberships, equipment, guests, and playing a private TrackMan iO bay in Cypress.',
  },
} as const;

type SeoSlug = keyof typeof pageDetails;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pageDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const details = pageDetails[slug as SeoSlug];
  if (!details) return {};

  return {
    title: details.title,
    description: details.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${details.title} | BABYDRAW GOLF`,
      description: details.description,
      url: `${baseUrl}/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${details.title} | BABYDRAW GOLF`,
      description: details.description,
    },
  };
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-card border border-line bg-carbon-2 p-5 shadow-[var(--shadow-card)] md:p-8">
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      <div className="mt-5 text-sm leading-relaxed text-ink-body md:text-base">{children}</div>
    </section>
  );
}

function PricingContent() {
  const rates = [
    ['Night Owl', 'Every day, midnight–6am', '$30/hr'],
    ['Off-Peak', 'Mon–Fri, 6am–4pm', '$35/hr'],
    ['Standard', 'Mon–Thu, 4pm–midnight', '$50/hr'],
    ['Peak', 'Fri 4pm–midnight; Sat–Sun 6am–midnight', '$55/hr'],
  ];

  return (
    <div className="space-y-6">
      <Panel title="Hourly rates per private bay">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead className="font-data text-[11px] uppercase tracking-[.12em] text-ink-mute">
              <tr><th className="pb-3">Rate</th><th className="pb-3">When</th><th className="pb-3 text-right">Price</th></tr>
            </thead>
            <tbody>
              {rates.map(([rate, when, price]) => (
                <tr key={rate} className="border-t border-[var(--hairline)]">
                  <th className="py-4 font-semibold text-ink">{rate}</th>
                  <td className="py-4 text-ink-mute">{when}</td>
                  <td className="py-4 text-right font-data text-xl font-bold text-trace-soft">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-ink-mute">Rates are per bay, not per person. Each booking covers up to four players. Club rental is available for $25 per person.</p>
      </Panel>
      <Panel title="What every bay includes">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li>— Private TrackMan iO simulator bay</li>
          <li>— 200+ virtual golf courses</li>
          <li>— Swing and ball-flight analytics</li>
          <li>— Practice and multiplayer modes</li>
        </ul>
      </Panel>
    </div>
  );
}

function MembershipContent() {
  const plans = [
    ['Birdie', '$99/mo', '8 hours/month', '$30/hr additional'],
    ['Founding 25', '$149/mo', '15 hours/month', 'Rate locked while active; first 25 members'],
    ['Eagle', '$179/mo', '15 hours/month', '$30/hr additional'],
    ['Ace', '$249/mo', 'Unlimited', 'Sessions up to 3 hours; capped at 15 members'],
  ];

  return (
    <div className="space-y-6">
      <Panel title="Compare memberships">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead className="font-data text-[11px] uppercase tracking-[.12em] text-ink-mute">
              <tr><th className="pb-3">Plan</th><th className="pb-3">Price</th><th className="pb-3">Included play</th><th className="pb-3">Key detail</th></tr>
            </thead>
            <tbody>
              {plans.map(([plan, price, hours, detail]) => (
                <tr key={plan} className="border-t border-[var(--hairline)]">
                  <th className="py-4 font-semibold text-ink">{plan}</th>
                  <td className="py-4 font-data font-bold text-trace-soft">{price}</td>
                  <td className="py-4">{hours}</td>
                  <td className="py-4 text-ink-mute">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel title="How member booking works">
        <ul className="space-y-3">
          <li>— Birdie, Eagle, and Founding 25 members book Member Bay Time in 1–6 hour sessions.</li>
          <li>— Ace members book Ace Unlimited in 1–3 hour sessions.</li>
          <li>— Every membership holds one active upcoming booking at a time.</li>
          <li>— Plans have a 12-month initial term, then continue month-to-month.</li>
          <li>— To change plans, email info@babydrawgolf.net instead of buying a second membership.</li>
        </ul>
      </Panel>
    </div>
  );
}

function TrackmanContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Panel title="Play 200+ courses">
        <p>Choose famous virtual courses including Pebble Beach, St Andrews, and TPC Sawgrass, or use driving-range and closest-to-pin modes.</p>
      </Panel>
      <Panel title="Practice with feedback">
        <p>Review ball speed, launch angle, spin, carry, club path, and other shot data after each swing to make practice more measurable.</p>
      </Panel>
      <Panel title="A private bay">
        <p>Your reservation covers one private simulator bay for up to four players, giving your group space to practice or play together.</p>
      </Panel>
      <Panel title="Available 24/7">
        <p>Book morning, evening, overnight, or weekend time. Online reservations and PIN entry make the technology available without front-desk hours.</p>
      </Panel>
    </div>
  );
}

function OpenAllDayContent() {
  return (
    <div className="space-y-6">
      <Panel title="How 24/7 self-service golf works">
        <ol className="grid gap-5 md:grid-cols-3">
          <li><strong className="block font-data text-trace-soft">01 · BOOK</strong><span className="mt-2 block">Choose an available time and reserve your private bay online.</span></li>
          <li><strong className="block font-data text-trace-soft">02 · GET YOUR PIN</strong><span className="mt-2 block">Your unique access PIN arrives by email and through the Trackman Golf App.</span></li>
          <li><strong className="block font-data text-trace-soft">03 · PLAY</strong><span className="mt-2 block">Enter your PIN at the door and use your reserved bay during the booked session.</span></li>
        </ol>
      </Panel>
      <Panel title="Built for flexible schedules">
        <p>Night Owl pricing runs every day from midnight to 6am. Daytime, after-work, and weekend rate windows are also available, so you can match your tee time to your calendar.</p>
      </Panel>
    </div>
  );
}

function VisitContent() {
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=20049%20House%20Hahl%20Rd%20Ste%20501%2C%20Cypress%2C%20TX%2077433';
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Panel title="Address and hours">
        <address className="not-italic">
          <strong className="text-ink">BABYDRAW GOLF</strong><br />
          20049 House Hahl Rd Ste 501<br />
          Cypress, TX 77433
        </address>
        <p className="mt-4"><strong className="text-ink">Hours:</strong> Open 24/7</p>
        <p className="mt-2"><strong className="text-ink">Parking:</strong> Free on-site</p>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-data text-xs font-bold uppercase tracking-[.1em] text-trace-soft hover:underline">Get directions →</a>
      </Panel>
      <Panel title="Before you arrive">
        <ul className="space-y-3">
          <li>— Reserve your bay before coming to the facility.</li>
          <li>— Keep your unique entry PIN ready at the door.</li>
          <li>— Bring your clubs or rent a full set for $25 per person.</li>
          <li>— Athletic shoes are fine; golf shoes are optional.</li>
        </ul>
      </Panel>
    </div>
  );
}

function FaqContent() {
  return (
    <div className="space-y-4">
      {faqData.map((item) => (
        <section key={item.question} className="rounded-card border border-line bg-carbon-2 p-5 md:p-7">
          <h2 className="text-xl md:text-2xl">{item.question}</h2>
          <p className="mt-3 leading-relaxed text-ink-body">{item.answer}</p>
        </section>
      ))}
    </div>
  );
}

function contentFor(slug: SeoSlug) {
  switch (slug) {
    case 'pricing': return <PricingContent />;
    case 'memberships': return <MembershipContent />;
    case 'trackman-io': return <TrackmanContent />;
    case '24-7-indoor-golf-cypress': return <OpenAllDayContent />;
    case 'visit': return <VisitContent />;
    case 'faq': return <FaqContent />;
  }
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const details = pageDetails[slug as SeoSlug];
  if (!details) notFound();

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${slug}#webpage`,
      url: `${baseUrl}/${slug}`,
      name: details.title,
      description: details.description,
      isPartOf: { '@id': `${baseUrl}/#website` },
      about: { '@id': `${baseUrl}/#business` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: details.heading, item: `${baseUrl}/${slug}` },
      ],
    },
  ];

  if (slug === 'faq') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqData.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <SeoPageShell eyebrow={details.eyebrow} title={details.heading} intro={details.intro}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {contentFor(slug as SeoSlug)}
    </SeoPageShell>
  );
}
