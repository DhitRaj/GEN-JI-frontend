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
  const d2cCaseStudy = {
    title: 'Scalable Multi-Vendor E-commerce Ecosystem (D2C)',
    challenge:
      'The client needed to manage multiple sellers, high product volume, and storefront updates without slowing operations or depending on engineering for routine changes.',
    solution: [
      'Built a reliable frontend using React.js and TypeScript for safer, predictable UI behavior.',
      'Implemented vendor-side product workflows including bulk upload to reduce manual listing effort.',
      'Developed centralized admin controls for multi-store supervision and live banner management.',
      'Validated API flows with Postman to reduce integration bugs before release.',
    ],
    tech: ['React.js', 'TypeScript', 'REST API Integration', 'Postman'],
    impact: [
      'Reduced manual product onboarding effort through bulk upload tooling.',
      'Enabled faster marketing updates with admin-managed banner controls.',
      'Created a scalable base for multi-seller operations and future growth.',
    ],
  };

  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />
      <main>
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-16 md:px-6 md:pt-24"><div className="mx-auto max-w-5xl text-center"><h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Our Portfolio</h1><p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">50+ projects delivered across web, mobile, and AI systems. Each one crafted with precision and delivered with excellence.</p></div></motion.section>

        {featuredProjects.length > 0 ? <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6"><div className="mx-auto max-w-7xl"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Featured Projects</h2><div className="mt-8 space-y-6">{featuredProjects.map((project) => <motion.article whileHover={{ y: -5 }} key={project._id} className="rounded-2xl border border-brand card-soft p-6 shadow-sm"><div className="grid gap-6 md:grid-cols-2 md:items-center">{project.image ? <div className="relative h-64 overflow-hidden rounded-xl bg-slate-100"><Image src={project.image} alt={project.title} fill unoptimized className="object-cover" /></div> : null}<div><h3 className="mt-2 text-3xl font-semibold text-brand">{project.title}</h3><p className="mt-3 text-brand-muted">{project.description}</p>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-xl btn-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">View Live</a> : null}</div></div></motion.article>)}</div></div></motion.section> : null}

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Case Study Spotlight</h2>
            <article className="mt-8 rounded-2xl border border-brand card-soft p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-brand md:text-3xl">{d2cCaseStudy.title}</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Challenge</h4>
                  <p className="mt-2 text-brand-muted">{d2cCaseStudy.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Tech Stack</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {d2cCaseStudy.tech.map((item) => (
                      <span key={item} className="rounded-full border border-brand bg-white/80 px-3 py-1 text-xs font-medium text-orange-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Solution Delivered</h4>
                  <ul className="mt-3 space-y-2 text-sm text-brand-muted">
                    {d2cCaseStudy.solution.map((point) => (
                      <li key={point}>- {point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Impact</h4>
                  <ul className="mt-3 space-y-2 text-sm text-brand-muted">
                    {d2cCaseStudy.impact.map((point) => (
                      <li key={point}>- {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <a href="/contact" className="mt-8 inline-flex rounded-xl btn-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                Need Similar System? Book a Free 15-min Call
              </a>
            </article>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="section-soft px-4 py-16 md:px-6"><div className="mx-auto max-w-7xl"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">All Projects</h2>{loading ? <div className="py-10 text-center text-brand-muted">Loading projects...</div> : <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, i) => <motion.article whileHover={{ y: -5 }} key={project._id} className={`rounded-2xl border p-6 ${i % 2 === 0 ? 'border-brand card-soft' : 'border-brand card-soft'}`}>{project.image ? <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-slate-100"><Image src={project.image} alt={project.title} fill unoptimized className="object-cover" /></div> : null}<h3 className="text-xl font-semibold text-brand">{project.title}</h3><p className="mt-2 line-clamp-2 text-sm text-brand-muted">{project.description}</p></motion.article>)}</div>}</div></motion.section>
      </main>
      <Footer />
    </div>
  );
}






