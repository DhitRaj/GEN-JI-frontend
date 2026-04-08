'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
};

export default function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="pt-24 md:pt-28 pb-12 md:pb-16">
      <div className="section-shell">
        <motion.div
          className="glass-panel relative overflow-hidden rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_48%),radial-gradient(circle_at_left,rgba(14,165,233,0.12),transparent_42%)]" />
          <div className="relative">
            <span className="glass-chip inline-flex rounded-full border border-blue-200 bg-white/65 text-blue-700 px-4 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
              {eyebrow}
            </span>

            <h1 className="hero-text mt-6 max-w-4xl">{title}</h1>
            <p className="hero-subtitle mt-5 max-w-3xl">{description}</p>

            <nav className="mt-8 flex items-center gap-2 text-sm text-slate-500 flex-wrap">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.href && !isLast ? (
                      <Link href={item.href} className="hover:text-blue-600 transition">
                        {item.label}
                      </Link>
                    ) : (
                      <span className={isLast ? 'text-slate-900 font-semibold' : ''}>
                        {item.label}
                      </span>
                    )}
                    {!isLast && <span className="text-slate-300">/</span>}
                  </div>
                );
              })}
            </nav>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
