import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="@container flex max-w-[40rem] flex-col gap-4">
      <div className="grip-rows-6 @sm:grid-cols-[1fr_4fr] grid max-w-[40rem] grid-cols-1 gap-4">
        <div className="@sm:flex @sm:gap-8 hidden flex-col gap-[72px]">
          <span className="flex">Name</span>
          <div>Twitter</div>
          <div>Avatar URL</div>
          <div>Notes</div>
        </div>
        <Skeleton />
      </div>
    </div>
  );
}
