import 'server-only';

import { prisma } from '@/db';

export async function getContact(contactId: string) {
  console.log('getContact', contactId);
  // TODO
}

export async function getContacts() {
  return prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });
}
