import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, Users, Folder, Layout, ArrowRight, X } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'navigation' | 'customer' | 'project';
  icon: any;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: any[];
  onNavigate: (tab: string) => void;
}

const mockData = {
  customers: [
    { id: '1', name: 'Cody Fisher', email: 'cody.fisher@example.com' },
    { id: '2', name: 'Esther Howard', email: 'esther.howard@example.com' },
    { id: '3', name: 'Jane Cooper', email: 'jane.cooper@example.com' },
  ],
  projects: [
    { id: 'p1', name: 'Q2 Strategy', description: 'Internal roadmap' },
    { id: 'p2', name: 'Branding Refresh', description: 'Visual identity' },
    { id: 'p3', name: 'API Integration', description: 'Third-party sync' },
  ],
  notifications: [
    { id: 'n1', title: 'System Settings', description: 'Configure alerts' },
    { id: 'n2', title: 'Security Logs', description: 'View activity' },
  ]
};

export function CommandPalette({ isOpen, onClose, navigation, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredResults.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          filteredResults[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex]);

  const filteredResults = useMemo(() => {
    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Navigation
    navigation.forEach(item => {
      if (item.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: `nav-${item.name}`,
          title: item.name,
          subtitle: 'Navigation',
          type: 'navigation',
          icon: item.icon,
          action: () => onNavigate(item.name)
        });
      }
    });

    // Customers
    mockData.customers.forEach(cust => {
      if (cust.name.toLowerCase().includes(lowerQuery) || cust.email.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: `cust-${cust.id}`,
          title: cust.name,
          subtitle: cust.email,
          type: 'customer',
          icon: Users,
          action: () => onNavigate('Customers')
        });
      }
    });

    // Projects
    mockData.projects.forEach(proj => {
      if (proj.name.toLowerCase().includes(lowerQuery) || proj.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: `proj-${proj.id}`,
          title: proj.name,
          subtitle: proj.description,
          type: 'project',
          icon: Folder,
          action: () => onNavigate('Projects')
        });
      }
    });

    return results;
  }, [query, navigation, onNavigate]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-x-4 top-24 md:inset-x-0 md:max-w-2xl md:mx-auto z-[101]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="relative p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 text-lg placeholder:text-zinc-400"
                />
                <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">ESC</span>
                </div>
              </div>

              <div 
                ref={scrollRef}
                className="max-h-[400px] overflow-y-auto p-2 space-y-1 custom-scrollbar"
              >
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => {
                    const Icon = result.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={result.id}
                        onClick={() => {
                          result.action();
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-all ${
                          isSelected 
                            ? 'bg-zinc-50 dark:bg-zinc-800/50 shadow-sm' 
                            : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-brand-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                            {result.title}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">{result.subtitle}</p>
                        </div>
                        {isSelected && (
                          <motion.div layoutId="arrow" className="text-brand-600">
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-6 h-6 text-zinc-300" />
                    </div>
                    <p className="text-zinc-500 text-sm font-medium">No results found for "{query}"</p>
                  </div>
                )}
              </div>

              <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-6 justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-bold shadow-sm">↑↓</kbd>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Navigate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-bold shadow-sm">Enter</kbd>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                  <Command className="w-3 h-3" /> Search
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
