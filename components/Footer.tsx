'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-10 md:p-16 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-[60px] shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        >
          {/* Oily/Liquid effect overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* BRAND */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <h3 className="text-4xl font-black mb-6 text-white tracking-tighter italic uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Gen-Ji
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg font-light max-w-md">
                Building scalable digital solutions for modern businesses with a premium user experience and cinematic design.
              </p>

              <div className="mt-8 flex gap-6">
                {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                  <motion.a 
                    key={i} 
                    href="#"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition-all bg-white/5 shadow-lg backdrop-blur-sm"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* LINKS */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Pages</h4>
              <ul className="space-y-4 text-slate-400 text-lg">
                {['About', 'Services', 'Projects', 'Contact'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    <Link href={`/${item.toLowerCase()}`} className="hover:text-white transition hover:translate-x-2 inline-block">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Expertise</h4>
              <ul className="space-y-4 text-slate-400 text-lg">
                {['Web Systems', 'Mobile Apps', 'Cloud Arch', 'Security'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  >
                    <Link href="/services" className="hover:text-white transition hover:translate-x-2 inline-block text-nowrap">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:col-span-4"
            >
              <div className="p-8 rounded-3xl bg-white/5 border border-white/20 h-full flex flex-col justify-between backdrop-blur-sm">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400 mb-2 italic">Start Here</p>
                  <h4 className="text-3xl font-black text-white leading-tight">Ready to build the future?</h4>
                </div>

                <div className="mt-8">
                  <Link href="/contact" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-black uppercase tracking-widest hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg text-center">
                    Get in touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10 border-t border-white/10 pt-10 mt-16 text-center text-slate-500 text-xs tracking-[0.8em] uppercase font-light"
          >
            &copy; 2026 GEN-JI DIGITAL STUDIO / BOLDLY BUILT
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
