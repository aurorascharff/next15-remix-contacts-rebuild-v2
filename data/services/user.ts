import 'server-only';

import { prisma } from '@/db';

export async function getCurrentUser() {
  const users = await prisma.user.findMany();
  return users.length > 0
    ? users[0]
    : {
        id: '1',
        name: 'Anonymous',
      };
}
