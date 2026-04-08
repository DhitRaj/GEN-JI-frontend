'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Image from 'next/image';

type Project = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  techStack?: string[];
  liveUrl?: string;
};

type ProjectsResponse = {
  projects: Project[];
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<ProjectsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`
      );
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20 md:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-14">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-lead max-w-2xl mx-auto">
              Showcasing our latest and greatest work
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-slate-600">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No projects yet</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.slice(0, 6).map((project: Project) => (
              <motion.div
                key={project._id}
                className="card overflow-hidden p-0"
                variants={itemVariants}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={384}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View Live Project
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
