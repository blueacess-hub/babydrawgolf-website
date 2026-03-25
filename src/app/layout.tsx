import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import faqData from '@/data/faq.json';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'BABYDRAW GOLF | 24/7 Indoor Golf Simulator in Cypress, TX',
  description:
    'Private indoor golf simulator bay with Trackman iO technology. Open 24/7. Book online, get your PIN, walk in and play. Located in Cypress, Texas.',
  keywords:
    'indoor golf simulator, Cypress TX, Trackman simulator, 24/7 golf, golf simulator near me, virtual golf Cypress, babydraw golf',
  openGraph: {
    title: 'BABYDRAW GOLF | 24/7 Indoor Golf Simulator in Cypress, TX',
    description:
      'Private indoor golf simulator bay with Trackman iO technology. Open 24/7 in Cypress, Texas.',
    url: 'https://babydrawgolf.net',
    siteName: 'BABYDRAW GOLF',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BABYDRAW GOLF | 24/7 Indoor Golf Simulator in Cypress, TX',
    description:
      'Tour-level Trackman iO simulator. Open 24/7. Book online, walk in and play.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data
function StructuredData() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'BABYDRAW GOLF',
    description:
      'Private indoor golf simulator bay with Trackman iO technology. Open 24/7.',
    url: 'https://babydrawgolf.net',
    telephone: '',
    email: 'info@babydrawgolf.net',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Suite 501, Oakhouse Business Park',
      addressLocality: 'Cypress',
      addressRegion: 'TX',
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

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <StructuredData />
      </head>
      <body className="h-full overflow-hidden font-sans">
        {children}

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
