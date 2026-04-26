import type { Metadata } from 'next';
import ModernScene from '../components/three/ModernScene';

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
    canonical: 'https://gen-ji.me',
  },
  openGraph: {
    title: 'Gen-Ji (Gen Ji) - Web Development Company in India',
    description:
      'Build high-performance websites and apps with Gen-Ji Digital Studio.',
    url: 'https://gen-ji.me',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gen-Ji Digital Studio' }],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <section className="sr-only">
        <h1>Gen-Ji Digital Studio (Gen Ji) - Web Development Company in India</h1>
        <p>
          Gen-Ji helps businesses design, build, and scale websites, web apps, and mobile apps.
          If you are searching for Gen Ji or Genji web development services, this is the official site.
        </p>
        <p>
          Explore our <a href="/services">services</a>, <a href="/projects">projects</a>, and
          <a href="/contact"> contact page</a> to start your project.
        </p>
      </section>
      <ModernScene />
    </main>
  );
}
