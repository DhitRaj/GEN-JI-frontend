'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
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

// Animated Background
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(6, 8, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #060810 0%, #0b0f1e 50%, #111827 100%)' }}
    />
  );
}

// Scroll Reveal
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function BlogPageClient() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <style>{`
        ::-webkit-scrollbar {
          width: 0px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: transparent;
        }
        scrollbar-width: none;
      `}</style>
      <AnimatedBackground />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-radial-gradient opacity-30" />

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-20 min-h-screen flex items-center justify-center px-4 md:px-6 pt-32">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Web Dev
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Expert guides and practical insights on web development, performance optimization, and scalable software delivery.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { num: `${blogPosts.length}+`, label: 'Articles' },
                { num: '2-3', label: 'Posts/Week' },
                { num: '1500+', label: 'Words Each' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-cyan-400">{stat.num}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Featured <span className="text-cyan-400">Articles</span>
              </h2>
              <p className="text-slate-300 text-lg">Our most popular and in-depth guides</p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {featured.map((post, idx) => (
              <motion.article
                key={post.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-full p-8 md:p-10 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl hover:border-cyan-500/60 transition-all cursor-pointer group">
                    <div className="mb-6 flex items-center gap-3">
                      <span className={`rounded-full border px-4 py-2 text-xs font-bold ${categoryColors[post.category] ?? 'border-white/20 bg-white/10 text-white'}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400">📖 {post.readTime}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black leading-tight text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <span className="text-sm text-slate-400">📅 {post.date}</span>
                      <span className="text-sm font-bold text-cyan-400 group-hover:translate-x-2 transition-transform">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="relative z-20 py-32 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Latest <span className="text-purple-400">Articles</span>
              </h2>
              <p className="text-slate-300 text-lg">Fresh insights and practical guides</p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {rest.map((post, idx) => (
              <motion.article
                key={post.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-full p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-purple-500/50 transition-all cursor-pointer group">
                    <div className="mb-4 flex items-center gap-2">
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${categoryColors[post.category] ?? 'border-white/20 bg-white/10 text-white'}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400">📖 {post.readTime}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-black leading-tight text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-slate-500">📅 {post.date}</span>
                      <span className="text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Browse by <span className="text-cyan-400">Category</span>
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-5 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {Object.entries(categoryColors).map(([category, colors]) => (
              <motion.button
                key={category}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border font-semibold transition-all ${colors}`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Ready to Build Your <span className="text-cyan-400">Project?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-slate-300 mb-8">
              Our expert team is ready to help you build scalable web solutions. Get a free consultation today.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,229,255,0.8)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
              >
                Get Free Consultation
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-cyan-500/50 rounded-lg font-bold text-lg hover:bg-cyan-500/10 transition-all"
              >
                View Portfolio
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}




