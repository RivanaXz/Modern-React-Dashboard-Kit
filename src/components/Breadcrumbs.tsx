import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

export function Breadcrumbs({ items, onNavigate, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li className="flex items-center">
          <button
            onClick={() => onNavigate?.('Overview')}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </li>
        {items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              {isLast ? (
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.href && onNavigate?.(item.href)}
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 uppercase tracking-widest transition-colors"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
