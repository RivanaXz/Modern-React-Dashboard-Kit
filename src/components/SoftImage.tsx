import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ImageIcon } from 'lucide-react';

interface SoftImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallback?: React.ReactNode;
}

export function SoftImage({ 
  src, 
  alt, 
  className, 
  containerClassName,
  fallback,
  ...props 
}: SoftImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn(
      "relative overflow-hidden bg-zinc-100 dark:bg-zinc-800",
      containerClassName
    )}>
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full bg-linear-to-r from-transparent via-zinc-200/50 dark:via-zinc-700/50 to-transparent animate-shimmer" />
          </motion.div>
        )}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400"
          >
            {fallback || (
              <>
                <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Fail to load</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-lg",
          className
        )}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
}
