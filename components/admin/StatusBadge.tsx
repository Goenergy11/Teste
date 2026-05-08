const toneMap: Record<string, string> = {
  NEW: 'bg-ocean-50 text-ocean-700',
  CONTACTED: 'bg-sand text-ocean-900',
  ANALYSING: 'bg-ocean-100 text-ocean-900',
  QUOTE_SENT: 'bg-lagoon/10 text-lagoon',
  WON: 'bg-lagoon/10 text-lagoon',
  LOST: 'bg-coral/10 text-coral',
  URGENT: 'bg-coral/10 text-coral',
  HIGH: 'bg-coral/10 text-coral',
  NORMAL: 'bg-ocean-50 text-ocean-700',
  LOW: 'bg-slate-100 text-slate-600',
  ACTIVE: 'bg-lagoon/10 text-lagoon',
  DRAFT: 'bg-slate-100 text-slate-600',
  SENT: 'bg-ocean-50 text-ocean-700',
  ACCEPTED: 'bg-lagoon/10 text-lagoon',
  REFUSED: 'bg-coral/10 text-coral'
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${toneMap[value] ?? 'bg-slate-100 text-slate-600'}`}>{value}</span>;
}
