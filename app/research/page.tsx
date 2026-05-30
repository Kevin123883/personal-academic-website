'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import PublicationCard from '@/components/PublicationCard';
import PageHeader from '@/components/PageHeader';
import publicationsData from '@/data/publications.json';
import aboutData from '@/data/about.json';

export default function Research() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const sections = [
    { title: t.research.workingPapers, items: publicationsData.workingPapers },
    { title: t.research.publications, items: publicationsData.publications },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <PageHeader
        eyebrow={locale === 'en' ? 'Scholarship' : '学术'}
        title={t.research.title}
      />

      <div className="mt-14 space-y-16">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 flex items-baseline gap-3 font-serif text-2xl text-ink">
              {section.title}
              <span className="text-sm font-sans text-stone-400">
                {section.items.length}
              </span>
            </h2>
            <div className="lg:pl-2">
              {section.items.length > 0 ? (
                section.items.map((paper, i) => (
                  <PublicationCard
                    key={paper.id}
                    publication={paper}
                    locale={locale}
                    highlightAuthor={aboutData.name}
                    index={i}
                  />
                ))
              ) : (
                <p className="py-6 text-stone-500 italic">
                  {locale === 'en'
                    ? 'Nothing here yet.'
                    : '暂无内容。'}
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
