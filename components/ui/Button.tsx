import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

const shadow = 'shadow-sm active:enabled:shadow-xs disabled:shadow-xs';

export const button = cva('button', {
  defaultVariants: {
    theme: 'primary',
  },
  variants: {
    theme: {
      destroy: ['bg-destroy', 'text-white', 'hover:enabled:bg-destroy-dark', 'disabled:bg-gray-dark', shadow],
      ghost: ['bg-transparent', 'text-primary', 'hover:enabled:bg-gray-light', 'disabled:text-gray-dark'],
      primary: ['bg-primary', 'text-white', 'hover:enabled:bg-primary-dark', 'disabled:bg-gray-dark', shadow],
      secondary: ['bg-white', 'text-primary', 'hover:enabled:bg-gray-light', 'disabled:text-gray-dark', shadow],
    },
  },
});

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  type,
  theme,
  className,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement> & VariantProps<typeof button>) {
  return (
    <button
      {...otherProps}
      type={type}
      className={cn(
        button({ className, theme }),
        'm-0 w-fit rounded-lg border-none px-3 py-2 font-medium active:enabled:translate-y-px disabled:translate-y-px',
      )}
    >
      {children}
    </button>
  );
}
