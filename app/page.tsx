import type { Metadata } from 'next';
import PremiumHomepage from '../components/home/PremiumHomepage';

export const metadata: Metadata = {
  title: 'Gen-Ji (Gen Ji) - Web Development Company in India',
  description:
    'Gen-Ji Digital Studio builds conversion-focused websites, custom software, and mobile apps for startups and businesses in India.',
  keywords: [
    'gen ji',
    'gen-ji',
    'genji',
    'gen ji company',
    'web development company in India',
    'custom software development',
    'hire developers India',
  ],
  alternates: {
    canonical: 'https://www.gen-ji.me',
  },
  openGraph: {
    title: 'Gen-Ji (Gen Ji) - Web Development Company in India',
    description:
      'Build high-performance websites and apps with Gen-Ji Digital Studio.',
    url: 'https://www.gen-ji.me',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gen-Ji Digital Studio' }],
  },
};

export default function Home() {
  return <PremiumHomepage />;
}


