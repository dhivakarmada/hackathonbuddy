import React from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Database,
  Globe
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Overview', icon: Activity, path: '/admin' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Events', icon: Calendar, path: '/admin/events' },
    { name: 'Payments', icon: CreditCard, path: '/admin/payments' },
    { name: 'System', icon: Database, path: '/admin/system' },
  ];

  return (
    <aside 
      className={`sticky top-0 h-screen bg-[#0F172A] text-slate-400 border-r border-slate-800 transition-all duration-300 flex flex-col z-50 shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <ShieldCheck className="text-white" size={16} />
          </div>
          {!collapsed && <span className="font-bold text-lg tracking-tight text-white">Platform Admin</span>}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
        {!collapsed && <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Management</p>}
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-500/10 text-white font-bold border border-blue-500/20' 
                  : 'hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <item.icon 
                size={18} 
                className={`transition-colors ${
                  isActive ? 'text-blue-400' : 'group-hover:text-slate-200'
                }`} 
              />
              {!collapsed && <span className="text-sm">{item.name}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-1">
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">Exit Admin</span>}
        </button>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-8 mt-4 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-300 hover:bg-slate-800/50 transition-all"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
