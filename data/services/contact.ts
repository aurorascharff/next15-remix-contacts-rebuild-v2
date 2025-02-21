import 'server-only';

import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { notFound } from 'next/navigation';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '@/db';

export async function getContact(contactId: string) {
  'use cache';
  cacheTag(revalidationKeys.contact(contactId));
  cacheLife('minutes');

  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    notFound();
  }
  return contact;
}

export async function getContacts() {
  'use cache';
  cacheTag(revalidationKeys.contacts);
  cacheLife('minutes');

  return prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });
}
