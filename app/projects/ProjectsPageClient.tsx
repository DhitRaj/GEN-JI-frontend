'use client';

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import ProjectsScene from '../../components/three/ProjectsScene';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const insights = [
  { title: 'Faster Delivery', value: '40%', desc: 'Reusable patterns and a cleaner workflow reduce build time.' },
  { title: 'Better Clarity', value: '2x', desc: 'Dedicated sections make information easier to scan and understand.' },
  { title: 'Higher Trust', value: '95%', desc: 'A consistent premium look improves credibility and engagement.' },
];

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-[80px] shadow-2xl relative overflow-hidden ${className}`}>
    {/* Oily/Liquid effect overlay */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default function ProjectsPageClient() {
  return (
    <div className="h-screen w-full overflow-hidden fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* FLOATING NAVBAR - FIXED ON TOP */}
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
        <color attach="background" args={["#0f172a"]} />
        <fog attach="fog" args={["#0f172a", 10, 100]} />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          
          <ScrollControls pages={5} damping={0.3}>
            <Scroll>
              <ProjectsScene />
            </Scroll>

            <Scroll html style={{ width: '100vw' }}>
              <div className="relative w-full overflow-x-hidden flex flex-col items-center">
                {/* FIRST PAGE - PROFESSIONAL INTRO */}
                <div className="h-screen w-full flex items-center justify-center p-6 flex-shrink-0">
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
                          className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
                        >PORTFOLIO</motion.span>
                      </motion.h1>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                      >
                        Discover how we transform ideas into powerful digital solutions. Each project represents our commitment to excellence, innovation, and measurable business impact.
                      </motion.p>

                      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                          { num: "50+", label: "Projects Delivered", desc: "Across various industries" },
                          { num: "98%", label: "Client Satisfaction", desc: "Proven track record" },
                          { num: "24/7", label: "Support", desc: "Ongoing maintenance" }
                        ].map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                            className="text-center"
                          >
                            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                              {stat.num}
                            </div>
                            <div className="text-lg font-bold text-white mb-1">{stat.label}</div>
                            <div className="text-sm text-slate-400">{stat.desc}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* PROJECTS HERO */}
                <div className="min-h-screen w-full flex items-center justify-center p-6 flex-shrink-0">
                  <GlassCard className="max-w-5xl text-center">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-200 to-cyan-200"
                    >
                      RECENT <motion.span 
                        initial={{ opacity: 0, rotate: -10 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="italic"
                      >SOLUTIONS</motion.span>
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto"
                    >
                      A curated selection of work focused on usability, speed, and real business outcomes. Delivered with performance and scale in mind.
                    </motion.p>
                  </GlassCard>
                </div>

                {/* PROJECT GRID (Simplified for 3D Flow) */}
                <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-10 max-w-7xl mx-auto items-center flex-shrink-0">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <GlassCard className="h-full flex flex-col justify-center border-white/10 hover:border-purple-500/50 transition-colors group">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                          className="text-xs text-purple-400 font-bold tracking-[0.3em] uppercase mb-4"
                        >
                          Case Study 0{i}
                        </motion.div>
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                          className="text-4xl font-black text-white mb-4 uppercase italic group-hover:text-purple-300 transition-colors"
                        >
                          Advanced Platform
                        </motion.h2>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 + 0.4 }}
                          className="text-slate-300 text-lg"
                        >
                          Next-generation digital infrastructure for enterprise scale.
                        </motion.p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                {/* OUTCOMES */}
                <div className="min-h-screen w-full flex items-center justify-center p-10 flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                    {insights.map((insight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                      >
                        <GlassCard className="text-center">
                          <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                            className="text-6xl font-black text-white mb-2 tracking-tighter"
                          >
                            {insight.value}
                          </motion.div>
                          <motion.h4 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 + 0.3 }}
                            className="text-xl font-bold text-purple-300 mb-2 uppercase"
                          >
                            {insight.title}
                          </motion.h4>
                          <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 + 0.4 }}
                            className="text-slate-300"
                          >
                            {insight.desc}
                          </motion.p>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* FOOTER SECTION */}
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
