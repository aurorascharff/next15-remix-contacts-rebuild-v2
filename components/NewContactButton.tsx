'use client';

import React from 'react';
import useCreateEmptyContact from '@/hooks/useCreateEmptyContact';
import SubmitButton from './ui/SubmitButton';

export default function NewContactButton() {
  const { mutate: createEmptyContact, status } = useCreateEmptyContact();

  return (
    <SubmitButton
      loading={status === 'pending'}
      theme="secondary"
      onClick={() => {
        createEmptyContact();
      }}
    >
      New
    </SubmitButton>
  );
}
