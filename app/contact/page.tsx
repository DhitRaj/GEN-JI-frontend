'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ClientForm from '../../components/sections/ClientForm';
import PageHero from '../../components/PageHero';

const contactOptions = [
  { title: 'Project Brief', desc: 'Share scope, timeline, and target outcome.' },
  { title: 'Existing Product', desc: 'Tell us what needs improvement or a new workflow.' },
  { title: 'Admin System', desc: 'Request a custom dashboard or internal tool.' },
];

const faqs = [
  { q: 'How fast do you respond?', a: 'Usually within 24 hours on business days.' },
  { q: 'Do you work on small and large projects?', a: 'Yes. We can start with a focused MVP and scale from there.' },
  { q: 'Can you support ongoing improvements?', a: 'Yes. We can provide iterative support after launch.' },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to build."
        description="Share your requirement and get a practical execution plan from our team."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />
      <ClientForm />

      <section className="pb-20">
        <div className="section-shell grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Best starting points</p>
            <h2 className="text-3xl font-bold mt-3">Pick the kind of conversation that fits your need.</h2>
            <div className="mt-6 space-y-4">
              {contactOptions.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-md">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="card">
                <h3 className="text-xl font-bold">{item.q}</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
