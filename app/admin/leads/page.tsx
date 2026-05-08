import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatDate } from '@/lib/format';
import { prisma } from '@/lib/db/prisma';

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Backoffice</p>
        <h2 className="mt-3 text-4xl font-black text-ocean-900">Leads</h2>
        <p className="mt-4 max-w-2xl text-slate-600">Pedidos recebidos pelos formulários públicos, ordenados pelos mais recentes.</p>
      </div>
      <AdminTable
        rows={leads}
        emptyMessage="Ainda não existem leads."
        columns={[
          { header: 'Nome', render: (lead) => lead.name },
          { header: 'Contacto', render: (lead) => lead.phone },
          { header: 'Email', render: (lead) => lead.email ?? '—' },
          { header: 'Serviço', render: (lead) => lead.serviceType },
          { header: 'Origem', render: (lead) => lead.origin },
          { header: 'Estado', render: (lead) => <StatusBadge value={lead.status} /> },
          { header: 'Prioridade', render: (lead) => <StatusBadge value={lead.priority} /> },
          { header: 'Criada em', render: (lead) => formatDate(lead.createdAt) }
        ]}
      />
    </section>
  );
}
