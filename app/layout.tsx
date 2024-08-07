import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import ContactList from '@/components/ContactList';
import Search from '@/components/Search';
import SubmitButton from '@/components/ui/SubmitButton';
import { createEmptyContact } from '@/lib/actions/createEmptyContact';
import { getContacts } from '@/lib/services/getContacts';
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
  const contacts = await getContacts();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full flex-col sm:flex-row">
          <div className="flex h-1/3 w-full flex-col border-r border-gray bg-gray-light sm:h-auto sm:w-[18rem] md:w-[22rem]">
            <div className="flex items-center gap-2 border-b border-gray px-8 py-4">
              <Search />
              <form action={createEmptyContact}>
                <SubmitButton theme="secondary">New</SubmitButton>
              </form>
            </div>
            <ContactList contacts={contacts} />
            <div className="m-0 hidden flex-row items-center gap-2 border-t border-t-gray px-8 py-4 font-medium sm:flex">
              <Link className="flex items-center gap-2 text-black no-underline" href={routes.home()}>
                <Image priority width={30} height={30} src={Logo} alt="" />
                Contacts
              </Link>
            </div>
            <div className="flex border-t border-t-gray sm:hidden" />
          </div>
          <div className="w-full flex-1 px-16 py-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
