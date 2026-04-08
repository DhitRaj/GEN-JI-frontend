'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Services from '../../components/sections/Services';
import PageHero from '../../components/PageHero';

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'We map goals, business constraints, and the user journey.' },
  { step: '02', title: 'Design System', desc: 'We design reusable patterns so the product stays consistent.' },
  { step: '03', title: 'Development', desc: 'We build the experience with performance and maintainability.' },
  { step: '04', title: 'Launch & Support', desc: 'We ship, monitor, and iterate with real usage feedback.' },
];

const packages = [
  { title: 'Starter Build', items: ['Landing page', 'Contact form', 'Brand setup'] },
  { title: 'Growth Platform', items: ['Multi-page site', 'Lead flow', 'Admin panel'] },
  { title: 'Scale Suite', items: ['Custom dashboard', 'Advanced workflows', 'Long-term support'] },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow="Services"
        title="End-to-end digital services built for growth."
        description="From product design to production-grade engineering, we deliver systems that look premium and work reliably."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />
      <Services />

      <section className="pb-20">
        <div className="section-shell grid lg:grid-cols-12 gap-6">
          <div className="card lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Delivery Process</p>
            <h2 className="text-3xl font-bold mt-3">A clear process keeps the work fast and predictable.</h2>
            <div className="mt-6 space-y-4">
              {processSteps.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-md">
                  <div className="text-blue-600 font-bold text-sm">{item.step}</div>
                  <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                  <p className="text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div key={pkg.title} className="card">
                <h3 className="text-2xl font-bold">{pkg.title}</h3>
                <ul className="mt-4 space-y-2 text-slate-600">
                  {pkg.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
