import { NextResponse } from 'next/server';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });

  return NextResponse.json(contacts, { status: 200 });
}

export async function POST() {
  await slow();

  const contact = await prisma.contact.create({
    data: {},
  });

  return NextResponse.json(contact.id, { status: 200 });
}
