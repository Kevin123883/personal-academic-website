'use client';

import { useState } from 'react';
import { Locale, getTranslations } from '@/lib/i18n';
import { Publication } from '@/lib/types';

interface PublicationCardProps {
  publication: Publication;
  locale: Locale;
  highlightAuthor?: string;
  index?: number;
}

export default function PublicationCard({
  publication,
  locale,
  highlightAuthor,
  index = 0,
}: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false);
  const t = getTranslations(locale);

  const formatAuthors = (authors: string[]) => {
    return authors.map((author, i) => {
      const isHighlighted =
        highlightAuthor &&
        author.toLowerCase().includes(highlightAuthor.toLowerCase());
      return (
        <span key={i}>
          {isHighlighted ? (
            <span className="font-medium text-ink">{author}</span>
          ) : (
            author
          )}
          {i < authors.length - 1 && ', '}
        </span>
      );
    });
  };

  return (
    <article className="group relative border-t border-ink/[0.09] py-8 transition-colors first:border-t-0">
      {/* Index numeral as a quiet editorial flourish */}
      <span className="absolute -left-10 top-9 hidden font-serif text-sm text-stone-300 lg:block">
        {String(index + 1).padStart(2, '0')}
      </span>

      <h3 className="font-serif text-xl leading-snug text-ink">
        {publication.title}
      </h3>
      <p className="mt-2 text-[0.95rem] text-stone-600">
        {formatAuthors(publication.authors)}
      </p>
      {(publication.venue || publication.note) && (
        <p className="mt-1 font-serif text-[0.95rem] italic text-stone-500">
          {publication.venue || publication.note}
        </p>
      )}

      {publication.highlight && (
        <p className="mt-2.5">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 text-xs font-medium text-accent">
            {publication.highlight}
          </span>
        </p>
      )}

      {/* Links + abstract toggle */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {publication.pdf && (
          <a
            href={publication.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-medium text-accent transition-colors hover:text-ink"
          >
            {t.research.pdf}
          </a>
        )}
        {publication.ssrn && (
          <a
            href={publication.ssrn}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-medium text-accent transition-colors hover:text-ink"
          >
            {t.research.ssrn}
          </a>
        )}
        {publication.abstract && (
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            className="text-stone-500 transition-colors hover:text-ink"
          >
            {showAbstract ? t.research.hideAbstract : t.research.showAbstract}
          </button>
        )}
      </div>

      {publication.abstract && showAbstract && (
        <p className="mt-4 max-w-prose border-l-2 border-accent/30 pl-4 text-[0.95rem] leading-relaxed text-stone-600 animate-fade-up">
          {publication.abstract}
        </p>
      )}
    </article>
  );
}
