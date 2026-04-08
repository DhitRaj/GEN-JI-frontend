'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="section-shell">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 w-full min-w-0">
              <motion.div variants={itemVariants}>
                <span className="glass-chip inline-flex rounded-full border border-blue-200 bg-white/65 px-4 py-1 text-sm font-semibold text-blue-700">
                  Modern Digital Product Partner
                </span>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 className="hero-text mt-6">
                  Build smarter products with <span className="text-blue-600">Gen-Ji</span>
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="hero-subtitle mt-6 max-w-2xl">
                  We design and engineer high-performance web platforms that feel premium, scale fast,
                  and convert better.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <a href="/contact" className="btn btn-primary">
                    Start Your Project
                  </a>
                  <a href="/projects" className="btn btn-secondary">
                    Explore Work
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div className="lg:col-span-4 w-full min-w-0" variants={itemVariants}>
              <div className="glass-panel p-5 md:p-6 rounded-3xl h-full w-full">
                <p className="text-sm text-slate-500">Snapshot</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">30+</p>
                    <p className="text-sm text-slate-500">Projects</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">99%</p>
                    <p className="text-sm text-slate-500">Delivery Rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">24h</p>
                    <p className="text-sm text-slate-500">Response</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">10x</p>
                    <p className="text-sm text-slate-500">Scale Ready</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
