import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/contants/queryKeys';
import type { Contact } from '@prisma/client';

export default function useGetContacts() {
  return useQuery({
    queryFn: async (): Promise<Contact[]> => {
      const res = await fetch('/api/contacts');
      if (!res.ok) {
        throw new Error('Failed to fetch contacts');
      }
      return res.json();
    },
    queryKey: [queryKeys.contacts],
  });
}
