import { Button } from '@/components/ui/Button';
import { LeadPreviewForm } from '@/components/public/LeadPreviewForm';
import { SectionHeader } from '@/components/public/SectionHeader';
import { ServiceCard } from '@/components/public/ServiceCard';
import { brand } from '@/lib/constants/brand';
import { services } from '@/lib/content/services';

const advantages = ['Especialização técnica em piscinas', 'Resposta organizada por prioridade', 'Soluções ajustadas ao clima do Algarve', 'Foco em clientes particulares e alojamentos turísticos'];

export default function HomePage() {
  return (
    <main>
      <section className="water-grid px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-ocean-600">Piscinas no Algarve</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-ocean-900 md:text-7xl">{brand.tagline}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
              Construção, remodelação, manutenção e assistência técnica para piscinas residenciais, villas premium, alojamento local e condomínios.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/pedir-orcamento">Pedir orçamento</Button>
              <Button href="/servicos" variant="secondary">Ver serviços</Button>
            </div>
          </div>
          <div className="rounded-[2.5rem] bg-white/85 p-6 shadow-soft ring-1 ring-ocean-100 backdrop-blur">
            <div className="rounded-[2rem] bg-gradient-to-br from-ocean-500 via-lagoon to-ocean-900 p-8 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black">≈</div>
              <h2 className="mt-16 text-3xl font-black">Um parceiro único para cuidar da sua piscina.</h2>
              <p className="mt-4 text-ocean-50">Da primeira visita ao histórico técnico, a GoPools nasce para combinar proximidade, método e qualidade de execução.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Serviços" title="Tudo para a sua piscina, com método técnico.">
          <p>Serviços pensados para reduzir imprevistos, melhorar eficiência e valorizar espaços exteriores no Algarve.</p>
        </SectionHeader>
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </section>

      <section className="bg-sand px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Vantagens</p>
            <h2 className="mt-4 text-4xl font-black text-ocean-900 md:text-5xl">Uma marca técnica, moderna e próxima.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">A GoPools posiciona-se para servir clientes que precisam de confiança operacional, transparência e capacidade técnica.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((advantage) => (
              <div key={advantage} className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-ocean-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-50 font-black text-lagoon">✓</div>
                <p className="mt-4 font-bold text-ocean-900">{advantage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Contacto rápido</p>
            <h2 className="mt-4 text-4xl font-black text-ocean-900">Conte-nos o que precisa.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">A interface de captação já está desenhada para o próximo incremento, onde cada pedido criará uma lead no backoffice.</p>
          </div>
          <LeadPreviewForm compact source="Homepage" />
        </div>
      </section>
    </main>
  );
}
