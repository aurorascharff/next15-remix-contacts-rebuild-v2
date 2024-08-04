import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

export const button = cva('button', {
  defaultVariants: {
    theme: 'primary',
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
        'm-0 w-fit rounded-lg border-none px-3 py-2 font-medium active:shadow-xs active:enabled:translate-y-px disabled:translate-y-px disabled:shadow-xs',
      )}
    >
      {children}
    </button>
  );
}
