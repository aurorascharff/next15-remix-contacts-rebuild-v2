'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function Favorite({ contact }: { contact: Contact }) {
  const [isFavorite, setIsFavorite] = useState(contact.favorite);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    const res = await fetch(`/api/contacts/${contact.id}`, {
      body: new FormData(e.currentTarget),
      method: 'PUT',
    });
    if (!res.ok) {
      setIsFavorite(isFavorite);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <button
        type="submit"
        className={cn(
          isFavorite ? 'text-yellow-500' : 'text-gray-dark',
          'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
        )}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '★' : '☆'}
      </button>
      <input type="hidden" name="favorite" value={isFavorite.toString()} />
    </form>
  );
}
