'use client';

import { useState } from 'react';
import { services } from '@/lib/content/services';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function LeadPreviewForm({ compact = false, source = 'Website' }: { compact?: boolean; source?: string }) {
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(formData: FormData) {
    setState('submitting');
    setMessage('');

    const payload = Object.fromEntries(formData.entries());
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source })
    });

    const result = (await response.json()) as { ok: boolean; errors?: Record<string, string> };

    if (response.ok && result.ok) {
      setState('success');
      setMessage('Pedido registado com sucesso. A equipa GoPools irá analisar e contactar assim que possível.');
      return;
    }

    setState('error');
    setMessage(result.errors ? Object.values(result.errors)[0] : 'Não foi possível enviar o pedido.');
  }

  return (
    <form action={handleSubmit} className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-ocean-100 md:grid-cols-2" aria-describedby="form-note">
      <input className="hidden" name="company" tabIndex={-1} autoComplete="off" />
      <label className="grid gap-2 text-sm font-bold text-ocean-900">
        Nome
        <input className="rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="name" placeholder="O seu nome" required />
      </label>
      <label className="grid gap-2 text-sm font-bold text-ocean-900">
        Telefone
        <input className="rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="phone" placeholder="+351" required />
      </label>
      {!compact && (
        <label className="grid gap-2 text-sm font-bold text-ocean-900">
          Email
          <input className="rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="email" type="email" placeholder="email@exemplo.pt" />
        </label>
      )}
      <label className="grid gap-2 text-sm font-bold text-ocean-900">
        Localidade
        <input className="rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="location" placeholder="Ex.: Loulé" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-ocean-900 md:col-span-2">
        Tipo de serviço
        <select className="rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="serviceType" defaultValue="" required>
          <option value="" disabled>Escolha uma opção</option>
          {services.map((service) => <option key={service.slug}>{service.title}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold text-ocean-900 md:col-span-2">
        Mensagem
        <textarea className="min-h-28 rounded-2xl border border-ocean-100 px-4 py-3 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-100" name="message" placeholder="Conte-nos o que pretende resolver ou construir." />
      </label>
      <div className="md:col-span-2">
        <button className="w-full rounded-2xl bg-ocean-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-ocean-700 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'A enviar...' : 'Enviar pedido'}
        </button>
        <p id="form-note" className="mt-3 text-xs leading-5 text-slate-500">
          Cada submissão cria uma lead no backoffice e regista a atividade inicial para seguimento comercial.
        </p>
        {message && (
          <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${state === 'success' ? 'bg-lagoon/10 text-lagoon' : 'bg-coral/10 text-coral'}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
