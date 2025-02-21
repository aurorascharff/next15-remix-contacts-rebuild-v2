import 'server-only';

import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '@/db';

export async function getMessages(contactId?: string) {
  'use cache';
  cacheTag(revalidationKeys.messages(contactId));

  return prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
    where: {
      contactId,
    },
  });
}
