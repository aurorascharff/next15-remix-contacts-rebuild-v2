import Image from 'next/image';
import LogoFull from '../public/nextjs-13.svg';

export default function RootPage() {
  return (
    <div className="m-8 flex flex-col gap-2 text-center">
      <Image width={400} height={400} className="mb-2 block self-center" src={LogoFull} alt="logo" />
      <p>
        This is a V2 rebuild of the{' '}
        <a className="hover:text-gray-dark" href="https://remix.run/docs/en/main/start/tutorial">
          Remix Contacts{' '}
        </a>
        tutorial app using Next.js 15 with Server Actions, Tailwind CSS and Prisma.
        <br />
        Check out{' '}
        <a className="hover:text-gray-dark" href="https://github.com/aurorascharff/next15-remix-contacts-rebuild-v2">
          the code on GitHub
        </a>
        .
      </p>
    </div>
  );
}
