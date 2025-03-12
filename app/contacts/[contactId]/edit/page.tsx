'use client';

import { useState, useEffect } from 'react';
import Skeleton from '@/components/ui/Skeleton';
import { useSafeParams } from '@/validations/routeSchema';
import ContactForm from './_components/ContactForm';
import type { Contact } from '@prisma/client';

export default function EditContactPage() {
  const { contactId } = useSafeParams('contactIdEdit');
  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      setIsLoading(true);
      const response = await fetch(`/api/contacts/${contactId}`);
      if (!response.ok) {
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setContact(data);
      setIsLoading(false);
    }
    fetchContact();
  }, [contactId]);

  return isLoading ? (
    <div className="flex max-w-[40rem] flex-col gap-4 @container">
      <div className="grip-rows-5 grid max-w-[40rem] gap-4 @sm:grid-cols-[1fr_4fr]">
        <div className="hidden flex-col gap-[72px] @sm:flex @sm:gap-8">
          <span className="flex">Name</span>
          <span>Twitter</span>
          <span>Avatar URL</span>
          <span>Notes</span>
        </div>
        <Skeleton />
      </div>
    </div>
  ) : (
    <ContactForm contact={contact} />
  );
}
