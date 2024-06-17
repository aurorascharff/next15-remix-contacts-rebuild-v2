'use server';

import { revalidateTag } from 'next/cache';
import { prisma } from '../../db';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });

  revalidateTag('contact');
  revalidateTag('contacts');
}
