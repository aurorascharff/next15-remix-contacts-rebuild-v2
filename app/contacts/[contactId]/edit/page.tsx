import { getContact } from '@/data/services/contact';
import { routes } from '@/validations/routeSchema';
import ContactForm from './_components/ContactForm';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<unknown>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { contactId } = routes.contactId.$parseParams(await params);
  const contact = await getContact(contactId);

  return contact && contact.first && contact.last
    ? {
        description: `Edit contact details for ${contact.first} ${contact.last}`,
        title: `Edit: ${contact.first} ${contact.last}`,
      }
    : {
        description: 'Edit contact details for an unnamed contact',
        title: 'Edit: Unnamed Contact',
      };
}

export default async function EditContactPage({ params }: PageProps) {
  const { contactId } = routes.contactIdEdit.$parseParams(await params);
  const contact = await getContact(contactId);

  return <ContactForm contact={contact} />;
}
