import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { blogPosts, getBlogPostBySlug } from '../../../lib/blogPosts';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const siteUrl = 'https://www.gen-ji.me';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-image.png'],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Gen-Ji Digital Studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gen-Ji Digital Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    inLanguage: 'en-IN',
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />

      <article className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Back to blog
          </Link>

          <header className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
              {post.category} | {post.readTime}
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Published on {new Date(post.publishedAt).toLocaleDateString('en-IN')}
            </p>
          </header>

          <div className="mt-10 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="card">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-slate-700 dark:text-slate-300 leading-7">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="card mt-10">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Need help implementing this?
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Gen-Ji can help you plan, build, and ship production-ready web products faster.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link href="/services" className="btn btn-secondary">
                View Services
              </Link>
              <Link href="/contact" className="btn btn-primary">
                Get a Free Consultation
              </Link>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
