import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function Checkbox({ checked, onChange, disabled, className, label }: CheckboxProps) {
  return (
    <label className={cn(
      "flex items-center gap-3 cursor-pointer group",
      disabled && "cursor-not-allowed opacity-50"
    )}>
      <div 
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) onChange(!checked);
        }}
        className={cn(
          "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
          checked 
            ? "bg-brand-600 border-brand-600" 
            : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800",
          className
        )}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
      )}
    </label>
  );
}
