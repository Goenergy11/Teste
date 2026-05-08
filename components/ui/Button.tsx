import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
};

const variants = {
  primary: 'bg-ocean-900 text-white hover:bg-ocean-700 shadow-soft',
  secondary: 'bg-white text-ocean-900 ring-1 ring-ocean-100 hover:bg-ocean-50',
  ghost: 'text-ocean-900 hover:bg-ocean-50'
};

export function Button({ href, variant = 'primary', className, children, ...props }: ButtonProps) {
  const classes = cn('inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition', variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
