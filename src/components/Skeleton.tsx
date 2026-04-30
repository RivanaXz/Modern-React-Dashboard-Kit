import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800", 
        className
      )} 
    />
  );
}
