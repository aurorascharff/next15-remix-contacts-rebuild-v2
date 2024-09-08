'use server';

import { prisma } from '@/db';

export async function createEmptyContact() {
  return prisma.contact.create({
    data: {},
  });
}
