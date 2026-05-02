'use client';

import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import ClientForm from '../../components/sections/ClientForm';
import SiteHeader from '../../components/SiteHeader';

function SectionHeading({ title, highlight, description }: { title: string; highlight?: string; description?: string }) {
  return (
    <div className="mb-14">
      <h2 className="text-4xl font-semibold tracking-tight text-brand md:text-5xl">
        {title} {highlight ? <span className="text-slate-500">{highlight}</span> : null}
      </h2>
      {description ? <p className="mt-4 max-w-2xl text-lg text-brand-muted">{description}</p> : null}
    </div>
  );
}

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-brand text-brand">
      <SiteHeader />

      <main>
        <section className="px-4 pb-20 pt-16 md:px-6 md:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Get in touch</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-brand md:text-7xl">Get In Touch</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">
              Ready to bring your vision to life? Let&apos;s discuss your project requirements and build something extraordinary together.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#contact-form" className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-800">
                Start Your Project
              </a>
              <a
                href="https://wa.me/917052207833"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                WhatsApp Us
              </a>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4">
              {[
                { num: '24h', label: 'Response Time' },
                { num: '50+', label: 'Projects Done' },
                { num: '99%', label: 'Success Rate' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-brand card-soft px-4 py-6 shadow-sm">
                  <div className="text-2xl font-semibold text-brand md:text-3xl">{stat.num}</div>
                  <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Reach Us" highlight="Anytime" description="Multiple ways to connect with our team" />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'WhatsApp',
                  desc: 'Message us directly on WhatsApp',
                  contact: '+91 7052207833',
                  link: 'https://wa.me/917052207833',
                },
                {
                  title: 'Email',
                  desc: 'Send us your project details',
                  contact: 'admin@gen-ji.me',
                  link: 'mailto:admin@gen-ji.me',
                },
                {
                  title: 'Chat',
                  desc: 'Quick response via messaging',
                  contact: 'Available 24/7',
                  link: '#contact-form',
                },
              ].map((method) => (
                <a
                  key={method.title}
                  href={method.link}
                  className="rounded-2xl border border-brand card-soft p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-2xl font-semibold text-brand">{method.title}</h3>
                  <p className="mt-3 text-brand-muted">{method.desc}</p>
                  <p className="mt-5 font-medium text-slate-800">{method.contact}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-soft px-4 py-16 md:px-6">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Why Choose" highlight="Gen-Ji" />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Quick Response',
                  description: 'We respond to your inquiry within 24 hours with a detailed project plan and timeline.',
                  features: ['Fast turnaround', 'Dedicated support', 'Clear communication'],
                },
                {
                  title: 'Tailored Solutions',
                  description: 'Custom execution plan designed specifically for your business needs and goals.',
                  features: ['Personalized approach', 'Flexible timeline', 'Scalable architecture'],
                },
                {
                  title: 'Fast Delivery',
                  description: 'Agile implementation with regular updates and quality assurance at every step.',
                  features: ['Sprint-based', 'Regular updates', 'Quality assurance'],
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-brand card-soft p-8">
                  <h3 className="text-2xl font-semibold text-brand">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-brand-muted">{item.description}</p>
                  <ul className="mt-5 space-y-2 text-slate-700">
                    {item.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-form" className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-brand card-soft p-6 shadow-sm md:p-10">
            <SectionHeading
              title="Tell Us About Your"
              highlight="Project"
              description="Share your requirements and let&apos;s create something amazing together"
            />
            <ClientForm />
          </div>
        </section>

        <section className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-brand card-soft p-8 shadow-sm md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-2xl font-semibold text-white">DK</div>
              <div>
                <h3 className="text-3xl font-semibold text-brand">Dhiraj Yadav</h3>
                <p className="mt-1 text-brand-muted">CEO & Founder, Gen-Ji Digital Studio</p>
                <p className="mt-4 leading-relaxed text-slate-700">
                  &quot;We&apos;re passionate about building next-generation digital experiences. Every project is a partnership, and your success is our success. Let&apos;s create something extraordinary together.&quot;
                </p>
                <a
                  href="https://wa.me/917052207833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  WhatsApp Dhiraj
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-soft px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl">
            <SectionHeading title="Frequently Asked" highlight="Questions" />
            <div className="space-y-4">
              {[
                {
                  q: 'What is your typical project timeline?',
                  a: 'Most projects take 4-12 weeks depending on complexity. We provide a detailed timeline during the discovery phase.',
                },
                {
                  q: 'Do you offer ongoing support?',
                  a: 'Yes! We provide 24/7 support and maintenance packages for all our projects.',
                },
                {
                  q: 'What is your pricing model?',
                  a: 'We offer flexible pricing based on project scope. We provide custom quotes after understanding your requirements.',
                },
                {
                  q: 'Can you work with existing code?',
                  a: 'Absolutely! We can integrate with, improve, or rebuild existing projects as needed.',
                },
              ].map((faq) => (
                <motion.div key={faq.q} className="rounded-2xl border border-brand card-soft p-6">
                  <h3 className="text-xl font-semibold text-brand">{faq.q}</h3>
                  <p className="mt-3 leading-relaxed text-brand-muted">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-16 text-center md:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-brand card-soft p-10 shadow-sm">
            <h2 className="text-4xl font-semibold tracking-tight text-brand md:text-5xl">Let&apos;s Create Magic</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted">
              Your next big project is just one conversation away. Let&apos;s talk!
            </p>
            <a
              href="#contact-form"
              className="mt-8 inline-flex rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              Get Started Now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}





