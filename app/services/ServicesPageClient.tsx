'use client';

import { motion } from 'framer-motion';
import PageScene from '../../components/three/PageScene';
import Footer from '../../components/Footer';

const packages = [
  { title: 'Starter Build', items: ['Landing page', 'Contact form', 'Brand setup'] },
  { title: 'Growth Platform', items: ['Multi-page site', 'Lead flow', 'Admin panel'] },
  { title: 'Scale Suite', items: ['Custom dashboard', 'Advanced workflows', 'Long-term support'] },
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
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

export default function ServicesPageClient() {
  return (
    <PageScene title="Services" pages={5}>
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
                OUR <motion.span 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                >SERVICES</motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                From concept to deployment, we offer comprehensive digital solutions tailored to your business needs and growth objectives.
              </motion.p>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: "🌐", label: "Web Development", desc: "Modern & responsive" },
                  { icon: "📱", label: "Mobile Apps", desc: "iOS & Android" },
                  { icon: "☁️", label: "Cloud Solutions", desc: "Scalable infrastructure" }
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

        {/* SERVICES HERO */}
        <div className="min-h-screen w-full flex items-center justify-center p-6">
          <GlassCard className="max-w-5xl text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"
            >
              OUR <motion.span 
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="italic"
              >EXPERTISE</motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto"
            >
              From product design to production-grade engineering, we deliver systems that look premium and work reliably.
            </motion.p>
          </GlassCard>
        </div>

        {/* CORE OFFERINGS */}
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-10 max-w-7xl mx-auto items-center">
          {packages.map((pkg, idx) => (
            <GlassCard key={idx} className="h-full flex flex-col justify-center border-white/10 hover:border-purple-500/50 transition-all group">
              <motion.h3 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="text-3xl font-black text-white mb-6 uppercase italic group-hover:text-purple-400 transition-colors"
              >
                {pkg.title}
              </motion.h3>
              <ul className="space-y-4 text-slate-300 text-lg">
                {pkg.items.map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.2 + i * 0.1 + 0.2 }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* DELIVERY PROCESS */}
        <div className="min-h-screen w-full flex items-center justify-center p-10">
          <GlassCard className="max-w-6xl w-full">
            <motion.h2 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-black text-white mb-12 uppercase tracking-widest text-center"
            >
              Execution Plan
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {[
                  { num: '01', title: 'Discovery', desc: 'We map goals, business constraints, and the user journey.' },
                  { num: '02', title: 'Design System', desc: 'We design reusable patterns so the product stays consistent.' }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <motion.h4 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
                      className="text-xl font-bold text-white mb-2"
                    >
                      {step.num}. {step.title}
                    </motion.h4>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
                      className="text-slate-400"
                    >
                      {step.desc}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-8">
                {[
                  { num: '03', title: 'Development', desc: 'We build the experience with performance and maintainability.' },
                  { num: '04', title: 'Launch', desc: 'We ship, monitor, and iterate with real usage feedback.' }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <motion.h4 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
                      className="text-xl font-bold text-white mb-2"
                    >
                      {step.num}. {step.title}
                    </motion.h4>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
                      className="text-slate-400"
                    >
                      {step.desc}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
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
