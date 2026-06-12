import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';

const siteUrl = 'https://www.gen-ji.me';
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Gen-Ji Digital Studio',
  title: {
    default: 'B2B SaaS Website Design Agency India | Gen-Ji Digital Studio',
    template: '%s | Gen-Ji Digital Studio',
  },
  description:
    'Gen-Ji Digital Studio designs demo-booking websites for B2B SaaS and AI founders with fixed-scope delivery, proof-first positioning, and transparent pricing.',
  keywords: [
    'gen-ji',
    'gen ji',
    'genji',
    'gen ji digital studio',
    'B2B SaaS website design',
    'AI startup website agency',
    'conversion website agency India',
    'homepage copywriting',
    'productized web design',
  ],
  authors: [{ name: 'Gen-Ji Team', url: siteUrl }],
  creator: 'Gen-Ji Digital Studio',
  publisher: 'Gen-Ji Digital Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Gen-Ji Digital Studio',
    title: 'B2B SaaS Website Design Agency India | Gen-Ji Digital Studio',
    description:
      'Conversion-focused websites for B2B SaaS and AI founders with a clear offer, strong proof, and fixed delivery.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gen-Ji Digital Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B SaaS Website Design Agency India | Gen-Ji Digital Studio',
    description:
      'Build a proof-first, demo-booking website with Gen-Ji Digital Studio.',
    images: ['/og-image.png'],
    creator: '@genji_studio',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Gen-Ji Digital Studio',
    alternateName: ['Gen Ji', 'Genji', 'GEN JI'],
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'Web studio focused on B2B SaaS and AI website strategy, conversion copy, and homepage design.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'India',
    },
    sameAs: [
      'https://twitter.com/genji_studio',
      'https://linkedin.com/company/genji-studio',
      'https://github.com/genji-studio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: `${siteUrl}/contact`,
      availableLanguage: ['English', 'Hindi'],
    },
    areaServed: 'IN',
    serviceType: [
      'B2B SaaS Website Strategy',
      'Conversion Copywriting',
      'Landing Page Design',
      'Productized Web Design',
      'Homepage Optimization',
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Gen-Ji Digital Studio',
    alternateName: ['Gen Ji', 'Genji'],
    description:
      'Web development and custom software studio serving startups and businesses in India.',
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Gen-Ji Digital Studio',
    alternateName: ['Gen Ji', 'Genji'],
    url: siteUrl,
    inLanguage: 'en-IN',
  };

  return (
    <html lang="en" className={cn('font-sans')}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased relative isolate overflow-x-hidden bg-brand text-brand">
        {children}
      </body>
    </html>
  );
}


