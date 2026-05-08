import Link from 'next/link';
import { brand, publicNavigation } from '@/lib/constants/brand';
import { Logo } from './Logo';

export function PublicFooter() {
  return (
    <footer className="border-t border-ocean-100 bg-ocean-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-ocean-100">{brand.tagline}</p>
        </div>
        <div>
          <h2 className="font-bold">Navegação</h2>
          <ul className="mt-3 grid gap-2 text-sm text-ocean-100">
            {publicNavigation.map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-white">{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Contactos</h2>
          <p className="mt-3 text-sm leading-6 text-ocean-100">
            {brand.contact.phone}
            <br />
            {brand.contact.email}
            <br />
            {brand.contact.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
