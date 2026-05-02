'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';
import SiteHeader from '../../components/SiteHeader';
import { blogPosts as blogPostData } from '../../lib/blogPosts';

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const blogPosts = blogPostData.map((post, index) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  readTime: post.readTime,
  date: new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
  featured: index < 2,
}));

export default function BlogPageClient() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />
      <main>
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-16 md:px-6 md:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Web Dev Blog</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">Expert guides and practical insights on web development, performance optimization, and scalable software delivery.</p>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Featured Articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featured.map((post, i) => (
                <motion.article whileHover={{ y: -5 }} key={post.slug} className={`rounded-2xl border p-8 ${i % 2 === 0 ? 'border-sky-200 card-sky' : 'border-rose-200 card-pink'}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{post.category} • {post.readTime}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-brand">{post.title}</h3>
                  <p className="mt-3 text-brand-muted">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between"><span className="text-sm text-slate-500">{post.date}</span><Link href={`/blog/${post.slug}`} className="font-semibold text-sky-700 hover:text-sky-600">Read More</Link></div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="section-soft px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Latest Articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <motion.article whileHover={{ y: -4 }} key={post.slug} className={`rounded-2xl border p-6 ${i % 2 === 0 ? 'border-rose-200 card-pink' : 'border-sky-200 card-sky'}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{post.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-brand">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm text-brand-muted">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between"><span className="text-xs text-slate-500">{post.date}</span><Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-rose-700 hover:text-rose-600">Read</Link></div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-10 text-center md:px-6">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Ready to Build Your Project?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted">Our expert team is ready to help you build scalable web solutions. Get a free consultation today.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/contact" className="inline-flex rounded-xl btn-brand px-8 py-4 font-semibold text-white transition hover:bg-sky-700">Get Free Consultation</a>
            <a href="/projects" className="inline-flex rounded-xl border border-rose-200 bg-white/75 px-8 py-4 font-semibold text-rose-700 transition hover:bg-rose-100">View Portfolio</a>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}




