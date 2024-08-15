import { routes } from '@/validations/routeSchema';
import Contact from './_components/Contact';

type PageProps = {
  params: unknown;
};

export default async function ContactPage({ params }: PageProps) {
  const { contactId } = routes.contactId.$parseParams(params);

  return <Contact contactId={contactId} />;
}
