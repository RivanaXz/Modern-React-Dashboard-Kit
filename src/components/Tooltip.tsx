import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  key?: React.Key;
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : position === 'bottom' ? -4 : 0, x: position === 'left' ? 4 : position === 'right' ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`absolute z-[100] whitespace-nowrap px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg pointer-events-none ${positionClasses[position]}`}
          >
            {content}
            <div className={`absolute border-4 border-transparent ${
              position === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-zinc-900 dark:border-t-zinc-100' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-zinc-900 dark:border-b-zinc-100' :
              position === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-zinc-900 dark:border-l-zinc-100' :
              'right-full top-1/2 -translate-y-1/2 border-r-zinc-900 dark:border-r-zinc-100'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
