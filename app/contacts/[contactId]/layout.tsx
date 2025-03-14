import React from 'react';
import MessageBox from '@/components/message-box/MessageBox';
import { routes } from '@/validations/routeSchema';

type Props = {
  children: React.ReactNode;
  params: Promise<unknown>;
};

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
