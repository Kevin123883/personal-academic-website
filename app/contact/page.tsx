'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getTranslations } from '@/lib/i18n';
import PageHeader from '@/components/PageHeader';
import aboutData from '@/data/about.json';

export default function Contact() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const details = [
    {
      label: t.contact.email,
      value: aboutData.email,
      href: `mailto:${aboutData.email}`,
    },
    {
      label: t.contact.office,
      value: aboutData.office,
    },
  ];

  const links = [
    aboutData.googleScholar && {
      label: t.contact.googleScholar,
      href: aboutData.googleScholar,
    },
    aboutData.linkedin && {
      label: t.contact.linkedin,
      href: aboutData.linkedin,
    },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <PageHeader
        eyebrow={locale === 'en' ? 'Get in touch' : '联系'}
        title={t.contact.title}
        description={
          locale === 'en'
            ? 'Always happy to discuss research, collaborations, or teaching.'
            : '欢迎就研究、合作或教学交流。'
        }
      />

      <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2">
        {/* Details */}
        <dl className="space-y-8">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="eyebrow mb-2">{d.label}</dt>
              <dd className="font-serif text-xl text-ink">
                {d.href ? (
                  <a
                    href={d.href}
                    className="link-underline transition-colors hover:text-accent"
                  >
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* Links */}
        {links.length > 0 && (
          <div>
            <p className="eyebrow mb-4">
              {locale === 'en' ? 'Elsewhere' : '其他链接'}
            </p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-serif text-xl text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                    <svg
                      className="h-4 w-4 text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.6}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M9 7h8v8"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
