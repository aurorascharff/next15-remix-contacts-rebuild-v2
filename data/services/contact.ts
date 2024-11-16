import 'server-only';

import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { expirationKeys } from '@/constants/expirationKeys';
import { prisma } from '@/db';

export const getContact = cache(async (contactId: string) => {
  'use cache';
  cacheTag(expirationKeys.contact(contactId));

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

export async function getContacts() {
  'use cache';
  cacheTag(expirationKeys.contacts);

  return prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });
}
