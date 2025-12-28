'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import teachingData from '@/data/teaching.json';

export default function Teaching() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">
        {t.teaching.title}
      </h1>

      <div className="space-y-6">
        {teachingData.length > 0 ? (
          teachingData.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {course.course}
                  </h3>
                  <p className="text-sm text-gray-600">{course.semester}</p>
                </div>
                <span className="inline-block px-4 py-2 bg-washu-green text-white text-sm font-medium rounded">
                  {course.role === 'ta'
                    ? t.teaching.role.ta
                    : t.teaching.role.instructor}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 italic">
            {locale === 'en'
              ? 'No teaching experience available.'
              : '暂无教学经历。'}
          </p>
        )}
      </div>
    </div>
  );
}

