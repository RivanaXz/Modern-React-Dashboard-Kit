import { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, Search, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  emblem?: 'username' | 'password' | 'email' | 'search' | 'none';
  containerClassName?: string;
  error?: string;
  success?: boolean;
  isLoading?: boolean;
  hint?: string;
}

export function Input({ 
  label, 
  emblem = 'none', 
  containerClassName, 
  className, 
  type, 
  error,
  success,
  isLoading,
  hint,
  required,
  ...props 
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    switch (emblem) {
      case 'username': return <User className="w-5 h-5" />;
      case 'password': return <Lock className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'search': return <Search className="w-5 h-5" />;
      default: return null;
    }
  };

  const isPassword = emblem === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <div className="flex justify-between items-center px-1">
          <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] block">
            {label} {required && <span className="text-red-500 transition-pulse">*</span>}
          </label>
          {success && !error && !isLoading && (
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Valid</span>
          )}
        </div>
      )}
      
      <div className="relative group">
        {emblem !== 'none' && (
          <div className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none",
            error ? "text-red-400" : success ? "text-emerald-400" : "text-zinc-400 group-focus-within:text-brand-500"
          )}>
            {getIcon()}
          </div>
        )}
        
        <input
          type={inputType}
          required={required}
          className={cn(
            "w-full py-3.5 bg-zinc-50 dark:bg-zinc-800/50 border rounded-2xl text-sm outline-none transition-all dark:text-white dark:placeholder:text-zinc-600 font-medium",
            emblem !== 'none' ? "pl-12" : "pl-4",
            (isPassword || error || success || isLoading) ? "pr-12" : "pr-4",
            error 
              ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : success
                ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                : "border-zinc-200 dark:border-zinc-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500",
            className
          )}
          {...props}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />}
          {!isLoading && error && <AlertCircle className="w-4 h-4 text-red-500" />}
          {!isLoading && !error && success && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          
          {isPassword && !error && !success && !isLoading && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      
      {(error || hint) && (
        <p className={cn(
          "text-[10px] font-bold uppercase tracking-widest px-1",
          error ? "text-red-500" : "text-zinc-500"
        )}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
