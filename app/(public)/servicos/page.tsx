import { SectionHeader } from '@/components/public/SectionHeader';
import { ServiceCard } from '@/components/public/ServiceCard';
import { services } from '@/lib/content/services';

export default function ServicesPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Serviços" title="Serviços completos para piscinas no Algarve.">
        <p>Da obra à manutenção preventiva, a GoPools organiza soluções técnicas para cada fase de vida da piscina.</p>
      </SectionHeader>
      <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
      </div>
    </main>
  );
}
