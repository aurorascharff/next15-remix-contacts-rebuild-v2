import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';

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
