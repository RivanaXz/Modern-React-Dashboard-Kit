import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'brand' | 'zinc';
}

export function Loader({ size = 'md', className, variant = 'brand' }: LoaderProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const variants = {
    brand: 'border-brand-500 border-t-transparent',
    zinc: 'border-zinc-500 border-t-transparent'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={cn(
          "rounded-full",
          sizes[size],
          variants[variant]
        )}
      />
    </div>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-brand-500"
        />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
      <Loader size="lg" className="mb-4" />
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]"
      >
        Initializing System
      </motion.p>
    </div>
  );
}
