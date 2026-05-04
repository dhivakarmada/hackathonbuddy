import React from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Plus,
  Command,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Topbar = () => {
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <header className="h-16 bg-white border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary-text transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search registrations, events, or volunteers..." 
            className="w-full h-10 pl-10 pr-12 bg-gray-50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white border border-border rounded text-[10px] font-bold text-secondary">
            <Command size={10} /> K
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="h-10 px-4 bg-primary-text text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={16} /> Create Event
        </button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-secondary hover:text-primary-text transition-colors relative">
          <Bell size={18} />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-100 border border-border flex items-center justify-center text-xs font-bold">
              AM
            </div>
            <ChevronDown size={14} className={`text-secondary transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-2xl shadow-large p-2 z-50"
              >
                <div className="p-3 border-b border-border mb-1">
                  <p className="text-sm font-bold text-primary-text">Arjun Mehta</p>
                  <p className="text-xs text-secondary font-medium">arjun@hackathonbuddy.com</p>
                </div>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-sm text-secondary hover:text-primary-text hover:bg-gray-50 transition-all">
                  <User size={16} /> Profile Settings
                </button>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-sm text-secondary hover:text-primary-text hover:bg-gray-50 transition-all">
                  <Settings size={16} /> Team Management
                </button>
                <div className="h-px bg-border my-1" />
                <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-sm text-error hover:bg-error/5 transition-all">
                  <LogOut size={16} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
