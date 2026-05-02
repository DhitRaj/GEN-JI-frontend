'use client';

import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import SiteHeader from '../../components/SiteHeader';

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />
      <main>
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-16 md:px-6 md:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">About Gen-Ji</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">We are a modern digital studio passionate about creating exceptional web experiences and scalable software solutions that drive business growth.</p>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl rounded-3xl border border-sky-200 card-sky p-8 md:p-12">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Our Mission</h2>
            <p className="mt-5 text-xl leading-relaxed text-slate-700">To empower businesses with cutting-edge digital solutions that transform ideas into reality and drive measurable success.</p>
            <p className="mt-4 text-brand-muted">We believe in building long-term partnerships with our clients, delivering not just code, but complete solutions that solve real business problems and create lasting value.</p>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="section-soft px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Our Values</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { title: 'Product-First Thinking', desc: 'Every feature is mapped to business outcomes, not just code delivery. We focus on what matters.' },
                { title: 'Engineering Quality', desc: 'Scalable architecture, secure APIs, and maintainable code standards. Built to last.' },
                { title: 'Clear Communication', desc: 'Transparent timelines, milestone updates, and no hidden surprises. Always in sync.' },
              ].map((value, i) => (
                <motion.article whileHover={{ y: -5 }} key={value.title} className={`rounded-2xl border p-8 ${i % 2 === 0 ? 'border-rose-200 card-pink' : 'border-sky-200 card-sky'}`}>
                  <h3 className="text-2xl font-semibold text-brand">{value.title}</h3>
                  <p className="mt-3 text-brand-muted">{value.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-rose-200 card-pink p-8 md:p-12">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Meet Our Team</h2>
            <div className="mt-6 flex flex-col items-center gap-8 md:flex-row">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-2xl font-semibold text-white">DK</div>
              <div>
                <h3 className="text-3xl font-semibold text-brand">Dhiraj Yadav</h3>
                <p className="mt-1 text-brand-muted">CEO & Founder</p>
                <p className="mt-4 text-slate-700">With years of experience in web development and a passion for innovation, Dhiraj leads Gen-Ji with a vision to create digital solutions that make a real difference.</p>
                <a href="https://wa.me/917052207833" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-xl btn-brand px-6 py-3 font-semibold text-white transition hover:bg-sky-700">WhatsApp Us</a>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.5 }} className="px-4 pb-20 pt-10 text-center md:px-6">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Ready to Work Together?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted">Let&apos;s create something extraordinary. Get in touch today.</p>
          <a href="/contact" className="mt-8 inline-flex rounded-xl btn-brand px-8 py-4 font-semibold text-white transition hover:bg-sky-700">Get In Touch</a>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}




