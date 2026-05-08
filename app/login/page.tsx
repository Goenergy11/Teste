import { Logo } from '@/components/public/Logo';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-ocean-100">
        <Logo />
        <div className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Backoffice</p>
          <h1 className="mt-3 text-3xl font-black text-ocean-900">Entrar na GoPools</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Autenticação preparada para a fundação admin. A UX final de login será refinada nos próximos incrementos.</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
