'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

type Service = {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  features?: string[];
  price?: string;
};

const colorSchemes = [
  {
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  {
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
  },
  {
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We understand your goals, challenges, and vision for the project.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'We create a detailed roadmap and technical architecture.',
    icon: '📋',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'We design beautiful, user-friendly interfaces and experiences.',
    icon: '🎨',
  },
  {
    num: '04',
    title: 'Development',
    desc: 'We build scalable, performant solutions with clean code.',
    icon: '💻',
  },
  {
    num: '05',
    title: 'Testing',
    desc: 'We ensure quality through rigorous testing and QA.',
    icon: '✅',
  },
  {
    num: '06',
    title: 'Launch & Support',
    desc: 'We deploy and provide ongoing support and maintenance.',
    icon: '🚀',
  },
];

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

export default function ServicesPageClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${processSteps.env.NEXT_PUBLIC_API_URL}/api/services`);
        setServices(response.data.services || []);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
              Our
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Comprehensive digital solutions tailored to your business needs. From web development to AI integration, we&apos;ve got you covered.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { num: '6+', label: 'Services' },
                { num: '50+', label: 'Projects' },
                { num: '99%', label: 'Success' },
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

      {/* Services Grid */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                What We <span className="text-cyan-400">Offer</span>
              </h2>
              <p className="text-slate-300 text-lg">Complete suite of digital services</p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="text-center text-slate-300 py-20">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="text-center text-slate-300 py-20">No services available yet.</div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              {services.map((service, i) => {
                const colorScheme = colorSchemes[i % colorSchemes.length];
                return (
                  <motion.div
                    key={service._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -12, boxShadow: '0 20px 60px rgba(0,229,255,0.2)' }}
                    className={`p-8 rounded-2xl border ${colorScheme.borderColor} ${colorScheme.bgColor} backdrop-blur-xl hover:border-white/50 transition-all cursor-pointer group`}
                  >
                    {service.image ? (
                      <div className="relative h-40 rounded-lg overflow-hidden mb-4 bg-slate-800">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : service.icon ? (
                      <motion.div
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        className="text-5xl mb-4 inline-block"
                      >
                        {service.icon}
                      </motion.div>
                    ) : null}
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-300 mb-6">{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}
                    {service.price && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-cyan-400 font-bold">{service.price}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-20 py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Our <span className="text-purple-400">Process</span>
              </h2>
              <p className="text-slate-300 text-lg">How we deliver excellence</p>
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
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-purple-400 mb-2">Step {step.num}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Why Choose <span className="text-cyan-400">Gen-Ji</span>
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
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
              { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality' },
              { icon: '🎯', title: 'Expert Team', desc: 'Experienced developers and designers' },
              { icon: '🤝', title: 'Client Focus', desc: 'Your success is our priority' },
              { icon: '🚀', title: 'Innovation', desc: 'Latest technologies and best practices' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Ready to Get Started?</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-slate-300 mb-8">
              Let&apos;s discuss your project and find the perfect solution for your needs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,229,255,0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
            >
              Schedule Consultation →
            </motion.a>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}




