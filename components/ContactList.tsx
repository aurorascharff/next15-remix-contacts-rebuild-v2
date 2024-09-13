'use client';

import { matchSorter } from 'match-sorter';
import React from 'react';
import { useContacts } from '@/providers/ContactsProvider';
import { useSafeSearchParams } from '@/validations/routeSchema';
import ContactButton from './ContactButton';

export default function ContactList() {
  const { optimisticContacts } = useContacts();
  const { q } = useSafeSearchParams('home');

  const filteredContacts = q
    ? matchSorter(optimisticContacts, q, {
        keys: ['first', 'last'],
      })
    : optimisticContacts;

  return (
    <nav className="min-h-48 flex-1 overflow-auto px-8 py-4">
      {filteredContacts.length ? (
        <ul>
          {filteredContacts.map(contact => {
            return (
              <li key={contact.id} className="mx-1">
                <ContactButton contact={contact} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  );
}
