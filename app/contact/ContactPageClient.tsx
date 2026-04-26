'use client';

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import ContactScene from '../../components/three/ContactScene';
import Navbar from '../../components/Navbar';
import ClientForm from '../../components/sections/ClientForm';
import Footer from '../../components/Footer';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-[80px] shadow-2xl relative overflow-hidden ${className}`}>
    {/* Oily/Liquid effect overlay */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/30 via-transparent to-purple-500/30 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default function ContactPageClient() {
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
          
          <ScrollControls pages={4.5} damping={0.3}>
            <Scroll>
              <ContactScene />
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
                        GET IN <motion.span 
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
                        >TOUCH</motion.span>
                      </motion.h1>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                      >
                        Ready to bring your vision to life? Let's discuss your project requirements and create something extraordinary together.
                      </motion.p>

                      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                          { icon: "⚡", label: "Quick Response", desc: "Within 24 hours" },
                          { icon: "🎯", label: "Tailored Solutions", desc: "Custom approach" },
                          { icon: "🚀", label: "Fast Delivery", desc: "Agile methodology" }
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

                {/* CONTACT HERO */}
                <div className="min-h-screen w-full flex items-center justify-center p-6 flex-shrink-0">
                  <GlassCard className="max-w-5xl text-center">
                    <h1 className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-200 to-purple-200">
                      LET'S <span className="italic">SYNC</span>
                    </h1>
                    <p className="text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
                      Share your requirement and get a practical execution plan from our team. We respond within 24 hours.
                    </p>
                  </GlassCard>
                </div>

                {/* THE FORM SECTION */}
                <div className="min-h-screen w-full flex items-center justify-center p-6 flex-shrink-0">
                  <div className="w-full max-w-6xl">
                     <ClientForm />
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
