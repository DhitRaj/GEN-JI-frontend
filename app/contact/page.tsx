import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Hire Web Developers India | Get Free Quote | Gen-Ji Digital Studio',
  description: 'Hire expert web developers in India for your next project. Share your requirements and get a detailed plan, timeline, and estimate within 24 hours. No commitment required.',
  keywords: [
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
    title: 'Hire Web Developers India | Free Quote | Gen-Ji',
    description: 'Hire expert web developers in India. Get a detailed plan, timeline, and estimate within 24 hours. No commitment required.',
    url: 'https://gen-ji.me/contact',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hire Web Developers India - Gen-Ji' }],
  },
  alternates: { canonical: 'https://gen-ji.me/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}