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
      month: 'short',
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
    <ol className="relative border-l border-ink/10">
      {sortedItems.map((item, index) => (
        <li key={index} className="group relative pb-10 pl-8 last:pb-0">
          {/* Node */}
          <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-paper transition-colors group-hover:bg-accent" />

          <div className="flex flex-wrap items-baseline gap-x-3">
            <time className="font-serif text-sm italic text-stone-500">
              {formatDate(item.date)}
            </time>
            {getTypeLabel(item.type) && (
              <span className="text-[0.7rem] uppercase tracking-eyebrow text-accent">
                {getTypeLabel(item.type)}
              </span>
            )}
          </div>

          <h3 className="mt-2 font-serif text-xl text-ink">{item.title}</h3>
          <p className="mt-1.5 max-w-prose leading-relaxed text-stone-600">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
