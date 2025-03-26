'use client';

import React, { useOptimistic } from 'react';
import { favoriteContact } from '@/data/actions/contact';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function Favorite({ contact }: { contact: Contact }) {
  const [isFavorite, setIsFavorite] = useOptimistic(contact.favorite);

  return (
    <form
      action={async () => {
        setIsFavorite(!isFavorite);
        await favoriteContact(contact.id, isFavorite);
      }}
    >
      <button
        className={cn(
          isFavorite ? 'text-yellow-500' : 'text-gray-dark',
          'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
        )}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </form>
  );
}
