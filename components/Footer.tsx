'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-20 pb-8">
      <div className="section-shell">
        <div className="glass-panel rounded-[2rem] p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h3 className="text-3xl font-bold mb-4">Gen-Ji</h3>
              <p className="text-slate-600 leading-relaxed max-w-md">
                Building scalable digital solutions for modern businesses with a premium user experience.
              </p>

              <div className="mt-6 flex gap-4">
                <a href="#" className="glass-chip w-11 h-11 rounded-xl inline-flex items-center justify-center hover:text-blue-600 hover:border-blue-400 transition">
                  <FaGithub size={20} />
                </a>
                <a href="#" className="glass-chip w-11 h-11 rounded-xl inline-flex items-center justify-center hover:text-blue-600 hover:border-blue-400 transition">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="glass-chip w-11 h-11 rounded-xl inline-flex items-center justify-center hover:text-blue-600 hover:border-blue-400 transition">
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-4 text-slate-900">Pages</h4>
              <ul className="space-y-3 text-slate-600">
                <li><Link href="/about" className="hover:text-blue-600 transition">About</Link></li>
                <li><Link href="/services" className="hover:text-blue-600 transition">Services</Link></li>
                <li><Link href="/projects" className="hover:text-blue-600 transition">Projects</Link></li>
                <li><Link href="/features" className="hover:text-blue-600 transition">Features</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-4 text-slate-900">Services</h4>
              <ul className="space-y-3 text-slate-600">
                <li><Link href="/services" className="hover:text-blue-600 transition">Web Development</Link></li>
                <li><Link href="/services" className="hover:text-blue-600 transition">Mobile Apps</Link></li>
                <li><Link href="/services" className="hover:text-blue-600 transition">Backend Systems</Link></li>
                <li><Link href="/features" className="hover:text-blue-600 transition">Security</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Start Here</p>
                  <h4 className="text-2xl font-bold mt-3">Need a modern SaaS website or admin system?</h4>
                  <p className="text-slate-600 mt-3 leading-relaxed">
                    Use the dedicated contact page to share your requirement and get a practical execution plan.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className="btn btn-primary text-center">
                    Contact Us
                  </Link>
                  <Link href="/admin" className="btn btn-secondary text-center">
                    Admin Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/60 pt-6 mt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2026 Gen-Ji. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
