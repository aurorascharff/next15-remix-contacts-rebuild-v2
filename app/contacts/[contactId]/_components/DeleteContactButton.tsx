'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SubmitButton from '@/components/ui/SubmitButton';
import { routes } from '@/validations/routeSchema';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  return (
    <SubmitButton
      theme="destroy"
      loading={isPending}
      onClick={async () => {
        const response = confirm('Please confirm you want to delete this record.');
        if (response) {
          setIsPending(true);
          const res = await fetch(`/api/contacts/${contactId}`, {
            method: 'DELETE',
          });
          setIsPending(false);
          if (!res.ok) {
            throw new Error('Failed to delete contact');
          }
          router.push(routes.home());
          router.refresh();
        }
      }}
    >
      Delete
    </SubmitButton>
  );
}
