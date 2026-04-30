import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Dropdown } from '../components/Dropdown';
import { Folder, MoreHorizontal, Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
  { id: 1, name: 'Brand Redesign', client: 'Acme Corp', status: 'In Progress', progress: 65 },
  { id: 2, name: 'Mobile App', client: 'Globex', status: 'Completed', progress: 100 },
  { id: 3, name: 'Dashboard UI', client: 'Initech', status: 'In Progress', progress: 30 },
  { id: 4, name: 'E-commerce', client: 'Umbrella', status: 'Planning', progress: 10 },
];

export default function Projects() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Projects</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage and track your active projects.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id}>
            <Card className="group hover:border-brand-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-brand-50 group-hover:text-brand-600 dark:group-hover:bg-brand-500/10 transition-colors">
                  <Folder className="w-6 h-6" />
                </div>
                <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                  <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{project.name}</h3>
              <p className="text-sm text-zinc-500 mb-6">{project.client}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-500">Progress</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-brand-600 rounded-full" 
                  />
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <Badge 
                  variant={
                    project.status === 'Completed' ? 'success' :
                    project.status === 'Planning' ? 'zinc' : 'brand'
                  }
                >
                  {project.status}
                </Badge>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <Avatar 
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.id + i}`}
                      name={`Member ${i}`}
                      size="sm"
                      className="border-2 border-white dark:border-zinc-900"
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
