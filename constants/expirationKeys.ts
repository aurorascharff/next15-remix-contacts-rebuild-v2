export const expirationKeys = {
  contact: (contactId: string) => {
    return `contact-${contactId}`;
  },
  contacts: 'contacts',
} as const;
