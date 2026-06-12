import type { Metadata } from 'next';
import PremiumHomepage from '../components/home/PremiumHomepage';

export const metadata: Metadata = {
  title: 'B2B SaaS Website Design Agency India | Gen-Ji Digital Studio',
  description:
    'Gen-Ji Digital Studio builds demo-booking websites for B2B SaaS and AI founders. Productized sprint, fixed timeline, proof-first homepage, and transparent pricing.',
  keywords: [
    'gen ji',
    'gen-ji',
    'genji',
    'B2B SaaS website design',
    'AI startup website agency',
    'conversion website agency',
    'productized web design India',
    'homepage copywriting',
  ],
  alternates: {
    canonical: 'https://www.gen-ji.me',
  },
  openGraph: {
    title: 'B2B SaaS Website Design Agency India | Gen-Ji Digital Studio',
    description:
      'Conversion-focused websites for B2B SaaS and AI founders. Fixed-scope sprint, transparent pricing, and proof-first positioning.',
    url: 'https://www.gen-ji.me',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gen-Ji Digital Studio' }],
  },
};

export default function Home() {
  return <PremiumHomepage />;
}


