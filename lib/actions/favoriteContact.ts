'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@/db';
import { routes } from '@/validations/routeSchema';

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
  revalidatePath(routes.home());
}
