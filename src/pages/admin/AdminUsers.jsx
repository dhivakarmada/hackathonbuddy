import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Ban, 
  ShieldAlert, 
  Mail, 
  Calendar,
  ExternalLink,
  ChevronRight,
  UserPlus,
  UserMinus,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/Button';

const UserActionModal = ({ isOpen, onClose, user, action }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 shadow-large space-y-6"
        >
           <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mx-auto">
              <ShieldAlert size={32} />
           </div>
           <div className="text-center space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-primary-text">Confirm {action}</h3>
              <p className="text-sm text-secondary font-medium leading-relaxed">
                 Are you sure you want to {action.toLowerCase()} <strong>{user?.name}</strong>? This will restrict their access across the entire platform.
              </p>
           </div>
           <div className="flex gap-4">
              <Button variant="secondary" onClick={onClose} className="flex-1 h-12 font-bold">Cancel</Button>
              <Button className="flex-1 h-12 font-bold bg-rose-500 hover:bg-rose-600 border-rose-500">Confirm {action}</Button>
           </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const AdminUsers = () => {
  const [activeTab, setActiveTab] = useState('organizers');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const organizers = [
    { name: 'Arjun Mehta', email: 'arjun@techlabs.com', events: 12, status: 'Active', joined: 'Mar 12, 2026' },
    { name: 'Sarah Connor', email: 'sarah@res.io', events: 4, status: 'Active', joined: 'Apr 05, 2026' },
    { name: 'John Doe', email: 'john@hack.in', events: 8, status: 'Suspended', joined: 'Feb 20, 2026' },
    { name: 'Priya Sharma', email: 'priya@tech.org', events: 2, status: 'Active', joined: 'May 01, 2026' }
  ];

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setModalAction(action);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-primary-text">User Management</h1>
              <p className="text-sm text-secondary font-medium">Control organizers, volunteers, and platform participants.</p>
           </div>
           <div className="flex gap-3">
              <button className="h-11 px-5 rounded-xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text transition-all shadow-soft flex items-center gap-2">
                 <UserPlus size={18} /> New Admin
              </button>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-border">
           {['organizers', 'volunteers', 'participants'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`pb-4 px-2 text-sm font-bold capitalize transition-all relative ${
                 activeTab === tab ? 'text-blue-500' : 'text-secondary hover:text-primary-text'
               }`}
             >
                {tab}
                {activeTab === tab && <motion.div layoutId="userTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
             </button>
           ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                className="w-full h-11 pl-10 pr-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
           </div>
           <div className="flex gap-3">
              <button className="h-11 px-4 rounded-xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text transition-all flex items-center gap-2">
                 <Filter size={16} /> Filters
              </button>
           </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-border rounded-3xl shadow-soft overflow-hidden">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Member</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Events</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Joined Date</th>
                    <th className="px-6 py-4"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-border">
                 {organizers.map((user, i) => (
                   <tr key={i} className="hover:bg-gray-50/50 transition-all group">
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[10px] font-black text-white uppercase">
                               {user.name[0]}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-primary-text">{user.name}</p>
                               <p className="text-xs text-secondary font-medium">{user.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2 text-sm font-bold text-primary-text">
                            <Calendar size={14} className="text-blue-500" /> {user.events}
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>{user.status}</Badge>
                      </td>
                      <td className="px-6 py-5 text-xs font-medium text-secondary">{user.joined}</td>
                      <td className="px-6 py-5 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button 
                              onClick={() => handleAction(user, 'Suspend')}
                              className="p-2 rounded-lg text-secondary hover:text-amber-600 hover:bg-amber-50 transition-all"
                              title="Suspend"
                            >
                               <UserMinus size={18} />
                            </button>
                            <button 
                              onClick={() => handleAction(user, 'Ban')}
                              className="p-2 rounded-lg text-secondary hover:text-rose-600 hover:bg-rose-50 transition-all"
                              title="Ban"
                            >
                               <Ban size={18} />
                            </button>
                            <button className="p-2 rounded-lg text-secondary hover:text-primary-text hover:bg-gray-200 transition-all">
                               <MoreVertical size={18} />
                            </button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
           
           <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-gray-50/50">
              <p className="text-xs text-secondary font-medium">Showing <span className="font-bold text-primary-text">1-4</span> of <span className="font-bold text-primary-text">2.4k</span> users</p>
              <div className="flex gap-2">
                 <button className="h-9 px-4 rounded-xl border border-border bg-white text-[10px] font-black uppercase tracking-widest text-secondary disabled:opacity-40" disabled>Previous</button>
                 <button className="h-9 px-4 rounded-xl border border-border bg-white text-[10px] font-black uppercase tracking-widest text-secondary">Next</button>
              </div>
           </div>
        </div>

        <UserActionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          user={selectedUser} 
          action={modalAction} 
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
