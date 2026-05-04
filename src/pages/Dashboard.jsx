import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardContent from './dashboard/Dashboard';
import Events from './dashboard/Events';
import Registrations from './dashboard/Registrations';
import Analytics from './dashboard/Analytics';
import QRManagement from './dashboard/QRManagement';
import Settings from './dashboard/Settings';
import { Search, Bell, User, Menu } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary-text transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search registrations, events..." 
            className="w-full h-10 bg-gray-50 border border-border rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-secondary/60"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors group">
          <Bell size={18} className="text-secondary group-hover:text-primary-text transition-colors" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full border-2 border-white" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-primary-text">Admin User</p>
            <p className="text-[10px] text-secondary font-medium uppercase tracking-wider">Organizer</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gray-100 border border-border flex items-center justify-center">
            <User size={18} className="text-secondary" />
          </div>
        </div>
        <button className="md:hidden p-2"><Menu size={20} /></button>
      </div>
    </header>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="p-8 max-w-[1400px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/events" element={<Events />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="/qr-management" element={<QRManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
