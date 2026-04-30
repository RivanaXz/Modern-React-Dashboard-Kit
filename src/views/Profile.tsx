import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, MapPin, Link as LinkIcon, Calendar, Github, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="relative h-48 rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>
      
      <div className="relative px-8 -mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-end gap-6">
            <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-zinc-950 shadow-xl overflow-hidden bg-white">
               <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                  alt="Avatar" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
            </div>
            <div className="pb-2">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Alex Rivera</h1>
              <p className="text-zinc-500 font-medium">Senior Product Designer</p>
            </div>
          </div>
          <div className="flex gap-3 pb-2">
            <Button variant="outline">Message</Button>
            <Button>Follow</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2 space-y-8">
            <Card title="About">
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Passionate about creating beautiful and functional user experiences. I specialize in design systems, interaction design, and front-end development. Currently building modern dashboard templates and exploring the future of AI in design.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Location', value: 'San Francisco, CA', icon: MapPin },
                  { label: 'Website', value: 'alexrivera.design', icon: LinkIcon },
                  { label: 'Joined', value: 'March 2024', icon: Calendar },
                  { label: 'Projects', value: '24 Active', icon: User },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-500">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {[
                 { label: 'Followers', value: '1,284' },
                 { label: 'Following', value: '492' },
                 { label: 'Likes', value: '9.4k' },
               ].map(stat => (
                 <div key={stat.label}>
                   <Card className="text-center py-6">
                     <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
                     <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">{stat.label}</p>
                   </Card>
                 </div>
               ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card title="Connect">
              <div className="space-y-4">
                {[
                 { name: 'Github', icon: Github, color: 'hover:text-zinc-900 dark:hover:text-white' },
                 { name: 'Twitter', icon: Twitter, color: 'hover:text-blue-400' },
                 { name: 'Linkedin', icon: Linkedin, color: 'hover:text-blue-700' },
                ].map(social => (
                  <button key={social.name} className={`w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all group ${social.color}`}>
                    <div className="flex items-center gap-3">
                      <social.icon className="w-5 h-5 text-zinc-400 group-hover:text-inherit" />
                      <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-inherit">{social.name}</span>
                    </div>
                    <LinkIcon className="w-4 h-4 text-zinc-300 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </Card>

            <div className="bg-brand-600 rounded-3xl p-6 text-white text-center">
               <h3 className="font-bold text-lg mb-2">Available for hire</h3>
               <p className="text-sm text-brand-100 mb-6">Currently looking for new opportunities in Product Design.</p>
               <Button className="w-full bg-white text-brand-600 hover:bg-brand-50 border-none">Send Inquiry</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
