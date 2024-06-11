'use client';

import React from 'react';
import LinkButton from '@/components/ui/LinkButton';
import SubmitButton from '@/components/ui/SubmitButton';
import { updateContact } from '@/lib/actions/updateContact';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const updateContactById = updateContact.bind(null, contact.id);

  return (
    <form className="flex max-w-[40rem] flex-col gap-4" action={updateContactById}>
      <div className="grip-rows-5 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_4fr]">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <input
            defaultValue={contact.first || undefined}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <input
            aria-label="Last name"
            defaultValue={contact.last || undefined}
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="github">Twitter</label>
        <input defaultValue={contact.twitter || undefined} name="twitter" placeholder="@jack" type="text" />
        <label htmlFor="avatar">Avatar URL</label>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar || undefined}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <textarea className="grow" defaultValue={contact.notes || undefined} name="notes" rows={6} />
      </div>
      <div className="flex gap-2 self-end">
        <LinkButton theme="secondary" href={`/contacts/${contact.id}`}>
          Cancel
        </LinkButton>
        <SubmitButton theme="primary">Save</SubmitButton>
      </div>
    </form>
  );
}
