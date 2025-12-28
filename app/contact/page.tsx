'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import aboutData from '@/data/about.json';

export default function Contact() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">
        {t.contact.title}
      </h1>

      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl">
        <div className="space-y-6">
          {/* Email */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              {t.contact.email}
            </h3>
            <a
              href={`mailto:${aboutData.email}`}
              className="text-lg text-washu-green hover:text-washu-red transition-colors"
            >
              {aboutData.email}
            </a>
          </div>

          {/* Office */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              {t.contact.office}
            </h3>
            <p className="text-lg text-gray-900">{aboutData.office}</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              {locale === 'en' ? 'Links' : '链接'}
            </h3>
            <div className="flex flex-wrap gap-4">
              {aboutData.googleScholar && (
                <a
                  href={aboutData.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 border border-washu-green text-washu-green rounded-lg hover:bg-washu-green hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                  <span>{t.contact.googleScholar}</span>
                </a>
              )}
              {aboutData.linkedin && (
                <a
                  href={aboutData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 border border-washu-green text-washu-green rounded-lg hover:bg-washu-green hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>{t.contact.linkedin}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

