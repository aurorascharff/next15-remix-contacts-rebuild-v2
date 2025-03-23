import { routes } from '@/validations/routeSchema';
import ContactForm from './_components/ContactForm';
import type { Contact } from '@prisma/client';

type PageProps = {
  params: Promise<unknown>;
};

export default async function EditContactPage({ params }: PageProps) {
  const { contactId } = routes.contactIdEdit.$parseParams(await params);
  const contact: Contact = {
    avatar: '',
    createdAt: new Date(),
    email: '',
    favorite: true,
    first: 'John',
    id: contactId,
    last: 'Doe',
    notes: 'This is a note.',
    twitter: '',
    updatedAt: new Date(),
  };

  return <ContactForm contact={contact} />;
}
