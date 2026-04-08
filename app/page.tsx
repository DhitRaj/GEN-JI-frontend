'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import ClientForm from '../components/sections/ClientForm';
import Footer from '../components/Footer';

const quickPages = [
  { title: 'About', href: '/about', desc: 'Understand the vision and delivery style.' },
  { title: 'Services', href: '/services', desc: 'Explore what we build and support.' },
  { title: 'Projects', href: '/projects', desc: 'See selected work and live outcomes.' },
  { title: 'Features', href: '/features', desc: 'Review platform functions and modules.' },
  { title: 'Contact', href: '/contact', desc: 'Send your requirement to the team.' },
  { title: 'Admin', href: '/admin', desc: 'Access the secure admin workspace.' },
];

const homeStats = [
  { value: '06', label: 'Dedicated pages' },
  { value: '04', label: 'Core modules' },
  { value: '01', label: 'Unified design system' },
];

const workSteps = [
  { step: '01', title: 'Discover', desc: 'We understand your product, users, and business goals.' },
  { step: '02', title: 'Design', desc: 'We build a strong visual direction and page structure.' },
  { step: '03', title: 'Build', desc: 'We implement UI, backend, and admin workflows cleanly.' },
  { step: '04', title: 'Launch', desc: 'We test, ship, and optimize based on usage and feedback.' },
];

const reasons = [
  { title: 'Consistent branding', desc: 'Every page uses the same premium visual language.' },
  { title: 'Clear navigation', desc: 'Users can quickly move between functions and pages.' },
  { title: 'Scalable structure', desc: 'The app can grow without losing clarity or design quality.' },
];


export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-12rem] h-[28rem] w-[28rem] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute top-[34rem] left-[-10rem] h-[24rem] w-[24rem] rounded-full bg-cyan-300/20 blur-3xl" />
      </div>
      <Navbar />

      <Hero />

      <section className="pb-20">
        <div className="section-shell">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="card group block hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Page</p>
                <h2 className="text-2xl font-bold mt-3 group-hover:text-blue-600 transition">{page.title}</h2>
                <p className="text-slate-600 mt-2 leading-relaxed">{page.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="card lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Overview</p>
            <h2 className="text-3xl font-bold mt-3">A clearer, richer product experience.</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Gen-Ji is structured to feel like a real product, not just a landing page. The site now separates key functions into dedicated pages with stronger visual depth.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {homeStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/70 bg-white/45 p-4 text-center backdrop-blur-md">
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
            {workSteps.map((item) => (
              <div key={item.title} className="card">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Step {item.step}</p>
                <h3 className="text-2xl font-bold mt-3">{item.title}</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell grid md:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div key={item.title} className="card">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-slate-600 mt-3 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-y border-white/60 bg-white/65 backdrop-blur-sm">
        <Services />
      </div>

      <Projects />

      <div className="border-y border-white/60 bg-white/65 backdrop-blur-sm">
        <ClientForm />
      </div>

      <Footer />
    </main>
  );
}
