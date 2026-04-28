'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Footer from '../../components/Footer';
import ClientForm from '../../components/sections/ClientForm';
import Navbar from '../../components/Navbar';

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

export default function ContactPageClient() {
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

      {/* Hero Section - GET IN TOUCH */}
      <section className="relative z-20 min-h-screen flex items-center justify-center px-4 md:px-6 pt-32">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Get In
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to bring your vision to life? Let&apos;s discuss your project requirements and build something extraordinary together.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,229,255,0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="https://wa.me/917052207833"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-cyan-500/50 rounded-lg font-bold text-lg hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>WhatsApp Us</span>
              </motion.a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { num: '24h', label: 'Response Time' },
                { num: '50+', label: 'Projects Done' },
                { num: '99%', label: 'Success Rate' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-cyan-400">{stat.num}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Reach Us <span className="text-cyan-400">Anytime</span>
              </h2>
              <p className="text-slate-300 text-lg">Multiple ways to connect with our team</p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
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
            {[
              {
                icon: '💬',
                title: 'WhatsApp',
                desc: 'Message us directly on WhatsApp',
                contact: '+91 7052207833',
                link: 'https://wa.me/917052207833',
              },
              {
                icon: '✉️',
                title: 'Email',
                desc: 'Send us your project details',
                contact: 'admin@gen-ji.me',
                link: 'mailto:admin@gen-ji.me',
              },
              {
                icon: '💬',
                title: 'Chat',
                desc: 'Quick response via messaging',
                contact: 'Available 24/7',
                link: '#contact-form',
              },
            ].map((method, i) => (
              <motion.a
                key={i}
                href={method.link}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -12, boxShadow: '0 20px 60px rgba(0,229,255,0.2)' }}
                className={`p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all cursor-pointer group`}
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{method.title}</h3>
                <p className="text-slate-300 mb-4">{method.desc}</p>
                <div className="text-lg font-semibold text-cyan-400">{method.contact}</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-20 py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Why Choose <span className="text-cyan-400">Gen-Ji</span>
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
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
            {[
              {
                icon: '⚡',
                title: 'Quick Response',
                description: 'We respond to your inquiry within 24 hours with a detailed project plan and timeline.',
                features: ['Fast turnaround', 'Dedicated support', 'Clear communication'],
              },
              {
                icon: '🎯',
                title: 'Tailored Solutions',
                description: 'Custom execution plan designed specifically for your business needs and goals.',
                features: ['Personalized approach', 'Flexible timeline', 'Scalable architecture'],
              },
              {
                icon: '🚀',
                title: 'Fast Delivery',
                description: 'Agile implementation with regular updates and quality assurance at every step.',
                features: ['Sprint-based', 'Regular updates', 'Quality assurance'],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8 }}
                className={`p-8 md:p-10 rounded-2xl border backdrop-blur-xl transition-all ${
                  i === 1
                    ? 'border-cyan-500/50 bg-cyan-500/10 hover:border-cyan-500/80'
                    : 'border-white/10 bg-white/5 hover:border-cyan-500/50'
                }`}
              >
                <div className="text-5xl md:text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">{item.description}</p>
                <div className="space-y-3">
                  {item.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Tell Us About Your <span className="text-cyan-400">Project</span>
              </h2>
              <p className="text-slate-300 text-lg">Share your requirements and let&apos;s create something amazing together</p>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl"
          >
            <ClientForm />
          </motion.div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="p-8 md:p-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-5xl font-black">
                    DK
                  </div>
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Dhiraj Kumar</h3>
                  <p className="text-cyan-400 font-bold text-lg mb-4">CEO & Founder, Gen-Ji Digital Studio</p>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    &quot;We&apos;re passionate about building next-generation digital experiences. Every project is a partnership, and your success is our success. Let&apos;s create something extraordinary together.&quot;
                  </p>
                  <motion.a
                    href="https://wa.me/917052207833"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500/20 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all font-semibold"
                  >
                    <span>💬</span>
                    <span>WhatsApp Dhiraj</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-20 py-32 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Frequently Asked <span className="text-cyan-400">Questions</span>
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            className="space-y-6"
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
            {[
              {
                q: 'What is your typical project timeline?',
                a: 'Most projects take 4-12 weeks depending on complexity. We provide a detailed timeline during the discovery phase.',
              },
              {
                q: 'Do you offer ongoing support?',
                a: 'Yes! We provide 24/7 support and maintenance packages for all our projects.',
              },
              {
                q: 'What is your pricing model?',
                a: 'We offer flexible pricing based on project scope. We provide custom quotes after understanding your requirements.',
              },
              {
                q: 'Can you work with existing code?',
                a: 'Absolutely! We can integrate with, improve, or rebuild existing projects as needed.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-slate-300 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Let&apos;s Create <span className="text-cyan-400">Magic</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-slate-300 mb-8">
              Your next big project is just one conversation away. Let&apos;s talk!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,229,255,0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
            >
              Get Started Now →
            </motion.a>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}




