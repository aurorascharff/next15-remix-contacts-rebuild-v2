'use client';

import React from 'react';
import SubmitButton from '@/components/ui/SubmitButton';
import { deleteContact } from '@/data/actions/contact';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const deleteContactById = deleteContact.bind(null, contactId);

  return (
    <form
      action={async () => {
        const response = confirm('Please confirm you want to delete this record.');
        if (response) {
          await deleteContactById();
        }
      }}
    >
      <SubmitButton theme="destroy">Delete</SubmitButton>
    </form>
  );
}
