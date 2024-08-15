import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { queryKeys } from '@/contants/queryKeys';
import { deleteContact } from '@/lib/actions/deleteContact';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function useDeleteContact() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (contactId: string) => {
      return deleteContact(contactId);
    },
    onError: () => {
      toast.error('Failed to delete contact');
    },
    onSuccess: contact => {
      toast.success('Contact deleted');
      queryClient.setQueryData<Contact[]>([queryKeys.contacts], cache => {
        return cache
          ? [
              ...cache.filter(c => {
                return c.id !== contact.id;
              }),
            ]
          : [];
      });
      router.push(routes.home());
    },
  });
}
