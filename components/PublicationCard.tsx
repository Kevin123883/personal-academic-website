'use client';

import { useState } from 'react';
import { Locale, getTranslations } from '@/lib/i18n';
import { Publication } from '@/lib/types';

interface PublicationCardProps {
  publication: Publication;
  locale: Locale;
  highlightAuthor?: string;
}

export default function PublicationCard({
  publication,
  locale,
  highlightAuthor,
}: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false);
  const t = getTranslations(locale);

  const formatAuthors = (authors: string[]) => {
    return authors.map((author, index) => {
      const isHighlighted =
        highlightAuthor && author.toLowerCase().includes(highlightAuthor.toLowerCase());
      return (
        <span key={index}>
          {isHighlighted ? (
            <strong className="text-washu-green">{author}</strong>
          ) : (
            author
          )}
          {index < authors.length - 1 && ', '}
        </span>
      );
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {publication.title}
      </h3>
      <p className="text-sm text-gray-700 mb-2">
        {formatAuthors(publication.authors)}
      </p>
      <p className="text-sm text-gray-600 italic mb-4">{publication.venue}</p>

      {publication.abstract && (
        <div className="mb-4">
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            className="text-sm text-washu-green hover:text-washu-red transition-colors mb-2"
          >
            {showAbstract ? t.research.hideAbstract : t.research.showAbstract}
          </button>
          {showAbstract && (
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              {publication.abstract}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {publication.pdf && (
          <a
            href={publication.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-washu-green text-white text-sm rounded hover:bg-opacity-90 transition-colors"
          >
            {t.research.pdf}
          </a>
        )}
        {publication.ssrn && (
          <a
            href={publication.ssrn}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-washu-green text-washu-green text-sm rounded hover:bg-washu-green hover:text-white transition-colors"
          >
            {t.research.ssrn}
          </a>
        )}
      </div>
    </div>
  );
}

