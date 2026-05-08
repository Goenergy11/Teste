'use client';

import { signIn } from 'next-auth/react';
import { type FormEvent, useState } from 'react';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
      callbackUrl: '/admin'
    });

    setIsLoading(false);

    if (response?.ok) {
      window.location.href = response.url ?? '/admin';
      return;
    }

    setError('Credenciais inválidas ou utilizador inativo.');
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-ocean-900">
        Email
        <input className="rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="email" type="email" required />
      </label>
      <label className="grid gap-2 text-sm font-bold text-ocean-900">
        Password
        <input className="rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="password" type="password" required />
      </label>
      {error && <p className="rounded-2xl bg-coral/10 px-4 py-3 text-sm font-bold text-coral">{error}</p>}
      <button className="rounded-2xl bg-ocean-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-ocean-700 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isLoading}>
        {isLoading ? 'A entrar...' : 'Entrar'}
      </button>
    </form>
  );
}
