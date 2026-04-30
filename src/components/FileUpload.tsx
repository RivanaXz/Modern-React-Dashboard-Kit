import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, File, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
}

interface FileStatus {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  id: string;
}

export function FileUpload({ onFilesSelected, maxFiles = 5, accept = "*" }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileStatus[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;

    const newFiles = Array.from(incomingFiles).slice(0, maxFiles - files.length).map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
      id: Math.random().toString(36).substr(2, 9)
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress for each new file
    newFiles.forEach(fileObj => {
      simulateProgress(fileObj.id);
    });

    if (onFilesSelected) {
      onFilesSelected(newFiles.map(f => f.file));
    }
  };

  const simulateProgress = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 100, status: 'completed' } : f));
        clearInterval(interval);
      } else {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress } : f));
      }
    }, 500);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4 w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer group ${
          isDragging 
            ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-500/10 scale-[0.99]' 
            : 'border-zinc-200 dark:border-zinc-800 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onInputChange} 
          multiple 
          accept={accept}
          className="hidden" 
        />
        
        <div className={`p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/20 mb-4 transition-colors ${isDragging ? 'bg-brand-100 dark:bg-brand-500/30 text-brand-600' : 'text-zinc-400'}`}>
          <Upload className={`w-8 h-8 transition-transform group-hover:-translate-y-1 ${isDragging ? 'text-brand-600 animate-bounce' : ''}`} />
        </div>
        
        <div className="text-center">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            {isDragging ? 'Drop your files here' : 'Click or drag files to upload'}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            PNG, JPG, PDF up to 10MB
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-[10px] font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">
          {files.length} / {maxFiles} Files
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {files.map((fileObj) => (
            <motion.div
              key={fileObj.id}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-4 overflow-hidden"
            >
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-zinc-500 shrink-0">
                <File className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate pr-4">
                    {fileObj.file.name}
                  </p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(fileObj.id); }}
                    className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${fileObj.progress}%` }}
                      className={`h-full rounded-full transition-colors ${
                        fileObj.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-500'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 w-8 text-right">
                    {Math.round(fileObj.progress)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                    {formatSize(fileObj.file.size)}
                  </p>
                  <div className="flex items-center gap-1">
                    {fileObj.status === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Ready</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-zinc-300 animate-pulse" />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Uploading</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
