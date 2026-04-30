import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/Card';
import { RichTextEditor } from '../components/RichTextEditor';
import { SoftImage } from '../components/SoftImage';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Eye, Save, Image as ImageIcon, Type, Trash2 } from 'lucide-react';

export default function EditorView() {
  const [content, setContent] = useState('<h2>Modern Dashboard Features</h2><p>This is a modern <strong>WYSIWYG editor</strong> integrated with Tailwind CSS. You can format text, create lists, and manage your content with ease.</p><ul><li>Soft Image Rendering</li><li>Motion Transitions</li><li>Typography Optimization</li></ul>');
  const [title, setTitle] = useState('New Project Draft');
  const [isPreview, setIsPreview] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string | null>("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop");

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFeaturedImage(url);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Content Editor</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Craft beautiful content with our rich text tools.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsPreview(!isPreview)}
            className="rounded-2xl"
          >
            {isPreview ? <><Type className="w-4 h-4 mr-2" /> Edit</> : <><Eye className="w-4 h-4 mr-2" /> Preview</>}
          </Button>
          <Button className="rounded-2xl bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/20">
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {!isPreview ? (
            <Card className="p-8">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Post Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-3xl font-extrabold bg-transparent border-none outline-none focus:ring-0 p-0 text-zinc-900 dark:text-zinc-100 placeholder:zinc-300"
                    placeholder="Enter title..."
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Featured Image</label>
                    {featuredImage && (
                      <button 
                        onClick={removeFeaturedImage}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    )}
                  </div>

                  {featuredImage ? (
                    <div className="group relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all">
                      <SoftImage 
                        src={featuredImage}
                        alt="Featured"
                        containerClassName="aspect-video"
                      />
                      <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="outline" 
                          className="bg-white border-none shadow-xl text-zinc-900"
                          onClick={() => setFeaturedImage(null)}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" /> Replace Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <FileUpload 
                      maxFiles={1} 
                      accept="image/*" 
                      onFilesSelected={handleFileSelected} 
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Body Content</label>
                  <RichTextEditor 
                    content={content} 
                    onChange={setContent} 
                  />
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 prose prose-zinc dark:prose-invert">
              {featuredImage && (
                <SoftImage 
                  src={featuredImage}
                  alt="Featured"
                  containerClassName="aspect-video rounded-3xl mb-8"
                />
              )}
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">Publishing</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 font-medium">Status</span>
                <Badge variant="warning">Draft</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 font-medium">Visibility</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">Public</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 font-medium">Word Count</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">{content.split(' ').length} words</span>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
              <Button className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 text-white">
                Publish Content
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-brand-600 border-none shadow-xl shadow-brand-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Collaboration</h3>
            <p className="text-brand-100 text-xs mb-6">Invite team members to edit this content in real-time.</p>
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <Avatar 
                  key={i} 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                  name={`User ${i}`}
                  className="border-2 border-brand-600"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-brand-600 bg-brand-500 flex items-center justify-center text-white text-[10px] font-bold">
                +4
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
