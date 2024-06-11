'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';
import { prisma } from '../../db';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  invariant(contactId, 'Missing contactId param');
  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });
  revalidatePath('/');
}
