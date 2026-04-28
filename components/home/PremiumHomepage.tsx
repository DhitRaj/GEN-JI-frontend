'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

type Service = {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  features?: string[];
  price?: string;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  liveUrl?: string;
  featured?: boolean;
};

// Service color schemes
const SERVICE_COLORS: Record<number, {
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  0: {
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  1: {
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  2: {
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  3: {
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  4: {
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
  },
  5: {
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
};

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

// Scroll Reveal Animation
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

// Service Card
function ServiceCard({
  service,
  colorScheme,
  isSelected,
  onClick,
}: {
  service: Service;
  colorScheme: { color: string; bgColor: string; borderColor: string };
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-xl ${
        isSelected
          ? `bg-gradient-to-br ${colorScheme.color} shadow-2xl shadow-purple-500/50 border border-white/20`
          : `${colorScheme.bgColor} border ${colorScheme.borderColor} hover:border-white/50 hover:shadow-lg hover:shadow-purple-500/20`
      }`}
    >
      {service.image ? (
        <div className="relative h-24 rounded-lg overflow-hidden mb-3 bg-slate-800">
          <Image
            src={service.image}
            alt={service.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      ) : service.icon ? (
        <motion.div
          animate={{ scale: isSelected ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl mb-3"
        >
          {service.icon}
        </motion.div>
      ) : null}
      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
      <p className="text-sm text-slate-300">Click to explore →</p>
    </motion.div>
  );
}

// Detail Panel
function DetailPanel({
  service,
  isOpen,
}: {
  service: Service;
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-8">
            {service.icon && (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-5xl"
              >
                {service.icon}
              </motion.span>
            )}
            <h2 className="text-3xl font-bold text-white">{service.title}</h2>
          </div>

          <div className="space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-slate-300 leading-relaxed">{service.description}</p>
            </motion.div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">
                  ⭐ Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                      className="px-4 py-3 rounded-lg bg-purple-500/20 border border-purple-500/30 text-sm text-purple-200 font-medium hover:border-purple-500/60 transition-all"
                    >
                      ✓ {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Price */}
            {service.price && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-white/10"
              >
                <p className="text-cyan-400 font-bold text-lg">{service.price}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PremiumHomepage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`),
        ]);
        setServices(servicesRes.data.services || []);
        setProjects(projectsRes.data.projects || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

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

      {/* Floating Badge */}
      <motion.div
        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[90]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="inline-block px-6 py-3 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-semibold backdrop-blur-sm"
          animate={{ boxShadow: ['0 0 20px rgba(0,229,255,0.3)', '0 0 40px rgba(0,229,255,0.6)', '0 0 20px rgba(0,229,255,0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨ Next-Gen Digital Studio
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-20 min-h-screen flex items-center justify-center px-4 md:px-6 pt-32">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              We Build
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next-Gen Digital Experiences
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Web, Apps, AI Systems &amp; 3D Interfaces. From concept to scale, we craft digital products that convert.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,229,255,0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Explore Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-cyan-500/50 rounded-lg font-bold hover:bg-cyan-500/10 transition-all"
              >
                View Projects
              </motion.button>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.4}>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { num: '50+', label: 'Projects' },
                { num: '30+', label: 'Clients' },
                { num: '99%', label: 'Success' },
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

      {/* Services Section */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                What We <span className="text-cyan-400">Build</span>
              </h2>
              <p className="text-slate-300 text-lg">Click any service to explore platforms & features</p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Service Cards */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {loading ? (
                <div className="text-center text-slate-300 py-10">Loading services...</div>
              ) : services.length === 0 ? (
                <div className="text-center text-slate-300 py-10">No services available yet.</div>
              ) : (
                services.map((service, index) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    colorScheme={SERVICE_COLORS[index % 6]}
                    isSelected={selectedService === service._id}
                    onClick={() => setSelectedService(selectedService === service._id ? null : service._id)}
                  />
                ))
              )}
            </motion.div>

            {/* Right: Detail Panel */}
            <div className="sticky top-32">
              {selectedService ? (
                <DetailPanel
                  service={services.find(s => s._id === selectedService)!}
                  isOpen={!!selectedService}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full p-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-center"
                >
                  <p className="text-slate-400 text-lg">👈 Select a service to see details</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-20 py-32 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Featured <span className="text-purple-400">Projects</span>
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {loading ? (
              <div className="col-span-full text-center text-slate-300 py-10">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="col-span-full text-center text-slate-300 py-10">No projects available yet.</div>
            ) : (
              projects.slice(0, 6).map((project, i) => (
                <motion.div
                  key={project._id}
                  whileHover={{ y: -12, boxShadow: '0 20px 60px rgba(0,229,255,0.2)' }}
                  className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all cursor-pointer group"
                >
                  {project.image ? (
                    <div className="relative h-32 rounded-lg overflow-hidden mb-4 bg-slate-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <motion.div
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="text-6xl mb-4 inline-block"
                    >
                      💼
                    </motion.div>
                  )}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 transition-all"
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 rounded-full text-xs bg-slate-500/20 text-slate-300">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative z-20 py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                Trusted by <span className="text-cyan-400">Industry Leaders</span>
              </h2>
              <p className="text-slate-300 text-lg">50+ projects delivered. 99% client satisfaction.</p>
            </div>
          </ScrollReveal>

          {/* CEO Section */}
          <ScrollReveal delay={0.1}>
            <div className="mb-20 p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-4xl font-black">
                    DK
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Dhiraj Kumar</h3>
                  <p className="text-cyan-400 font-semibold mb-3">CEO & Founder, Gen-Ji Digital Studio</p>
                  <p className="text-slate-300 mb-4">
                    &quot;We&apos;re passionate about building next-generation digital experiences. Every project is a partnership, and your success is our success.&quot;
                  </p>
                  <a
                    href="https://wa.me/917052207833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all"
                  >
                    <span>�</span>
                    <span className="font-semibold">WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Testimonials */}
          <ScrollReveal delay={0.2}>
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Amit Sharma',
                    role: 'Founder, TechStartup',
                    text: 'Gen-Ji transformed our vision into reality. The team is professional, responsive, and delivers quality work on time.',
                    rating: 5,
                  },
                  {
                    name: 'Priya Patel',
                    role: 'CEO, E-Commerce Co.',
                    text: 'Outstanding work on our e-commerce platform. The attention to detail and user experience is exceptional.',
                    rating: 5,
                  },
                  {
                    name: 'Rajesh Singh',
                    role: 'Product Manager, SaaS',
                    text: 'Best decision we made. The team understood our requirements perfectly and delivered beyond expectations.',
                    rating: 5,
                  },
                ].map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <span key={j} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <p className="text-slate-300 mb-4">&quot;{testimonial.text}&quot;</p>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.3}>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: '50+', label: 'Projects Delivered' },
                { num: '30+', label: 'Happy Clients' },
                { num: '99%', label: 'Success Rate' },
                { num: '5 yrs', label: 'Industry Experience' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-center hover:border-cyan-500/50 transition-all"
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.num}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Ready to Build?</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-slate-300 mb-8">
              Let&apos;s transform your vision into a next-gen digital product.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,229,255,0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
            >
              Start Your Project →
            </motion.button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
