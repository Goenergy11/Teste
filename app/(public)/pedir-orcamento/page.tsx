import { LeadPreviewForm } from '@/components/public/LeadPreviewForm';

export default function QuoteRequestPage() {
  return (
    <main className="water-grid px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Pedido de orçamento</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-ocean-900 md:text-6xl">Peça contacto para a sua piscina.</h1>
          <p className="mt-6 text-xl leading-9 text-slate-600">
            Use esta landing page para pedidos de construção, remodelação, manutenção, assistência técnica ou equipamentos. A submissão real será ligada no incremento de captação de leads.
          </p>
          <ul className="mt-8 grid gap-3 font-semibold text-ocean-900">
            <li>✓ Triagem técnica por tipo de serviço</li>
            <li>✓ Preparado para upload de fotografias numa fase seguinte</li>
            <li>✓ Estrutura pronta para criar leads no backoffice</li>
          </ul>
        </div>
        <LeadPreviewForm source="Landing pedido de orçamento" />
      </div>
    </main>
  );
}
