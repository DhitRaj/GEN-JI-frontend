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
    default: 'Gen-Ji (Gen Ji) Web Development Company in India',
    template: '%s | Gen-Ji Digital Studio',
  },
  description:
    'Gen-Ji (also searched as Gen Ji or Genji) is a web development company in India building custom software, mobile apps, and scalable backend systems.',
  keywords: [
    'gen-ji',
    'gen ji',
    'genji',
    'gen ji digital studio',
    'web development company India',
    'custom software development services',
    'hire web developers India',
    'mobile app development company India',
    'full stack development India',
    'React Next.js development',
    'Node.js development company',
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
    title: 'Gen-Ji (Gen Ji) Web Development Company in India',
    description:
      'Top web development team in India for custom software, mobile apps, and backend systems.',
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
    title: 'Gen-Ji (Gen Ji) Web Development Company in India',
    description:
      'Build web apps, mobile apps, and scalable software with Gen-Ji Digital Studio.',
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
      'Web development company in India specializing in custom software, mobile apps, and scalable backend systems.',
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
      'Web Development',
      'Mobile App Development',
      'Custom Software Development',
      'UI/UX Design',
      'Backend Development',
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
      <body className="antialiased relative isolate overflow-x-hidden bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}

