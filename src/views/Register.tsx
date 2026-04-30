import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function RegisterView() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8 md:p-10 !rounded-[2.5rem] shadow-2xl shadow-brand-500/10 border-zinc-200/50 dark:border-zinc-800/50">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-2 uppercase">Create Account</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Join our community of modern developers.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Full Name" 
                emblem="username" 
                placeholder="John Doe" 
              />
              <Input 
                label="Email" 
                emblem="email" 
                placeholder="john@example.com" 
                type="email" 
              />
            </div>

            <Input 
              label="Password" 
              emblem="password" 
              placeholder="••••••••" 
            />

            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> At least 8 characters
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> One special character
              </div>
            </div>

            <Button className="w-full py-7 rounded-2xl bg-brand-600 hover:bg-brand-700 text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-500/20">
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-center mt-10 text-sm text-zinc-500 font-medium">
            Already have an account? <button className="font-black text-zinc-900 dark:text-zinc-100 hover:underline">Sign in instead</button>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
