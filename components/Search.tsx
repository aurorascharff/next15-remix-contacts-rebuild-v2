'use client';

import Form from 'next/form';
import React from 'react';
import { useSafeSearchParams } from '@/validations/routeSchema';
import SearchStatus from './ui/SearchStatus';

export default function Search() {
  const { q } = useSafeSearchParams('home');

  return (
    <Form action="" role="search">
      <input
        className="w-full pl-8 outline-offset-1"
        defaultValue={q}
        aria-label="Search contacts"
        name="q"
        placeholder="Search"
        type="search"
      />
      <SearchStatus />
    </Form>
  );
}
