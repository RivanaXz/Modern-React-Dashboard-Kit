import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showValue?: boolean;
}

export function Progress({ 
  value, 
  max = 100, 
  className, 
  indicatorClassName,
  showValue = false 
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      {showValue && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={cn("h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden", className)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn("h-full bg-brand-600 rounded-full", indicatorClassName)}
        />
      </div>
    </div>
  );
}
