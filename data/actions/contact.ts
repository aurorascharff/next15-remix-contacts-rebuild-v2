'use server';

import { prisma } from '@/db';
import type { ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';

export async function createEmptyContact() {
  return prisma.contact.create({
    data: {},
  });
}

export async function updateContact(contactId: string, data: ContactSchemaType) {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Invalid form data');
  }

  return prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });
}

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

export async function deleteContact(contactId: string) {
  return prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
}
