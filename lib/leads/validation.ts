export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  serviceType: string;
  message?: string;
  source?: string;
  company?: string;
};

export type ValidationResult =
  | { ok: true; data: Omit<LeadInput, 'company'> }
  | { ok: false; errors: Record<string, string> };

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLeadPayload(payload: Record<string, unknown>): ValidationResult {
  const company = asText(payload.company);
  if (company) {
    return { ok: false, errors: { form: 'Pedido rejeitado.' } };
  }

  const name = asText(payload.name);
  const phone = asText(payload.phone);
  const email = asText(payload.email);
  const location = asText(payload.location);
  const serviceType = asText(payload.serviceType);
  const message = asText(payload.message);
  const source = asText(payload.source) || 'Website';

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = 'Indique o nome.';
  if (phone.length < 6) errors.phone = 'Indique um contacto telefónico válido.';
  if (email && !isEmail(email)) errors.email = 'Indique um email válido.';
  if (!serviceType) errors.serviceType = 'Escolha o tipo de serviço.';
  if (message.length > 5000) errors.message = 'A mensagem é demasiado longa.';

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      phone,
      email: email || undefined,
      location: location || undefined,
      serviceType,
      message: message || undefined,
      source
    }
  };
}
