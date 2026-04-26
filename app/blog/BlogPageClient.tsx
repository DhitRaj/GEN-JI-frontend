'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BlogScene from '../../components/three/BlogScene';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { blogPosts as blogPostData } from '../../lib/blogPosts';

type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured: boolean;
};

const categoryColors: Record<string, string> = {
  'Technical Guide': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Industry Insights': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Case Studies': 'bg-green-500/20 text-green-300 border-green-500/30',
  Checklist: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Tutorials: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

const blogPosts: BlogCardPost[] = blogPostData.map((post, index) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  readTime: post.readTime,
  date: new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  featured: index < 2,
}));

const GlassCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-[80px] shadow-2xl relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 opacity-15 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default function BlogPageClient() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  // Sections: hero(1) + featured(1) + grid(1) + cta(1) + footer(1) = 5
  const PAGES = 5;

  return (
    <div className="h-screen w-full overflow-hidden fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed top-0 left-0 w-full z-[100] p-4 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 20], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#0f172a', 10, 100]} />

        <Suspense fallback={null}>
          <Environment preset="night" />

          <ScrollControls pages={PAGES} damping={0.3}>
            <Scroll>
              <BlogScene />
            </Scroll>

            <Scroll html style={{ width: '100vw' }}>
              <div className="relative w-full overflow-x-hidden flex flex-col items-center">
                <div className="h-screen w-full flex items-center justify-center p-6 flex-shrink-0">
                  <div className="max-w-5xl mx-auto text-center">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400 mb-6 block"
                    >
                      Expert Knowledge
                    </motion.span>

                    <motion.h1
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="text-6xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-none"
                    >
                      WEB DEV{' '}
                      <motion.span
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
                      >
                        BLOG
                      </motion.span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
                    >
                      Expert guides, tutorials, and industry insights on web development,
                      tech stacks, performance optimization, and building scalable software in India.
                    </motion.p>

                    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                      {[
                        { num: `${blogPosts.length}+`, label: 'Articles' },
                        { num: '2-3', label: 'Posts/Week' },
                        { num: '1500+', label: 'Words Each' },
                      ].map((s, i) => (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                          className="text-center"
                        >
                          <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                            {s.num}
                          </div>
                          <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-h-screen w-full flex items-center justify-center p-8 flex-shrink-0">
                  <div className="w-full max-w-7xl">
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-2xl font-black text-white mb-8 uppercase tracking-widest"
                    >
                      Featured Articles
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      {featured.map((post, idx) => (
                        <motion.article
                          key={post.slug}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: idx * 0.15 }}
                        >
                          <Link href={`/blog/${post.slug}`}>
                            <GlassCard className="p-8 h-full hover:border-purple-500/50 transition-all group cursor-pointer">
                              <div className="flex items-center gap-3 mb-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                    categoryColors[post.category] ??
                                    'bg-white/10 text-white border-white/20'
                                  }`}
                                >
                                  {post.category}
                                </span>
                                <span className="text-slate-400 text-xs">{post.readTime}</span>
                              </div>
                              <h3 className="text-2xl font-black text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                                {post.title}
                              </h3>
                              <p className="text-slate-300 leading-relaxed mb-6">{post.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-500 text-sm">{post.date}</span>
                                <span className="text-purple-400 text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">
                                  Read More {'->'}
                                </span>
                              </div>
                            </GlassCard>
                          </Link>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-h-screen w-full flex items-center justify-center p-8 flex-shrink-0">
                  <div className="w-full max-w-7xl">
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-2xl font-black text-white mb-8 uppercase tracking-widest"
                    >
                      Latest Articles
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rest.map((post, idx) => (
                        <motion.article
                          key={post.slug}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          <Link href={`/blog/${post.slug}`}>
                            <GlassCard className="p-6 h-full hover:border-purple-500/50 transition-all group cursor-pointer">
                              <div className="flex items-center gap-3 mb-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                    categoryColors[post.category] ??
                                    'bg-white/10 text-white border-white/20'
                                  }`}
                                >
                                  {post.category}
                                </span>
                                <span className="text-slate-400 text-xs">{post.readTime}</span>
                              </div>
                              <h3 className="text-xl font-black text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                                {post.title}
                              </h3>
                              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-500 text-xs">{post.date}</span>
                                <span className="text-purple-400 text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">
                                  Read {'->'}
                                </span>
                              </div>
                            </GlassCard>
                          </Link>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-h-screen w-full flex items-center justify-center p-8 flex-shrink-0">
                  <div className="w-full max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                    >
                      <GlassCard className="p-12 text-center">
                        <motion.h2
                          initial={{ opacity: 0, y: -20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
                        >
                          Ready to Build Your{' '}
                          <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                            Project?
                          </span>
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                          Our expert team is ready to help you build scalable web solutions.
                          <Link href="/services" className="text-purple-400 hover:text-purple-300 underline ml-1">
                            Explore our services
                          </Link>{' '}
                          or
                          <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline ml-1">
                            hire our developers
                          </Link>{' '}
                          today.
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="flex flex-wrap gap-4 justify-center"
                        >
                          <Link
                            href="/contact"
                            className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-black uppercase tracking-widest hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg"
                          >
                            Get Free Consultation
                          </Link>
                          <Link
                            href="/projects"
                            className="px-10 py-4 rounded-full border border-white/20 bg-white/5 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                          >
                            View Portfolio
                          </Link>
                        </motion.div>
                      </GlassCard>
                    </motion.div>
                  </div>
                </div>

                <div className="min-h-screen w-full flex items-center justify-center flex-shrink-0">
                  <div className="w-full">
                    <Footer />
                  </div>
                </div>
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
