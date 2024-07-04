import React from 'react';

type Props = {
  className?: string;
  [otherProps: string]: unknown;
};

export function SearchIcon({ className, ...otherProps }: Props) {
  return (
    <svg
      {...otherProps}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
