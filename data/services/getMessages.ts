import 'server-only';

import { prisma } from '@/db';

export async function getMessages(contactId?: string) {
  return prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
    where: {
      contactId,
    },
  });
}
