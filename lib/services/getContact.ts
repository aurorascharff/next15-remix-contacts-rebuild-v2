import 'server-only';

import { notFound } from 'next/navigation';
import { prisma } from '@/db';

export async function getContact(contactId: string) {
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
