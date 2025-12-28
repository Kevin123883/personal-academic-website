'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from './LocaleProvider';
import { getTranslations } from '@/lib/i18n';

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

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              WashU SCOT
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-washu-green border-b-2 border-washu-green'
                    : 'text-gray-700 hover:text-washu-green'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setLocale('en')}
                className={`px-2 py-1 text-sm ${
                  locale === 'en'
                    ? 'text-washu-green font-semibold'
                    : 'text-gray-600 hover:text-washu-green'
                }`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setLocale('zh')}
                className={`px-2 py-1 text-sm ${
                  locale === 'zh'
                    ? 'text-washu-green font-semibold'
                    : 'text-gray-600 hover:text-washu-green'
                }`}
              >
                中文
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-washu-green focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'text-washu-green'
                    : 'text-gray-700 hover:text-washu-green'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2 px-3 py-2 mt-2">
              <button
                onClick={() => {
                  setLocale('en');
                  setIsOpen(false);
                }}
                className={`px-2 py-1 text-sm ${
                  locale === 'en'
                    ? 'text-washu-green font-semibold'
                    : 'text-gray-600'
                }`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => {
                  setLocale('zh');
                  setIsOpen(false);
                }}
                className={`px-2 py-1 text-sm ${
                  locale === 'zh'
                    ? 'text-washu-green font-semibold'
                    : 'text-gray-600'
                }`}
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
