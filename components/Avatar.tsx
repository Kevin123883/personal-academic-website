'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  name: string;
}

export default function Avatar({ name }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative">
      {/* Soft halo behind the portrait for depth */}
      <div
        className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent/10 blur-2xl"
        aria-hidden
      />
      <div className="h-56 w-56 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-stone-100 shadow-card md:h-72 md:w-72">
        {!imageError ? (
          <Image
            src="/images/avatar.png"
            alt={name}
            width={320}
            height={320}
            className="h-full w-full object-cover"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-6xl text-stone-400">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
