'use client';

import Image from 'next/image';
import React, { useOptimistic } from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LinkButton from '@/components/ui/LinkButton';
import SubmitButton from '@/components/ui/SubmitButton';
import useDeleteContact from '@/hooks/useDeleteContact';
import useFavoriteContact from '@/hooks/useFavoriteContact';
import useGetContact from '@/hooks/useGetContact';
import { cn } from '@/utils/cn';
import { routes } from '@/validations/routeSchema';

export default function Contact({ contactId }: { contactId: string }) {
  const { contact } = useGetContact(contactId);
  const { mutate: deleteContact, isPending } = useDeleteContact();
  const { mutate: favoriteContact } = useFavoriteContact();
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(contact?.favorite || false);
  if (!contact) {
    return <ErrorMessage>Could not find contact!</ErrorMessage>;
  }

  const metadata =
    contact && contact.first && contact.last
      ? {
          description: `Contact details for ${contact.first} ${contact.last}`,
          title: `${contact.first} ${contact.last}`,
        }
      : {
          description: 'Contact details for an unnamed contact',
          title: 'Unnamed Contact',
        };

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div>
          {contact.avatar && (
            <Image
              width={192}
              height={192}
              className="mr-8 rounded-3xl bg-gray object-cover"
              alt={`${contact.first} ${contact.last} avatar`}
              key={contact.avatar}
              src={contact.avatar}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="flex-start flex gap-4 text-3xl font-bold">
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{' '}
            <form
              action={() => {
                addOptimisticFavorite(!optimisticFavorite);
                favoriteContact(contact);
              }}
            >
              <button
                type="submit"
                className={cn(
                  optimisticFavorite ? 'text-yellow-500' : 'text-gray-dark',
                  'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
                )}
                aria-label={optimisticFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {optimisticFavorite ? '★' : '☆'}
              </button>
            </form>
          </h1>

          {contact.twitter ? (
            <p className="text-2xl text-primary">
              <a className="text-primary no-underline hover:underline" href={`https://twitter.com/${contact.twitter}`}>
                {contact.twitter}
              </a>
            </p>
          ) : null}

          {contact.notes ? <p>{contact.notes}</p> : null}

          <div className="my-4 flex gap-2">
            <LinkButton theme="secondary" href={routes.contactIdEdit({ contactId: contact.id })}>
              Edit
            </LinkButton>
            <SubmitButton
              loading={isPending}
              onClick={() => {
                const response = confirm('Please confirm you want to delete this record.');
                if (!response) {
                  return;
                }
                deleteContact(contact.id);
              }}
              theme="destroy"
            >
              Delete
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
}
