import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { getServiceBySlug, services } from '@/lib/content/services';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | GoPools`,
    description: service.summary
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Serviço GoPools</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-ocean-900 md:text-6xl">{service.title}</h1>
        <p className="mt-6 text-xl leading-9 text-slate-600">{service.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/pedir-orcamento">Pedir contacto</Button>
          <Button href="/servicos" variant="secondary">Voltar aos serviços</Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-ocean-100">
            <h2 className="text-2xl font-black text-ocean-900">Benefícios</h2>
            <ul className="mt-5 grid gap-3 text-slate-600">
              {service.benefits.map((benefit) => <li key={benefit}>✓ {benefit}</li>)}
            </ul>
          </section>
          <section className="rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-ocean-100">
            <h2 className="text-2xl font-black text-ocean-900">Ideal para</h2>
            <ul className="mt-5 grid gap-3 text-slate-600">
              {service.idealFor.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-[2rem] bg-sand p-7">
          <h2 className="text-2xl font-black text-ocean-900">Processo de trabalho</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-5">
            {service.process.map((step, index) => (
              <li key={step} className="rounded-2xl bg-white p-4 text-sm font-semibold text-ocean-900 shadow-soft">
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-ocean-900 text-white">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
