"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCode, FaMobileAlt, FaDatabase, FaPalette, FaBolt, FaShieldAlt } from "react-icons/fa";
import Footer from "../Footer";

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-[80px] shadow-2xl relative overflow-hidden ${className}`}>
    {/* Oily/Liquid effect overlay */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-transparent to-pink-500/30 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default function ModernOverlay() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight">
              GEN-JI
            </h1>
            <p className="text-2xl md:text-4xl text-purple-300 mb-4 font-light">
              Digital Solutions Studio
            </p>
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              We craft exceptional digital experiences through innovative web development,
              mobile apps, and custom software solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  Start Your Project
                  <FaArrowRight />
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              What We Do
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Full-stack digital solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <GlassCard className="h-full cursor-pointer group hover:border-purple-500/50 transition-all">
                  <div className="text-5xl mb-4 text-purple-400 group-hover:text-pink-400 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all inline-flex items-center gap-2"
              >
                Explore All Services
                <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Proven Excellence
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Numbers that speak for our commitment to quality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-xl text-slate-300 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Let&apos;s transform your vision into reality. Get in touch with our team today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  Get Started
                  <FaArrowRight />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/10 backdrop-blur-lg text-white rounded-full font-bold text-xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    icon: <FaCode />,
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies for optimal performance.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences.",
  },
  {
    icon: <FaDatabase />,
    title: "Backend Systems",
    description: "Scalable server architectures and APIs designed for reliability and performance.",
  },
  {
    icon: <FaPalette />,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that prioritize user experience and engagement.",
  },
  {
    icon: <FaBolt />,
    title: "Performance",
    description: "Lightning-fast applications optimized for speed and efficiency across all devices.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security",
    description: "Enterprise-grade security measures to protect your data and users.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "99%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
];
