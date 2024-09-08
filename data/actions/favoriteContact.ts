'use server';

import { prisma } from '@/db';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  return prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });
}
