'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import aboutData from '@/data/about.json';
import Avatar from '@/components/Avatar';

export default function Home() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar name={aboutData.name} />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {aboutData.name}
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            {t.home.phdCandidate}, {aboutData.department}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            {aboutData.affiliation}
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {locale === 'en' ? 'About' : '关于'}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {aboutData.bio[locale as 'en' | 'zh']}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {locale === 'en' ? 'Research Interests' : '研究兴趣'}
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {aboutData.researchInterests[locale as 'en' | 'zh'].map(
                (interest, index) => (
                  <li key={index}>{interest}</li>
                )
              )}
            </ul>
          </div>

          <a
            href={aboutData.cv}
            download
            className="inline-block px-6 py-3 bg-washu-green text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {t.home.downloadCV}
          </a>
        </div>
      </div>
    </div>
  );
}

