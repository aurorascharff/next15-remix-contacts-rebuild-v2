import 'server-only';

import { prisma } from '@/db';

export async function getContacts() {
  return prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });
}
