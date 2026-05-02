'use client';

import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SiteHeader from '../SiteHeader';
import Footer from '../Footer';

type Service = { _id: string; title: string; description: string; image?: string; features?: string[] };
type Project = { _id: string; title: string; techStack: string[]; image?: string };

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PremiumHomepage() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`),
        ]);
        setServices(servicesRes.data.services || []);
        setProjects(projectsRes.data.projects || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />
      <main>
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-16 md:px-6 md:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Next-Gen Digital Studio</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">We Build Next-Gen Digital Experiences</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">Web, Apps, AI Systems and 3D Interfaces. From concept to scale, we craft digital products that convert.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/services" className="rounded-xl btn-brand px-8 py-4 font-semibold text-white transition hover:bg-sky-700">Explore Services</Link>
              <Link href="/projects" className="rounded-xl border border-rose-200 bg-white/75 px-8 py-4 font-semibold text-rose-700 transition hover:bg-rose-100">View Projects</Link>
            </div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">What We Build</h2></div>
            {loading ? <div className="py-10 text-center text-brand-muted">Loading services...</div> : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, i) => (
                  <motion.article whileHover={{ y: -4 }} key={service._id} className={`rounded-2xl border p-6 shadow-sm ${i % 2 === 0 ? 'border-sky-200 card-sky' : 'border-rose-200 card-pink'}`}>
                    {service.image ? <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-slate-100"><Image src={service.image} alt={service.title} fill unoptimized className="object-cover" /></div> : null}
                    <h3 className="text-2xl font-semibold text-brand">{service.title}</h3>
                    <p className="mt-3 text-brand-muted">{service.description}</p>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5 }} className="section-soft px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Featured Projects</h2></div>
            {loading ? <div className="py-10 text-center text-brand-muted">Loading projects...</div> : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 6).map((project) => (
                  <motion.article whileHover={{ y: -4 }} key={project._id} className="rounded-2xl border border-brand card-soft p-6">
                    {project.image ? <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-slate-100"><Image src={project.image} alt={project.title} fill unoptimized className="object-cover" /></div> : null}
                    <h3 className="text-xl font-semibold text-brand">{project.title}</h3>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}




