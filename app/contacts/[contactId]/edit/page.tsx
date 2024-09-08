import { getContact } from '@/data/services/getContact';
import { routes } from '@/validations/routeSchema';
import ContactForm from './_components/ContactForm';

type PageProps = {
  params: unknown;
};

export default async function EditContactPage({ params }: PageProps) {
  const { contactId } = routes.contactIdEdit.$parseParams(params);
  const contact = await getContact(contactId);

  return <ContactForm contact={contact} />;
}
