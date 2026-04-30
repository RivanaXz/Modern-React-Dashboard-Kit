import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: any;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'pills' | 'underline';
}

export function Tabs({ tabs, activeTab, onChange, className, variant = 'pills' }: TabsProps) {
  return (
    <div className={cn(
      "flex p-1 gap-1",
      variant === 'pills' 
        ? "bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl" 
        : "border-b border-zinc-100 dark:border-zinc-800 bg-transparent",
      className
    )}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all relative z-10",
              isActive 
                ? "text-zinc-900 dark:text-zinc-50" 
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            )}
          >
            {isActive && variant === 'pills' && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white dark:bg-zinc-700 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-600 -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {isActive && variant === 'underline' && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-brand-600 rounded-t-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {Icon && <Icon className={cn("w-4 h-4", isActive ? "text-brand-600" : "")} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
