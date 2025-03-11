import { NextResponse } from 'next/server';
import { prisma } from '@/db';

export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });

  return NextResponse.json(contacts, { status: 200 });
}

export async function POST() {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  const contact = await prisma.contact.create({
    data: {},
  });

  return NextResponse.json(contact.id, { status: 200 });
}
