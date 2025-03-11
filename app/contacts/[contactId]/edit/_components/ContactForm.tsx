'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import SubmitButton from '@/components/ui/SubmitButton';
import TextArea from '@/components/ui/TextArea';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    avatar: undefined,
    first: undefined,
    last: undefined,
    notes: undefined,
    twitter: undefined,
  });
  const [data, setData] = useState({
    avatar: contact.avatar,
    first: contact.first,
    last: contact.last,
    notes: contact.notes,
    twitter: contact.twitter,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const result = await fetch(`/api/contacts/${contact.id}`, {
      body: new FormData(event.currentTarget),
      method: 'PUT',
    });
    setIsPending(false);
    if (!result.ok) {
      setError('Failed to update contact');
    } else if (result.status === 422) {
      const data = await result.json();
      setErrors(data.errors);
      setData(data.data);
    } else if (result.status === 200) {
      router.refresh();
      router.push(routes.contactId({ contactId: contact.id }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[40rem] flex-col gap-4 @container">
      <div className="grip-rows-5 grid gap-2 @sm:grid-cols-[1fr_4fr] @sm:gap-4">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <Input
            errors={errors?.first}
            defaultValue={data?.first || undefined}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <Input
            errors={errors?.last}
            aria-label="Last name"
            defaultValue={data?.last || undefined}
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="twitter">Twitter</label>
        <Input
          errors={errors?.twitter}
          defaultValue={data?.twitter || undefined}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          errors={errors?.avatar}
          defaultValue={data?.avatar || undefined}
          name="avatar"
          placeholder="https://sessionize.com/image/example.jpg"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <TextArea
          errors={errors?.notes}
          className="grow"
          defaultValue={data?.notes || undefined}
          name="notes"
          rows={6}
        />
      </div>
      <div className="flex gap-2 self-start @sm:self-end">
        <LinkButton theme="secondary" href={routes.contactId({ contactId: contact.id })}>
          Cancel
        </LinkButton>
        <SubmitButton loading={isPending} type="submit" theme="primary">
          Save
        </SubmitButton>
      </div>
      {error && <p className="self-end text-red-500">{error}</p>}
    </form>
  );
}
