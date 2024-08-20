'use client';

import React, { use, useOptimistic } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AutomaticScroller from '../AutomaticScroller';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import type { Contact, Message, User } from '@prisma/client';

type Props = {
  contactPromise: Promise<Contact>;
  messagesPromise: Promise<Message[]>;
  userPromise: Promise<User>;
};

export type OptimisticMessage = Message & {
  isSending?: boolean;
};

export default function Messages({ contactPromise, messagesPromise, userPromise }: Props) {
  const messages = use(messagesPromise);
  const user = use(userPromise);
  const contact = use(contactPromise);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currMessages: OptimisticMessage[], newMessage: OptimisticMessage) => {
      return [
        ...currMessages,
        {
          ...newMessage,
          isSending: true,
        },
      ];
    },
  );

  return (
    <div className="grid w-full group-open:min-w-[320px] sm:group-open:w-[380px]">
      <AutomaticScroller className="grid h-80 content-start gap-4 overflow-auto border-b border-gray p-4">
        {optimisticMessages.length === 0 && <span className="text-center text-gray-dark">No messages</span>}
        {optimisticMessages.map(message => {
          return (
            <MessageDisplay
              createdByName={contact.first || 'Unnamed'}
              key={message.id}
              message={message}
              userId={user.id}
            />
          );
        })}
      </AutomaticScroller>
      <ErrorBoundary fallback={<p className="pb px-6 py-8 text-end">⚠️Something went wrong</p>}>
        <MessageInput addOptimisticMessage={addOptimisticMessage} contactId={contact.id} userId={user.id} />
      </ErrorBoundary>
    </div>
  );
}
