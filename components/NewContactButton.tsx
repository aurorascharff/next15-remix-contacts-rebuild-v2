'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { routes } from '@/validations/routeSchema';
import SubmitButton from './ui/SubmitButton';

export default function NewContactButton() {
  const [isPending, setIsPending] = useState(false);
  const [, setIsError] = useState(false);
  const router = useRouter();

  return (
    <SubmitButton
      loading={isPending}
      disabled={isPending}
      theme="secondary"
      onClick={async () => {
        setIsPending(true);
        const res = await fetch('/api/contacts', {
          method: 'POST',
        });
        setIsPending(false);
        if (!res.ok) {
          setIsError(true);
        } else {
          const contactId = await res.json();
          router.push(routes.contactIdEdit({ contactId }));
          router.refresh();
        }
      }}
      type="submit"
    >
      New
    </SubmitButton>
  );
}
