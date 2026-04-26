'use client';

import { motion } from 'framer-motion';
import PageScene from '../../components/three/PageScene';
import Footer from '../../components/Footer';

const values = [
  { title: 'Product-First Thinking', desc: 'Every feature is mapped to business outcomes, not just code delivery.' },
  { title: 'Engineering Quality', desc: 'Scalable architecture, secure APIs, and maintainable code standards.' },
  { title: 'Clear Communication', desc: 'Transparent timelines, milestone updates, and no hidden surprises.' },
];

const milestones = [
  { year: '01', title: 'Discovery', desc: 'We clarify goals, audience, and delivery scope before building anything.' },
  { year: '02', title: 'Design', desc: 'We shape the visual direction, information flow, and conversion paths.' },
  { year: '03', title: 'Build', desc: 'We develop the product with maintainable code, performance, and security in mind.' },
  { year: '04', title: 'Launch', desc: 'We test, refine, deploy, and hand over with a clear operating roadmap.' },
];

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-[80px] shadow-2xl relative overflow-hidden ${className}`}
  >
    {/* Oily/Liquid effect overlay */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/30 via-transparent to-purple-500/30 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

export default function AboutPageClient() {
  return (
    <PageScene title="About" pages={5} theme="about">
      <div className="flex flex-col items-center">
        {/* FIRST PAGE - PROFESSIONAL INTRO */}
        <div className="h-screen w-full flex items-center justify-center p-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-6xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter"
              >
                ABOUT <motion.span 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="italic bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400"
                >GEN-JI</motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                We are a modern digital studio passionate about creating exceptional web experiences and scalable software solutions that drive business growth.
              </motion.p>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: "💡", label: "Innovation", desc: "Cutting-edge solutions" },
                  { icon: "🎯", label: "Precision", desc: "Attention to detail" },
                  { icon: "🤝", label: "Partnership", desc: "Long-term relationships" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                    className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <div className="text-lg font-bold text-white mb-2">{item.label}</div>
                    <div className="text-sm text-slate-400">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* MISSION */}
        <div className="min-h-screen w-full flex items-center justify-center p-6">
          <GlassCard className="max-w-5xl text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-green-400 via-cyan-400 to-purple-400"
            >
              WHO <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="italic"
              >WE ARE</motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto"
            >
              Gen-Ji is a modern SaaS engineering partner focused on high-impact websites, robust backend systems, and clean admin workflows for growing teams.
            </motion.p>
          </GlassCard>
        </div>

        {/* VALUES */}
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-10 max-w-7xl mx-auto items-center">
          {values.map((item, idx) => (
            <GlassCard key={idx} className="h-full flex flex-col justify-center">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="text-3xl font-bold text-white mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
                className="text-slate-400 text-lg leading-relaxed"
              >
                {item.desc}
              </motion.p>
            </GlassCard>
          ))}
        </div>

        {/* MILESTONES */}
        <div className="min-h-screen w-full flex items-center justify-center p-10">
          <GlassCard className="max-w-6xl w-full">
            <motion.h2 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-black text-white mb-12 uppercase tracking-widest text-center"
            >
              Our Story
            </motion.h2>
            <div className="space-y-6">
              {milestones.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex gap-8 items-start border-b border-white/10 pb-6 last:border-0"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                    className="text-4xl font-black text-purple-500"
                  >
                    {item.year}
                  </motion.div>
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.3 }}
                      className="text-2xl font-bold text-white"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.4 }}
                      className="text-slate-400 text-lg"
                    >
                      {item.desc}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* FOOTER SECTION */}
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </PageScene>
  );
}
