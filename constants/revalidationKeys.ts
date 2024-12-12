export const revalidationKeys = {
  contact: (contactId: string) => {
    return `contact-${contactId}`;
  },
  contacts: 'contacts',
} as const;
