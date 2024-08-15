'use client';

import { notFound } from 'next/navigation';
import React, { createContext, useOptimistic } from 'react';
import type { Contact } from '@prisma/client';
import type { Dispatch } from 'react';

type ContactsContextType = {
  optimisticContacts: Contact[];
  setOptimisticContacts: Dispatch<{ type: 'add' | 'remove' | 'update'; payload: Contact }>;
  getOptimisticContact: (_id: string) => Contact;
};

export const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

function contactsReducer(state: Contact[], action: { type: 'add' | 'remove' | 'update'; payload: Contact }): Contact[] {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(contact => {
        return contact.id !== action.payload.id;
      });
    case 'update':
      return state.map(contact => {
        return contact.id === action.payload.id ? { ...contact, ...action.payload } : contact;
      });
    default:
      return state;
  }
}

export default function ContactsProvider({ children, contacts }: { children: React.ReactNode; contacts: Contact[] }) {
  const [optimisticContacts, setOptimisticContacts] = useOptimistic(contacts, contactsReducer);

  function getOptimisticContact(id: string) {
    const contact = optimisticContacts.find(c => {
      return c.id === id;
    });
    if (!contact) {
      notFound();
    }
    return contact;
  }

  return (
    <ContactsContext.Provider value={{ getOptimisticContact, optimisticContacts, setOptimisticContacts }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = React.useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
}
