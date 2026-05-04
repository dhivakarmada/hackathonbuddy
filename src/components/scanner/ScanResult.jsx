import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScanResult = ({ status, data, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const configs = {
    success: {
      bg: 'bg-emerald-500',
      icon: CheckCircle2,
      title: 'Entry Allowed',
      color: 'text-emerald-500',
      border: 'border-emerald-100'
    },
    warning: {
      bg: 'bg-amber-500',
      icon: AlertCircle,
      title: 'Already Used',
      color: 'text-amber-500',
      border: 'border-amber-100'
    },
    error: {
      bg: 'bg-rose-500',
      icon: XCircle,
      title: 'Invalid Pass',
      color: 'text-rose-500',
      border: 'border-rose-100'
    }
  };

  const config = configs[status] || configs.error;
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl"
      >
        <div className={`h-2 ${config.bg}`} />
        
        <div className="p-8 text-center space-y-8">
           <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${config.color} bg-gray-50 border ${config.border}`}>
              <Icon size={40} />
           </div>

           <div className="space-y-2">
              <h2 className={`text-2xl font-bold tracking-tight ${config.color}`}>{config.title}</h2>
              <p className="text-sm text-secondary font-medium">
                {status === 'success' ? 'Participant is verified.' : 
                 status === 'warning' ? 'This QR has been scanned before.' :
                 'This pass is not valid for this event.'}
              </p>
           </div>

           {data && (
             <div className="p-4 bg-gray-50 border border-border rounded-2xl flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center text-secondary">
                   <User size={18} />
                </div>
                <div className="min-w-0">
                   <p className="text-sm font-bold text-primary-text truncate">{data.name || 'Unknown'}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">{data.id || 'N/A'}</p>
                </div>
             </div>
           )}

           <button 
             onClick={onDismiss}
             className="w-full h-12 rounded-xl bg-gray-100 text-xs font-black uppercase tracking-widest text-secondary hover:text-primary-text transition-all"
           >
              Next Scan <ArrowRight size={14} className="inline ml-1" />
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScanResult;
