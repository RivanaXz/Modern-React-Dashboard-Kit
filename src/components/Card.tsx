import { type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/src/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
  headerAction?: ReactNode;
  allowOverflow?: boolean;
}

export function Card({ children, className, title, description, footer, headerAction, allowOverflow = false, ...props }: CardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200',
      !allowOverflow && 'overflow-hidden',
      className
    )} {...props}>
      {(title || description || headerAction) && (
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            {title && <h3 className="text-lg font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">{title}</h3>}
            {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2">{footer}</div>}
    </div>
  );
}
