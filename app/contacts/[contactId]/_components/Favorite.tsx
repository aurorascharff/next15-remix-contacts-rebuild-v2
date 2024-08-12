'use client';

import React, { useTransition } from 'react';
import { favoriteContact } from '@/lib/actions/favoriteContact';
import { useContacts } from '@/providers/ContactsProvider';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function Favorite({ contact }: { contact: Contact }) {
  const favoriteContactById = favoriteContact.bind(null, contact.id, contact.favorite);
  const { getOptimisticContact, setOptimisticContacts } = useContacts();
  const [, startTransition] = useTransition();
  const optimisticFavorite = getOptimisticContact(contact.id).favorite;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      setOptimisticContacts({ payload: { ...contact, favorite: !optimisticFavorite }, type: 'update' });
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
    </form>
  );
}
