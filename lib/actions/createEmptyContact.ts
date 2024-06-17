'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../../db';

export async function createEmptyContact() {
  const contact = await prisma.contact.create({
    data: {},
  });
  revalidateTag('contacts');
  redirect(`/contacts/${contact.id}/edit`);
}
