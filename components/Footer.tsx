'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/genji-studio', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/company/genji-studio', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/genji_studio', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand bg-brand-surface py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-semibold tracking-tight text-brand">Gen-Ji Digital Studio</h3>
          <p className="mt-4 max-w-md text-brand-muted">
            We build modern websites and software systems that look premium, perform fast, and convert better.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="rounded-lg border border-brand p-3 text-brand-muted transition hover:border-orange-300 hover:text-brand"
              >
                <item.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted">Pages</h4>
          <ul className="mt-4 space-y-3 text-brand">
            {[
              { label: 'About', href: '/about' },
              { label: 'Offer', href: '/services' },
              { label: 'Case Studies', href: '/projects' },
              { label: 'Insights', href: '/blog' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted">Expertise</h4>
          <ul className="mt-4 space-y-3 text-brand">
            {['Web Systems', 'Mobile Apps', 'Cloud Arch', 'Security'].map((item) => (
              <li key={item}>
                <Link href="/services" className="hover:text-slate-900">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted">Legal</h4>
          <ul className="mt-4 space-y-3 text-brand">
            <li><Link href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-slate-900">Terms</Link></li>
            <li><Link href="/refund-policy" className="hover:text-slate-900">Refund Policy</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted">Start Here</p>
          <h4 className="mt-3 text-xl font-semibold text-brand">Need a high-converting website?</h4>
          <Link
            href="/contact"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl btn-brand px-5 py-3 text-sm font-semibold text-white transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-brand px-6 pt-6 text-center text-xs uppercase tracking-[0.2em] text-brand-muted">
        &copy; 2026 Gen-Ji Digital Studio
      </div>
    </footer>
  );
}

