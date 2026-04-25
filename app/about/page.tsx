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
  <div className={`p-10 rounded-[3rem] border border-black/5 bg-white/60 backdrop-blur-[60px] shadow-xl ${className}`}>
    {children}
  </div>
);

export default function AboutPage() {
  return (
    <PageScene title="About" pages={5}>
      <div className="flex flex-col items-center">
        {/* HERO SPACER */}
        <div className="h-screen w-full" />

        {/* MISSION */}
        <div className="min-h-screen w-full flex items-center justify-center p-6">
          <GlassCard className="max-w-5xl text-center">
            <h1 className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
              WHO <span className="italic">WE ARE</span>
            </h1>
            <p className="text-2xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
              Gen-Ji is a modern SaaS engineering partner focused on high-impact websites, robust backend systems, and clean admin workflows for growing teams.
            </p>
          </GlassCard>
        </div>

        {/* VALUES */}
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-10 max-w-7xl mx-auto items-center">
          {values.map((item, idx) => (
            <GlassCard key={idx} className="h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{item.title}</h2>
              <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* MILESTONES */}
        <div className="min-h-screen w-full flex items-center justify-center p-10">
          <GlassCard className="max-w-6xl w-full">
            <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-widest text-center">Our Story</h2>
            <div className="space-y-6">
              {milestones.map((item, idx) => (
                <div key={idx} className="flex gap-8 items-start border-b border-black/5 pb-6 last:border-0">
                  <div className="text-4xl font-black text-slate-200">{item.year}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </PageScene>
  );
}
