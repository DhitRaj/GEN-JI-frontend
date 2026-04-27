import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | Gen-Ji Digital Studio',
  description:
    'Read the Gen-Ji Refund Policy for project deposits, milestone payments, and cancellation terms.',
  alternates: { canonical: 'https://www.gen-ji.me/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-200">
      <article className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Legal</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">Refund Policy</h1>
          <p className="text-slate-400">Last updated: April 27, 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Project Deposits</h2>
          <p>
            Initial deposits reserve planning and engineering capacity and are generally non-refundable once discovery
            and planning work has started.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Milestone Billing</h2>
          <p>
            Milestone invoices correspond to completed work stages. Refund requests are evaluated based on the amount
            of completed and delivered work at the time of request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Cancellation</h2>
          <p>
            If a project is canceled mid-way, billable effort up to cancellation date remains payable. Any eligible
            refund is processed after accounting for completed work and non-recoverable third-party costs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Disputes</h2>
          <p>
            In case of billing disputes, please contact us first. We aim to resolve concerns transparently through
            documented deliverables, timelines, and agreed scope.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p>
            For refund-related requests, submit details at{' '}
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

