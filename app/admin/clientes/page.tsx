import { AdminTable } from '@/components/admin/AdminTable';
import { prisma } from '@/lib/db/prisma';

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({ include: { pools: true }, orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Backoffice</p>
        <h2 className="mt-3 text-4xl font-black text-ocean-900">Clientes</h2>
        <p className="mt-4 max-w-2xl text-slate-600">Clientes registados e número de piscinas associadas.</p>
      </div>
      <AdminTable
        rows={customers}
        emptyMessage="Ainda não existem clientes."
        columns={[
          { header: 'Nome', render: (customer) => customer.name },
          { header: 'Telefone', render: (customer) => customer.phone },
          { header: 'Email', render: (customer) => customer.email ?? '—' },
          { header: 'Tipo', render: (customer) => customer.customerType },
          { header: 'Morada serviço', render: (customer) => customer.serviceAddress ?? '—' },
          { header: 'Piscinas', render: (customer) => customer.pools.length }
        ]}
      />
    </section>
  );
}
