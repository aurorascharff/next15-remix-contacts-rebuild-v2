'use client';

import React from 'react';
import { SpinnerIcon } from './icons';

type Props = {
  children: React.ReactNode;
  onReset?: () => void;
};

export default function ErrorMessage({ children, onReset }: Props) {
  return (
    <div className="flex justify-between rounded bg-destroy p-4 text-white">
      {children}
      {onReset && (
        <button onClick={onReset}>
          <SpinnerIcon width={20} height={20} />
        </button>
      )}
    </div>
  );
}
