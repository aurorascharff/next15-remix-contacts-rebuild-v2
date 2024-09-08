'use server';

import { prisma } from '@/db';
import type { ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';

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
