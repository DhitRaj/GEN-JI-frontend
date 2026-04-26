import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'Expert Web Development Team India | About Gen-Ji Digital Studio',
  description: 'Meet Gen-Ji — a top web development team in India with 50+ projects delivered. We build scalable web apps, mobile solutions, and custom software for startups and enterprises.',
  keywords: [
    'web development team India',
    'experienced web developers India',
    'software development company India',
    'web development expertise',
    'digital studio India',
    'about gen-ji',
    'web development agency India',
    'software engineering team India',
  ],
  openGraph: {
    title: 'Expert Web Development Team India | About Gen-Ji',
    description: 'Meet Gen-Ji — a top web development team in India with 50+ projects delivered. Scalable web apps, mobile solutions, and custom software.',
    url: 'https://gen-ji.me/about',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gen-Ji Web Development Team India' }],
  },
  alternates: { canonical: 'https://gen-ji.me/about' },
};

export default function AboutPage() {
  return <AboutPageClient />;
}