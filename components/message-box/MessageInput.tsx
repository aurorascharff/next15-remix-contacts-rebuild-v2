'use client';

import React, { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { submitMessage } from '@/data/actions/submitMessage';
import Button from '../ui/Button';
import type { OptimisticMessage } from './Messages';

type Props = {
  contactId: string;
  userId: string;
  addOptimisticMessage: (_message: OptimisticMessage) => void;
};

export default function MessageInput({ contactId, userId, addOptimisticMessage }: Props) {
  const [state, submitMessageAction] = useActionState(submitMessage, {
    success: false,
  });

  const [defaultValue, setDefaultValue] = useState(state.content);
  const formRef = useRef<HTMLFormElement>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.content) {
      setDefaultValue(state.content);
    }
  }, [state.content, state.error, state.timestamp]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDefaultValue('');
    startTransition(async () => {
      addOptimisticMessage({
        contactId,
        content: e.currentTarget.content.value,
        createdAt: new Date(),
        createdById: userId,
        id: uuidv4(),
      });
      await submitMessageAction(new FormData(e.currentTarget));
      formRef.current?.reset();
    });
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        action={submitMessageAction}
        className="flex flex-row items-end gap-2 p-3"
      >
        <input
          autoComplete="off"
          defaultValue={defaultValue}
          required
          minLength={1}
          name="content"
          className="italic shadow-none hover:shadow-none"
          placeholder="Type a message..."
        />
        <input type="hidden" name="contactId" value={contactId} />
        <Button type="submit">Send</Button>
      </form>
      {state.error && <noscript className="px-6 pb-3 text-end text-red-600">{state.error}</noscript>}
    </>
  );
}
