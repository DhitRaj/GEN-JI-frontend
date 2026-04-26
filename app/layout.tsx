import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gen-ji.me'),
  title: {
    default: 'Best Web Development Company in India | Gen-Ji Digital Studio',
    template: '%s | Gen-Ji Digital Studio',
  },
  description: 'Gen-Ji is a top-rated web development company in India specializing in custom software, mobile apps, and scalable backend systems. 50+ projects delivered. Get a free consultation today.',
  keywords: [
    'web development company India',
    'custom software development services',
    'hire web developers India',
    'web development team India',
    'affordable web development India',
    'mobile app development company',
    'full stack development India',
    'startup web development',
    'digital solutions India',
    'web application development',
    'backend development services',
    'React Next.js development',
    'Node.js development company',
    'UI/UX design services India',
    'cloud solutions India',
  ],
  authors: [{ name: 'Gen-Ji Team', url: 'https://gen-ji.me' }],
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
    url: 'https://gen-ji.me',
    siteName: 'Gen-Ji Digital Studio',
    title: 'Best Web Development Company in India | Gen-Ji Digital Studio',
    description: 'Top-rated web development company in India. Custom software, mobile apps, scalable backends. 50+ projects, 98% client satisfaction. Free consultation available.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gen-Ji Digital Studio - Best Web Development Company in India',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web Development Company in India | Gen-Ji Digital Studio',
    description: 'Top-rated web development company in India. Custom software, mobile apps, scalable backends. 50+ projects delivered.',
    images: ['/og-image.png'],
    creator: '@genji_studio',
  },
  alternates: {
    canonical: 'https://gen-ji.me',
  },
  verification: {
    google: 'your-google-verification-code',
  },
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
    name: 'Gen-Ji Digital Studio',
    url: 'https://gen-ji.me',
    logo: 'https://gen-ji.me/logo.png',
    description: 'Top-rated web development company in India specializing in custom software, mobile apps, and scalable backend systems.',
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
      contactType: 'Customer Service',
      url: 'https://gen-ji.me/contact',
      availableLanguage: ['English', 'Hindi'],
    },
    foundingDate: '2024',
    numberOfEmployees: '10-50',
    areaServed: 'IN',
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'Custom Software Development',
      'UI/UX Design',
      'Cloud Solutions',
      'Backend Development',
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://gen-ji.me',
    name: 'Gen-Ji Digital Studio',
    description: 'Best web development company in India offering custom software, mobile apps, and digital solutions.',
    url: 'https://gen-ji.me',
    telephone: '+91-XXXXXXXXXX',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.5937',
      longitude: '78.9629',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gen-Ji Digital Studio',
    url: 'https://gen-ji.me',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gen-ji.me/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
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
