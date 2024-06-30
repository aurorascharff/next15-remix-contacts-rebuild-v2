'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useDeferredValue, useState, useTransition } from 'react';
import { SearchIcon, SpinnerIcon } from './ui/icons';

export default function Search() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const searching = (query && query !== deferredQuery) || isPending;

  return (
    <form role="search">
      <input
        className="w-full pl-8 outline-offset-1"
        onChange={e => {
          const isFirstSearch = query === null;
          setQuery(e.target.value);
          startTransition(() => {
            isFirstSearch
              ? router.push(`${pathName}?q=${e.target.value}`)
              : router.replace(`${pathName}?q=${e.target.value}`);
          });
        }}
        defaultValue={query}
        aria-label="Search contacts"
        name="q"
        placeholder="Search"
        type="search"
      />
      <div aria-hidden className="absolute left-10 top-7">
        {searching ? (
          <div className="h-fit w-fit animate-spin">
            <SpinnerIcon width={16} height={16} className="text-gray-dark" />
          </div>
        ) : (
          <SearchIcon width={16} height={16} className="text-gray-dark" />
        )}
      </div>
    </form>
  );
}
