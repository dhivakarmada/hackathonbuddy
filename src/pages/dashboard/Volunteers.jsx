import React, { useState } from 'react';
import { 
  Users2, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Lock,
  Search,
  MoreVertical,
  Mail,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/Button';

const Volunteers = () => {
  const [activeTab, setActiveTab] = useState('team');

  const volunteers = [
    { name: 'Alex Rivera', email: 'alex@hack.com', role: 'Admin', status: 'Active', permissions: 'Full Access' },
    { name: 'Priya Sharma', email: 'priya@tech.com', role: 'Scanner', status: 'Active', permissions: 'Scan Only' },
    { name: 'Kevin Zhang', email: 'kevin@eng.com', role: 'Scanner', status: 'Invited', permissions: 'Scan Only' },
    { name: 'Sarah Connor', email: 'sarah@res.io', role: 'Viewer', status: 'Active', permissions: 'Read Only' }
  ];

  const permissions = [
    { module: 'Events', admin: true, scanner: false, viewer: true },
    { module: 'Registrations', admin: true, scanner: false, viewer: true },
    { module: 'QR Scanning', admin: true, scanner: true, viewer: false },
    { module: 'Payments', admin: true, scanner: false, viewer: false },
    { module: 'Team Management', admin: true, scanner: false, viewer: false }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-primary-text">Team & Permissions</h1>
              <p className="text-sm text-secondary font-medium">Manage organizers and volunteers for your events.</p>
           </div>
           <Button className="h-11 px-5 font-bold shadow-medium">
              <UserPlus size={18} className="mr-2" /> Invite Member
           </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-border">
           {[
             { id: 'team', name: 'Team Members', icon: Users2 },
             { id: 'roles', name: 'Roles & Permissions', icon: ShieldCheck }
           ].map((tab) => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`pb-4 px-2 text-sm font-bold transition-all flex items-center gap-2 relative ${
                 activeTab === tab.id ? 'text-primary-text' : 'text-secondary hover:text-primary-text'
               }`}
             >
                <tab.icon size={16} />
                {tab.name}
                {activeTab === tab.id && <motion.div layoutId="teamTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
             </button>
           ))}
        </div>

        {activeTab === 'team' ? (
          <div className="space-y-6">
             {/* Search */}
             <div className="max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                <input 
                  type="text" 
                  placeholder="Search members by name or email..." 
                  className="w-full h-11 pl-10 pr-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                />
             </div>

             {/* Team Table */}
             <div className="card-surface bg-white shadow-soft border border-border overflow-hidden">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-gray-50 border-b border-border">
                         <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Member</th>
                         <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Role</th>
                         <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Status</th>
                         <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Permissions</th>
                         <th className="px-6 py-4"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                      {volunteers.map((member, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-all group">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                 <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-secondary">
                                    {member.name[0]}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-primary-text">{member.name}</p>
                                    <p className="text-xs text-secondary font-medium">{member.email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <Badge variant={member.role === 'Admin' ? 'info' : 'secondary'}>{member.role}</Badge>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`text-xs font-bold ${member.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                 {member.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-xs font-medium text-secondary">{member.permissions}</td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-2 rounded-lg hover:bg-gray-200 text-secondary opacity-0 group-hover:opacity-100 transition-all">
                                 <MoreVertical size={16} />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             {/* Permissions Matrix */}
             <div className="lg:col-span-8 space-y-8">
                <div className="card-surface bg-white shadow-soft border border-border overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-gray-50 border-b border-border">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Module</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary text-center">Admin</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary text-center">Scanner</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary text-center">Viewer</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                         {permissions.map((p, i) => (
                           <tr key={i} className="hover:bg-gray-50/50 transition-all">
                              <td className="px-6 py-5 text-sm font-bold text-primary-text">{p.module}</td>
                              <td className="px-6 py-5">
                                 <div className="flex justify-center">
                                    {p.admin ? <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-white"><Check size={12} /></div> : <X size={16} className="text-gray-200" />}
                                 </div>
                              </td>
                              <td className="px-6 py-5">
                                 <div className="flex justify-center">
                                    {p.scanner ? <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-white"><Check size={12} /></div> : <X size={16} className="text-gray-200" />}
                                 </div>
                              </td>
                              <td className="px-6 py-5">
                                 <div className="flex justify-center">
                                    {p.viewer ? <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-white"><Check size={12} /></div> : <X size={16} className="text-gray-200" />}
                                 </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Role Descriptions */}
             <div className="lg:col-span-4 space-y-6">
                <div className="p-8 border border-border bg-white rounded-3xl space-y-8">
                   <h3 className="font-bold text-lg flex items-center gap-2"><Lock size={18} className="text-accent" /> Role Hierarchy</h3>
                   <div className="space-y-8">
                      {[
                        { title: 'Admin', desc: 'Full control over events, billing, and team.' },
                        { title: 'Scanner', desc: 'Limited access: only QR check-in and scan logs.' },
                        { title: 'Viewer', desc: 'Read-only access to registrations and analytics.' }
                      ].map((role, i) => (
                        <div key={i} className="space-y-2">
                           <p className="text-sm font-bold text-primary-text">{role.title}</p>
                           <p className="text-xs text-secondary font-medium leading-relaxed">{role.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
                
                <div className="p-6 bg-accent/[0.03] border border-accent/10 rounded-2xl flex gap-4">
                   <ShieldCheck className="text-accent shrink-0" size={20} />
                   <p className="text-xs text-secondary font-medium leading-relaxed">
                      Permissions are enforced at the API level. Volunteers will only see modules authorized for their assigned role.
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Volunteers;
