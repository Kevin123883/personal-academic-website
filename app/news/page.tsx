'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import NewsTimeline from '@/components/NewsTimeline';
import newsData from '@/data/news.json';
import { NewsItem } from '@/lib/types';

export default function News() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">
        {t.news.title}
      </h1>

      {newsData.length > 0 ? (
        <NewsTimeline items={newsData as NewsItem[]} locale={locale} />
      ) : (
        <p className="text-gray-600 italic">
          {locale === 'en' ? 'No news available.' : '暂无新闻。'}
        </p>
      )}
    </div>
  );
}

