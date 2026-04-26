import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Gen-Ji Customer Support & Project Enquiry | Get Free Quote',
  description:
    'Contact Gen-Ji (Gen Ji) for customer support, project planning, and a free development quote. Get a practical timeline and estimate within 24 hours.',
  keywords: [
    'gen ji customer support',
    'gen-ji contact',
    'genji enquiry',
    'hire web developers India',
    'web developer hiring India',
    'outsource web development India',
    'web development quotes India',
    'get web development estimate',
    'contact web development company',
    'hire software developers India',
    'web development consultation',
    'free web development quote',
    'web project inquiry India',
  ],
  openGraph: {
    title: 'Gen-Ji Customer Support & Project Enquiry',
    description:
      'Talk to Gen-Ji for customer support and project consultation. Get a response within 24 hours.',
    url: 'https://www.gen-ji.me/contact',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hire Web Developers India - Gen-Ji' }],
  },
  alternates: { canonical: 'https://www.gen-ji.me/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

