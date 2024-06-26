'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';

export async function createEmptyContact() {
  const contact = await prisma.contact.create({
    data: {},
  });
  revalidatePath('/');
  redirect(`/contacts/${contact.id}/edit`);
}
