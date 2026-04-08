'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Projects from '../../components/sections/Projects';
import PageHero from '../../components/PageHero';

const insights = [
  { title: 'Faster Delivery', value: '40%', desc: 'Reusable patterns and a cleaner workflow reduce build time.' },
  { title: 'Better Clarity', value: '2x', desc: 'Dedicated sections make information easier to scan and understand.' },
  { title: 'Higher Trust', value: '95%', desc: 'A consistent premium look improves credibility and engagement.' },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow="Projects"
        title="Recent solutions delivered with performance and scale in mind."
        description="A curated selection of work focused on usability, speed, and real business outcomes."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects' },
        ]}
      />
      <Projects />

      <section className="pb-20">
        <div className="section-shell grid md:grid-cols-3 gap-6">
          {insights.map((item) => (
            <div key={item.title} className="card">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Outcome</p>
              <div className="text-4xl font-bold mt-3 text-slate-900">{item.value}</div>
              <h2 className="text-2xl font-bold mt-3">{item.title}</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
