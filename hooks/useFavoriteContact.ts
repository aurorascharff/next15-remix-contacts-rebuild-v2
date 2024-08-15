import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/contants/queryKeys';
import { favoriteContact } from '@/lib/actions/favoriteContact';
import type { Contact } from '@prisma/client';

export default function useFavoriteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contact: Contact) => {
      return favoriteContact(contact.id, contact.favorite);
    },
    onSuccess: contact => {
      queryClient.setQueryData<Contact[]>([queryKeys.contacts], cache => {
        return cache
          ? [
              ...cache.map(c => {
                return c.id === contact.id ? contact : c;
              }),
            ]
          : [contact];
      });
    },
  });
}
