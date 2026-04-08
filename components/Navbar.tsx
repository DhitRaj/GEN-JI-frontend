'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdMenu, MdClose, MdLightMode, MdDarkMode } from 'react-icons/md';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Features', href: '/features' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  const navLinkClass = (href: string) =>
    [
      'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
      isActive(href)
        ? 'bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)]'
        : 'text-slate-700 hover:text-blue-600 hover:bg-white/55 dark:text-slate-200 dark:hover:bg-white/10',
    ].join(' ');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    setIsDark(nextIsDark);
    document.documentElement.classList.toggle('dark', nextIsDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <nav className="sticky top-4 z-50">
      <div className="section-shell">
        <div className="glass-panel flex justify-between items-center h-16 rounded-2xl px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight">
              Gen-Ji <span className="text-slate-500 dark:text-slate-300 text-sm">Studio</span>
            </Link>
            <span className="glass-chip hidden lg:inline-flex px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-200">
              {navItems.find((item) => isActive(item.href))?.label || 'Home'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="btn btn-primary py-2 px-4 text-sm"
            >
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-white/60 dark:hover:bg-white/10 rounded-xl text-slate-700 dark:text-slate-200 transition"
              aria-label="Toggle theme"
              aria-pressed={isDark}
            >
              {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-white/60 rounded-xl text-slate-700 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="glass-panel md:hidden mt-3 rounded-2xl p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={[
                  'block py-2 px-3 rounded-xl transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-white/55 dark:text-slate-200 dark:hover:bg-white/10',
                ].join(' ')}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block py-2 px-4 bg-blue-600 text-white rounded-xl text-center mt-4"
            >
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
