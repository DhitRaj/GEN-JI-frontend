'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import SiteHeader from '../../components/SiteHeader';

type Service = { _id: string; title: string; description: string; image?: string; features?: string[] };

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We understand your goals, challenges, and vision for the project.' },
  { num: '02', title: 'Strategy', desc: 'We create a detailed roadmap and technical architecture.' },
  { num: '03', title: 'Design', desc: 'We design beautiful, user-friendly interfaces and experiences.' },
  { num: '04', title: 'Development', desc: 'We build scalable, performant solutions with clean code.' },
  { num: '05', title: 'Testing', desc: 'We ensure quality through rigorous testing and QA.' },
  { num: '06', title: 'Launch & Support', desc: 'We deploy and provide ongoing support and maintenance.' },
];

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function ServicesPageClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
        setServices(response.data.services || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />
      <main>
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-16 md:px-6 md:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Our Services</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">Comprehensive digital solutions tailored to your business needs. From web development to AI integration, we&apos;ve got you covered.</p>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">What We Offer</h2></div>
            {loading ? <div className="py-10 text-center text-brand-muted">Loading services...</div> : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, i) => (
                  <motion.article whileHover={{ y: -5 }} key={service._id} className={`rounded-2xl border p-6 shadow-sm ${i % 2 === 0 ? 'border-sky-200 card-sky' : 'border-rose-200 card-pink'}`}>
                    {service.image ? <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-slate-100"><Image src={service.image} alt={service.title} fill unoptimized className="object-cover" /></div> : null}
                    <h3 className="text-2xl font-semibold text-brand">{service.title}</h3>
                    <p className="mt-3 text-brand-muted">{service.description}</p>
                    {service.features?.length ? <ul className="mt-4 space-y-2 text-sm text-slate-700">{service.features.map((f, idx) => <li key={`${service._id}-${idx}`}>• {f}</li>)}</ul> : null}
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="section-soft px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Our Process</h2></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{processSteps.map((step, i) => <article key={step.num} className={`rounded-2xl border p-6 ${i % 2 === 0 ? 'border-rose-200 card-pink' : 'border-sky-200 card-sky'}`}><p className="text-sm font-semibold text-slate-500">Step {step.num}</p><h3 className="mt-2 text-xl font-semibold text-brand">{step.title}</h3><p className="mt-3 text-brand-muted">{step.desc}</p></article>)}</div>
          </div>
        </motion.section>

        <section className="px-4 pb-20 pt-10 text-center md:px-6"><a href="/contact" className="mt-8 inline-flex rounded-xl btn-brand px-8 py-4 font-semibold text-white transition hover:bg-sky-700">Schedule Consultation</a></section>
      </main>
      <Footer />
    </div>
  );
}




