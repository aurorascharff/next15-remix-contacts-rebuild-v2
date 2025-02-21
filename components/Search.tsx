'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useSafeSearchParams } from '@/validations/routeSchema';
import SearchStatus from './ui/SearchStatus';

export default function Search() {
  const router = useRouter();
  const { q } = useSafeSearchParams('home');
  const [isPending, startTransition] = useTransition();

  return (
    <Form action="" role="search">
      <input
        className="w-full pl-8 outline-offset-1"
        onChange={e => {
          startTransition(() => {
            router.push(`?q=${e.target.value}`);
          });
        }}
        defaultValue={q}
        aria-label="Search contacts"
        name="q"
        placeholder="Search"
        type="search"
      />
      <SearchStatus searching={isPending} />
    </Form>
  );
}
