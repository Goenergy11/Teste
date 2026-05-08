import Link from 'next/link';
import { publicNavigation } from '@/lib/constants/brand';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ocean-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="GoPools início">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ocean-900 lg:flex" aria-label="Navegação principal">
          {publicNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ocean-600">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/pedir-orcamento" className="hidden sm:inline-flex">
          Pedir orçamento
        </Button>
      </div>
    </header>
  );
}
