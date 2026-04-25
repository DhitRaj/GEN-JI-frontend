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
  title: 'Gen-Ji | Modern Digital Solutions',
  description: 'Build smarter with Gen-Ji - Your partner for scalable digital solutions',
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
