import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ElementType;
  variant?: 'default' | 'danger';
}

interface DropdownProps {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  options?: DropdownOption[];
  onSelect?: (value: string) => void;
  className?: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

export function Dropdown({ 
  trigger, 
  children,
  options = [], 
  onSelect, 
  className,
  align = 'right',
  width = 'w-56'
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignmentClasses = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
    center: 'left-1/2 -translate-x-1/2 origin-top',
  };

  return (
    <div className={cn("relative inline-block", isOpen && "z-50", className)} ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              "absolute z-50 mt-2 p-2 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-2xl overflow-hidden",
              alignmentClasses[align],
              width,
              "max-w-[90vw] sm:max-w-none"
            )}
          >
            {children ? (
              <div onClick={(e) => e.stopPropagation()}>
                {children}
              </div>
            ) : (
              <div className="space-y-1">
                {options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSelect?.(option.value);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-xl transition-all",
                        option.variant === 'danger'
                          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                          : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}
                      <span className="truncate">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
