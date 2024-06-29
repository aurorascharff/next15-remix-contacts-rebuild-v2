'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import type { ContactSchemaErrorType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';

type State = {
  success?: boolean;
  data?: Record<string, string>;
  errors?: ContactSchemaErrorType;
};

export async function updateContact(contactId: string, _prevState: State, formData: FormData): Promise<State> {
  const contact: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      contact[key] = value;
    }
  });
  const result = contactSchema.safeParse(contact);

  if (!result.success) {
    return {
      data: contact,
      errors: result.error.formErrors,
      success: false,
    };
  }

  await prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });

  revalidatePath('/');
  redirect(`/contacts/${contactId}`);
}
