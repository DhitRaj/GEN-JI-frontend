'use client';

import PageScene from '../../components/three/PageScene';
import Footer from '../../components/Footer';

const insights = [
  { title: 'Faster Delivery', value: '40%', desc: 'Reusable patterns and a cleaner workflow reduce build time.' },
  { title: 'Better Clarity', value: '2x', desc: 'Dedicated sections make information easier to scan and understand.' },
  { title: 'Higher Trust', value: '95%', desc: 'A consistent premium look improves credibility and engagement.' },
];

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-10 rounded-[3rem] border border-black/5 bg-white/60 backdrop-blur-[60px] shadow-xl ${className}`}>
    {children}
  </div>
);

export default function ProjectsPage() {
  return (
    <PageScene title="Projects" pages={5}>
      <div className="flex flex-col items-center">
        {/* HERO SPACER */}
        <div className="h-screen w-full" />

        {/* PROJECTS HERO */}
        <div className="min-h-screen w-full flex items-center justify-center p-6">
          <GlassCard className="max-w-5xl text-center">
            <h1 className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
              RECENT <span className="italic">SOLUTIONS</span>
            </h1>
            <p className="text-2xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
              A curated selection of work focused on usability, speed, and real business outcomes. Delivered with performance and scale in mind.
            </p>
          </GlassCard>
        </div>

        {/* PROJECT GRID (Simplified for 3D Flow) */}
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-10 max-w-7xl mx-auto items-center">
          {[1, 2, 3, 4].map((i) => (
            <GlassCard key={i} className="h-full flex flex-col justify-center border-black/5 hover:border-slate-300 transition-colors">
              <div className="text-xs text-slate-400 font-bold tracking-[0.3em] uppercase mb-4">Case Study 0{i}</div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">Advanced Platform</h2>
              <p className="text-slate-500 text-lg">Next-generation digital infrastructure for enterprise scale.</p>
            </GlassCard>
          ))}
        </div>

        {/* OUTCOMES */}
        <div className="min-h-screen w-full flex items-center justify-center p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
            {insights.map((item, idx) => (
              <GlassCard key={idx} className="text-center">
                <div className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">{item.value}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </PageScene>
  );
}
