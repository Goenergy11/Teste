import type { ReactNode } from 'react';

export function SectionHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-ocean-600">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black tracking-tight text-ocean-900 md:text-5xl">{title}</h2>
      {children && <div className="mt-5 text-lg leading-8 text-slate-600">{children}</div>}
    </div>
  );
}
