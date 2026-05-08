import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatDate } from '@/lib/format';
import { prisma } from '@/lib/db/prisma';

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ include: { customer: true, pool: true }, orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Backoffice</p>
        <h2 className="mt-3 text-4xl font-black text-ocean-900">Serviços</h2>
        <p className="mt-4 max-w-2xl text-slate-600">Serviços técnicos e comerciais associados a clientes e piscinas.</p>
      </div>
      <AdminTable
        rows={services}
        emptyMessage="Ainda não existem serviços."
        columns={[
          { header: 'Título', render: (service) => service.title },
          { header: 'Tipo', render: (service) => service.type },
          { header: 'Cliente', render: (service) => service.customer?.name ?? '—' },
          { header: 'Piscina', render: (service) => service.pool?.name ?? '—' },
          { header: 'Estado', render: (service) => <StatusBadge value={service.status} /> },
          { header: 'Data prevista', render: (service) => formatDate(service.scheduledAt) }
        ]}
      />
    </section>
  );
}
