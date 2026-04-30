import { useState, useMemo, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import { Search, Filter, MoreVertical, X, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Edit, Trash2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDebounce } from '../hooks/useDebounce';
import { Avatar } from '../components/Avatar';
import { cn } from '../lib/utils';

const itemsPerPage = 5;

type Customer = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const customers: Customer[] = [
  { id: 1, name: 'Cody Fisher', email: 'cody.fisher@example.com', role: 'Owner', status: 'Active' },
  { id: 2, name: 'Esther Howard', email: 'esther.howard@example.com', role: 'Admin', status: 'Active' },
  { id: 3, name: 'Jenny Wilson', email: 'jenny.wilson@example.com', role: 'Member', status: 'Inactive' },
  { id: 4, name: 'Kristin Watson', email: 'kristin.watson@example.com', role: 'Admin', status: 'Active' },
  { id: 5, name: 'Cameron Williamson', email: 'cameron.williamson@example.com', role: 'Member', status: 'Active' },
  { id: 6, name: 'Jane Cooper', email: 'jane.cooper@example.com', role: 'Admin', status: 'Active' },
  { id: 7, name: 'Robert Fox', email: 'robert.fox@example.com', role: 'Member', status: 'Active' },
  { id: 8, name: 'Bessie Cooper', email: 'bessie.cooper@example.com', role: 'Member', status: 'Inactive' },
  { id: 9, name: 'Guy Hawkins', email: 'guy.hashkins@example.com', role: 'Admin', status: 'Active' },
  { id: 10, name: 'Dianne Russell', email: 'dianne.russell@example.com', role: 'Member', status: 'Active' },
  { id: 11, name: 'Albert Flores', email: 'albert.flores@example.com', role: 'Member', status: 'Active' },
  { id: 12, name: 'Wade Warren', email: 'wade.warren@example.com', role: 'Admin', status: 'Inactive' },
];

type SortConfig = {
  key: keyof Customer | null;
  direction: 'ascending' | 'descending';
};

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0); 
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredCustomers = useMemo(() => {
    let result = [...customers].filter(user => 
      user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortConfig.direction === 'ascending' ? comparison : -comparison;
        }
        return 0;
      });
    }

    return result;
  }, [debouncedSearchTerm, sortConfig]);

  const requestSort = (key: keyof Customer) => {
    let newDirection: SortConfig['direction'] = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newDirection = 'descending';
    }
    setSortConfig({ key, direction: newDirection });
    setDirection(0);
  };

  const getSortIcon = (key: SortConfig['key']) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />;
    return sortConfig.direction === 'ascending' 
      ? <ArrowUp className="w-3.5 h-3.5 text-brand-600" /> 
      : <ArrowDown className="w-3.5 h-3.5 text-brand-600" />;
  };

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
    setDirection(0);
  }, [debouncedSearchTerm]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const paginate = (newPage: number) => {
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Customers</h1>
          <p className="text-zinc-500 dark:text-zinc-400">View and manage all your users.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto relative">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                <th 
                  className="px-6 py-4 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  onClick={() => requestSort('role')}
                >
                  <div className="flex items-center gap-2">
                    Role
                    {getSortIcon('role')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-right"
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center justify-end gap-2 text-right">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                {paginatedCustomers.length > 0 ? (
                  paginatedCustomers.map((user) => (
                    <motion.tr 
                      layout
                      custom={direction}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction * 50,
                          opacity: 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                        },
                        exit: (direction: number) => ({
                          x: direction * -50,
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      key={user.id} 
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.name} size="md" />
                          <div>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</p>
                            <p className="text-xs text-zinc-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{user.role}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Badge 
                          variant={user.status === 'Active' ? 'success' : 'zinc'}
                        >
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full mr-1.5",
                            user.status === 'Active' ? "bg-emerald-500" : "bg-zinc-400"
                          )} />
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Dropdown 
                          align="right"
                          trigger={
                            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                              <MoreVertical className="w-4 h-4 text-zinc-400" />
                            </button>
                          }
                          options={[
                            { label: 'Edit Profile', value: 'edit', icon: Edit },
                            { label: 'Send Email', value: 'email', icon: Mail },
                            { label: 'Remove User', value: 'delete', icon: Trash2, variant: 'danger' }
                          ]}
                          onSelect={(val) => console.log(val)}
                        />
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-full">
                          <Search className="w-6 h-6 text-zinc-400" />
                        </div>
                        <p className="text-sm font-medium text-zinc-500 italic">
                          No customers found matching "{searchTerm}"
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-xl"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={cn(
                      "w-9 h-9 rounded-xl text-xs font-bold transition-all",
                      currentPage === i + 1 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' 
                        : 'bg-white dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-xl"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
