import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; description?: string }[];
  className?: string;
}

export function RadioGroup({ value, onChange, options, className }: RadioGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full flex items-start gap-4 p-4 rounded-2xl border transition-all text-left group",
              isActive 
                ? "bg-brand-50 dark:bg-brand-500/10 border-brand-500" 
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            )}
          >
            <div className={cn(
              "mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
              isActive ? "border-brand-600" : "border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400"
            )}>
              {isActive && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2.5 h-2.5 rounded-full bg-brand-600"
                />
              )}
            </div>
            <div>
              <p className={cn(
                "text-sm font-bold transition-colors",
                isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400"
              )}>
                {option.label}
              </p>
              {option.description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{option.description}</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
