import React from 'react';
import { cn } from '../lib/utils';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl'
};

export function Avatar({ src, name = 'User', size = 'md', className }: AvatarProps) {
  const [error, setError] = React.useState(false);

  // Generate initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Fallback image using DiceBear if no src provided or on error
  const avatarUrl = src && !error 
    ? src 
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

  return (
    <div className={cn(
      "rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 shadow-sm transition-all group-hover:scale-105",
      sizes[size],
      className
    )}>
      <img 
        src={avatarUrl} 
        alt={name} 
        onError={() => setError(true)}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
