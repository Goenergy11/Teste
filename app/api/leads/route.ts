import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { validateLeadPayload } from '@/lib/leads/validation';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const result = validateLeadPayload(payload);

    if (!result.ok) {
      return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        location: result.data.location,
        serviceType: result.data.serviceType,
        origin: result.data.source ?? 'Website',
        message: result.data.message
      }
    });

    await prisma.activityLog.create({
      data: {
        entityType: 'Lead',
        entityId: lead.id,
        leadId: lead.id,
        action: 'Lead criada via formulário público',
        metadata: {
          origin: result.data.source ?? 'Website',
          serviceType: result.data.serviceType
        }
      }
    });

    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, errors: { form: 'Não foi possível registar o pedido.' } }, { status: 500 });
  }
}
