'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';
import { prisma } from '../../db';

export async function updateContact(contactId: string, formData: FormData) {
  invariant(contactId, 'Missing contactId param');
  const updates = Object.fromEntries(formData);
  await prisma.contact.update({
    data: updates,
    where: {
      id: contactId,
    },
  });
  revalidatePath(`/contacts/${contactId}`);
  redirect(`/contacts/${contactId}`);
}
