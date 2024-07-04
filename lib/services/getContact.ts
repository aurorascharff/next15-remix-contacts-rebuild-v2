import 'server-only';

import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';

export const getContactDedupe = cache(async (contactId: string) => {
  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    notFound();
  }
  return contact;
});

export const getContact = unstable_cache(
  async (contactId: string) => {
    return getContactDedupe(contactId);
  },
  ['contact'],
  {
    tags: ['contact'],
  },
);
