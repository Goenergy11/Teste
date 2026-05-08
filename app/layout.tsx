import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GoPools | Piscinas no Algarve',
  description: 'Plataforma GoPools para website público e gestão operacional de serviços de piscinas.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
