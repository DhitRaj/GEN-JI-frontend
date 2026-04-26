import { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Web Development Portfolio India | 50+ Projects | Gen-Ji Digital Studio',
  description: 'Explore Gen-Ji\'s portfolio of 50+ successful web development projects in India. Real-world examples of web apps, mobile apps, and custom software built for startups and enterprises.',
  keywords: [
    'web development portfolio India',
    'software development case studies',
    'web app development examples',
    'mobile app portfolio India',
    'custom software projects India',
    'startup web development portfolio',
    'React Next.js projects',
    'full stack development portfolio',
    'digital solutions showcase India',
    'web development work samples',
  ],
  openGraph: {
    title: 'Web Development Portfolio India | 50+ Projects | Gen-Ji',
    description: 'Explore 50+ successful web development projects. Real-world examples of web apps, mobile apps, and custom software for startups and enterprises.',
    url: 'https://www.gen-ji.me/projects',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Web Development Portfolio India - Gen-Ji' }],
  },
  alternates: { canonical: 'https://www.gen-ji.me/projects' },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

