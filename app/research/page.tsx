'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import PublicationCard from '@/components/PublicationCard';
import publicationsData from '@/data/publications.json';
import aboutData from '@/data/about.json';

export default function Research() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">
        {t.research.title}
      </h1>

      {/* Working Papers */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b-2 border-washu-green pb-2">
          {t.research.workingPapers}
        </h2>
        {publicationsData.workingPapers.length > 0 ? (
          publicationsData.workingPapers.map((paper) => (
            <PublicationCard
              key={paper.id}
              publication={paper}
              locale={locale}
              highlightAuthor={aboutData.name}
            />
          ))
        ) : (
          <p className="text-gray-600 italic">
            {locale === 'en'
              ? 'No working papers available.'
              : '暂无工作论文。'}
          </p>
        )}
      </section>

      {/* Publications */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b-2 border-washu-green pb-2">
          {t.research.publications}
        </h2>
        {publicationsData.publications.length > 0 ? (
          publicationsData.publications.map((paper) => (
            <PublicationCard
              key={paper.id}
              publication={paper}
              locale={locale}
              highlightAuthor={aboutData.name}
            />
          ))
        ) : (
          <p className="text-gray-600 italic">
            {locale === 'en'
              ? 'No publications available.'
              : '暂无已发表文章。'}
          </p>
        )}
      </section>
    </div>
  );
}

