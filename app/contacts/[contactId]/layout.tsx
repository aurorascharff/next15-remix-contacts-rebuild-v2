import React from 'react';
import MessageBox from '@/components/message-box/MessageBox';
import { getContact } from '@/data/services/contact';
import { routes } from '@/validations/routeSchema';
import type { PageProps } from '@/.next/types/app/page';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<unknown>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { contactId } = routes.contactId.$parseParams(await params);
  const contact = await getContact(contactId);

  return contact && contact.first && contact.last
    ? {
        description: `Contact details for ${contact.first} ${contact.last}`,
        title: `${contact.first} ${contact.last}`,
      }
    : {
        description: 'Contact details for an unnamed contact',
        title: 'Unnamed Contact',
      };
}

export default async function ContactsLayout({ children, params }: Props) {
  const { contactId } = routes.contactId.$parseParams(await params);

  return (
    <>
      {children}
      <div className="fixed bottom-0 right-8 ml-8">
        <MessageBox contactId={contactId} />
      </div>
    </>
  );
}
