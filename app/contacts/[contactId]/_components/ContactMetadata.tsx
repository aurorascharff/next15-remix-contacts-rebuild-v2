import type { Contact } from '@prisma/client';

export function ContactMetadata({ contact }: { contact: Contact }) {
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
      <meta property="og:image" content={contact.avatar || undefined} />
    </>
  );
}
