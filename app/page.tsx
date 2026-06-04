'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import aboutData from '@/data/about.json';
import educationData from '@/data/education.json';
import cvData from '@/data/cv.json';
import { EducationEntry, CVData } from '@/lib/types';
import Avatar from '@/components/Avatar';

const education = educationData as EducationEntry[];
const cv = cvData as CVData;

export default function Home() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      {/* Hero */}
      <section className="grid grid-cols-1 items-start gap-12 py-16 md:grid-cols-[1fr_auto] md:gap-16 md:py-24">
        <div className="order-2 animate-fade-up md:order-1">
          <p className="eyebrow">
            {t.home.phdCandidate} · {aboutData.department}
          </p>
          <h1 className="mt-5 font-serif text-5xl font-normal leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl">
            {aboutData.name}
          </h1>
          <p className="mt-4 text-lg text-stone-500">
            {aboutData.affiliation}
          </p>

          <p className="mt-8 max-w-prose text-lg leading-relaxed text-stone-700 text-pretty">
            {aboutData.bio[locale as 'en' | 'zh']}
          </p>

          {/* Research interests as understated inline tags */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {aboutData.researchInterests[locale as 'en' | 'zh'].map(
              (interest, index) => (
                <span
                  key={index}
                  className="rounded-full border border-ink/10 bg-ink/[0.03] px-3.5 py-1.5 text-sm text-stone-600"
                >
                  {interest}
                </span>
              )
            )}
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href={aboutData.cv}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all hover:bg-accent"
            >
              {t.home.downloadCV}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v12m0 0l-4-4m4 4l4-4M5 19.5h14"
                />
              </svg>
            </a>

            <a
              href={`mailto:${aboutData.email}`}
              className="link-underline text-sm text-stone-600 transition-colors hover:text-ink"
            >
              {aboutData.email}
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="order-1 flex justify-center animate-fade-in md:order-2 md:justify-end">
          <Avatar name={aboutData.name} />
        </div>
      </section>

      {/* Academic sections — each appears only when it has content. */}
      <div className="max-w-3xl space-y-16 pb-24">
        {education.length > 0 && (
          <section>
            <h2 className="eyebrow mb-6">{t.home.education}</h2>
            <ul className="space-y-7">
              {education.map((entry) => (
                <li
                  key={entry.id}
                  className="border-t border-ink/[0.09] pt-7 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-serif text-xl text-ink">
                      {entry.institution}
                    </h3>
                    <span className="text-sm text-stone-500">
                      {entry.location}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="text-stone-600">{entry.degree}</p>
                    <span className="font-serif text-sm italic text-stone-500">
                      {entry.date}
                    </span>
                  </div>
                  {entry.advisor && (
                    <p className="mt-1.5 text-sm text-stone-500">
                      {t.home.advisor}: Dr. {entry.advisor}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {cv.awards.length > 0 && (
          <section>
            <h2 className="eyebrow mb-6">{t.home.awards}</h2>
            <ul className="space-y-6">
              {cv.awards.map((award) => (
                <li
                  key={award.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                >
                  <div>
                    <h3 className="font-serif text-lg text-ink">
                      {award.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-stone-500">
                      {[award.organization, award.detail]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <span className="font-serif text-sm italic text-stone-500">
                    {award.date}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {cv.service.length > 0 && (
          <section>
            <h2 className="eyebrow mb-6">{t.home.service}</h2>
            <ul className="space-y-6">
              {cv.service.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                >
                  <div>
                    <h3 className="font-serif text-lg text-ink">
                      {item.organization}
                    </h3>
                    <p className="mt-0.5 text-sm text-stone-500">
                      {[item.role, item.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <span className="font-serif text-sm italic text-stone-500">
                    {item.date}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
