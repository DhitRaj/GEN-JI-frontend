'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

const values = [
  {
    title: 'Product-First Thinking',
    desc: 'Every feature is mapped to business outcomes, not just code delivery.',
  },
  {
    title: 'Engineering Quality',
    desc: 'Scalable architecture, secure APIs, and maintainable code standards.',
  },
  {
    title: 'Clear Communication',
    desc: 'Transparent timelines, milestone updates, and no hidden surprises.',
  },
];

const milestones = [
  { year: '01', title: 'Discovery', desc: 'We clarify goals, audience, and delivery scope before building anything.' },
  { year: '02', title: 'Design', desc: 'We shape the visual direction, information flow, and conversion paths.' },
  { year: '03', title: 'Build', desc: 'We develop the product with maintainable code, performance, and security in mind.' },
  { year: '04', title: 'Launch', desc: 'We test, refine, deploy, and hand over with a clear operating roadmap.' },
];

const stats = [
  { value: '12+', label: 'Reusable UI patterns' },
  { value: '24h', label: 'Typical response time' },
  { value: '99%', label: 'Delivery reliability' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="About Gen-Ji"
        title="We build digital products that perform and scale."
        description="Gen-Ji is a modern SaaS engineering partner focused on high-impact websites, robust backend systems, and clean admin workflows for growing teams."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <section className="pb-20">
        <div className="section-shell grid md:grid-cols-3 gap-6">
          {values.map((item, idx) => (
            <motion.article
              key={item.title}
              className="card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-slate-600 mt-3 leading-relaxed">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell grid lg:grid-cols-12 gap-6 items-stretch">
          <motion.div
            className="card lg:col-span-5"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Our Story</p>
            <h2 className="text-3xl font-bold mt-3">Built for teams that want a premium digital presence.</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Gen-Ji focuses on clean interfaces, thoughtful systems, and reliable execution. We keep the product simple for users and scalable for the business.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/70 bg-white/45 p-4 text-center backdrop-blur-md">
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="card lg:col-span-7"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">How We Work</p>
            <div className="mt-5 space-y-4">
              {milestones.map((item) => (
                <div key={item.title} className="grid sm:grid-cols-[72px,1fr] gap-4 items-start rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-md">
                  <div className="text-2xl font-bold text-blue-600">{item.year}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
