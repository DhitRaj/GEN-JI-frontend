'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-10 md:p-16 rounded-[3rem] border border-black/5 bg-white/60 backdrop-blur-[60px] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* BRAND */}
            <div className="lg:col-span-4">
              <h3 className="text-4xl font-black mb-6 text-slate-900 tracking-tighter italic uppercase">Gen-Ji</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-light max-w-md">
                Building scalable digital solutions for modern businesses with a premium user experience and cinematic design.
              </p>

              <div className="mt-8 flex gap-6">
                {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl border border-black/5 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all bg-white shadow-sm hover:scale-110">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS */}
            <div className="lg:col-span-2">
              <h4 className="font-bold mb-6 text-slate-900 uppercase tracking-widest text-sm">Pages</h4>
              <ul className="space-y-4 text-slate-500 text-lg">
                <li><Link href="/about" className="hover:text-slate-900 transition">About</Link></li>
                <li><Link href="/services" className="hover:text-slate-900 transition">Services</Link></li>
                <li><Link href="/projects" className="hover:text-slate-900 transition">Projects</Link></li>
                <li><Link href="/contact" className="hover:text-slate-900 transition">Contact</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold mb-6 text-slate-900 uppercase tracking-widest text-sm">Expertise</h4>
              <ul className="space-y-4 text-slate-500 text-lg">
                <li><Link href="/services" className="hover:text-slate-900 transition text-nowrap">Web Systems</Link></li>
                <li><Link href="/services" className="hover:text-slate-900 transition text-nowrap">Mobile Apps</Link></li>
                <li><Link href="/services" className="hover:text-slate-900 transition text-nowrap">Cloud Arch</Link></li>
                <li><Link href="/services" className="hover:text-slate-900 transition text-nowrap">Security</Link></li>
              </ul>
            </div>

            {/* CTA */}
            <div className="lg:col-span-4">
              <div className="p-8 rounded-3xl bg-slate-50 border border-black/5 h-full flex flex-col justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2 italic">Start Here</p>
                  <h4 className="text-3xl font-black text-slate-900 leading-tight">Ready to build the future?</h4>
                </div>

                <div className="mt-8">
                  <Link href="/contact" className="inline-block px-10 py-4 rounded-full bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg text-center">
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-black/5 pt-10 mt-16 text-center text-slate-400 text-xs tracking-[0.8em] uppercase font-light">
            &copy; 2026 GEN-JI DIGITAL STUDIO / BOLDLY BUILT
          </div>
        </div>
      </div>
    </footer>
  );
}
