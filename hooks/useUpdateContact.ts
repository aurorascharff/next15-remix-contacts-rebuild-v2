import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { queryKeys } from '@/contants/queryKeys';
import { updateContact } from '@/lib/actions/updateContact';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function useUpdateContact() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (contact: Contact) => {
      return updateContact(contact.id, contact);
    },
    onSettled: contact => {
      if (contact) {
        router.push(routes.contactId({ contactId: contact.id }));
      }
    },
    onSuccess: contact => {
      toast.success('Contact updated');
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
