import { cva } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/utils/cn';
import type { VariantProps } from 'class-variance-authority';
import type { LinkProps } from 'next/link';

const linkButton = cva('button', {
  defaultVariants: {
    theme: 'ghost',
  },
  variants: {
    theme: {
      destroy: ['bg-destroy text-white', 'hover:bg-destroy-dark active:bg-destroy-darker shadow-sm hover:shadow-md'],
      ghost: ['bg-transparent text-primary', 'hover:bg-gray-light active:bg-gray-lighter'],
      primary: ['bg-primary text-white', 'hover:bg-primary-dark active:bg-primary-darker shadow-sm hover:shadow-md'],
      secondary: ['bg-white text-primary', 'hover:bg-gray-light active:bg-gray-lighter shadow-sm hover:shadow-md'],
    },
  },
});

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function LinkButton({
  children,
  href,
  theme,
  className,
  ...otherProps
}: Props & LinkProps & VariantProps<typeof linkButton>) {
  return (
    <Link
      {...otherProps}
      href={href}
      className={cn(
        linkButton({ className, theme }),
        'm-0 w-fit rounded-lg border-none px-3 py-2 font-medium no-underline active:shadow-xs',
      )}
    >
      {children}
    </Link>
  );
}
