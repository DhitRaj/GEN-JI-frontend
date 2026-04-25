import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About | Gen-Ji Digital Studio',
  description: 'Learn about Gen-Ji, our mission, values, and our approach to building high-performance digital products.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}