import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText,
  CreditCard,
  Users2,
  QrCode,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Rocket,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    {
      title: "Core",
      items: [
        { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Events', icon: Calendar, path: '/dashboard/events' },
        { name: 'Registrations', icon: Users, path: '/dashboard/registrations' },
      ]
    },
    {
      title: "Logistics",
      items: [
        { name: 'Form Builder', icon: FileText, path: '/dashboard/forms' },
        { name: 'QR & Check-ins', icon: QrCode, path: '/dashboard/check-ins' },
        { name: 'Volunteers', icon: Users2, path: '/dashboard/volunteers' },
      ]
    },
    {
      title: "Financials",
      items: [
        { name: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
        { name: 'Billing', icon: ShieldCheck, path: '/dashboard/billing' },
      ]
    },
    {
      title: "Engagement",
      items: [
        { name: 'Communication', icon: MessageSquare, path: '/dashboard/communication' },
        { name: 'Updates Feed', icon: Activity, path: '/dashboard/updates' },
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside 
      className={`sticky top-0 h-screen bg-white border-r border-border transition-all duration-300 flex flex-col z-50 shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-text rounded-lg flex items-center justify-center shrink-0">
            <Rocket className="text-white" size={16} />
          </div>
          {!collapsed && <span className="font-bold text-lg tracking-tight truncate">Hackathonbuddy</span>}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em] mb-2">
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${
                  location.pathname === item.path 
                    ? 'bg-gray-50 text-primary-text font-bold' 
                    : 'text-secondary hover:text-primary-text hover:bg-gray-50'
                }`}
              >
                <item.icon 
                  size={18} 
                  className={`transition-colors ${
                    location.pathname === item.path ? 'text-accent' : 'text-secondary/60 group-hover:text-secondary'
                  }`} 
                />
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          to="/dashboard/settings"
          className={`sidebar-link flex items-center gap-3 px-3 py-2 rounded-xl text-secondary hover:text-primary-text hover:bg-gray-50 transition-all ${
            location.pathname === '/dashboard/settings' ? 'bg-gray-50 text-primary-text font-bold' : ''
          }`}
        >
          <Settings size={18} />
          {!collapsed && <span className="text-sm">Settings</span>}
        </Link>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-error hover:bg-error/5 transition-all"
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-8 mt-4 flex items-center justify-center rounded-lg text-secondary/40 hover:text-secondary hover:bg-gray-50 transition-all"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
