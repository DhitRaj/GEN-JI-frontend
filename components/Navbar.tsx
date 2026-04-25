'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  const navLinkClass = (href: string) =>
    [
      'px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-transparent',
      isActive(href)
        ? 'bg-[#0f172a] text-white shadow-[0_12px_28px_rgba(15,23,42,0.15)]'
        : 'text-slate-600 hover:text-black hover:bg-black/5',
    ].join(' ');

  return (
    <nav className="w-full">
      <div className="glass-panel flex items-center justify-between gap-4 rounded-[1.75rem] border border-black/5 px-4 py-3 md:px-6 md:py-4 shadow-xl backdrop-blur-3xl bg-white/40">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="group flex items-center gap-3 min-w-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-black text-white shadow-lg transition-transform duration-200 group-hover:-translate-y-0.5 font-black">
              GJ
            </span>
            <span className="min-w-0">
              <span className="block text-lg md:text-xl font-bold tracking-tight text-slate-900">
                Gen-Ji<span className="text-slate-900">.</span>
              </span>
              <span className="block text-[11px] uppercase tracking-[0.24em] text-slate-400">
                Digital Studio
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3 rounded-full border border-black/5 bg-black/5 p-2 backdrop-blur-md">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 rounded-full border border-black/5 bg-black/5 text-slate-900">
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-3 rounded-[1.5rem] p-4 space-y-3 border border-black/5 bg-white/80 backdrop-blur-3xl animate-in fade-in zoom-in-95 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 rounded-2xl transition-all text-sm font-bold tracking-widest text-slate-500 hover:text-black hover:bg-black/5 uppercase"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
