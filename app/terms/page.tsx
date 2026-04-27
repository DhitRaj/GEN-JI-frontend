import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Gen-Ji Digital Studio',
  description:
    'Read the Terms and Conditions for using the Gen-Ji website and engaging with our software development services.',
  alternates: { canonical: 'https://www.gen-ji.me/terms' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-200">
      <article className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Legal</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Terms and Conditions</h1>
          <p className="text-slate-400">Last updated: April 27, 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
          <p>
            By using the Gen-Ji website or engaging our services, you agree to these Terms and all applicable laws.
            If you do not agree, please discontinue use of the website and services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Services</h2>
          <p>
            Gen-Ji provides web development, software engineering, product design, and related consulting services.
            Final project scope, timelines, and deliverables are governed by signed proposals or agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
          <p>
            Unless otherwise agreed in writing, all intellectual property related to our frameworks, internal tooling,
            and brand assets remains with Gen-Ji. Client project IP transfer terms are defined in project contracts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Payments and Invoicing</h2>
          <p>
            Payment schedules, invoice cycles, and accepted methods are defined in service agreements. Delayed payments
            may affect delivery schedules and support timelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
          <p>
            To the maximum extent allowed by law, Gen-Ji is not liable for indirect or consequential damages arising
            from website use or project delays caused by dependencies outside our control.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued usage of the website or services after updates
            indicates acceptance of revised terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p>
            For legal questions, contact us through{' '}
            <a className="text-cyan-300 underline" href="/contact">
              https://www.gen-ji.me/contact
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}

