import React from 'react';
import { SearchIcon, SpinnerIcon } from './icons';

export default function SearchStatus({ isSearching = false }: { isSearching?: boolean }) {
  return (
    <div aria-hidden="true" className="absolute left-10 top-7">
      {isSearching ? (
        <div className="h-fit w-fit animate-spin">
          <SpinnerIcon width={16} height={16} className="text-gray-dark" />
        </div>
      ) : (
        <SearchIcon width={16} height={16} className="text-gray-dark" />
      )}
    </div>
  );
}
