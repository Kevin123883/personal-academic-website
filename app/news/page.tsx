'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import NewsTimeline from '@/components/NewsTimeline';
import PageHeader from '@/components/PageHeader';
import newsData from '@/data/news.json';
import { NewsItem } from '@/lib/types';

export default function News() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <PageHeader
        eyebrow={locale === 'en' ? 'Recent activity' : '近况'}
        title={t.news.title}
      />

      <div className="mt-12">
        {newsData.length > 0 ? (
          <NewsTimeline items={newsData as NewsItem[]} locale={locale} />
        ) : (
          <p className="py-6 text-stone-500 italic">
            {locale === 'en' ? 'Nothing here yet.' : '暂无内容。'}
          </p>
        )}
      </div>
    </div>
  );
}
