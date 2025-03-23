'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function Favorite({ contact }: { contact: Contact }) {
  const [isFavorite, setIsFavorite] = useState(contact.favorite);
  const router = useRouter();

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
    const formData = new FormData();
    formData.append('favorite', (!isFavorite).toString());
    const res = await fetch(`/api/contacts/${contact.id}`, {
      body: formData,
      method: 'PUT',
    });
    if (!res.ok) {
      setIsFavorite(isFavorite);
      throw new Error('Failed to update favorite status');
    }
    router.refresh();
  };

  return (
    <button
      onClick={handleFavorite}
      className={cn(
        isFavorite ? 'text-yellow-500' : 'text-gray-dark',
        'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}
