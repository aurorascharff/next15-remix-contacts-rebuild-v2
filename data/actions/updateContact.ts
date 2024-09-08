'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import type { ContactSchemaErrorType, ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';

type State = {
  data?: ContactSchemaType;
  errors?: ContactSchemaErrorType;
};

export async function updateContact(contactId: string, _prevState: State, formData: FormData): Promise<State> {
  const contact = Object.fromEntries(formData);
  const result = contactSchema.safeParse(contact);

  if (!result.success) {
    return {
      data: contact as ContactSchemaType,
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
