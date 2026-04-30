import { Button } from '../components/Button';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Error403View() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <span className="text-[12rem] font-black tracking-tighter text-zinc-100 dark:text-zinc-800 leading-none">403</span>
          <div className="absolute inset-0 flex items-center justify-center translate-y-4">
            <ShieldAlert className="w-24 h-24 text-red-500 drop-shadow-2xl" />
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4 uppercase italic">Access Forbidden</h1>
        <p className="max-w-md mx-auto text-zinc-500 dark:text-zinc-400 mb-10 font-medium text-lg italic">
          "Thou shalt not pass without proper credentials."
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="rounded-2xl px-8 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:scale-105 transition-transform uppercase font-black tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Request Access
          </Button>
          <Button variant="outline" size="lg" className="rounded-2xl px-8 border-2 uppercase font-black tracking-widest text-xs">
            <Home className="w-4 h-4 mr-2" /> Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
