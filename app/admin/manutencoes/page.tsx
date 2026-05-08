import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatDate, formatMoney } from '@/lib/format';
import { prisma } from '@/lib/db/prisma';

export default async function AdminMaintenancePage() {
  const plans = await prisma.maintenancePlan.findMany({ include: { customer: true, pool: true }, orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Backoffice</p>
        <h2 className="mt-3 text-4xl font-black text-ocean-900">Manutenções</h2>
        <p className="mt-4 max-w-2xl text-slate-600">Planos de manutenção recorrente e próxima visita prevista.</p>
      </div>
      <AdminTable
        rows={plans}
        emptyMessage="Ainda não existem planos de manutenção."
        columns={[
          { header: 'Cliente', render: (plan) => plan.customer.name },
          { header: 'Piscina', render: (plan) => plan.pool.name },
          { header: 'Periodicidade', render: (plan) => plan.periodicity },
          { header: 'Valor mensal', render: (plan) => formatMoney(plan.monthlyValue) },
          { header: 'Próxima visita', render: (plan) => formatDate(plan.nextVisitAt) },
          { header: 'Estado', render: (plan) => <StatusBadge value={plan.status} /> }
        ]}
      />
    </section>
  );
}
