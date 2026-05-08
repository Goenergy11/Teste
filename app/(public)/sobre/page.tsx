import { Button } from '@/components/ui/Button';

const values = ['Confiança', 'Rigor técnico', 'Proximidade', 'Modernidade', 'Serviço premium acessível'];

export default function AboutPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">Sobre nós</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-ocean-900 md:text-6xl">GoPools é uma empresa independente dedicada a piscinas.</h1>
          <p className="mt-6 text-xl leading-9 text-slate-600">
            A marca nasce para responder de forma profissional, moderna e técnica às necessidades de construção, remodelação, manutenção e assistência no Algarve.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <section className="rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-ocean-100 md:col-span-2">
            <h2 className="text-2xl font-black text-ocean-900">Posicionamento</h2>
            <p className="mt-4 leading-8 text-slate-600">
              A GoPools deve comunicar autonomia, foco especializado e capacidade técnica, podendo referir experiência anterior apenas como contexto de know-how, sem depender de outra marca.
            </p>
          </section>
          <section className="rounded-[2rem] bg-sand p-7">
            <h2 className="text-2xl font-black text-ocean-900">Valores</h2>
            <ul className="mt-4 grid gap-3 text-slate-700">
              {values.map((value) => <li key={value}>✓ {value}</li>)}
            </ul>
          </section>
        </div>
        <Button href="/pedir-orcamento" className="mt-10">Falar com a GoPools</Button>
      </div>
    </main>
  );
}
