import React, { useState, FormEvent } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Dropdown } from '../components/Dropdown';
import { Bell, Shield, User, Globe, Mail, Upload, AlertCircle, CheckCircle2, Plus, MoreHorizontal, Download, History, Lock, Trash2, ChevronDown, Monitor, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FileUpload } from '../components/FileUpload';
import { useTheme } from '../components/ThemeContext';
import { cn } from '../lib/utils';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@example.com',
    bio: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    newCustomerAlerts: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showEmail: false,
    analyticsEnabled: true,
    twoFactorEnabled: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  type FormFieldName = keyof typeof formData;

  const validate = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        else if (value.length < 2) error = 'Minimum 2 characters';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        else if (value.length < 2) error = 'Minimum 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Invalid email format';
        break;
      case 'bio':
        if (value.length > 200) error = 'Maximum 200 characters';
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
    if (isSuccess) setIsSuccess(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const fields = Object.keys(formData) as FormFieldName[];
    const isValid = fields.every(field => validate(field as string, formData[field]));

    if (isValid) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const hasErrors = Object.values(errors).some(error => error !== '');

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'appearance', name: 'Appearance', icon: Sun },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Privacy & Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: Globe },
  ];

  const { theme: currentTheme, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Settings</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Configure your application preferences.</p>
        </div>
        <Dropdown 
          trigger={
            <Button size="sm" variant="outline" className="gap-2">
              Options
              <ChevronDown className="w-4 h-4" />
            </Button>
          }
          options={[
            { label: 'Export Config', value: 'export', icon: Download },
            { label: 'View Audit Log', value: 'audit', icon: History },
            { label: 'Reset Factory', value: 'reset', icon: Trash2, variant: 'danger' }
          ]}
          onSelect={(val) => console.log(val)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === item.id 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                  : 'text-zinc-500 hover:bg-white dark:hover:bg-zinc-900 hover:text-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card 
                  title="Public Profile" 
                  description="This information will be displayed publicly."
                  className={cn(isSuccess && "ring-2 ring-emerald-500/50")}
                  headerAction={
                    <Dropdown 
                      align="right"
                      trigger={
                        <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                        </button>
                      }
                      options={[
                        { label: 'View Public Profile', value: 'view', icon: Globe },
                        { label: 'Privacy Policy', value: 'privacy', icon: Shield },
                        { label: 'Export Data', value: 'export', icon: Download }
                      ]}
                      onSelect={(val) => console.log(val)}
                    />
                  }
                >
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">First Name</label>
                          <AnimatePresence>
                            {errors.firstName && (
                              <motion.span 
                                initial={{ opacity: 0, x: 5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[10px] font-bold text-red-500 uppercase"
                              >
                                {errors.firstName}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={cn(
                            "w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border rounded-xl text-sm outline-none transition-all focus:ring-2",
                            errors.firstName 
                              ? "border-red-500/50 focus:ring-red-500/20" 
                              : "border-zinc-200 dark:border-zinc-700 focus:ring-brand-500/20 focus:border-brand-500"
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Last Name</label>
                          <AnimatePresence>
                            {errors.lastName && (
                              <motion.span 
                                initial={{ opacity: 0, x: 5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[10px] font-bold text-red-500 uppercase"
                              >
                                {errors.lastName}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={cn(
                            "w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border rounded-xl text-sm outline-none transition-all focus:ring-2",
                            errors.lastName 
                              ? "border-red-500/50 focus:ring-red-500/20" 
                              : "border-zinc-200 dark:border-zinc-700 focus:ring-brand-500/20 focus:border-brand-500"
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                        <AnimatePresence>
                          {errors.email && (
                            <motion.span 
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-[10px] font-bold text-red-500 uppercase"
                            >
                              {errors.email}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <Mail className={cn(
                          "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                          errors.email ? "text-red-400" : "text-zinc-400"
                        )} />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={cn(
                            "w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border rounded-xl text-sm outline-none transition-all focus:ring-2",
                            errors.email 
                              ? "border-red-500/50 focus:ring-red-500/20" 
                              : "border-zinc-200 dark:border-zinc-700 focus:ring-brand-500/20 focus:border-brand-500"
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Biography</label>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[10px] font-bold uppercase",
                            formData.bio.length > 200 ? "text-red-500" : "text-zinc-400"
                          )}>
                            {formData.bio.length} / 200
                          </span>
                          <AnimatePresence>
                            {errors.bio && (
                              <motion.span 
                                initial={{ opacity: 0, x: 5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[10px] font-bold text-red-500 uppercase"
                              >
                                {errors.bio}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <textarea 
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Write a few sentences about yourself..."
                        className={cn(
                          "w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border rounded-xl text-sm outline-none transition-all focus:ring-2 resize-none",
                          errors.bio 
                            ? "border-red-500/50 focus:ring-red-500/20" 
                            : "border-zinc-200 dark:border-zinc-700 focus:ring-brand-500/20 focus:border-brand-500"
                        )}
                      />
                    </div>

                    {isSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Settings saved successfully!</p>
                      </motion.div>
                    )}

                    <div className="pt-4 flex justify-end gap-3">
                      <Button variant="outline" type="button" onClick={() => setFormData({ firstName: 'Alex', lastName: 'Rivera', email: 'alex.rivera@example.com', bio: '' })}>Reset</Button>
                      <Button 
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={hasErrors || isSubmitting}
                        className={cn(hasErrors && "opacity-50 cursor-not-allowed")}
                      >
                        {isSuccess ? 'Saved' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Card>

                <Card title="Account Verification" description="Upload official documents to verify your identity.">
                  <div className="space-y-6">
                    <FileUpload 
                      maxFiles={3} 
                      accept=".jpg,.png,.pdf" 
                      onFilesSelected={(files) => console.log('Selected files:', files)} 
                    />
                    <div className="flex justify-end">
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Submit for Review
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card title="Interface Theme" description="Select your preferred interface appearance.">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => currentTheme !== 'light' && toggleTheme()}
                      className={cn(
                        "group relative flex flex-col p-4 rounded-2xl border-2 transition-all text-left",
                        currentTheme === 'light' 
                          ? "border-brand-600 bg-brand-50/50 dark:bg-brand-500/10 shadow-lg shadow-brand-500/10" 
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
                      )}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                          currentTheme === 'light' ? "bg-brand-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                        )}>
                          <Sun className="w-5 h-5" />
                        </div>
                        {currentTheme === 'light' && (
                          <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">Light Mode</p>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Clean and high visibility</p>
                    </button>

                    <button 
                      onClick={() => currentTheme !== 'dark' && toggleTheme()}
                      className={cn(
                        "group relative flex flex-col p-4 rounded-2xl border-2 transition-all text-left",
                        currentTheme === 'dark' 
                          ? "border-brand-600 bg-brand-50/50 dark:bg-brand-500/10 shadow-lg shadow-brand-500/10" 
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
                      )}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                          currentTheme === 'dark' ? "bg-brand-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                        )}>
                          <Moon className="w-5 h-5" />
                        </div>
                        {currentTheme === 'dark' && (
                          <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">Dark Mode</p>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Easier on the eyes at night</p>
                    </button>
                  </div>
                </Card>

                <Card title="Application Font" description="Choose the typeface that fits your reading comfort.">
                  <div className="space-y-4">
                    {[
                      { name: 'Inter (Sans)', provider: 'Google Fonts', active: true },
                      { name: 'Space Grotesk', provider: 'Google Fonts', active: false },
                      { name: 'JetBrains Mono', provider: 'Technical', active: false }
                    ].map((font) => (
                      <div key={font.name} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white dark:bg-zinc-900 rounded-xl shadow-sm flex items-center justify-center text-zinc-400 group-hover:text-brand-600 transition-colors">
                            <Monitor className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">{font.name}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{font.provider}</p>
                          </div>
                        </div>
                        {font.active && (
                          <span className="text-[10px] font-black text-brand-600 bg-brand-50 dark:bg-brand-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-brand-100 dark:border-brand-500/20">Active</span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card title="Notification Preferences" description="Control how you receive updates and alerts.">
                  <div className="space-y-6">
                    {[
                      { id: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via your email address.' },
                      { id: 'pushNotifications', label: 'Push Notifications', desc: 'Receive real-time alerts in your browser.' },
                      { id: 'marketingEmails', label: 'Marketing Emails', desc: 'Newsletter and promotional content.' },
                      { id: 'securityAlerts', label: 'Security Alerts', desc: 'Critical alerts about your account security.' },
                      { id: 'newCustomerAlerts', label: 'New Customer Alerts', desc: 'Notify when a new customer signs up.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.label}</p>
                          <p className="text-xs text-zinc-500">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleNotification(item.id as keyof typeof notificationSettings)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            notificationSettings[item.id as keyof typeof notificationSettings] ? 'bg-brand-600' : 'bg-zinc-200 dark:bg-zinc-700'
                          }`}
                        >
                          <motion.div 
                            animate={{ x: notificationSettings[item.id as keyof typeof notificationSettings] ? 24 : 4 }}
                            className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card title="Privacy Settings" description="Manage your data and visibility.">
                  <div className="space-y-6">
                    {[
                      { id: 'profilePublic', label: 'Public Profile', desc: 'Allow anyone to see your public profile information.' },
                      { id: 'showEmail', label: 'Show Email Address', desc: 'Make your email visible to other verified users.' },
                      { id: 'analyticsEnabled', label: 'Usage Analytics', desc: 'Help us improve by sharing anonymous usage data.' },
                      { id: 'twoFactorEnabled', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.label}</p>
                          <p className="text-xs text-zinc-500">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => togglePrivacy(item.id as keyof typeof privacySettings)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            privacySettings[item.id as keyof typeof privacySettings] ? 'bg-brand-600' : 'bg-zinc-200 dark:bg-zinc-700'
                          }`}
                        >
                          <motion.div 
                            animate={{ x: privacySettings[item.id as keyof typeof privacySettings] ? 24 : 4 }}
                            className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card title="Session Management" description="Devices currently logged into your account.">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl shadow-sm text-brand-600">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Chrome on macOS</p>
                          <p className="text-xs text-zinc-500">San Francisco, US • Active now</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest">Current</span>
                    </div>
                    <button className="w-full py-3 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl hover:bg-red-100 transition-colors uppercase tracking-widest">
                      Sign out of all sessions
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card title="Subscription Plan" description="Manage your current plan and usage limits.">
                  <div className="p-6 bg-brand-600 rounded-[2rem] text-white shadow-xl shadow-brand-500/30">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100 mb-1 opacity-70">Current Plan</p>
                        <h4 className="text-2xl font-bold">Enterprise Pro</h4>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Yearly</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span>Usage (Customers)</span>
                          <span>75%</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-3/4" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <p className="text-xs font-medium text-brand-100">$299 / month</p>
                        <Button variant="outline" className="bg-white text-brand-600 hover:bg-brand-50 border-none px-4 py-1.5 text-xs">Upgrade</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="Payment Methods" description="Manage your credit cards and billing info.">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-6 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center">
                          <span className="text-[8px] font-bold text-zinc-400">VISA</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">•••• 4242</p>
                      </div>
                      <button className="text-xs font-bold text-zinc-400 hover:text-red-500">Remove</button>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs font-bold text-zinc-500 hover:border-brand-500 hover:text-brand-600 transition-all">
                      <Plus className="w-4 h-4" /> Add Payment Method
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

