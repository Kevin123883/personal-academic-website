'use client';

import { Locale, getTranslations } from '@/lib/i18n';
import { NewsItem } from '@/lib/types';

interface NewsTimelineProps {
  items: NewsItem[];
  locale: Locale;
}

export default function NewsTimeline({ items, locale }: NewsTimelineProps) {
  const t = getTranslations(locale);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'conference':
        return t.news.conference;
      case 'award':
        return t.news.award;
      default:
        return '';
    }
  };

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>

      <div className="space-y-8">
        {sortedItems.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-8 h-8 bg-washu-green rounded-full border-4 border-white hidden md:flex items-center justify-center">
              <div className="w-2 h-2 bg-washu-green rounded-full"></div>
            </div>

            <div className="ml-0 md:ml-12 flex-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <span className="text-xs font-semibold text-washu-green uppercase tracking-wide mb-1 sm:mb-0">
                    {getTypeLabel(item.type)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatDate(item.date)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

