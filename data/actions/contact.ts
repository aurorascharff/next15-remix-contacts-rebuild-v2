'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import type { ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';

export async function createEmptyContact() {
  const contact = await prisma.contact.create({
    data: {},
  });
  redirect(routes.contactIdEdit({ contactId: contact.id }));
}

export async function updateContact(contactId: string, data: ContactSchemaType) {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      data,
      error: 'Invalid form data!',
    };
  }

  await prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });

  redirect(routes.contactId({ contactId }));
}

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });
  revalidatePath(routes.home());
}

export async function deleteContact(contactId: string) {
  await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });

  redirect(routes.home());
}
