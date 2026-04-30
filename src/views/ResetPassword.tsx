import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResetPasswordView() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 md:p-10 !rounded-[2.5rem] shadow-2xl shadow-brand-500/10 border-zinc-200/50 dark:border-zinc-800/50">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-2 uppercase">Reset Password</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Please enter your new password below.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input 
              label="New Password" 
              emblem="password" 
              placeholder="••••••••" 
            />

            <Input 
              label="Confirm New Password" 
              emblem="password" 
              placeholder="••••••••" 
            />

            <Button className="w-full py-7 rounded-2xl bg-brand-600 hover:bg-brand-700 text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-500/20">
              Update Password <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
