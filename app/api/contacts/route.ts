import { prisma } from '@/db';

export async function GET() {
  const contacts = await prisma.contact.findMany();

  const json = JSON.stringify(contacts);

  return new Response(json, {
    headers: {
      'content-type': 'application/json',
    },
  });
}
