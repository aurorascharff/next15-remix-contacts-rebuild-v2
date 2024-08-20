import 'server-only';

import { prisma } from '@/db';

export async function getCurrentUser() {
  const users = await prisma.user.findMany();
  return users[Math.floor(Math.random() * 2)];
}
