import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface MultiInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiInput({ value, onChange, placeholder = "Add items...", className }: MultiInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeItem = (itemToRemove: string) => {
    onChange(value.filter(item => item !== itemToRemove));
  };

  return (
    <div className={cn(
      "min-h-[52px] w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all",
      className
    )}>
      <AnimatePresence initial={false}>
        {value.map((item) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-sm font-bold rounded-xl border border-zinc-200 dark:border-zinc-600 shadow-sm"
          >
            {item}
            <button
              onClick={() => removeItem(item)}
              className="p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-md text-zinc-400 hover:text-red-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <input
        type="text"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 px-2"
      />
      {inputValue && (
        <div className="pr-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1 animate-pulse">
          <Plus className="w-3 h-3" />
          Press Enter
        </div>
      )}
    </div>
  );
}
