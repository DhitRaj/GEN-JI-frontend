import { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Custom Software Development Services India | Web & Mobile Apps | Gen-Ji',
  description: 'Expert custom software development services in India — web apps, mobile apps, backend systems, UI/UX design, and cloud solutions. Trusted by 30+ startups and enterprises. Get a free quote.',
  keywords: [
    'custom software development services India',
    'web application development India',
    'mobile app development services',
    'backend development services India',
    'UI/UX design services India',
    'cloud solutions India',
    'React Next.js development services',
    'Node.js backend development',
    'full stack development services',
    'startup software development',
    'enterprise web development',
    'affordable software development India',
  ],
  openGraph: {
    title: 'Custom Software Development Services India | Gen-Ji',
    description: 'Expert custom software development — web apps, mobile apps, backend systems. Trusted by 30+ startups. Free consultation available.',
    url: 'https://gen-ji.me/services',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Custom Software Development Services India' }],
  },
  alternates: { canonical: 'https://gen-ji.me/services' },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
