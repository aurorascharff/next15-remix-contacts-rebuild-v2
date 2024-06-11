import Link from 'next/link';
import React from 'react';
import { cn } from '@/utils/cn';
import type { LinkProps } from 'next/link';

type Props = {
  href: string;
  theme?: 'primary' | 'secondary' | 'destroy';
  children: React.ReactNode;
};

export default function LinkButton({ children, href, theme = 'primary', ...otherProps }: Props & LinkProps) {
  const colorClass =
    theme === 'secondary'
      ? 'bg-white text-primary'
      : theme === 'destroy'
        ? 'bg-destroy text-white'
        : 'bg-primary text-white';

  return (
    <Link
      {...otherProps}
      href={href}
      className={cn(
        colorClass,
        'm-0 rounded-lg border-none px-3 py-2 font-medium no-underline shadow-sm hover:shadow-md active:shadow-xs',
      )}
    >
      {children}
    </Link>
  );
}
