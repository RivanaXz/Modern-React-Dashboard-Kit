import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { MultiInput } from '../components/MultiInput';
import { MultiSelect } from '../components/MultiSelect';
import { ImageUploadViewer } from '../components/ImageUploadViewer';
import { Switch } from '../components/Switch';
import { Checkbox } from '../components/Checkbox';
import { Progress } from '../components/Progress';
import { Skeleton } from '../components/Skeleton';
import { RadioGroup } from '../components/RadioGroup';
import { Tabs } from '../components/Tabs';
import { Alert } from '../components/Alert';
import { ChoiceGrid } from '../components/ChoiceGrid';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Box, MousePointer2, Type, Tag, Image as ImageIcon, CheckCircle2, AlertCircle, Info, Settings, Zap, Shield, Cpu, Cloud, ArrowRight, Heart, Share2, Plus } from 'lucide-react';

export default function ComponentsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState(['React', 'Tailwind', 'Motion']);
  const [selectedSkills, setSelectedSkills] = useState(['design']);
  const [progress, setProgress] = useState(65);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('one');
  const [activeTab, setActiveTab] = useState('tab1');
  const [showAlert, setShowAlert] = useState(true);
  const [choiceId, setChoiceId] = useState('one');

  const choiceOptions = [
    { id: 'one', title: 'Performance', description: 'Optimized for high-speed computation and low latency.', icon: Zap, badge: 'Fastest' },
    { id: 'two', title: 'Security', description: 'Advanced encryption and multi-layered protection.', icon: Shield },
    { id: 'three', title: 'Automation', description: 'AI-driven workflows and continuous integration.', icon: Cpu },
    { id: 'four', title: 'Scalability', description: 'Seamlessly grow your infrastructure as you scale.', icon: Cloud },
  ];

  const skillOptions = [
    { label: 'UI Design', value: 'design' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Management', value: 'management' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">UI Components</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Reusable building blocks for a consistent experience.</p>
        </div>
      </div>

      {/* Card Variations Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600">
            <Layout className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Card Variations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Image Overlay Card */}
          <div className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Abstract art"
            />
            {/* Overlay Gradient - subtle and effective for text legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="space-y-4">
                <Badge variant="primary" className="bg-white/20 backdrop-blur-md border-white/20 text-white">Art & Design</Badge>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white leading-none uppercase tracking-tighter">The Future of Digital Spaces</h3>
                  <p className="text-sm text-white/70 font-medium line-clamp-2">Exploring the intersection of brutalist architecture and virtual interaction in the modern era.</p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Author" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Felix Rivera</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors text-white">
                      <Heart className="w-4 h-4 fill-white" />
                    </button>
                    <button className="p-2.5 rounded-full bg-brand-600 border border-brand-500 hover:bg-brand-500 transition-colors text-white shadow-lg shadow-brand-600/30">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glassmorphism Action Card */}
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-950 p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col">
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-brand-500/20 rounded-full animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-2xl rotate-12 group hover:rotate-0 transition-transform duration-500">
                  <Cloud className="w-12 h-12 text-brand-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">Cloud Integration</h3>
                <p className="text-sm text-zinc-500 font-medium px-4">Connect your existing workflow to our secure cloud infrastructure effortlessly.</p>
              </div>
              <Button size="lg" className="w-full rounded-2xl h-14 uppercase font-black tracking-widest text-xs">Get Started Now</Button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className="h-full w-1/2 bg-brand-600 rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Detailed Card */}
          <div className="xl:col-span-1 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col items-stretch group">
             <div className="aspect-video relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Work Desk"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="success" className="backdrop-blur-md bg-emerald-500/90 text-white">Active Now</Badge>
                </div>
             </div>
             <div className="p-8 flex flex-col flex-1 justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-brand-600 uppercase tracking-widest">Hardware</p>
                      <h4 className="text-lg font-black text-zinc-900 dark:text-zinc-100 uppercase leading-none mt-1">Nerve Station X1</h4>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">The ultimate workhorse for machine learning and heavy-duty rendering. Optimized for the neural processing era.</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="Team Member" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Plus className="w-3 h-3 text-zinc-500" />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2 text-[10px] uppercase font-black tracking-widest">
                    Manage Set <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Badges & Status */}
        <Card title="Badges & Labels" description="Used for status updates and category labels.">
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">New Feature</Badge>
            <Badge variant="success" dot>Operational</Badge>
            <Badge variant="warning">Maintenance</Badge>
            <Badge variant="error" dot>Critical</Badge>
            <Badge variant="secondary">Draft</Badge>
            <Badge variant="outline">Enterprise</Badge>
          </div>
        </Card>

        {/* Loading Indicators */}
        <Card title="Loading & Progress" description="Communicating system activity and state.">
          <div className="space-y-6">
            <Progress value={progress} showValue />
            
            <div className="flex gap-4">
              <Button onClick={() => setProgress(Math.max(0, progress - 10))} variant="outline" size="sm">-10%</Button>
              <Button onClick={() => setProgress(Math.min(100, progress + 10))} variant="outline" size="sm">+10%</Button>
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Skeletons</p>
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Toggles & Controls */}
        <Card title="Toggles & Controls" description="Interactive elements for binary states.">
          <div className="space-y-8">
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Push Notifications</p>
                <p className="text-xs text-zinc-500">Receive alerts on your device.</p>
              </div>
              <Switch checked={isSwitchOn} onChange={setIsSwitchOn} />
            </div>

            <div className="space-y-4">
              <Checkbox 
                label="Subscribe to newsletter" 
                checked={isCheckboxChecked} 
                onChange={setIsCheckboxChecked} 
              />
              <Checkbox 
                label="Enterprise features enabled" 
                checked={true} 
                onChange={() => {}} 
                disabled 
              />
            </div>
          </div>
        </Card>

        {/* Interactive Inputs */}
        <Card title="Form Inputs" description="Standardized input components with status icons and validation." className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input 
              label="Username" 
              emblem="username" 
              placeholder="alex_rivera" 
              success
              hint="Username available"
            />
            <Input 
              label="Email Address" 
              emblem="email" 
              placeholder="alex@example.com" 
              error="Invalid email format"
              defaultValue="invalid-email"
            />
            <Input 
              label="Password" 
              emblem="password" 
              placeholder="••••••••" 
              isLoading
              hint="Checking strength..."
            />
            <Input 
              label="Search" 
              emblem="search" 
              placeholder="Find something..." 
              required
            />
          </div>
          
          <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-800/20 rounded-3xl border border-zinc-100 dark:border-zinc-800">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Sample Registration Form</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="First Name" 
                placeholder="Alex" 
                success
              />
              <Input 
                label="Last Name" 
                placeholder="Rivera" 
                error="Last name is required"
              />
            </div>
          </div>
        </Card>

        {/* Navigation & Structure */}
        <Card title="Navigation & Structure" description="Organizing content flow and layout.">
          <div className="space-y-6">
            <Tabs 
              activeTab={activeTab} 
              onChange={setActiveTab}
              tabs={[
                { id: 'tab1', label: 'Dashboard', icon: Layout },
                { id: 'tab2', label: 'Settings', icon: Settings },
                { id: 'tab3', label: 'History', icon: ImageIcon },
              ]}
            />
            
            <Tabs 
              variant="underline"
              activeTab={activeTab} 
              onChange={setActiveTab}
              tabs={[
                { id: 'tab1', label: 'Standard' },
                { id: 'tab2', label: 'Advanced' },
                { id: 'tab3', label: 'Expert' },
              ]}
            />
          </div>
        </Card>

        {/* Advanced Selection */}
        <Card title="Advanced Selection" description="Visual choice cards with icons and descriptions." className="lg:col-span-2">
          <ChoiceGrid 
            selectedId={choiceId}
            onChange={setChoiceId}
            options={choiceOptions}
            columns={2}
          />
        </Card>

        {/* Feedback & Alerts */}
        <Card title="Feedback & Alerts" description="Contextual notifications for user actions." className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {showAlert && (
                <Alert 
                  variant="info" 
                  title="System Update" 
                  closeable 
                  onClose={() => setShowAlert(false)}
                >
                  A new version of the dashboard is available. Please refresh to see changes.
                </Alert>
              )}
            </AnimatePresence>
            <Alert variant="success" title="Action Successful">
              Your profile has been updated successfully.
            </Alert>
            <Alert variant="warning" title="Approaching Limit">
              You have used 90% of your current storage quota.
            </Alert>
            <Alert variant="error" title="Critical Failure">
              Unable to connect to the primary database server.
            </Alert>
          </div>
          {!showAlert && (
            <div className="mt-4 flex justify-center">
              <Button size="sm" variant="outline" onClick={() => setShowAlert(true)}>Restore Info Alert</Button>
            </div>
          )}
        </Card>

        {/* Modal Demo */}
        <Card title="Modals & Overlays" description="Powerful dialogs with smooth transitions.">
          <div className="flex flex-col items-start gap-4">
            <p className="text-sm text-zinc-500">Trigger a focus-restricting dialog with full animation support.</p>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Layout className="w-4 h-4" />
              Open Modal
            </Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="New Project Details"
              footer={
                <>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsModalOpen(false)}>Create Project</Button>
                </>
              }
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Project Name</label>
                  <input className="w-full px-5 py-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20" placeholder="Enter name..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Target Keywords</label>
                  <MultiInput value={tags} onChange={setTags} />
                </div>
              </div>
            </Modal>
          </div>
        </Card>

        {/* Complex Multi-Inputs */}
        <Card title="Multi-Item Inputs" description="Handle complex user inputs effortlessly." allowOverflow>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Category Tags</label>
              <MultiInput value={tags} onChange={setTags} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Team Skills</label>
              <MultiSelect 
                options={skillOptions} 
                value={selectedSkills} 
                onChange={setSelectedSkills} 
              />
            </div>
          </div>
        </Card>

        {/* Image Uploader & Viewer */}
        <Card className="lg:col-span-2" title="Image Upload & Viewer" description="Integrated file input with instant preview and state management.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-sm text-zinc-500">
                A seamless image handling experience with hover controls and resolution validation.
              </p>
              <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 space-y-4">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Project Cover</span>
                </div>
                <ImageUploadViewer 
                    onImageChange={(file) => console.log('File changed:', file)}
                />
              </div>
            </div>
            <div className="p-8 rounded-[2rem] bg-zinc-900 text-white space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Technical Specs</span>
              </div>
              <div className="space-y-3 font-mono text-xs opacity-80">
                <p>• Uses ResizeObserver for fluid sizing</p>
                <p>• Native FileReader API for low latency</p>
                <p>• Framer Motion Layout animations</p>
                <p>• Dark mode optimized contrast</p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-3">Implementation</p>
                <code className="text-brand-400 block break-all">
                  &lt;ImageUploadViewer onImageChange={'{handleFile}'} /&gt;
                </code>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
