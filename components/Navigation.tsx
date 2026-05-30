'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from './LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import aboutData from '@/data/about.json';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const t = getTranslations(locale);

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/research', label: t.nav.research },
    { href: '/teaching', label: t.nav.teaching },
    { href: '/news', label: t.nav.news },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  // Use initials as a quiet monogram instead of loud institutional branding
  const initials = aboutData.name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('');

  return (
    <nav className="sticky top-0 z-50 border-b border-ink/[0.07] bg-paper/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5"
            aria-label={aboutData.name}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 font-serif text-sm text-ink transition-colors group-hover:border-accent group-hover:text-accent">
              {initials}
            </span>
            <span className="font-serif text-lg tracking-tight text-ink">
              {aboutData.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative text-[0.95rem] transition-colors ${
                      isActive(item.href)
                        ? 'text-ink'
                        : 'text-stone-500 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive(item.href) ? 'w-full' : 'w-0'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 border-l border-ink/10 pl-7 text-xs">
              <button
                onClick={() => setLocale('en')}
                className={`transition-colors ${
                  locale === 'en'
                    ? 'text-ink'
                    : 'text-stone-400 hover:text-ink'
                }`}
              >
                EN
              </button>
              <span className="text-stone-300">/</span>
              <button
                onClick={() => setLocale('zh')}
                className={`transition-colors ${
                  locale === 'zh'
                    ? 'text-ink'
                    : 'text-stone-400 hover:text-ink'
                }`}
              >
                中文
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-ink/[0.07] py-4 md:hidden">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2.5 text-base transition-colors ${
                      isActive(item.href)
                        ? 'text-accent'
                        : 'text-stone-600 hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 border-t border-ink/[0.07] pt-4 text-sm">
              <button
                onClick={() => {
                  setLocale('en');
                  setIsOpen(false);
                }}
                className={locale === 'en' ? 'text-ink' : 'text-stone-400'}
              >
                EN
              </button>
              <span className="text-stone-300">/</span>
              <button
                onClick={() => {
                  setLocale('zh');
                  setIsOpen(false);
                }}
                className={locale === 'zh' ? 'text-ink' : 'text-stone-400'}
              >
                中文
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
