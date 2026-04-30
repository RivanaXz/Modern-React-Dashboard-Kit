import { ReactNode } from 'react';
import { cn } from '../lib/utils';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' | 'brand' | 'zinc';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'primary', className, dot = false }: BadgeProps) {
  const variants: Record<string, string> = {
    primary: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400',
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400',
    secondary: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    error: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    outline: 'border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400',
    ghost: 'bg-transparent text-zinc-500 dark:text-zinc-400',
  };

  const dotColors: Record<string, string> = {
    primary: 'bg-brand-500',
    brand: 'bg-brand-500',
    secondary: 'bg-zinc-500',
    zinc: 'bg-zinc-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    outline: 'bg-zinc-400',
    ghost: 'bg-zinc-400',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
