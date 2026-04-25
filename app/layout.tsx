import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { cn } from "@/lib/utils";
import { DEFAULT_THEME_ID, THEME_STORAGE_KEY } from '@/lib/theme';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Gen-Ji | Modern Digital Solutions & Company Showcase',
  description: 'Build smarter with Gen-Ji - Your partner for scalable digital solutions, modern company showcase, and client management.',
  keywords: ['digital solutions', 'company showcase', 'client management', 'web development', 'Gen-Ji'],
  authors: [{ name: 'Gen-Ji Team' }],
  creator: 'Gen-Ji',
  publisher: 'Gen-Ji',
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
    locale: 'en_US',
    url: 'https://gen-ji.me',
    siteName: 'Gen-Ji',
    title: 'Gen-Ji | Modern Digital Solutions',
    description: 'Transform your business with Gen-Ji - the ultimate platform for company showcase and client management.',
    images: [
      {
        url: 'https://gen-ji.me/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gen-Ji Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gen-Ji | Modern Digital Solutions',
    description: 'Transform your business with Gen-Ji - the ultimate platform for company showcase and client management.',
    images: ['https://gen-ji.me/og-image.png'],
  },
  alternates: {
    canonical: 'https://gen-ji.me',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn('font-sans')}>
      <body className="antialiased relative isolate overflow-x-hidden bg-white text-slate-900">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = 'light';
                  var root = document.documentElement;
                  root.setAttribute('data-theme', theme);
                  root.classList.remove('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
