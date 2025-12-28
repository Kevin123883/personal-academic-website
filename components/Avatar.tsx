'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  name: string;
}

export default function Avatar({ name }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg bg-gray-100 flex items-center justify-center">
      {!imageError ? (
        <Image
          src="/images/avatar.png"
          alt={name}
          width={256}
          height={256}
          className="w-full h-full object-cover"
          priority
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

