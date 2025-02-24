import { routes } from '@/validations/routeSchema';
import Contact from './_components/Contact';

type PageProps = {
  params: Promise<unknown>;
  searchParams: Promise<unknown>;
};

export default async function ContactPage({ params }: PageProps) {
  const { contactId } = routes.contactId.$parseParams(await params);

  return <Contact contactId={contactId} />;
}
