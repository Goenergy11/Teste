export function formatDate(value: Date | string | null | undefined) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('pt-PT').format(new Date(value));
}

export function formatMoney(value: unknown) {
  if (value === null || value === undefined) return '—';
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(number);
}
