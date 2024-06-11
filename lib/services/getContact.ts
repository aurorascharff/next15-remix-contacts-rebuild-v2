import 'server-only';

import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';
import { prisma } from '../../db';

export async function getContact(contactId: string) {
  invariant(contactId, 'Missing contactId param');
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
