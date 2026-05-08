import { brand } from '@/lib/constants/brand';

export function Logo() {
  return (
    <div className="flex items-center gap-3" aria-label={brand.name}>
      <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-ocean-900 shadow-soft">
        <div className="absolute inset-x-2 top-3 h-2 rounded-full bg-ocean-500" />
        <div className="absolute bottom-2 left-2 h-4 w-7 rounded-full border-2 border-lagoon" />
        <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-sand" />
      </div>
      <div className="leading-none">
        <span className="text-xl font-black tracking-tight text-ocean-900">{brand.name}</span>
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-ocean-600">Algarve</span>
      </div>
    </div>
  );
}
