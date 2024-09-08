'use client';

import React, { useTransition } from 'react';
import SubmitButton from '@/components/ui/SubmitButton';
import { deleteContact } from '@/data/actions/deleteContact';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const deleteContactById = deleteContact.bind(null, contactId);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={deleteContactById}
      onSubmit={e => {
        e.preventDefault();
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(async () => {
          await deleteContactById();
        });
      }}
    >
      <SubmitButton loading={isPending} theme="destroy">
        Delete
      </SubmitButton>
    </form>
  );
}
