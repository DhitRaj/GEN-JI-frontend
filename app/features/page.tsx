'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

const featureGroups = [
  {
    title: 'Public Website',
    features: ['Hero + brand storytelling', 'Services overview', 'Project showcase', 'Contact lead capture'],
  },
  {
    title: 'Client Management',
    features: ['Validated form submissions', 'Lead status tracking', 'Admin visibility', 'Email notifications'],
  },
  {
    title: 'Admin Panel',
    features: ['Secure login', 'Project CRUD operations', 'Service management', 'Quick dashboard metrics'],
  },
  {
    title: 'Platform Security',
    features: ['JWT auth', 'Input validation', 'Rate limiting', 'Environment secret handling'],
  },
];

const roadmap = [
  { phase: 'Phase 1', title: 'Launch the public website', desc: 'Create a strong landing experience and capture leads.' },
  { phase: 'Phase 2', title: 'Add workflow automation', desc: 'Improve the admin workflow and reduce manual work.' },
  { phase: 'Phase 3', title: 'Scale into operations', desc: 'Extend reporting, notifications, and business logic.' },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="Features"
        title="Everything the platform can do, in one place."
        description="Dedicated capabilities across website, lead management, administration, and security."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Features' },
        ]}
      />

      <section className="pb-20">
        <div className="section-shell grid md:grid-cols-2 gap-6">
          {featureGroups.map((group, idx) => (
            <motion.article
              key={group.title}
              className="card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
            >
              <h2 className="text-2xl font-bold">{group.title}</h2>
              <ul className="mt-4 space-y-2 text-slate-600">
                {group.features.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell grid lg:grid-cols-12 gap-6">
          <div className="card lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Why it matters</p>
            <h2 className="text-3xl font-bold mt-3">Features are grouped by real business value.</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Each module is designed to make the product more understandable for clients and more manageable for the team.
            </p>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-3 gap-4">
            {roadmap.map((item) => (
              <div key={item.phase} className="card">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{item.phase}</p>
                <h3 className="text-2xl font-bold mt-3">{item.title}</h3>
                <p className="text-slate-600 mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
