import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function ForgotPasswordView() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 md:p-10 !rounded-[2.5rem] shadow-2xl shadow-brand-500/10 border-zinc-200/50 dark:border-zinc-800/50">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-50 dark:bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-2 uppercase">Forgot Password?</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium text-center">No worries, we'll send you reset instructions.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input 
              label="Email Address" 
              emblem="email" 
              placeholder="name@company.com" 
              type="email" 
            />

            <Button className="w-full py-7 rounded-2xl bg-brand-600 hover:bg-brand-700 text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-500/20 mt-4">
              Reset Password <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <button className="flex items-center justify-center gap-2 w-full mt-10 text-sm font-black text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase tracking-[0.2em]">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
        </Card>
      </motion.div>
    </div>
  );
}
