import { useState, useRef, ChangeEvent } from 'react';
import { Camera, X, Eye, RefreshCw, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface ImageUploadViewerProps {
  onImageChange?: (file: File | null) => void;
  defaultImage?: string;
}

export function ImageUploadViewer({ onImageChange, defaultImage }: ImageUploadViewerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(defaultImage || null);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (onImageChange) onImageChange(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (inputRef.current) inputRef.current.value = '';
    if (onImageChange) onImageChange(null);
  };

  return (
    <div className="relative group">
      <div 
        className={cn(
          "relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-dashed transition-all cursor-pointer",
          selectedImage 
            ? "border-transparent" 
            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-brand-300"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => !selectedImage && inputRef.current?.click()}
      >
        <AnimatePresence mode="wait">
          {selectedImage ? (
            <motion.div 
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="w-full h-full object-cover" 
              />
              
              <motion.div 
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center gap-3 backdrop-blur-[2px]"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  className="p-3 bg-white hover:bg-zinc-100 text-zinc-900 rounded-2xl shadow-xl transition-all hover:scale-110"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-xl transition-all hover:scale-110"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center p-8 gap-4 text-center"
            >
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/20 group-hover:text-brand-600 transition-colors">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Click to upload cover image</p>
                <p className="text-xs text-zinc-500 mt-1">Recommened size 1200x630 (PNG, JPG)</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input 
        type="file" 
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <AnimatePresence>
        {selectedImage && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl shadow-xl pointer-events-none"
          >
            Resolution OK • Web Optimized
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
