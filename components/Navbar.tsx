'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href;
    return [
      'rounded-lg px-3 py-2 text-sm transition-colors',
      active ? 'btn-brand text-white' : 'text-brand-muted hover:bg-brand-surface-2',
    ].join(' ');
  };

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-brand">Gen-Ji</span>
          <span className="text-xs text-brand-muted">Digital Studio</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-brand bg-white/75 p-2 text-brand-muted lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 rounded-xl border border-brand bg-white/75 p-2 shadow-sm lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-brand-muted hover:bg-brand-surface-2"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}



