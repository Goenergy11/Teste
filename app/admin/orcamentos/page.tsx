import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatDate, formatMoney } from '@/lib/format';
import { prisma } from '@/lib/db/prisma';

export default async function AdminQuotesPage() {
  const quotes = await prisma.quote.findMany({ include: { customer: true, lead: true }, orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Backoffice</p>
        <h2 className="mt-3 text-4xl font-black text-ocean-900">Orçamentos</h2>
        <p className="mt-4 max-w-2xl text-slate-600">Orçamentos simples associados a leads ou clientes.</p>
      </div>
      <AdminTable
        rows={quotes}
        emptyMessage="Ainda não existem orçamentos."
        columns={[
          { header: 'Número', render: (quote) => quote.quoteNumber },
          { header: 'Título', render: (quote) => quote.title },
          { header: 'Cliente/Lead', render: (quote) => quote.customer?.name ?? quote.lead?.name ?? '—' },
          { header: 'Valor', render: (quote) => formatMoney(quote.estimatedValue) },
          { header: 'Estado', render: (quote) => <StatusBadge value={quote.status} /> },
          { header: 'Enviado em', render: (quote) => formatDate(quote.sentAt) }
        ]}
      />
    </section>
  );
}
