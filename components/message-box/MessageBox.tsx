import React, { Suspense } from 'react';
import { getCurrentUser } from '@/lib/services/getCurrentUser';
import { getMessages } from '@/lib/services/getMessages';
import Skeleton from '../ui/Skeleton';
import Messages from './Messages';
import type { Contact } from '@prisma/client';

type Props = {
  contactPromise: Promise<Contact>;
};

export default async function MessageBox({ contactPromise }: Props) {
  const contact = await contactPromise;
  const messages = getMessages(contact.id);
  const user = getCurrentUser();

  return (
    <details className="group flex flex-col rounded-xl border border-gray bg-white shadow-xl">
      <summary className="flex items-center justify-between gap-4 rounded-b-xl rounded-t-xl border-b border-gray bg-white px-4 py-1 text-lg font-bold text-primary hover:bg-gray-light group-open:rounded-b-none group-open:py-3">
        Messages
        <div className="transform transition-transform group-open:rotate-180">
          <span className="flex text-2xl group-open:hidden">+</span>
          <span className="hidden text-2xl group-open:flex">-</span>
        </div>
      </summary>
      <Suspense fallback={<Skeleton />}>
        <Messages contact={contact} userPromise={user} messagesPromise={messages} />
      </Suspense>
    </details>
  );
}
