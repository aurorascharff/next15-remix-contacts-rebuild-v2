import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { ContactSchemaErrorType, ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';

export async function deleteContact(contactId: string) {
  // throw new Error('Something went wrong');
  await slow();

  console.log('deleteContact', contactId);
  // TODO
}

export async function createEmptyContact() {
  await slow();

  const contact = await prisma.contact.create({
    data: {},
  });
  redirect(routes.contactIdEdit({ contactId: contact.id }));
}

export type State = {
  data?: ContactSchemaType;
  errors?: ContactSchemaErrorType;
};

export async function updateContact(contactId: string, formData: FormData) {
  await slow();

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

  redirect(routes.contactId({ contactId }));
}

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await slow();

  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });
  revalidatePath(routes.home());
}
