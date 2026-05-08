import { AdminTable } from '@/components/admin/AdminTable';
import { prisma } from '@/lib/db/prisma';

export default async function AdminPoolsPage() {
  const pools = await prisma.pool.findMany({ include: { customer: true, equipment: true }, orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Backoffice</p>
        <h2 className="mt-3 text-4xl font-black text-ocean-900">Piscinas</h2>
        <p className="mt-4 max-w-2xl text-slate-600">Piscinas associadas a clientes, com dados técnicos principais.</p>
      </div>
      <AdminTable
        rows={pools}
        emptyMessage="Ainda não existem piscinas."
        columns={[
          { header: 'Nome', render: (pool) => pool.name },
          { header: 'Cliente', render: (pool) => pool.customer.name },
          { header: 'Localização', render: (pool) => pool.location },
          { header: 'Tipo', render: (pool) => pool.poolType },
          { header: 'Volume', render: (pool) => pool.estimatedVolume ?? '—' },
          { header: 'Tratamento', render: (pool) => pool.treatmentType ?? '—' },
          { header: 'Equipamentos', render: (pool) => pool.equipment.length }
        ]}
      />
    </section>
  );
}
