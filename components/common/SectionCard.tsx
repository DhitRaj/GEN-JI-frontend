'use client';

import { motion } from 'framer-motion';

interface SectionCardProps {
  icon?: string;
  title: string;
  subtitle?: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
  features?: string[];
  cta?: { text: string; href: string };
  variant?: 'default' | 'highlight' | 'dark';
}

export function SectionCard({
  icon,
  title,
  subtitle,
  description,
  stats,
  features,
  cta,
  variant = 'default',
}: SectionCardProps) {
  const variants = {
    default: 'border-white/10 bg-white/5 hover:border-cyan-500/50',
    highlight: 'border-cyan-500/50 bg-cyan-500/10 hover:border-cyan-500/80',
    dark: 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`p-8 md:p-12 rounded-2xl border backdrop-blur-xl transition-all ${variants[variant]}`}
    >
      {icon && <div className="text-5xl md:text-6xl mb-6">{icon}</div>}

      <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{title}</h3>

      {subtitle && <p className="text-cyan-400 font-semibold mb-4">{subtitle}</p>}

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">{description}</p>

      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-t border-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {features && (
        <div className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
              <span className="text-slate-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      )}

      {cta && (
        <motion.a
          href={cta.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          {cta.text} →
        </motion.a>
      )}
    </motion.div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16 md:mb-20"
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-semibold mb-6 backdrop-blur-sm"
        >
          {subtitle}
        </motion.span>
      )}

      <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
        {title.split(' ').map((word, i) => (
          <span key={i}>
            {i === title.split(' ').length - 1 ? (
              <span className="text-cyan-400">{word}</span>
            ) : (
              word
            )}{' '}
          </span>
        ))}
      </h2>

      {description && <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">{description}</p>}
    </motion.div>
  );
}
