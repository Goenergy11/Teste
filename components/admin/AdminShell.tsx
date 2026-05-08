import type { ReactNode } from 'react';
import Link from 'next/link';
import { adminNavigation } from '@/lib/constants/brand';
import { Logo } from '@/components/public/Logo';

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-ocean-100 bg-white p-6 lg:block">
        <Logo />
        <nav className="mt-10 grid gap-2" aria-label="Navegação administrativa">
          {adminNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-sm font-bold text-ocean-900 hover:bg-ocean-50">
              {item.label}
            </Link>
          ))}
        </nav>
        <a href="/api/auth/signout" className="absolute bottom-6 rounded-2xl px-4 py-3 text-sm font-bold text-coral hover:bg-coral/10">Terminar sessão</a>
      </aside>
      <main className="lg:pl-72">
        <div className="border-b border-ocean-100 bg-white px-4 py-4 sm:px-8">
          <p className="text-sm text-slate-500">Backoffice GoPools</p>
          <h1 className="text-xl font-black text-ocean-900">Fundação administrativa</h1>
        </div>
        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
