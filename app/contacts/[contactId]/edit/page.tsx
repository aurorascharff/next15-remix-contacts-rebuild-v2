import { getContact } from '@/data/services/contact';
import { routes } from '@/validations/routeSchema';
import { ContactMetadata } from '../_components/ContactMetadata';
import ContactForm from './_components/ContactForm';

type PageProps = {
  params: Promise<unknown>;
};

export default async function EditContactPage({ params }: PageProps) {
  const { contactId } = routes.contactIdEdit.$parseParams(await params);
  const contact = await getContact(contactId);

  return (
    <>
      <ContactMetadata contact={contact} />
      <ContactForm contact={contact} />
    </>
  );
}
