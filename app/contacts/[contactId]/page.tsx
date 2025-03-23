'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LinkButton from '@/components/ui/LinkButton';
import Skeleton from '@/components/ui/Skeleton';
import { routes, useSafeParams } from '@/validations/routeSchema';
import DeleteContactButton from './_components/DeleteContactButton';
import Favorite from './_components/Favorite';
import type { Contact } from '@prisma/client';

export default function ContactPage() {
  const { contactId } = useSafeParams('contactId');
  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchContact() {
      setIsLoading(true);
      const response = await fetch(`/api/contacts/${contactId}`);
      if (!response.ok) {
        setIsLoading(false);
        return setError('⚠️ Failed to fetch contact');
      }
      const data = await response.json();
      setContact(data);
      setIsLoading(false);
    }
    fetchContact();
  }, [contactId]);

  return isLoading ? (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="mr-8 h-48 w-48 rounded-3xl bg-gray" />
      <Skeleton className="max-w-[250px]" />
    </div>
  ) : error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <div className="flex flex-col gap-4 lg:flex-row">
      {contact?.avatar && (
        <div className="flex-shrink-0">
          <Image
            priority
            width={192}
            height={192}
            className="mr-8 rounded-3xl bg-gray object-cover"
            alt={`${contact?.first} ${contact?.last} avatar`}
            key={contact?.avatar}
            src={contact?.avatar}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="flex-start flex gap-4 text-3xl font-bold">
          {contact?.first || contact?.last ? (
            <>
              {contact?.first} {contact?.last}
            </>
          ) : (
            <i>No Name</i>
          )}
          {contact && <Favorite contact={contact} />}
        </h1>
        {contact?.twitter && (
          <p className="text-2xl text-primary">
            <a className="text-primary no-underline hover:underline" href={`https://twitter.com/${contact?.twitter}`}>
              {contact?.twitter}
            </a>
          </p>
        )}
        {contact?.notes && <div className="max-h-[300px] w-full overflow-auto 2xl:w-1/2">{contact?.notes}</div>}
        <div className="my-4 flex gap-2">
          <LinkButton prefetch={true} theme="secondary" href={routes.contactIdEdit({ contactId })}>
            Edit
          </LinkButton>
          <DeleteContactButton contactId={contactId} />
        </div>
      </div>
    </div>
  );
}
