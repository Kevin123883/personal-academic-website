'use client';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="animate-fade-up border-b border-ink/[0.07] pb-10">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="font-serif text-4xl font-normal tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-stone-600">
          {description}
        </p>
      )}
    </header>
  );
}
