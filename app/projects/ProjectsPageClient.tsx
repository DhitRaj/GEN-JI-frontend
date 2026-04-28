'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  liveUrl?: string;
  featured?: boolean;
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

export default function ProjectsPageClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

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
                Portfolio
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              50+ projects delivered across web, mobile, and AI systems. Each one crafted with precision and delivered with excellence.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
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

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="relative z-20 py-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="mb-20">
                <h2 className="text-5xl md:text-6xl font-black mb-4">
                  Featured <span className="text-cyan-400">Projects</span>
                </h2>
                <p className="text-slate-300 text-lg">Our most impactful work</p>
              </div>
            </ScrollReveal>

            <div className="space-y-12">
              {featuredProjects.map((project, i) => (
                <ScrollReveal key={project._id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl hover:border-cyan-500/60 transition-all cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {project.image && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative h-64 md:h-80 rounded-xl overflow-hidden"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </motion.div>
                      )}
                      <div>
                        <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm font-semibold mb-4">
                          ⭐ Featured Project
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{project.title}</h3>
                        <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all font-semibold"
                          >
                            View Live →
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="relative z-20 py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                All <span className="text-purple-400">Projects</span>
              </h2>
              <p className="text-slate-300 text-lg">Complete portfolio of our work</p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="text-center text-slate-300 py-20">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-slate-300 py-20">No projects available yet.</div>
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
              {projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -12, boxShadow: '0 20px 60px rgba(0,229,255,0.2)' }}
                  onClick={() => setSelectedProject(project)}
                  className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all cursor-pointer group"
                >
                  {project.image && (
                    <div className="relative h-40 rounded-lg overflow-hidden mb-4 bg-slate-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {project.featured && (
                    <div className="inline-block px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-3">
                      ⭐ Featured
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-slate-300 mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 rounded-full text-xs bg-slate-500/20 text-slate-300">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      View Live →
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
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
              { icon: '⚡', title: 'Fast Delivery', desc: 'Projects delivered on time, every time' },
              { icon: '🎯', title: 'Quality Focus', desc: 'Attention to detail in every pixel' },
              { icon: '🤝', title: 'Client First', desc: 'Your success is our success' },
              { icon: '🚀', title: 'Innovation', desc: 'Latest tech and best practices' },
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
            <h2 className="text-5xl md:text-6xl font-black mb-6">Ready to Start Your Project?</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-slate-300 mb-8">
              Let&apos;s transform your vision into a powerful digital solution.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,229,255,0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
            >
              Get In Touch →
            </motion.a>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl"
            >
              {selectedProject.image && (
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">{selectedProject.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all font-semibold"
                >
                  View Live Project →
                </a>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="mt-6 w-full py-2 rounded-lg border border-white/20 hover:border-white/50 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}




