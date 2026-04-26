import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Web Development Blog India | Expert Guides & Tutorials | Gen-Ji',
  description: 'Expert web development guides, tutorials, and industry insights from Gen-Ji. Learn about React, Node.js, performance optimization, SEO for developers, and more.',
  keywords: [
    'web development blog India',
    'web development tutorials',
    'React Next.js tutorials',
    'Node.js guides',
    'software development tips',
    'web development best practices',
    'startup tech stack guide',
    'website cost India',
    'web performance optimization',
    'SEO for developers',
  ],
  openGraph: {
    title: 'Web Development Blog India | Expert Guides | Gen-Ji',
    description: 'Expert web development guides, tutorials, and industry insights. Learn React, Node.js, performance optimization, and more.',
    url: 'https://www.gen-ji.me/blog',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gen-Ji Web Development Blog' }],
  },
  alternates: { canonical: 'https://www.gen-ji.me/blog' },
};

export default function BlogPage() {
  return <BlogPageClient />;
}

