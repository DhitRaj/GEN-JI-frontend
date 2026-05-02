'use client';

import Image from 'next/image';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import SiteHeader from '../../components/SiteHeader';

type Project = { _id: string; title: string; description: string; techStack: string[]; image?: string; liveUrl?: string; featured?: boolean };
const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function ProjectsPageClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
        setProjects(response.data.projects || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featuredProjects = useMemo(() => projects.filter((p) => p.featured), [projects]);

  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />
      <main>
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-16 md:px-6 md:pt-24"><div className="mx-auto max-w-5xl text-center"><h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Our Portfolio</h1><p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">50+ projects delivered across web, mobile, and AI systems. Each one crafted with precision and delivered with excellence.</p></div></motion.section>

        {featuredProjects.length > 0 ? <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6"><div className="mx-auto max-w-7xl"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Featured Projects</h2><div className="mt-8 space-y-6">{featuredProjects.map((project) => <motion.article whileHover={{ y: -5 }} key={project._id} className="rounded-2xl border border-sky-200 card-sky p-6 shadow-sm"><div className="grid gap-6 md:grid-cols-2 md:items-center">{project.image ? <div className="relative h-64 overflow-hidden rounded-xl bg-slate-100"><Image src={project.image} alt={project.title} fill unoptimized className="object-cover" /></div> : null}<div><h3 className="mt-2 text-3xl font-semibold text-brand">{project.title}</h3><p className="mt-3 text-brand-muted">{project.description}</p>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-xl btn-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">View Live</a> : null}</div></div></motion.article>)}</div></div></motion.section> : null}

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="section-soft px-4 py-16 md:px-6"><div className="mx-auto max-w-7xl"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">All Projects</h2>{loading ? <div className="py-10 text-center text-brand-muted">Loading projects...</div> : <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, i) => <motion.article whileHover={{ y: -5 }} key={project._id} className={`rounded-2xl border p-6 ${i % 2 === 0 ? 'border-rose-200 card-pink' : 'border-sky-200 card-sky'}`}>{project.image ? <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-slate-100"><Image src={project.image} alt={project.title} fill unoptimized className="object-cover" /></div> : null}<h3 className="text-xl font-semibold text-brand">{project.title}</h3><p className="mt-2 line-clamp-2 text-sm text-brand-muted">{project.description}</p></motion.article>)}</div>}</div></motion.section>
      </main>
      <Footer />
    </div>
  );
}




