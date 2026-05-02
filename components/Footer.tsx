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
    <footer className="border-t border-slate-200 bg-rose-50 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Gen-Ji Digital Studio</h3>
          <p className="mt-4 max-w-md text-slate-600">
            Building scalable digital solutions for modern businesses with a premium user experience and cinematic design.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="rounded-lg border border-slate-200 p-3 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <item.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Pages</h4>
          <ul className="mt-4 space-y-3 text-slate-700">
            {['About', 'Services', 'Projects', 'Blog', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="hover:text-slate-900">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Expertise</h4>
          <ul className="mt-4 space-y-3 text-slate-700">
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
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Legal</h4>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li><Link href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-slate-900">Terms</Link></li>
            <li><Link href="/refund-policy" className="hover:text-slate-900">Refund Policy</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Start Here</p>
          <h4 className="mt-3 text-xl font-semibold text-slate-900">Ready to build the future?</h4>
          <Link
            href="/contact"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Get in touch
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-200 px-6 pt-6 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
        &copy; 2026 Gen-Ji Digital Studio
      </div>
    </footer>
  );
}


