import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Inbox, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function EmptyStateView() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm"
      >
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Inbox className="w-10 h-10 text-zinc-400" />
        </div>
        
        <h1 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4 uppercase">No Data Found</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-10 font-medium">
          We couldn't find anything here. Start by creating your first entry to see it listed on this page.
        </p>

        <Button size="lg" className="w-full rounded-2xl bg-brand-600 hover:bg-brand-700 text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-500/20">
          <Plus className="w-4 h-4 mr-2" /> Create First Entry
        </Button>
      </motion.div>
    </div>
  );
}
