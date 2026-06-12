'use client';

import Footer from '../../components/Footer';
import SiteHeader from '../../components/SiteHeader';
import ClientForm from '../../components/sections/ClientForm';

const contactChannels = [
  { title: 'WhatsApp', value: '+91 7052207833', href: 'https://wa.me/917052207833' },
  { title: 'Email', value: 'admin@gen-ji.me', href: 'mailto:admin@gen-ji.me' },
  { title: 'Call Window', value: '10 AM - 8 PM IST', href: '#contact-form' },
];

const expectations = [
  'Project scope and timeline recommendation',
  'Rough budget estimate based on your goals',
  'Tech stack suggestion for scale and speed',
  'Next-step plan you can execute immediately',
];

const faqs = [
  {
    q: 'How fast will you respond?',
    a: 'Most inquiries are replied to within 24 hours with a practical next step.',
  },
  {
    q: 'Can you work on existing projects?',
    a: 'Yes. We can improve, redesign, or scale your current website/software.',
  },
  {
    q: 'Do you only build websites?',
    a: 'No. We build websites, admin panels, internal tools, and custom software systems.',
  },
];

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-[#dff3f4] text-slate-900">
      <SiteHeader />
      <main className="px-4 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-[28px] border border-slate-200 bg-[#fffaf5] px-6 pb-12 pt-10 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:px-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Contact Gen-Ji</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                  Tell us your goal.
                  <span className="text-orange-500"> We will build the right solution.</span>
                </h1>
                <p className="mt-4 max-w-2xl text-slate-600">
                  This page is for serious project discussions. Share your requirement and get a clear roadmap, timeline, and execution plan.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#contact-form" className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                    Submit Requirement
                  </a>
                  <a
                    href="https://wa.me/917052207833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">What you get on first call</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {expectations.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {contactChannels.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5"
              >
                <p className="text-sm uppercase tracking-[0.12em] text-slate-500">{channel.title}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{channel.value}</p>
              </a>
            ))}
          </section>

          <section id="contact-form" className="rounded-[28px] border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_50px_rgba(15,23,42,0.1)] md:px-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange-600">Project Brief</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Share your requirement</h2>
              <p className="mt-2 text-slate-600">Fill this form once. We will respond with practical next steps.</p>
            </div>
            <ClientForm />
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-[#fffaf5] px-6 py-10 md:px-10">
            <h2 className="text-3xl font-semibold text-slate-900">Frequently asked questions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

