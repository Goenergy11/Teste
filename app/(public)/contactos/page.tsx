import { LeadPreviewForm } from '@/components/public/LeadPreviewForm';
import { brand } from '@/lib/constants/brand';

export default function ContactsPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Contactos</p>
          <h1 className="mt-4 text-5xl font-black text-ocean-900">Fale com a GoPools.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Telefone: {brand.contact.phone}<br />Email: {brand.contact.email}<br />Área de atuação: {brand.contact.region}
          </p>
          <div className="mt-8 rounded-[2rem] bg-sand p-6 text-sm leading-7 text-ocean-900">
            <strong>Atuação:</strong> Faro, Loulé, Albufeira, Portimão, Lagos, Tavira e zonas envolventes, mediante disponibilidade operacional.
          </div>
        </div>
        <LeadPreviewForm source="Contactos" />
      </div>
    </main>
  );
}
