'use server';

import { prisma } from '@/db';

export async function deleteContact(contactId: string) {
  return prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
}
