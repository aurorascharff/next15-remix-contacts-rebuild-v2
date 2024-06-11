'use client';

import React, { useTransition } from 'react';
import { createEmptyContact } from '@/lib/actions/createEmptyContact';
import Button from './ui/Button';

export default function NewContactButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      theme="secondary"
      onClick={() => {
        startTransition(async () => {
          await createEmptyContact();
        });
      }}
      disabled={isPending}
      type="submit"
    >
      {isPending ? 'Creating...' : 'New'}
    </Button>
  );
}
