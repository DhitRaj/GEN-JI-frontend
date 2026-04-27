import { Metadata } from 'next';
import { PremiumLayout } from '@/components/common/PremiumBackground';
import FeaturesPageClient from './FeaturesPageClient';

export const metadata: Metadata = {
  title: 'Features | Gen-Ji Digital Studio',
  description: 'Discover all the features and capabilities of Gen-Ji platform including public website, client management, admin panel, and platform security. Everything you need in one place.',
  keywords: ['platform features', 'digital platform', 'client management system', 'admin panel', 'web platform'],
  openGraph: {
    title: 'Features - Gen-Ji Digital Studio',
    description: 'Everything the platform can do - website, lead management, administration, and security.',
    url: 'https://www.gen-ji.me/features',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.gen-ji.me/features',
  },
};

export default function FeaturesPage() {
  return (
    <PremiumLayout>
      <FeaturesPageClient />
    </PremiumLayout>
  );
}


