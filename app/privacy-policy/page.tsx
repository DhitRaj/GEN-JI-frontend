import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gen-Ji Digital Studio',
  description:
    'Read the Gen-Ji Privacy Policy to understand how we collect, use, and protect your information across our website and client services.',
  alternates: { canonical: 'https://www.gen-ji.me/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-200">
      <article className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Legal</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: April 27, 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Overview</h2>
          <p>
            This Privacy Policy explains how Gen-Ji Digital Studio collects, uses, stores, and protects personal
            information when you visit our website, submit forms, or engage with our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
          <p>
            We may collect contact details such as name, email, phone number, company details, project requirements,
            communication history, and technical usage data (such as browser type and page interactions).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">How We Use Information</h2>
          <p>
            We use submitted information to respond to inquiries, provide quotes, deliver development services,
            improve website performance, maintain security, and communicate project updates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Data Sharing</h2>
          <p>
            We do not sell personal data. We may share necessary data with trusted service providers (for hosting,
            analytics, and operations) only to the extent needed to run our business and deliver services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Data Security</h2>
          <p>
            We implement reasonable technical and organizational safeguards to protect your information against
            unauthorized access, loss, or misuse. No internet transmission is fully risk-free, so we continuously
            improve our controls.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your data by contacting us through our contact page.
            We will respond within a reasonable time in accordance with applicable laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p>
            For privacy-related queries, reach us at{' '}
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

