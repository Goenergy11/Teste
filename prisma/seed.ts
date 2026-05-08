import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash(process.env.SEED_ADMIN_PASSWORD ?? 'change-me-now', 12);

  const admin = await prisma.user.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL ?? 'admin@gopools.pt' },
    update: { passwordHash, role: 'ADMIN', active: true },
    create: {
      name: 'GoPools Admin',
      email: process.env.SEED_ADMIN_EMAIL ?? 'admin@gopools.pt',
      passwordHash,
      role: 'ADMIN'
    }
  });

  const customer = await prisma.customer.create({
    data: {
      name: 'Villa Azul Algarve',
      phone: '+351 910 000 000',
      email: 'villa@example.com',
      serviceAddress: 'Loulé, Algarve',
      customerType: 'TOURISM'
    }
  });

  const pool = await prisma.pool.create({
    data: {
      customerId: customer.id,
      name: 'Piscina exterior principal',
      location: 'Loulé',
      poolType: 'Exterior privada',
      dimensions: '10m x 4m',
      estimatedVolume: '60 m3',
      treatmentType: 'Salino',
      equipment: {
        create: [
          { type: 'Filtro', brand: 'Demo', model: 'Areia 600' },
          { type: 'Bomba de calor', brand: 'Demo', model: 'Inverter 17kW' }
        ]
      }
    }
  });

  const lead = await prisma.lead.create({
    data: {
      name: 'João Silva',
      phone: '+351 912 345 678',
      email: 'joao@example.com',
      location: 'Albufeira',
      serviceType: 'Remodelação de piscinas',
      message: 'Pretendo renovar revestimento e iluminação.',
      ownerId: admin.id
    }
  });

  await prisma.quote.create({
    data: {
      quoteNumber: 'GP-2026-0001',
      title: 'Remodelação inicial',
      description: 'Orçamento demonstrativo para validar backoffice e relações principais.',
      estimatedValue: 12500,
      status: 'DRAFT',
      leadId: lead.id,
      customerId: customer.id
    }
  });

  await prisma.maintenancePlan.create({
    data: {
      customerId: customer.id,
      poolId: pool.id,
      periodicity: 'Semanal',
      monthlyValue: 220,
      nextVisitAt: new Date(),
      technicianName: 'Técnico GoPools'
    }
  });

  await prisma.activityLog.create({
    data: {
      entityType: 'Lead',
      entityId: lead.id,
      leadId: lead.id,
      actorId: admin.id,
      action: 'Seed inicial da plataforma'
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
