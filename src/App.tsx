import { Search, Bell, Menu, LayoutDashboard, Settings, User, BarChart3, Package, Users, LogOut, TrendingUp, Sun, Moon, X, Box, Loader2, Calendar as CalendarIcon, Type, MoreVertical, ChevronDown, Layers, ShieldAlert, FileText, FolderLock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/Button';
import { Tooltip } from './components/Tooltip';
import { CommandPalette } from './components/CommandPalette';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Dropdown } from './components/Dropdown';
import { useDebounce } from './hooks/useDebounce';
import { cn } from './lib/utils';

import { Avatar } from './components/Avatar';
import { Badge } from './components/Badge';
import { Card } from './components/Card';
import { Alert } from './components/Alert';

// Views
import Overview, { OverviewSkeleton } from './views/Overview';
import Analytics from './views/Analytics';
import Projects from './views/Projects';
import Customers from './views/Customers';
import CalendarView from './views/Calendar';
import NotificationsView, { Notification } from './views/Notifications';
import EditorView from './views/Editor';
import SettingsView from './views/Settings';
import Profile from './views/Profile';
import ComponentsView from './views/Components';
import LoginView from './views/Login';
import RegisterView from './views/Register';
import ForgotPasswordView from './views/ForgotPassword';
import ResetPasswordView from './views/ResetPassword';
import Error404View from './views/Error404';
import Error403View from './views/Error403';
import EmptyStateView from './views/EmptyState';
import { PageLoader } from './components/Loader';

import { ToastProvider, useToast } from './components/Toast';
import { ThemeProvider, useTheme } from './components/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth >= 768 && window.innerWidth < 1280);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initialization
    const timer = setTimeout(() => {
      setIsInitializing(false);
      toast('Welcome back, Alex! Systems are running normally.', 'success');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Customer', message: 'Cody Fisher just signed up for your plan.', time: '2m ago', type: 'success', isRead: false, link: 'Customers' },
    { id: '2', title: 'Project Update', message: 'API Integration project needs your review.', time: '1h ago', type: 'info', isRead: true, link: 'Projects' },
    { id: '3', title: 'System Alert', message: 'Monthly report generation failed. Please check logs.', time: '3h ago', type: 'warning', isRead: false },
  ]);

  const toggleSidebar = () => {
    if (windowWidth < 768) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      if (isSidebarOpen && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true);
      } else if (isSidebarOpen && isSidebarCollapsed) {
        setIsSidebarOpen(false);
        setIsSidebarCollapsed(false);
      } else {
        setIsSidebarOpen(true);
        setIsSidebarCollapsed(false);
      }
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const sendTestNotification = (type: Notification['type']) => {
    const titles = { success: 'Success!', warning: 'Attention Needed', info: 'New Info', error: 'System Error' };
    const messages = { 
      success: 'Your task has been completed successfully.', 
      warning: 'Your storage is reaching its limit.', 
      info: 'A new update is available for your software.',
      error: 'The server encountered an unexpected error.'
    };
    
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title: titles[type],
      message: messages[type],
      time: 'Just now',
      type,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Handle click outside for mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close sidebar on mobile when clicking outside
      if (isSidebarOpen && window.innerWidth < 768 && !target.closest('.sidebar-container') && !target.closest('.sidebar-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Handle resizing to reset sidebar state
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Global search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigation = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Projects', icon: Package },
    { name: 'Customers', icon: Users },
    { name: 'Schedule', icon: CalendarIcon },
    { name: 'Editor', icon: Type },
    { name: 'Notifications', icon: Bell },
    { name: 'Components', icon: Box },
    { name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    if (activeTab === 'Overview') {
      return isInitializing ? <OverviewSkeleton /> : <Overview />;
    }

    switch (activeTab) {
      case 'Analytics': return <Analytics />;
      case 'Projects': return <Projects />;
      case 'Customers': return <Customers />;
      case 'Schedule': return <CalendarView />;
      case 'Editor': return <EditorView />;
      case 'Notifications': return (
        <NotificationsView 
          notifications={notifications} 
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onDelete={deleteNotification}
          onSendTest={sendTestNotification}
          onNavigate={(tab) => setActiveTab(tab as any)}
        />
      );
      case 'Components': return <ComponentsView />;
      case 'Settings': return <SettingsView />;
      case 'Profile': return <Profile />;
      case 'Login': return <LoginView />;
      case 'Register': return <RegisterView />;
      case 'Forgot Password': return <ForgotPasswordView />;
      case 'Reset Password': return <ResetPasswordView />;
      case '404 Error': return <Error404View />;
      case '403 Error': return <Error403View />;
      case 'Empty State': return <EmptyStateView />;
      default: return <Overview />;
    }
  };

  const pages = [
    { name: 'Login', icon: LogOut },
    { name: 'Register', icon: User },
    { name: 'Forgot Password', icon: FileText },
    { name: 'Reset Password', icon: FolderLock },
    { name: '404 Error', icon: X },
    { name: '403 Error', icon: ShieldAlert },
    { name: 'Empty State', icon: Layers },
  ];

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-[#09090b] transition-colors duration-200 font-sans">
      <AnimatePresence>
        {isInitializing && <PageLoader key="loader" />}
      </AnimatePresence>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarCollapsed ? 88 : 280,
          x: isSidebarOpen ? 0 : (windowWidth < 1024 ? -300 : -350),
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="fixed inset-y-0 left-0 z-50 sidebar-container p-3 md:p-4"
      >
        <div className="flex flex-col h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-[2.25rem] shadow-[20px_0_40px_-20px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden relative">
          
          {/* Logo Section */}
          <div className={cn(
            "flex items-center transition-all duration-500",
            isSidebarCollapsed ? "p-4 justify-center" : "p-8 pb-4 gap-4"
          )}>
            <div className="w-10 h-10 bg-linear-to-tr from-brand-600 to-brand-400 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/20 shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="text-lg font-black tracking-tighter uppercase leading-none text-zinc-900 dark:text-zinc-50">
                  Modern
                </span>
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-brand-600 dark:text-brand-400">
                  Framework
                </span>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-6 md:px-4 md:py-8 overflow-y-auto overflow-x-hidden space-y-8 md:space-y-10 scrollbar-hide">
            {/* Core Section */}
            <div className="space-y-1 relative">
              {!isSidebarCollapsed && (
                <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 opacity-60">Main Menu</p>
              )}
              
              {navigation.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3.5 px-4 py-3 text-sm font-bold rounded-[1.25rem] transition-all relative group overflow-hidden",
                      isActive 
                        ? "text-zinc-900 dark:text-zinc-100" 
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                      isSidebarCollapsed && "justify-center px-0 shrink-0"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="nav-bg"
                        transition={{ type: 'spring', stiffness: 500, damping: 45 }}
                        className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-zinc-200/50 dark:border-zinc-700/50 z-0"
                      />
                    )}
                    <Icon className={cn(
                      "w-5 h-5 relative z-10 transition-all duration-500",
                      isActive ? "text-brand-600 scale-110" : "group-hover:scale-110"
                    )} />
                    {!isSidebarCollapsed && (
                      <span className="relative z-10 truncate tracking-tight">{item.name}</span>
                    )}
                    {isActive && !isSidebarCollapsed && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute left-0 w-1 h-4 bg-brand-600 rounded-full"
                        style={{ marginLeft: '2px' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Admin Section */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 opacity-60">System Area</p>
              )}
              {navigation.slice(5).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3.5 px-4 py-3 text-sm font-bold rounded-[1.25rem] transition-all relative group overflow-hidden",
                      isActive 
                        ? "text-zinc-900 dark:text-zinc-100" 
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                      isSidebarCollapsed && "justify-center px-0 shrink-0"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="nav-bg"
                        transition={{ type: 'spring', stiffness: 500, damping: 45 }}
                        className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-zinc-200/50 dark:border-zinc-700/50 z-0"
                      />
                    )}
                    <Icon className={cn(
                      "w-5 h-5 relative z-10 transition-all duration-500",
                      isActive ? "text-brand-600 scale-110" : "group-hover:scale-110"
                    )} />
                    {!isSidebarCollapsed && (
                      <span className="relative z-10 truncate tracking-tight">{item.name}</span>
                    )}
                    {isActive && !isSidebarCollapsed && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute left-0 w-1 h-4 bg-brand-600 rounded-full"
                        style={{ marginLeft: '2px' }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Pages Dropdown */}
              <div className="pt-2">
                <button
                  onClick={() => setIsPagesOpen(!isPagesOpen)}
                  className={cn(
                    "w-full flex items-center gap-3.5 px-4 py-3 text-sm font-bold rounded-[1.25rem] transition-all relative group",
                    isPagesOpen ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
                    isSidebarCollapsed && "justify-center px-0"
                  )}
                >
                  <Layers className={cn(
                    "w-5 h-5 transition-transform duration-500",
                    isPagesOpen ? "text-brand-600 scale-110" : "group-hover:scale-110"
                  )} />
                  {!isSidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left tracking-tight">App Pages</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isPagesOpen && "rotate-180")} />
                    </>
                  )}
                </button>
                
                <AnimatePresence>
                  {isPagesOpen && !isSidebarCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-4 pl-4 border-l-2 border-zinc-100 dark:border-zinc-800/50 mt-1 space-y-1"
                    >
                      {pages.map((page) => (
                        <button
                          key={page.name}
                          onClick={() => {
                            setActiveTab(page.name);
                            if (window.innerWidth < 1024) setIsSidebarOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2 text-xs font-bold rounded-xl transition-all",
                            activeTab === page.name
                              ? "text-brand-600 bg-brand-50 dark:bg-brand-500/10"
                              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                          )}
                        >
                          <page.icon className="w-3.5 h-3.5" />
                          {page.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* User Profile Summary */}
          <div className={cn(
            "p-3 md:p-4 border-t border-zinc-100 dark:border-zinc-800/50 transition-all duration-500",
            isSidebarCollapsed ? "mt-auto pb-6" : ""
          )}>
            <button 
              onClick={() => setActiveTab('Profile')}
              className={cn(
                "w-full flex items-center gap-3 p-2.5 rounded-[1.5rem] hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all text-left group relative",
                activeTab === 'Profile' && "bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50",
                isSidebarCollapsed && "justify-center p-0 h-14 w-14 mx-auto overflow-hidden rounded-[1.25rem] border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              )}
            >
              <Avatar name="Alex Rivera" size={isSidebarCollapsed ? "md" : "md"} className={cn("group-hover:scale-105 transition-transform shrink-0", isSidebarCollapsed && "scale-90")} />
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">Alex Rivera</p>
                  <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest truncate">Administrator</p>
                </div>
              )}
              {isSidebarCollapsed && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute -right-2 -top-2 w-4 h-4 bg-brand-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm z-20"
                />
              )}
            </button>
          </div>
          
          {/* Mobile Close */}
          <div className="p-4 pt-0 lg:hidden">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-100 transition-all"
            >
              <X className="w-4 h-4 shrink-0" />
              <span>Close Menu</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.div 
        initial={false}
        animate={{ 
          marginLeft: isSidebarOpen && windowWidth >= 1024 ? (isSidebarCollapsed ? 88 : 280) : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-w-0"
      >
        {/* Header */}
        <header className="h-20 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-3xl border-b border-zinc-200/50 dark:border-zinc-800/50 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 transition-colors">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <Tooltip 
              content={
                !isSidebarOpen ? "Show Sidebar" : 
                isSidebarCollapsed ? "Expand Sidebar" : "Minimize Sidebar"
              } 
              position="bottom"
            >
              <button 
                onClick={toggleSidebar} 
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 sidebar-toggle transition-all shadow-sm hover:shadow-md group"
              >
                <Menu className={cn(
                  "w-5 h-5 text-zinc-600 dark:text-zinc-400 transition-all duration-500",
                  !isSidebarOpen && "rotate-90",
                  isSidebarOpen && isSidebarCollapsed && "rotate-180 text-brand-600",
                  isSidebarOpen && !isSidebarCollapsed && "rotate-0"
                )} />
              </button>
            </Tooltip>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="max-w-md w-full relative hidden sm:block md:hidden lg:block text-left"
            >
              <div className="relative group">
                <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 group-hover:text-brand-600 transition-colors" />
                <div className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs sm:text-sm text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-all shadow-sm">
                  Search...
                </div>
              </div>
            </button>
            <div className="hidden lg:flex items-center gap-4 border-l border-zinc-200 dark:border-zinc-800 pl-6 ml-2">
              <Breadcrumbs 
                items={[{ label: activeTab }]} 
                onNavigate={(href) => setActiveTab(href)} 
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <Dropdown 
              align="right"
              trigger={
                <button className="p-2 md:p-2.5 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-500 shadow-sm">
                  <MoreVertical className="w-5 h-5" />
                </button>
              }
              options={[
                { label: 'System Status', value: 'status', icon: TrendingUp },
                { label: 'Documentation', value: 'docs', icon: Box },
                { label: 'Cloud Console', value: 'cloud', icon: Package },
                { label: 'Logout Session', value: 'logout', icon: LogOut, variant: 'danger' }
              ]}
              onSelect={(val) => {
                console.log('Selected:', val);
              }}
            />

            <Tooltip content={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} position="bottom">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400 shadow-sm"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </Tooltip>
          
            <div className="relative notifications-dropdown-container">
              <Dropdown
                align="right"
                width="w-72 sm:w-80"
                trigger={
                  <Tooltip content="Notifications" position="bottom">
                    <button className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 relative text-zinc-600 dark:text-zinc-400 group transition-all">
                      <Bell className={`w-5 h-5 transition-transform ${unreadNotifications.length > 0 ? 'animate-[bell-swing_2s_infinite]' : 'group-hover:rotate-12'}`} />
                      {unreadNotifications.length > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm animate-pulse"></span>
                      )}
                    </button>
                  </Tooltip>
                }
              >
                <div className="flex flex-col">
                  <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest leading-none">Updates</h4>
                    {unreadNotifications.length > 0 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
                        className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[min(400px,70vh)] overflow-y-auto p-2 space-y-1 scrollbar-hide">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => {
                            markAsRead(n.id);
                            if (n.link) {
                              setActiveTab(n.link as any);
                            }
                          }}
                          className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all ${
                            n.isRead ? 'opacity-60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50' : 'bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                            n.type === 'success' ? 'bg-emerald-500' :
                            n.type === 'warning' ? 'bg-amber-500' :
                            n.type === 'error' ? 'bg-red-500' :
                            'bg-brand-50'
                          }`} />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-0.5 truncate">{n.title}</p>
                            <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">{n.message}</p>
                            <p className="text-[9px] font-bold text-zinc-400 mt-1 uppercase tracking-widest">{n.time}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Bell className="w-6 h-6 text-zinc-400" />
                        </div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">No updates yet</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
                    <button 
                      onClick={() => setActiveTab('Notifications' as any)}
                      className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hover:text-brand-600 transition-colors"
                    >
                      View all Activity
                    </button>
                  </div>
                </div>
              </Dropdown>
            </div>
            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <Tooltip content="Quick Chat" position="bottom">
                <button className="hidden sm:flex p-0.5 rounded-full hover:ring-2 hover:ring-brand-500/20 transition-all">
                  <Avatar name="Sarah Wilson" size="sm" />
                </button>
              </Tooltip>

              <div className="relative profile-dropdown-container">
                <Dropdown
                  align="right"
                  width="w-56"
                  trigger={
                    <Tooltip content="User Options" position="bottom">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-500 shadow-sm cursor-pointer">
                        <User className="w-5 h-5" />
                      </div>
                    </Tooltip>
                  }
                >
                  <div className="flex flex-col">
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Alex Rivera</p>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-1">Administrator</p>
                    </div>
                    <div className="p-1.5 space-y-1">
                      <button 
                        onClick={() => setActiveTab('Profile')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </button>
                      <button 
                        onClick={() => setActiveTab('Settings')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                        <Settings className="w-4 h-4" /> Account Settings
                      </button>
                      <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
                      <button 
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-xl transition-all text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth bg-zinc-50/50 dark:bg-[#09090b]/50">
          <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12 xl:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </motion.div>
      
      <CommandPalette 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        navigation={navigation}
        onNavigate={(tab) => setActiveTab(tab as any)}
      />
    </div>
  );
}

