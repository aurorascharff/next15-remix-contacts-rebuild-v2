'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useDeferredValue, useState } from 'react';
import { useSafeSearchParams } from '@/validations/routeSchema';
import { SearchIcon, SpinnerIcon } from './ui/icons';

export default function Search() {
  const router = useRouter();
  const pathName = usePathname();
  const { q } = useSafeSearchParams('home');
  const [query, setQuery] = useState(q);
  const deferredQuery = useDeferredValue(query);
  const searching = query !== deferredQuery;

  return (
    <form role="search">
      <input
        className="w-full pl-8 outline-offset-1"
        onChange={e => {
          setQuery(e.target.value);
          router.replace(`${pathName}?q=${e.target.value}`);
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
