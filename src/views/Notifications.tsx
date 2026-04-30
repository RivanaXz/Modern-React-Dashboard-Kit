import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCheck, Trash2, Send, Info, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Tooltip } from '../components/Tooltip';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  link?: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onSendTest: (type: Notification['type']) => void;
  onNavigate: (link: string) => void;
}

export default function NotificationsView({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDelete, 
  onSendTest,
  onNavigate
}: NotificationsProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Notifications</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Stay updated with the latest activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  key={n.id}
                  className={`group p-4 rounded-[2rem] border transition-all ${
                    n.isRead 
                      ? 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800' 
                      : 'bg-zinc-50/50 dark:bg-brand-500/5 border-brand-500/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl shrink-0 ${
                      n.type === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      n.type === 'warning' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' :
                      n.type === 'error' ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' :
                      'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                    }`}>
                      {n.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                       n.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                       n.type === 'error' ? <XCircle className="w-5 h-5" /> :
                       <Info className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-bold truncate ${n.isRead ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-zinc-100'}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                        {n.message}
                      </p>
                      <div className="flex items-center gap-2">
                        {!n.isRead && (
                          <button 
                            onClick={() => onMarkAsRead(n.id)}
                            className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest px-2.5 py-1 bg-brand-50 dark:bg-brand-500/10 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-all"
                          >
                            Mark Read
                          </button>
                        )}
                        {n.link && (
                          <button 
                            onClick={() => {
                              onMarkAsRead(n.id);
                              onNavigate(n.link!);
                            }}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 uppercase tracking-widest px-2.5 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all"
                          >
                            Go to {n.link} <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => onDelete(n.id)}
                      className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:text-red-400 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <Card className="p-12 text-center border-dashed border-2">
                <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-zinc-300" />
                </div>
                <p className="text-zinc-500 font-medium">No notifications yet</p>
                <p className="text-xs text-zinc-400 mt-1">We'll let you know when things start happening.</p>
              </Card>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-brand-600" /> Test System
            </h3>
            <p className="text-xs text-zinc-500 mb-6">Simulate incoming notifications to test the interface.</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => onSendTest('success')}
                className="w-full flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
              >
                Send Success <CheckCircle2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onSendTest('warning')}
                className="w-full flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
              >
                Send Warning <AlertTriangle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onSendTest('info')}
                className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
              >
                Send Info <Info className="w-4 h-4" />
              </button>
            </div>
          </Card>

          <Card className="p-6 bg-zinc-900 dark:bg-zinc-800 border-none">
            <h3 className="text-lg font-bold text-white mb-2">Notification Tips</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Real-time notifications are powered by our WebSocket system. You can toggle specific alerts in the <span className="text-brand-400 font-bold">Settings</span> panel.
            </p>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
