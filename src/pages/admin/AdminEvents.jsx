import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  ExternalLink, 
  Users, 
  CreditCard, 
  Activity,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Flag,
  ArrowUpRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/Button';

const EventMonitoringDrawer = ({ isOpen, onClose, event }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
        />
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-screen w-full max-w-2xl bg-white border-l border-border shadow-large z-[70] flex flex-col"
        >
          {/* Header */}
          <div className="h-16 px-8 border-b border-border flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
                <Badge variant="info">Event Oversight</Badge>
                <h2 className="font-bold text-lg">{event?.title}</h2>
             </div>
             <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-secondary">
                <X size={20} />
             </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
             <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Registrations', value: event?.regs, icon: Users, color: 'text-blue-500' },
                  { label: 'Revenue', value: '₹12.4k', icon: CreditCard, color: 'text-emerald-500' },
                  { label: 'Flags', value: '0', icon: Flag, color: 'text-amber-500' }
                ].map((stat, i) => (
                  <div key={i} className="p-6 border border-border rounded-2xl bg-gray-50 space-y-2">
                     <stat.icon size={18} className={stat.color} />
                     <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">{stat.label}</p>
                     <p className="text-xl font-bold text-primary-text">{stat.value}</p>
                  </div>
                ))}
             </div>

             <div className="space-y-6">
                <h3 className="font-bold text-lg">System Audit Log</h3>
                <div className="space-y-4">
                   {[
                     { action: 'Event Published', user: 'Arjun Mehta', time: '2h ago' },
                     { action: 'Payment Enabled', user: 'Arjun Mehta', time: '5h ago' },
                     { action: 'Volunteer Added', user: 'Priya S.', time: '1d ago' }
                   ].map((log, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 border border-border rounded-xl">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-blue-500" />
                           <p className="text-sm font-bold text-primary-text">{log.action}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-xs font-medium text-secondary">{log.user}</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">{log.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-border bg-gray-50 flex gap-4">
             <Button variant="secondary" className="flex-1 h-12 font-bold">Contact Organizer</Button>
             <Button className="flex-1 h-12 font-bold bg-rose-500 hover:bg-rose-600 border-rose-500">Unpublish Event</Button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AdminEvents = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    { title: 'DevSpace Hackathon 2026', org: 'TechLabs Global', regs: 520, status: 'Live', date: 'Mar 15' },
    { title: 'Cloud Native Sprint', org: 'DevX Community', regs: 310, status: 'Live', date: 'Apr 22' },
    { title: 'AI Safety Workshop', org: 'Startup Hub', regs: 145, status: 'Planning', date: 'Jun 02' },
    { title: 'DeFi Summit', org: 'Crypto Collective', regs: 890, status: 'Completed', date: 'Jan 10' }
  ];

  const handleRowClick = (event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-primary-text">Event Monitoring</h1>
              <p className="text-sm text-secondary font-medium">Platform-wide oversight of active, planned, and completed events.</p>
           </div>
        </div>

        {/* Global Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'Live Events', value: '24', icon: Activity, color: 'text-blue-500' },
             { label: 'Active Participants', value: '12.8k', icon: Users, color: 'text-emerald-500' },
             { label: 'Pending Payouts', value: '₹1.2M', icon: CreditCard, color: 'text-amber-500' },
             { label: 'Avg Rating', value: '4.8/5', icon: ShieldCheck, color: 'text-indigo-500' }
           ].map((stat, i) => (
             <div key={i} className="p-4 bg-white border border-border rounded-2xl shadow-soft flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">{stat.label}</p>
                   <p className="text-lg font-bold text-primary-text">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
              <input 
                type="text" 
                placeholder="Search events by title or organizer..." 
                className="w-full h-11 pl-10 pr-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
           </div>
           <div className="flex gap-3">
              <button className="h-11 px-4 rounded-xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text transition-all flex items-center gap-2">
                 <Filter size={16} /> Filters
              </button>
           </div>
        </div>

        {/* Events Table */}
        <div className="bg-white border border-border rounded-3xl shadow-soft overflow-hidden">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Event</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Organizer</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Registrations</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Date</th>
                    <th className="px-6 py-4"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-border">
                 {events.map((event, i) => (
                   <tr 
                     key={i} 
                     onClick={() => handleRowClick(event)}
                     className="hover:bg-gray-50/50 transition-all group cursor-pointer"
                   >
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-black">
                               {event.title[0]}
                            </div>
                            <div className="max-w-xs truncate">
                               <p className="text-sm font-bold text-primary-text">{event.title}</p>
                               <p className="text-xs text-secondary font-medium">ID: DEVSPACE-2026</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-primary-text">{event.org}</td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2 text-sm font-bold text-primary-text">
                            <Users size={14} className="text-blue-500" /> {event.regs}
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <Badge variant={event.status === 'Live' ? 'success' : event.status === 'Completed' ? 'secondary' : 'info'}>
                            {event.status}
                         </Badge>
                      </td>
                      <td className="px-6 py-5 text-xs font-medium text-secondary">{event.date}</td>
                      <td className="px-6 py-5 text-right">
                         <button className="p-2 rounded-lg text-secondary opacity-0 group-hover:opacity-100 transition-all">
                            <MoreHorizontal size={18} />
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <EventMonitoringDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          event={selectedEvent} 
        />
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;
