import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';

// The function getContact is called multiple times in the same render. Therefore, it has been per-render cached with React cache.
export const getContact = cache(async (contactId: string) => {
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

export async function getContacts(query?: string) {
  return prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
    where: {
      OR: [{ first: { contains: query } }, { last: { contains: query } }],
    },
  });
}
