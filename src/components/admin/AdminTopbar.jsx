import React from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  Globe, 
  Zap,
  CheckCircle2,
  Command
} from 'lucide-react';

const AdminTopbar = () => {
  return (
    <header className="h-16 bg-white border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary-text transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Global search: events, users, transactions..." 
            className="w-full h-10 pl-10 pr-12 bg-gray-50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white border border-border rounded text-[10px] font-bold text-secondary">
            <Command size={10} /> S
          </div>
        </div>
      </div>

      {/* System Health & Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">All Systems Operational</span>
        </div>

        <div className="flex items-center gap-2">
           <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-secondary hover:text-primary-text transition-colors relative">
             <Bell size={18} />
             <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
           </button>
           <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-secondary hover:text-primary-text transition-colors">
             <Settings size={18} />
           </button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex items-center gap-3">
           <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-primary-text leading-none">Super Admin</p>
              <p className="text-[10px] font-medium text-secondary mt-1">Platform Control</p>
           </div>
           <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] font-black text-white uppercase">
              SA
           </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
