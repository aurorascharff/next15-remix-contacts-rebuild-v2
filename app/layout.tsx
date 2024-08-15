import './globals.css';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import ContactList from '@/components/ContactList';
import NewContactButton from '@/components/NewContactButton';
import Search from '@/components/Search';
import { queryKeys } from '@/contants/queryKeys';
import { getContacts } from '@/lib/services/getContacts';
import QueryProvider from '@/providers/QueryProvider';
import Logo from '@/public/next-js.svg';
import { routes } from '@/validations/routeSchema';
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  description: 'Next.js 15 rebuild of Remix Contacts V2',
  title: 'Next Contacts',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryFn: getContacts, queryKey: [queryKeys.contacts] });

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex w-full flex-col sm:flex-row">
              <div className="flex h-1/3 w-full flex-col border-r border-gray bg-gray-light sm:h-auto sm:w-[16rem] md:w-[22rem]">
                <Toaster position="top-right" />
                <div className="flex items-center gap-2 border-b border-gray px-8 py-4">
                  <Search />
                  <NewContactButton />
                </div>
                <ContactList />
                <div className="m-0 hidden flex-row items-center gap-2 border-t border-t-gray px-8 py-4 font-medium sm:flex">
                  <Link className="flex items-center gap-2 text-black no-underline" href={routes.home()}>
                    <Image width={30} height={30} src={Logo} alt="" />
                    Contacts
                  </Link>
                </div>
                <div className="flex border-t border-t-gray sm:hidden" />
              </div>
              <div className="w-full flex-1 px-16 py-8">{children}</div>
            </div>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
