import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { LucideIcon, Check } from 'lucide-react';

export interface ChoiceOption {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
}

interface ChoiceGridProps {
  options: ChoiceOption[];
  selectedId: string;
  onChange: (id: string) => void;
  className?: string;
  columns?: number;
}

export function ChoiceGrid({ 
  options, 
  selectedId, 
  onChange, 
  className,
  columns = 2 
}: ChoiceGridProps) {
  return (
    <div className={cn(
      "grid gap-4",
      columns === 1 && "grid-cols-1",
      columns === 2 && "grid-cols-1 sm:grid-cols-2",
      columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      className
    )}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex flex-col items-start p-6 rounded-[2rem] border-2 text-left transition-all group overflow-hidden",
              isSelected 
                ? "bg-brand-50/50 dark:bg-brand-500/5 border-brand-500 shadow-xl shadow-brand-500/10" 
                : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700"
            )}
          >
            {isSelected && (
              <motion.div 
                layoutId="active-choice"
                className="absolute top-4 right-4 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-lg z-10"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </motion.div>
            )}

            {option.badge && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-brand-100 dark:bg-brand-500/20 rounded-lg">
                <span className="text-[10px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">{option.badge}</span>
              </div>
            )}

            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
              isSelected 
                ? "bg-brand-600 text-white" 
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
            )}>
              {Icon && <Icon className="w-6 h-6" />}
            </div>

            <div className="space-y-1">
              <h3 className={cn(
                "font-black tracking-tight uppercase text-sm",
                isSelected ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-700 dark:text-zinc-400"
              )}>
                {option.title}
              </h3>
              {option.description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium leading-relaxed">
                  {option.description}
                </p>
              )}
            </div>

            {/* Decorative background circle */}
            <div className={cn(
              "absolute -bottom-6 -right-6 w-24 h-24 rounded-full transition-all duration-700 blur-2xl opacity-20",
              isSelected ? "bg-brand-500 scale-150" : "bg-zinc-200 dark:bg-zinc-800 opacity-0 group-hover:opacity-10 group-hover:scale-110"
            )} />
          </button>
        );
      })}
    </div>
  );
}
