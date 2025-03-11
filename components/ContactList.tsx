'use client';

import { matchSorter } from 'match-sorter';
import React, { useEffect, useState } from 'react';
import { useSafeSearchParams } from '@/validations/routeSchema';
import ContactButton from './ContactButton';
import Skeleton from './ui/Skeleton';
import type { Contact } from '@prisma/client';

export default function ContactList() {
  const { q } = useSafeSearchParams('home');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      setIsLoading(true);
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setContacts(data);
      setIsLoading(false);
    }
    fetchContact();
  }, []);

  const filteredContacts = q
    ? matchSorter(contacts, q, {
        keys: ['first', 'last'],
      })
    : contacts;

  return isLoading ? (
    <Skeleton className="flex grow flex-col px-10 py-6" />
  ) : (
    <nav className="flex-1 overflow-auto px-8 py-4">
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
