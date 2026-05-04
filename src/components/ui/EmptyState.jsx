import React from 'react';
import { motion } from 'framer-motion';
import { 
  Inbox, 
  Search, 
  Plus, 
  Calendar, 
  Users, 
  QrCode, 
  BarChart3, 
  FileText 
} from 'lucide-react';
import Button from '../Button';

const EmptyState = ({ 
  icon: Icon = Inbox, 
  title = "No data yet", 
  desc = "There's nothing to show here at the moment.", 
  action, 
  onAction,
  actionIcon: ActionIcon = Plus,
  variant = 'center' // center, inline
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${
        variant === 'center' ? 'min-h-[400px]' : 'py-20'
      }`}
    >
      <div className="w-20 h-20 rounded-[32px] bg-gray-50 border border-border flex items-center justify-center text-secondary mb-6 shadow-soft">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <div className="max-w-xs space-y-2 mb-8">
        <h3 className="text-xl font-bold tracking-tight text-primary-text">{title}</h3>
        <p className="text-sm text-secondary font-medium leading-relaxed">{desc}</p>
      </div>

      {action && (
        <Button 
          onClick={onAction}
          className="h-12 px-6 font-bold shadow-medium"
        >
          {ActionIcon && <ActionIcon size={18} className="mr-2" />}
          {action}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
