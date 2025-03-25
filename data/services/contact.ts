import 'server-only';

import { notFound } from 'next/navigation';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export const getContact = async (contactId: string) => {
  await slow();
  console.log('getContact', contactId);

  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!contact) {
    notFound();
  }

  return contact;
};

export async function getContacts() {
  await slow();

  return prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });
}
