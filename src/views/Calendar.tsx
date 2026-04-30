import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MoreVertical,
  X,
  CheckCircle2,
  Edit,
  Trash2
} from 'lucide-react';
import { Card } from '../components/Card';
import { Tooltip } from '../components/Tooltip';
import { Button } from '../components/Button';
import { DatePicker } from '../components/DatePicker';
import { Modal } from '../components/Modal';
import { Badge } from '../components/Badge';
import { Dropdown } from '../components/Dropdown';
import { cn } from '../lib/utils';

interface Event {
  id: string;
  title: string;
  time: string;
  date: string; // YYYY-MM-DD
  type: 'meeting' | 'design' | 'development' | 'other';
  participants: number;
}

const mockEvents: Event[] = [
  { id: '1', title: 'Q2 Strategy Sync', time: '10:00 AM', date: '2026-04-30', type: 'meeting', participants: 5 },
  { id: '2', title: 'Design Review', time: '02:30 PM', date: '2026-04-30', type: 'design', participants: 3 },
  { id: '3', title: 'API Integration', time: '09:00 AM', date: '2026-05-01', type: 'development', participants: 2 },
  { id: '4', title: 'Client Workshop', time: '11:00 AM', date: '2026-05-05', type: 'other', participants: 8 },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  const [selectedDate, setSelectedDate] = useState<string>('2026-04-30');
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(mockEvents);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(2026, 3, 30),
    time: '09:00',
    type: 'meeting' as Event['type'],
    participants: 1
  });

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Padding for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, currentMonth: false });
    }
    // Days of current month
    for (let i = 1; i <= daysCount; i++) {
      days.push({ day: i, currentMonth: true });
    }
    return days;
  }, [currentDate]);

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(e => e.date === dateStr);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = `${newEvent.date.getFullYear()}-${String(newEvent.date.getMonth() + 1).padStart(2, '0')}-${String(newEvent.date.getDate()).padStart(2, '0')}`;
    
    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      date: dateStr,
      time: newEvent.time,
      type: newEvent.type,
      participants: newEvent.participants,
    };

    setEvents(prev => [...prev, event]);
    setIsNewEventModalOpen(false);
    setNewEvent({
      title: '',
      date: new Date(),
      time: '09:00',
      type: 'meeting',
      participants: 1
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Schedule</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage your upcoming meetings and events.</p>
        </div>
        <button 
          onClick={() => setIsNewEventModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-semibold rounded-2xl shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> Schedule Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2 p-6 overflow-hidden">
           <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Today
              </button>
              <button 
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-zinc-100 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            {DAYS.map(day => (
              <div key={day} className="bg-white dark:bg-zinc-900 py-3 text-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{day}</span>
              </div>
            ))}
            {daysInMonth.map((d, i) => {
              const dateStr = d.day ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}` : '';
              const events = getEventsForDate(dateStr);
              const isSelected = dateStr === selectedDate;

              return (
                <div 
                  key={i} 
                  onClick={() => d.day && setSelectedDate(dateStr)}
                  className={`bg-white dark:bg-zinc-900 min-h-[100px] p-2 transition-all cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 group relative ${!d.currentMonth ? 'opacity-20 pointer-events-none' : ''}`}
                >
                  <span className={`inline-flex items-center justify-center w-7 h-7 text-xs font-bold rounded-lg transition-colors ${
                    isSelected ? 'bg-brand-600 text-white' : 'text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white'
                  }`}>
                    {d.day}
                  </span>
                  
                  <div className="mt-1 space-y-1">
                    {events.slice(0, 2).map((e) => (
                      <div 
                        key={e.id}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate uppercase tracking-tighter ${
                          e.type === 'meeting' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' :
                          e.type === 'design' ? 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400' :
                          'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                        }`}
                      >
                        {e.time} {e.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[9px] font-bold text-zinc-400 px-1.5">
                        + {events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Agenda Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Today's Agenda</h3>
              <CalendarIcon className="w-5 h-5 text-zinc-400" />
            </div>
            
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((e) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={e.id}
                      className="group p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent hover:border-brand-500/20 hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{e.title}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">
                              <Clock className="w-3 h-3" /> {e.time}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">
                              <Users className="w-3 h-3" /> {e.participants}
                            </div>
                          </div>
                        </div>
                        <Dropdown 
                          align="right"
                          trigger={
                            <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                              <MoreVertical className="w-4 h-4 text-zinc-400" />
                            </button>
                          }
                          options={[
                            { label: 'Edit Event', value: 'edit', icon: Edit },
                            { label: 'Cancel Event', value: 'cancel', icon: Trash2, variant: 'danger' }
                          ]}
                          onSelect={(val) => console.log(val)}
                        />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CalendarIcon className="w-6 h-6 text-zinc-300" />
                    </div>
                    <p className="text-zinc-500 text-sm font-medium">No events for this day</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          <Card className="p-6 bg-brand-600 border-none shadow-xl shadow-brand-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Team Statistics</h3>
            <p className="text-brand-100 text-xs mb-6">Overview of current team productivity.</p>
            
            <div className="grid grid-cols-2 gap-4 text-white">
              <div className="p-3 bg-white/10 rounded-2xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100 opacity-70 mb-1">Meetings</p>
                <p className="text-2xl font-bold">12h</p>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100 opacity-70 mb-1">Focus</p>
                <p className="text-2xl font-bold">28h</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={isNewEventModalOpen} 
        onClose={() => setIsNewEventModalOpen(false)}
        title="Schedule Event"
      >
        <form onSubmit={handleAddEvent} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Event Title</label>
            <input 
              autoFocus
              required
              type="text" 
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Project presentation..."
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:border-brand-500 transition-all dark:text-zinc-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Date</label>
              <DatePicker 
                selectedDate={newEvent.date}
                onChange={(date) => setNewEvent(prev => ({ ...prev, date }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Time</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  required
                  type="time" 
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:border-brand-500 transition-all dark:text-zinc-100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</label>
              <select 
                value={newEvent.type}
                onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:border-brand-500 transition-all dark:text-zinc-100 appearance-none"
              >
                <option value="meeting">Meeting</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Participants</label>
              <div className="relative">
                <Users className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  required
                  type="number" 
                  min="1"
                  value={newEvent.participants}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, participants: parseInt(e.target.value) }))}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:border-brand-500 transition-all dark:text-zinc-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 rounded-2xl"
              onClick={() => setIsNewEventModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 rounded-2xl bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/20"
            >
              Create Event
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
