'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import type { ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';

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

  revalidatePath('/');
  revalidateTag('contact');
  redirect(`/contacts/${contactId}`);
}
