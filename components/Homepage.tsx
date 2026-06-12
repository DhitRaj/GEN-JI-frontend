import Link from 'next/link';

const problems = [
  {
    title: 'Traffic but no demo intent',
    text: 'Visitors browse your pages but leave without taking the next step.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 3v18h18" />
        <path d="M7 14l3-3 3 2 4-5" />
      </svg>
    ),
  },
  {
    title: 'Positioning feels generic',
    text: 'Your value sounds similar to competitors, so founders delay booking calls.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Slow pages kill conversions',
    text: 'Messy UX, unclear flow, and weak CTAs reduce trust in under 10 seconds.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

const offerIncludes = [
  'Conversion audit of your current website',
  'Messaging and positioning rewrite for decision-makers',
  'High-converting homepage + key funnel pages',
  'Mobile-first UX and fast, clean build',
  'Booking flow optimization (CTAs, forms, friction fixes)',
];

const process = [
  { step: '01', title: 'Audit', text: 'We find conversion leaks and map growth opportunities.' },
  { step: '02', title: 'Positioning', text: 'We sharpen your message for ICP clarity and demo intent.' },
  { step: '03', title: 'Build', text: 'We design and develop your proof-first conversion pages.' },
  { step: '04', title: 'Launch', text: 'We ship, QA, and optimize key conversion moments.' },
];

const faqs = [
  {
    q: 'How long does the sprint take?',
    a: 'Most projects launch in 14-21 days depending on scope and feedback speed.',
  },
  {
    q: 'How much does it cost?',
    a: 'Typical engagement range is INR 2.4L to 4.5L based on page count and complexity.',
  },
  {
    q: 'How many revisions are included?',
    a: 'You get structured revision rounds for each phase to ensure clarity and speed.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes, we include handover support and a short post-launch optimization window.',
  },
  {
    q: 'Who is this best suited for?',
    a: 'B2B SaaS and AI teams with traffic and product-market fit who need more demos.',
  },
];

export default function Homepage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.16),_transparent_40%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 md:pt-24 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
              Gen-Ji Digital Studio
            </span>
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Get 2-3x more demo bookings from your SaaS website in 21 days
            </h1>
            <p className="mt-5 text-base text-slate-300 sm:text-lg">
              We redesign your homepage, messaging, and conversion flow so more visitors turn into qualified calls
              without increasing ad spend.
            </p>
            <p className="mt-3 text-xs text-slate-400">No fluff. No redesign drama. Just conversion-focused execution.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#final-cta"
                className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
              >
                Book My Free Conversion Audit
              </Link>
              <Link
                href="#process"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                See How It Works
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">Built for teams selling high-ticket B2B products.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-300">
            Early-stage SaaS founders and product teams trust our conversion-first approach.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Why most SaaS websites miss bookings</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {problems.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-4 inline-flex rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-300">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-900/60 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-cyan-300">Demo-Ready Website Sprint</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">A focused rebuild to increase demo intent</h2>
              <p className="mt-4 text-sm text-slate-300">Timeline: 14-21 days</p>
              <p className="mt-1 text-sm text-slate-300">Investment: INR 2.4L - 4.5L</p>
            </div>
            <ul className="space-y-3">
              {offerIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">How it works</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <article key={item.step} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{item.step}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Case study snapshot</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">BEFORE / AFTER</p>
              <p className="mt-3 text-sm text-slate-200">Before: Homepage unclear, low demo intent</p>
              <p className="mt-1 text-sm text-slate-200">After: Clear positioning + optimized CTAs</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">PROBLEM</p>
                <p className="mt-1 text-sm text-slate-200">
                  Product value was strong, but homepage messaging and CTA flow were unclear.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">SOLUTION</p>
                <p className="mt-1 text-sm text-slate-200">
                  Repositioned offer, rebuilt key pages, and tightened conversion paths.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">RESULT</p>
                <p className="mt-1 text-sm text-slate-200">Demo requests increased by 2.7x without increasing ad spend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-6 sm:p-8">
          <p className="text-sm font-medium text-cyan-200">Pricing</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Demo-Ready Website Sprint</h2>
          <p className="mt-3 text-sm text-slate-200">INR 2.4L - 4.5L one-time project fee</p>
          <p className="mt-3 text-xs text-amber-300">Limited to 2 sprint slots per month to maintain delivery speed.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-100">
            <li>Conversion audit + positioning</li>
            <li>High-converting homepage and key pages</li>
            <li>Mobile-first development + performance QA</li>
            <li>Launch support + handover</li>
          </ul>
          <p className="mt-6 rounded-xl border border-cyan-200/30 bg-slate-900/60 p-3 text-xs text-cyan-100">
            Guarantee: If the final output does not match the agreed sprint scope, we keep working until it does.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <article key={item.q} className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <h3 className="text-base font-semibold text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="final-cta" className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Stop losing demo-ready visitors every day</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200">
            Get a clear breakdown of what&apos;s killing your conversions and how to fix it - in one call.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Book My Free Conversion Audit
          </Link>
        </div>
      </section>
    </main>
  );
}
