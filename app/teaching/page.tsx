'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import PageHeader from '@/components/PageHeader';
import teachingData from '@/data/teaching.json';
import { TeachingCourse } from '@/lib/types';

const teaching = teachingData as TeachingCourse[];

export default function Teaching() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <PageHeader
        eyebrow={locale === 'en' ? 'In the classroom' : '课堂'}
        title={t.teaching.title}
      />

      <div className="mt-12">
        {teaching.length > 0 ? (
          <ul>
            {teaching.map((course) => (
              <li
                key={course.id}
                className="group flex items-baseline justify-between gap-6 border-t border-ink/[0.09] py-7 first:border-t-0"
              >
                <div>
                  <h3 className="font-serif text-xl text-ink">
                    {course.course}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">
                    {[course.semester, course.location]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
                <span className="shrink-0 whitespace-nowrap text-xs uppercase tracking-eyebrow text-accent">
                  {course.role === 'ta'
                    ? t.teaching.role.ta
                    : t.teaching.role.instructor}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-stone-500 italic">
            {locale === 'en' ? 'Nothing here yet.' : '暂无内容。'}
          </p>
        )}
      </div>
    </div>
  );
}
