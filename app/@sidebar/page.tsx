import React from 'react';
import ContactList from '@/components/ContactList';
import { getContacts } from '@/data/services/contact';
import { routes } from '@/validations/routeSchema';

type PageProps = {
  searchParams: unknown;
};

export default async function SidebarPage({ searchParams }: PageProps) {
  const { q } = routes.home.$parseSearchParams(await searchParams);
  console.log('page', q);
  const contacts = await getContacts(q);

  return <ContactList contacts={contacts} />;
}
