import { prisma } from '@/lib/db/prisma';

const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export default async function AdminDashboardPage() {
  const [newLeads, openLeads, customers, scheduledServices, urgentLeads, pendingQuotes, monthlyLeads] = await Promise.all([
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: { notIn: ['WON', 'LOST'] } } }),
    prisma.customer.count({ where: { active: true } }),
    prisma.service.count({ where: { status: { in: ['REQUESTED', 'SCHEDULED', 'IN_PROGRESS'] } } }),
    prisma.lead.count({ where: { priority: { in: ['HIGH', 'URGENT'] } } }),
    prisma.quote.count({ where: { status: { in: ['DRAFT', 'SENT'] } } }),
    prisma.lead.count({ where: { createdAt: { gte: currentMonth } } })
  ]);

  const cards = [
    ['Leads novas', newLeads],
    ['Leads em aberto', openLeads],
    ['Clientes ativos', customers],
    ['Serviços ativos', scheduledServices],
    ['Pedidos urgentes', urgentLeads],
    ['Orçamentos pendentes', pendingQuotes],
    ['Leads este mês', monthlyLeads]
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Dashboard</p>
        <h2 className="mt-3 text-4xl font-black text-ocean-900">Resumo operacional GoPools.</h2>
        <p className="mt-3 max-w-2xl text-slate-600">Métricas iniciais ligadas ao Prisma para acompanhar captação, clientes, serviços e orçamentos.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map(([card, value]) => (
          <article key={card} className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-ocean-100">
            <p className="text-sm font-bold text-slate-500">{card}</p>
            <p className="mt-3 text-4xl font-black text-ocean-900">{value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
