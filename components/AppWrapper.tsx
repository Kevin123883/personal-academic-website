'use client';

import { ErrorBoundary } from './ErrorBoundary';
import Navigation from './Navigation';
import { LocaleProvider, useLocale } from './LocaleProvider';
import aboutData from '@/data/about.json';

function SiteFooter() {
  const { locale } = useLocale();

  return (
    <footer className="mt-24 border-t border-ink/[0.07]">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-lg text-ink">{aboutData.name}</p>
            <p className="mt-1 text-sm text-stone-500">
              {aboutData.department} · {aboutData.affiliation}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <a
              href={`mailto:${aboutData.email}`}
              className="link-underline transition-colors hover:text-ink"
            >
              {locale === 'en' ? 'Email' : '邮箱'}
            </a>
            {aboutData.googleScholar && (
              <a
                href={aboutData.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline transition-colors hover:text-ink"
              >
                Scholar
              </a>
            )}
            {aboutData.linkedin && (
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
        <p className="mt-10 text-xs text-stone-400">
          © {new Date().getFullYear()} {aboutData.name}. {' '}
          {locale === 'en'
            ? 'All rights reserved.'
            : '保留所有权利。'}
        </p>
      </div>
    </footer>
  );
}

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-grow">{children}</main>
          <SiteFooter />
        </div>
      </LocaleProvider>
    </ErrorBoundary>
  );
}
