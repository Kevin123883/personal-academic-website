'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import PublicationCard from '@/components/PublicationCard';
import PageHeader from '@/components/PageHeader';
import publicationsData from '@/data/publications.json';
import cvData from '@/data/cv.json';
import aboutData from '@/data/about.json';
import { PublicationsData, CVData, Presentation } from '@/lib/types';

const { publications } = publicationsData as PublicationsData;
const cv = cvData as CVData;

export default function Research() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  // The CV's three tiers map onto the site's two buckets: unpublished work
  // (in review / in prep) shows as Working Papers, the rest as Publications.
  const workingPapers = publications.filter(
    (p) => p.status === 'in_review' || p.status === 'in_prep'
  );
  const published = publications.filter((p) => p.status === 'published');

  const sections = [
    { title: t.research.workingPapers, items: workingPapers },
    { title: t.research.publications, items: published },
  ];

  const talkGroups = [
    { title: t.research.invitedTalks, items: cv.presentations.invited },
    { title: t.research.contributedTalks, items: cv.presentations.contributed },
  ].filter((g) => g.items.length > 0);

  const formatTalk = (talk: Presentation) =>
    [talk.event, talk.location].filter(Boolean).join(', ');

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
                  {locale === 'en' ? 'Nothing here yet.' : '暂无内容。'}
                </p>
              )}
            </div>
          </section>
        ))}

        {/* Presentations — only shown once there are talks to list. */}
        {talkGroups.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl text-ink">
              {t.research.presentations}
            </h2>
            <div className="space-y-10 lg:pl-2">
              {talkGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="eyebrow mb-4">{group.title}</h3>
                  <ul className="space-y-5">
                    {group.items.map((talk) => (
                      <li key={talk.id}>
                        <p className="font-serif text-lg italic text-ink">
                          {talk.title}
                        </p>
                        <p className="mt-1 text-sm text-stone-500">
                          {[formatTalk(talk), talk.date]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
