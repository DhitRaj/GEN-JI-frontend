'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteHeader from '../SiteHeader';
import Footer from '../Footer';

const services = [
  'Business Website Design',
  'Custom Software Development',
  'E-commerce Development',
  'Maintenance and Support',
];

const process = ['Discovery Call', 'Planning and UI', 'Development', 'Launch and Support'];

const testimonials = [
  { name: 'Aman Gupta', text: 'Gen-Ji ne hamara complete website flow improve kiya, leads noticeably badhi.' },
  { name: 'Priya Soni', text: 'Team ki communication clear thi aur delivery timeline bhi strong thi.' },
  { name: 'Rohit Verma', text: 'Admin panel aur custom features exactly business need ke hisaab se mile.' },
];

function IntegratedImageScene({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <img src={src} alt={alt} className="h-auto w-full rounded-2xl object-contain object-center" />
      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-brand bg-white px-4 py-1.5 text-xs font-semibold text-brand-muted shadow-sm">
        {label}
      </div>
    </motion.div>
  );
}

export default function PremiumHomepage() {
  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />
      <main className="px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-brand bg-brand-surface shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
          <section className="px-6 pb-14 pt-12 md:px-12 md:pt-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                  We build
                  <span className="text-orange-500"> websites and software </span>
                  that grow your business.
                </h1>
                <p className="mt-4 max-w-xl text-lg text-brand-muted">
                  Gen-Ji helps startups and businesses with modern websites, scalable software, and conversion-focused digital experiences.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/contact" className="rounded-full btn-brand px-6 py-3 text-sm font-semibold text-white">
                    Get Started
                  </Link>
                  <Link href="/contact" className="rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand-surface-2">
                    Request a Quote
                  </Link>
                </div>
              </div>
              <IntegratedImageScene src="/images/hero-image.jpg" alt="Hero visual" label="Strategy + Design + Development" />
            </div>
          </section>

          <section className="px-6 py-14 md:px-12">
            <h2 className="text-center text-3xl font-semibold">What We Build at Gen-Ji</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((item, i) => (
                <motion.article
                  key={item}
                  className="rounded-2xl border border-brand bg-white p-5 shadow-sm"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <p className="text-lg font-semibold">{item}</p>
                  <p className="mt-2 text-sm text-brand-muted">Custom strategy and execution for measurable business outcomes.</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="bg-brand-surface-2 px-6 py-14 md:px-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <IntegratedImageScene src="/images/process-image.jpg" alt="Process visual" label="Planning in Progress" />
              <div>
                <h2 className="text-3xl font-semibold">Simple Solutions!</h2>
                <p className="mt-3 text-brand-muted">Simple process, clear communication, and fast execution.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {process.map((step, idx) => (
                    <div key={step} className="flex items-center gap-3 rounded-xl border border-brand bg-white/80 px-4 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">{idx + 1}</span>
                      <span className="font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-14 md:px-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold">Our Agency</h2>
                <p className="mt-3 max-w-3xl text-brand-muted">
                  Gen-Ji is a digital studio focused on practical business outcomes through clean design, strong engineering, and reliable delivery.
                </p>
                <Link href="/about" className="mt-5 inline-flex rounded-xl btn-brand px-5 py-3 text-sm font-semibold text-white">
                  Read More
                </Link>
              </div>
              <IntegratedImageScene src="/images/about-image.jpg" alt="Team visual" label="Gen-Ji Team at Work" />
            </div>
          </section>

          <section className="px-6 py-14 md:px-12">
            <h2 className="text-center text-3xl font-semibold">What Clients Say</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <article key={item.name} className="rounded-2xl border border-brand bg-white p-5 shadow-sm">
                  <p className="text-sm text-brand-muted">&quot;{item.text}&quot;</p>
                  <p className="mt-4 text-sm font-semibold">{item.name}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-orange-500 px-6 py-10 text-white md:px-12">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <h2 className="text-2xl font-semibold">Ready to build your next website or software product?</h2>

              <Link href="/contact" className="rounded-full border border-white px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-orange-600">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
