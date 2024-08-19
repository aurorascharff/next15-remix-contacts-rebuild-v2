import React, { Suspense } from 'react';
import { getContact } from '@/lib/services/getContact';
import { getCurrentUser } from '@/lib/services/getCurrentUser';
import { getMessages } from '@/lib/services/getMessages';
import Skeleton from '../ui/Skeleton';
import Messages from './Messages';

type Props = {
  contactId: string;
};

export default async function MessageBox({ contactId }: Props) {
  const contact = getContact(contactId);
  const messages = getMessages(contactId);
  const user = getCurrentUser();

  return (
    <details className="group flex flex-col rounded-t-lg border border-gray bg-white shadow-xl">
      <summary className="flex items-center justify-between gap-4 rounded-t-lg border-b border-gray bg-white px-4 py-1 text-lg font-bold text-primary hover:bg-gray-light group-open:rounded-b-none group-open:py-3">
        Messages
        <div className="transform transition-transform group-open:rotate-180">
          <span className="flex text-2xl group-open:hidden">+</span>
          <span className="hidden text-2xl group-open:flex">-</span>
        </div>
      </summary>
      <div className="grid w-full group-open:min-w-[320px] sm:group-open:w-[380px]">
        <Suspense fallback={<Skeleton className="h-[384px] p-4" />}>
          <Messages contactPromise={contact} userPromise={user} messagesPromise={messages} />
        </Suspense>
      </div>
    </details>
  );
}
