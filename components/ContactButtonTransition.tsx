'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function ContactButtonTransition({ contact }: { contact: Contact }) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${encodeURIComponent(contact.id)}`);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Link
      className={cn(
        isActive ? 'bg-primary text-white' : 'hover:bg-gray',
        isPending ? 'pending' : '',
        'flex w-full items-center justify-between gap-4 overflow-hidden whitespace-pre rounded-lg p-2 no-underline',
      )}
      href={`/contacts/${contact.id}`}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          router.push(`/contacts/${contact.id}`);
        });
      }}
    >
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i>No Name</i>
      )}{' '}
      {contact.favorite ? (
        <span className={cn('float-right', isActive ? 'text-white' : 'text-secondary')}>★</span>
      ) : null}
    </Link>
  );
}
