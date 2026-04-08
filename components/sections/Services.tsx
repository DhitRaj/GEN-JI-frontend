'use client';

import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaDatabase, FaShieldAlt } from 'react-icons/fa';

const services = [
  {
    icon: <FaCode size={32} />,
    title: 'Web Development',
    description: 'Custom web solutions built with modern technologies',
  },
  {
    icon: <FaMobileAlt size={32} />,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications',
  },
  {
    icon: <FaDatabase size={32} />,
    title: 'Backend Systems',
    description: 'Scalable backend infrastructure and APIs',
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: 'Security',
    description: 'Secure architecture with best practices',
  },
];

export default function Services() {
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
    <section id="services" className="py-20 md:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-14">
            <h2 className="section-title">What We Build</h2>
            <p className="section-lead max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
            >
              <div className="card group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-5 group-hover:scale-105 transition flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
