'use client';

import PageScene from '../../components/three/PageScene';
import Footer from '../../components/Footer';

const packages = [
  { title: 'Starter Build', items: ['Landing page', 'Contact form', 'Brand setup'] },
  { title: 'Growth Platform', items: ['Multi-page site', 'Lead flow', 'Admin panel'] },
  { title: 'Scale Suite', items: ['Custom dashboard', 'Advanced workflows', 'Long-term support'] },
];

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-10 rounded-[3rem] border border-black/5 bg-white/60 backdrop-blur-[60px] shadow-xl ${className}`}>
    {children}
  </div>
);

export default function ServicesPageClient() {
  return (
    <PageScene title="Services" pages={5}>
      <div className="flex flex-col items-center">
        {/* HERO SPACER */}
        <div className="h-screen w-full" />

        {/* SERVICES HERO */}
        <div className="min-h-screen w-full flex items-center justify-center p-6">
          <GlassCard className="max-w-5xl text-center">
            <h1 className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
              OUR <span className="italic">EXPERTISE</span>
            </h1>
            <p className="text-2xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
              From product design to production-grade engineering, we deliver systems that look premium and work reliably.
            </p>
          </GlassCard>
        </div>

        {/* CORE OFFERINGS */}
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-10 max-w-7xl mx-auto items-center">
          {packages.map((pkg, idx) => (
            <GlassCard key={idx} className="h-full flex flex-col justify-center border-black/5 hover:border-slate-300 transition-all group">
              <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase italic group-hover:text-black transition-colors">{pkg.title}</h3>
              <ul className="space-y-4 text-slate-600 text-lg">
                {pkg.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-slate-800 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        <div className="w-full">
           <Footer />
        </div>
      </div>
    </PageScene>
  );
}
