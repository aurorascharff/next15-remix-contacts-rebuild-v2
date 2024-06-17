'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../../db';

export async function deleteContact(contactId: string) {
  await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
  revalidateTag('contacts');
  redirect('/');
}
