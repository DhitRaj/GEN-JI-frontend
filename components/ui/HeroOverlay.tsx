"use client";

import { motion } from "framer-motion";
import Footer from "../Footer";

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`h-screen w-screen flex items-center justify-center p-6 md:p-12 ${className}`}>
    <div className="w-full max-w-5xl flex items-center justify-center">
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
    className={`p-10 md:p-16 rounded-[3rem] border border-black/5 bg-white/80 backdrop-blur-[60px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center w-full mx-auto ${className}`}
  >
    {children}
  </motion.div>
);

export default function HeroOverlay() {
  return (
    <div className="w-screen flex flex-col items-center overflow-x-hidden">
      {/* 1. HERO SPACE (Transparent for 3D Titles) */}
      <div className="h-screen w-screen flex items-center justify-center" />

      {/* 2. OUR MISSION */}
      <Section>
        <GlassCard>
          <h2 className="text-5xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
            WE BUILD <span className="italic">SYSTEMS</span>
          </h2>
          <p className="text-xl md:text-3xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
            Genji is a high-performance digital studio. We specialize in architecting secure, scalable, and visually stunning digital products.
          </p>
        </GlassCard>
      </Section>

      {/* 3. CORE SERVICES */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {[
            { t: "Web Development", d: "Custom web solutions built with modern technologies like Next.js and React." },
            { t: "Mobile Apps", d: "Native and cross-platform mobile applications for iOS and Android." },
            { t: "Backend Systems", d: "Scalable backend infrastructure, APIs, and microservices." },
            { t: "Security Architecture", d: "Hardened security protocols and best practices for your data." }
          ].map((item, i) => (
            <GlassCard key={i} className="py-12 md:py-20">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{item.t}</h3>
              <p className="text-lg text-slate-500 font-light">{item.d}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* 4. THE PROCESS */}
      <Section>
        <GlassCard className="border-slate-200">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-slate-900 uppercase tracking-widest">Our Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { s: "01", t: "Analyze", d: "In-depth requirement gathering and technical auditing." },
              { s: "02", t: "Build", d: "Agile development with constant feedback loops." },
              { s: "03", t: "Scale", d: "Infrastructure optimization for global traffic." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black text-slate-100 mb-4 tracking-tighter">{step.s}</div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">{step.t}</h4>
                <p className="text-slate-500 text-lg leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* 5. FEATURED WORK */}
      <Section>
        <GlassCard>
          <h2 className="text-5xl md:text-9xl font-black mb-8 tracking-tighter italic uppercase leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-600 to-slate-400">Case Studies.</h2>
          <p className="text-2xl text-slate-400 mb-12">Showcasing our latest and greatest engineering feats.</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            <div className="px-10 py-6 border border-slate-200 bg-white rounded-2xl font-bold tracking-widest text-slate-900 uppercase">FINANCE</div>
            <div className="px-10 py-6 border border-slate-200 bg-white rounded-2xl font-bold tracking-widest text-slate-900 uppercase">E-COMMERCE</div>
            <div className="px-10 py-6 border border-slate-200 bg-white rounded-2xl font-bold tracking-widest text-slate-900 uppercase">CYBERSECURITY</div>
          </div>
        </GlassCard>
      </Section>

      {/* 6. CALL TO ACTION */}
      <Section>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center px-6">
          <h2 className="text-5xl md:text-[12rem] font-black mb-12 tracking-tighter leading-none uppercase bg-clip-text text-transparent bg-gradient-to-t from-slate-400 to-slate-900">BUILD NOW</h2>
          <button className="px-16 py-8 rounded-full bg-black text-white font-black text-3xl hover:bg-slate-800 transition-all transform hover:scale-110 shadow-2xl">
            CONTACT GENJI
          </button>
        </motion.div>
      </Section>

      {/* 7. GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}
