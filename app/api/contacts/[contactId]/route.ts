import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { prisma } from '@/db';
import { contactSchema } from '@/validations/contactSchema';

import type { NextRequest } from 'next/server';

type Params = {
  params: Promise<{
    contactId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  const contactId = (await params).contactId;
  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    notFound();
  }

  return NextResponse.json(contact, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: Params) {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  const contactId = (await params).contactId;
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json(
      {
        data: data,
        errors: result.error.formErrors.fieldErrors,
      },
      {
        status: 422,
      },
    );
  }

  await prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });

  return NextResponse.json({ message: 'Contact updated' }, { status: 200 });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  const contactId = (await params).contactId;

  await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });

  return NextResponse.json({ message: 'Contact deleted' }, { status: 200 });
}
