'use client';

import PageScene from '../../components/three/PageScene';
import ClientForm from '../../components/sections/ClientForm';
import Footer from '../../components/Footer';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-10 rounded-[3rem] border border-black/5 bg-white/60 backdrop-blur-[60px] shadow-xl ${className}`}>
    {children}
  </div>
);

export default function ContactPageClient() {
  return (
    <PageScene title="Contact" pages={4}>
      <div className="flex flex-col items-center">
        {/* HERO SPACER */}
        <div className="h-screen w-full" />

        {/* CONTACT HERO */}
        <div className="min-h-screen w-full flex items-center justify-center p-6">
          <GlassCard className="max-w-5xl text-center">
            <h1 className="text-5xl md:text-9xl font-black mb-6 uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
              LET'S <span className="italic">SYNC</span>
            </h1>
            <p className="text-2xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
              Share your requirement and get a practical execution plan from our team. We respond within 24 hours.
            </p>
          </GlassCard>
        </div>

        {/* THE FORM SECTION */}
        <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-6xl">
             <ClientForm />
          </div>
        </div>

        <div className="w-full">
          <Footer />
        </div>
      </div>
    </PageScene>
  );
}
