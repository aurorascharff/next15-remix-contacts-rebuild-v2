import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="grip-rows-6 grid max-w-[40rem] grid-cols-1 gap-4 sm:grid-cols-[1fr_4fr]">
      <div className="flex flex-col gap-[72px] sm:gap-8">
        <span className="flex">Name</span>
        <div>Twitter</div>
        <div>Avatar URL</div>
        <div>Notes</div>
      </div>
      <Skeleton className="hidden sm:block" />
    </div>
  );
}
