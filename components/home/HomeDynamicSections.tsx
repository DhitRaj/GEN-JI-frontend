"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';

type Service = {
  _id: string;
  title: string;
  description: string;
  order?: number;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack?: string[];
  image?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
};

const valueCards = [
  {
    title: 'Business-First Strategy',
    text: 'Every feature supports growth, retention, or revenue.',
  },
  {
    title: 'Reliable Engineering',
    text: 'Scalable architecture. Secure APIs. Maintainable code.',
  },
  {
    title: 'Clear Delivery Process',
    text: 'Clear milestones, practical timelines, no confusion.',
  },
];

const executionSteps = [
  'Discovery and scope clarity',
  'Design system and user flow',
  'Engineering and QA delivery',
  'Launch, monitoring, and iteration',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 95,
      damping: 18,
      mass: 0.9,
    },
  },
};

function resolveApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const trimmed = configured.replace(/\/$/, '');

  if (/\/api$/i.test(trimmed)) {
    return trimmed;
  }

  return `${trimmed}/api`;
}

export default function HomeDynamicSections() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchHomepageData = async () => {
      const apiBase = resolveApiBase();

      const [servicesResult, featuredProjectsResult, projectsResult] = await Promise.allSettled([
        axios.get<{ services: Service[] }>(`${apiBase}/services`),
        axios.get<{ projects: Project[] }>(`${apiBase}/projects/featured`),
        axios.get<{ projects: Project[] }>(`${apiBase}/projects`),
      ]);

      if (servicesResult.status === 'fulfilled') {
        setServices((servicesResult.value.data.services || []).slice(0, 4));
      }

      if (featuredProjectsResult.status === 'fulfilled' && featuredProjectsResult.value.data.projects.length > 0) {
        setProjects(featuredProjectsResult.value.data.projects.slice(0, 3));
        return;
      }

      if (projectsResult.status === 'fulfilled') {
        setProjects((projectsResult.value.data.projects || []).slice(0, 3));
      }
    };

    fetchHomepageData().catch((error) => {
      console.error('Failed to fetch homepage data:', error);
    });
  }, []);

  const stats = [
    { value: '24h', label: 'Avg. response time' },
    { value: projects.length > 0 ? `${projects.length}+` : '50+', label: 'Highlighted projects' },
    { value: services.length > 0 ? `${services.length}+` : '4+', label: 'Active core services' },
    { value: 'End-to-End', label: 'Design to launch support' },
  ];

  return (
    <section className="relative z-10 bg-gradient-to-b from-slate-950 via-slate-950 to-black">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Why Gen-Ji</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight">
            One team for design, build, and launch.
          </h2>
          <p className="mt-5 text-slate-300 text-base md:text-lg leading-8">
            We ship products that feel premium and perform under pressure.
          </p>
        </div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {valueCards.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-slate-300 leading-7">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8 backdrop-blur-md shadow-2xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Core Services</p>
            <h3 className="mt-3 text-2xl md:text-3xl font-black tracking-tight">Built for teams that need momentum.</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(services.length > 0
                ? services.map((service) => service.title)
                : [
                    'Conversion-focused websites',
                    'Custom admin dashboards',
                    'Mobile-first web applications',
                    'Secure backend and API systems',
                  ]
              ).map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200">
                  {item}
                </div>
              ))}
            </div>

            {services.length > 0 ? (
              <div className="mt-6 grid gap-3">
                {services.slice(0, 2).map((service) => (
                  <p key={service._id} className="text-sm text-slate-300 leading-7">
                    <span className="font-semibold text-white">{service.title}: </span>
                    {service.description}
                  </p>
                ))}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8 backdrop-blur-md shadow-2xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Execution</p>
            <ol className="mt-5 space-y-4">
              {executionSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/25 text-xs font-bold text-violet-200">
                    {index + 1}
                  </span>
                  <span className="text-slate-200 leading-7">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md">
              <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-14 rounded-3xl border border-violet-300/20 bg-gradient-to-r from-violet-900/30 via-fuchsia-900/20 to-cyan-900/20 p-7 md:p-9 backdrop-blur-md"
        >
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">Recent builds. Real outcomes.</h3>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(projects.length > 0
              ? projects
              : [
                  { _id: 'fallback-1', title: 'Platform Build', description: 'Scalable architecture and premium UX.', techStack: ['Next.js', 'Node.js'] },
                  { _id: 'fallback-2', title: 'Admin Dashboard', description: 'Role-based workflows and data visibility.', techStack: ['React', 'MongoDB'] },
                  { _id: 'fallback-3', title: 'Service Portal', description: 'Lead-to-delivery conversion flow.', techStack: ['TypeScript', 'API'] },
                ]
            ).map((project) => (
              <div key={project._id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <h4 className="text-lg font-bold text-white">{project.title}</h4>
                <p className="mt-2 text-sm text-slate-300 leading-6">{project.description}</p>
                {project.techStack && project.techStack.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={`${project._id}-${tech}`} className="rounded-full bg-violet-500/20 px-2 py-1 text-xs text-violet-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold hover:scale-[1.02] transition-transform"
            >
              View Projects
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Get Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
