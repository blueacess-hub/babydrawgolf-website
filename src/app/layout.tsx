import type { Metadata, Viewport } from 'next';
import { Inter, Oswald, Roboto_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-oswald',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://babydrawgolf.net'),
  title: {
    default: '24/7 Indoor Golf Simulator in Cypress, TX | BABYDRAW GOLF',
    template: '%s | BABYDRAW GOLF',
  },
  description:
    'Book a private Trackman iO golf simulator bay in Cypress, TX. Open 24/7 with three private bays, hourly play, memberships, and self-service PIN access.',
  keywords:
    'indoor golf simulator, Cypress TX, Trackman simulator, 24/7 golf, golf simulator near me, virtual golf Cypress, babydraw golf',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '24/7 Indoor Golf Simulator in Cypress, TX | BABYDRAW GOLF',
    description:
      'Book a private Trackman iO golf simulator bay in Cypress, TX. Open 24/7 with hourly play, memberships, and self-service PIN access.',
    url: 'https://babydrawgolf.net',
    siteName: 'BABYDRAW GOLF',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '24/7 Indoor Golf Simulator in Cypress, TX | BABYDRAW GOLF',
    description:
      'Three private Trackman iO bays in Cypress, TX. Open 24/7. Book your time online.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: [
      'YpIjiHM5Urd_SKG7RROLi02wMZwMAA6JO7cSoF3aawM',
      'yE5da8E1xn-IFz-JHe1vgw3my58DEm8G1Wika_vbN0c',
    ],
  },
};

// viewport-fit=cover is required for env(safe-area-inset-*) to resolve to real
// values on notched phones; without it the safe-area insets are always 0.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0E0C',
};

// JSON-LD Structured Data
function StructuredData() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': 'https://babydrawgolf.net/#business',
    name: 'BABYDRAW GOLF',
    description:
      'A 24/7 indoor golf simulator facility with three private Trackman iO bays in Cypress, Texas.',
    url: 'https://babydrawgolf.net',
    image: 'https://babydrawgolf.net/opengraph-image.png',
    email: 'info@babydrawgolf.net',
    priceRange: '$30-$249',
    sameAs: [
      'https://www.instagram.com/baby_drawgolf/',
      'https://tiktok.com/@babydrawgolf',
      'https://www.facebook.com/profile.php?id=61591939702138',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '20049 House Hahl Rd Ste 501',
      addressLocality: 'Cypress',
      addressRegion: 'TX',
      postalCode: '77433',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://babydrawgolf.net/#website',
    url: 'https://babydrawgolf.net',
    name: 'BABYDRAW GOLF',
    publisher: { '@id': 'https://babydrawgolf.net/#business' },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([localBusiness, website]).replace(/</g, '\\u003c'),
      }}
    />
  );
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal system gate: the hidden initial state only exists under
            html[data-js], so no-JS visitors always see everything. Must run
            before paint. Uses a data attribute (not className) because React
            owns <html className> and would flag/clobber a foreign class.
            The dead-man reveal floor is armed HERE, decoupled from React —
            if the bundle 404s or hydration dies, content still appears at 3s.
            page.tsx disarms it once React mounts and takes over per-card. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-js','');window.__revealFloor=setTimeout(function(){document.documentElement.setAttribute('data-reveal-all','')},3000);",
          }}
        />
        <StructuredData />
      </head>
      <body className="h-full overflow-hidden font-sans">
        {children}
        <Analytics />

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
