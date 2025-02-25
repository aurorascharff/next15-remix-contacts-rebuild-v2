'use client';

import React, { useOptimistic, useTransition } from 'react';
import { favoriteContact } from '@/data/actions/contact';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function Favorite({ contact }: { contact: Contact }) {
  const favoriteContactById = favoriteContact.bind(null, contact.id, contact.favorite);
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(contact.favorite);
  const [, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite);
      await favoriteContactById();
    });
  };

  return (
    <form action={favoriteContactById} onSubmit={onSubmit}>
      <button
        type="submit"
        className={cn(
          optimisticFavorite ? 'text-yellow-500' : 'text-gray-dark',
          'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
        )}
        aria-label={optimisticFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {optimisticFavorite ? '★' : '☆'}
      </button>
      <input type="hidden" name="favorite" value={optimisticFavorite.toString()} />
    </form>
  );
}
