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
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  const navLinkClass = (href: string) =>
    [
      'px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-transparent',
      isActive(href)
        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
        : 'text-slate-300 hover:text-white hover:bg-white/10',
    ].join(' ');

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 px-4 py-3 md:px-6 md:py-4 shadow-2xl backdrop-blur-[80px] bg-slate-900/55 relative overflow-hidden">
        {/* Oily/Liquid effect overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="flex items-center gap-4 min-w-0 relative z-10">
          <Link href="/" className="group flex items-center gap-3 min-w-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 text-white shadow-lg transition-transform duration-200 group-hover:-translate-y-0.5 font-black">
              GJ
            </span>
            <span className="min-w-0">
              <span className="block text-lg md:text-xl font-bold tracking-tight text-white">
                Gen-Ji<span className="text-purple-400">.</span>
              </span>
              <span className="block text-[11px] uppercase tracking-[0.24em] text-slate-400">
                Digital Studio
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3 rounded-full border border-white/10 bg-slate-900/55 p-2 backdrop-blur-md relative z-10">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 rounded-full border border-white/10 bg-slate-900/55 text-white relative z-10">
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-3 rounded-[1.5rem] p-4 space-y-3 border border-white/10 bg-slate-900/60 backdrop-blur-[80px] animate-in fade-in zoom-in-95 shadow-2xl relative overflow-hidden">
          {/* Oily effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
          </div>
          <div className="relative z-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 rounded-2xl transition-all text-sm font-bold tracking-widest text-slate-300 hover:text-white hover:bg-white/10 uppercase"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
