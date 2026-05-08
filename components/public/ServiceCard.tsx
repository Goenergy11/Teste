import { Button } from '@/components/ui/Button';
import type { Service } from '@/lib/content/services';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-ocean-100 transition hover:-translate-y-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ocean-50 text-lg font-black text-ocean-600">≈</div>
      <h3 className="mt-5 text-2xl font-black text-ocean-900">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.summary}</p>
      <Button href={`/servicos/${service.slug}`} variant="secondary" className="mt-6">
        Ver detalhe
      </Button>
    </article>
  );
}
