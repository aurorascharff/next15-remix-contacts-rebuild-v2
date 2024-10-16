'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import type { ContactSchemaType, ContactSchemaErrorType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';

export async function createEmptyContact() {
  const contact = await prisma.contact.create({
    data: {},
  });
  revalidatePath(routes.home());
  redirect(routes.contactIdEdit({ contactId: contact.id }));
}

type State = {
  data?: ContactSchemaType;
  errors?: ContactSchemaErrorType;
};

export async function updateContact(contactId: string, _prevState: State, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      data: data as ContactSchemaType,
      errors: result.error.formErrors,
    };
  }

  await prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });

  revalidatePath(routes.home());
  revalidateTag('contact');
  redirect(routes.contactId({ contactId }));
}

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });
  revalidateTag('contact');
  revalidatePath(routes.home());
}

export async function deleteContact(contactId: string) {
  await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });

  revalidatePath(routes.home());
  redirect(routes.home());
}
