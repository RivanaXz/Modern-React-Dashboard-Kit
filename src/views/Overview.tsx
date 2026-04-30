import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Zap,
  Globe,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const activityData = [
  { name: 'Mon', value: 400, active: 240 },
  { name: 'Tue', value: 300, active: 139 },
  { name: 'Wed', value: 600, active: 980 },
  { name: 'Thu', value: 800, active: 390 },
  { name: 'Fri', value: 500, active: 480 },
  { name: 'Sat', value: 900, active: 380 },
  { name: 'Sun', value: 700, active: 430 },
];

const distributionData = [
  { name: 'Direct', value: 45, color: '#6366f1' },
  { name: 'Social', value: 25, color: '#f43f5e' },
  { name: 'Email', value: 20, color: '#10b981' },
  { name: 'Other', value: 10, color: '#f59e0b' },
];

import { Skeleton } from '../components/Skeleton';

export function OverviewSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 uppercase" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-12 w-32 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <Skeleton className="w-16 h-4" />
            </div>
            <div className="mt-5 space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 h-[480px] p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-[380px] w-full rounded-3xl" />
          </div>
        </Card>
        <Card className="h-[480px] p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-4 pt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function Overview() {
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">Dashboard Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">Monitoring system performance and user engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/30">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1.5">System Status</p>
            <p className="text-xs font-bold text-emerald-500 flex items-center gap-2 leading-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Operational
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '45,231', trend: '+12.5%', isUp: true, icon: Users, color: 'indigo' },
          { label: 'Conversion', value: '3.24%', trend: '-2.4%', isUp: false, icon: Zap, color: 'rose' },
          { label: 'Server Load', value: '24.8%', trend: '+0.5%', isUp: true, icon: Cpu, color: 'emerald' },
          { label: 'Regions', value: '18', trend: 'stable', isUp: true, icon: Globe, color: 'amber' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 group hover:border-brand-500/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className={cn(
                  "p-3 rounded-2xl transition-colors",
                  stat.color === 'indigo' && "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
                  stat.color === 'rose' && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                  stat.color === 'emerald' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                  stat.color === 'amber' && "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg",
                  stat.isUp ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                )}>
                  {stat.trend}
                  {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">{stat.value}</p>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card title="Traffic Engagement" description="User activity and system requests over the last 7 days." className="lg:col-span-2" allowOverflow>
          <div className="h-[400px] w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#ffffff10" : "#18181b0a"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#71717a' : '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#71717a' : '#94a3b8' }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#18181b' : '#ffffff', 
                    border: isDark ? '1px solid #27272a' : 'none', 
                    borderRadius: '20px',
                    color: isDark ? '#fafafa' : '#18181b',
                    padding: '12px 16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px', color: isDark ? '#fafafa' : '#18181b' }}
                  labelStyle={{ fontWeight: 800, color: '#6366f1', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="8 8"
                  fill="transparent" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution Chart */}
        <Card title="Source Distribution" description="Where your users are coming from.">
          <div className="h-[300px] w-full pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} layout="vertical" barSize={32} margin={{ left: -10 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 800, fill: isDark ? '#71717a' : '#94a3b8' }}
                  width={70}
                />
                <Bar dataKey="value" radius={[0, 12, 12, 0]} animationDuration={1500}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {distributionData.map((item) => (
              <div key={item.name} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card title="System Logs" description="Real-time monitor of server events." headerAction={<Button size="sm" variant="ghost">View All</Button>}>
          <div className="space-y-1">
            {[
              { event: 'User Registration', user: 'Sophia Miller', time: '2m ago', status: 'Success' },
              { event: 'API Key Revoked', user: 'Project X', time: '15m ago', status: 'Alert' },
              { event: 'Database Backup', user: 'System', time: '1h ago', status: 'Success' },
              { event: 'Payment Failed', user: 'Marcus Wright', time: '2h ago', status: 'Error' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-zinc-700 transition-all shadow-sm">
                    <Clock className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">{activity.event}</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{activity.user} • {activity.time}</p>
                  </div>
                </div>
                <Badge variant={activity.status === 'Success' ? 'success' : activity.status === 'Alert' ? 'warning' : 'danger'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Active Collaborations" description="Projects pending your final approval.">
          <div className="space-y-4 pt-2">
            {[
              { name: 'Branding Refresh', author: 'Alex Rivera', status: 'In Review', progress: 75, color: '#6366f1' },
              { name: 'API Version 2', author: 'Systems Team', status: 'Draft', progress: 30, color: '#f59e0b' },
              { name: 'Documentation UI', author: 'Design Team', status: 'In Review', progress: 92, color: '#10b981' },
            ].map((proj, i) => (
              <div key={i} className="p-5 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={proj.author} size="sm" />
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tighter">{proj.name}</p>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">by {proj.author}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{proj.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Completion Progress</span>
                    <span className="text-[10px] font-black text-zinc-900 dark:text-zinc-50">{proj.progress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${proj.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: proj.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
