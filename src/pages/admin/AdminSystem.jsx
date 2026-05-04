import React, { useState } from 'react';
import { 
  Database, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Activity, 
  Lock, 
  Eye, 
  Clock,
  Search,
  Filter,
  Download,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/Button';

const FeatureToggle = ({ title, desc, enabled, onToggle }) => (
  <div className="p-6 bg-white border border-border rounded-2xl flex items-center justify-between group hover:border-blue-500/20 transition-all">
    <div className="space-y-1">
       <p className="text-sm font-bold text-primary-text">{title}</p>
       <p className="text-xs text-secondary font-medium">{desc}</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${enabled ? 'bg-blue-500' : 'bg-gray-200'}`}
    >
       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${enabled ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

const AdminSystem = () => {
  const [flags, setFlags] = useState({
    payouts: true,
    betaScanner: false,
    aiSuggestions: true,
    maintenanceMode: false
  });

  const logs = [
    { action: 'Admin Login', user: 'Super Admin', ip: '192.168.1.1', time: '10m ago', status: 'success' },
    { action: 'Suspended Org', user: 'Super Admin', ip: '192.168.1.1', time: '1h ago', status: 'success' },
    { action: 'Failed Login', user: 'Unknown', ip: '45.12.33.1', time: '3h ago', status: 'failed' },
    { action: 'Feature Enabled', user: 'Super Admin', ip: '192.168.1.1', time: '5h ago', status: 'success' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-primary-text">System Control</h1>
              <p className="text-sm text-secondary font-medium">Global platform configuration, feature flags, and audit logs.</p>
           </div>
           <div className="flex gap-3">
              <Button variant="secondary" className="h-11 px-5 font-bold bg-white border-border shadow-soft">
                 <Download size={18} className="mr-2" /> Export Logs
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Left: Feature Flags */}
           <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                 <h3 className="font-bold text-lg flex items-center gap-2">
                    <Zap size={18} className="text-blue-500" /> Feature Flags
                 </h3>
                 <div className="space-y-4">
                    <FeatureToggle 
                      title="Automated Payouts" 
                      desc="Allow organizers to trigger instant payouts." 
                      enabled={flags.payouts} 
                      onToggle={() => setFlags({...flags, payouts: !flags.payouts})}
                    />
                    <FeatureToggle 
                      title="Beta Scanner" 
                      desc="Enable experimental edge-based QR scanning." 
                      enabled={flags.betaScanner} 
                      onToggle={() => setFlags({...flags, betaScanner: !flags.betaScanner})}
                    />
                    <FeatureToggle 
                      title="AI Form Builder" 
                      desc="Use LLMs to suggest form fields from description." 
                      enabled={flags.aiSuggestions} 
                      onToggle={() => setFlags({...flags, aiSuggestions: !flags.aiSuggestions})}
                    />
                 </div>
              </div>

              <div className="p-8 bg-rose-50 border border-rose-100 rounded-3xl space-y-6">
                 <div className="flex items-center gap-3 text-rose-600">
                    <AlertTriangle size={20} />
                    <h3 className="font-bold text-lg">Danger Zone</h3>
                 </div>
                 <div className="space-y-4">
                    <FeatureToggle 
                      title="Maintenance Mode" 
                      desc="Disable public access to the entire platform." 
                      enabled={flags.maintenanceMode} 
                      onToggle={() => setFlags({...flags, maintenanceMode: !flags.maintenanceMode})}
                    />
                    <Button className="w-full h-12 font-bold bg-rose-500 border-rose-500 hover:bg-rose-600">
                       Flush All Sessions
                    </Button>
                 </div>
              </div>
           </div>

           {/* Right: Audit Logs */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="font-bold text-lg flex items-center gap-2">
                    <Terminal size={18} className="text-blue-500" /> System Audit Logs
                 </h3>
                 <div className="flex gap-2">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                       <input 
                         type="text" 
                         placeholder="Filter logs..." 
                         className="h-9 pl-9 pr-4 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all w-48"
                       />
                    </div>
                 </div>
              </div>

              <div className="bg-white border border-border rounded-3xl shadow-soft overflow-hidden">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-gray-50 border-b border-border">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Action</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Actor</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">IP Address</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Status</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Time</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                       {logs.map((log, i) => (
                         <tr key={i} className="hover:bg-gray-50/50 transition-all">
                            <td className="px-6 py-5 text-sm font-bold text-primary-text">{log.action}</td>
                            <td className="px-6 py-5">
                               <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-[8px] font-black text-white uppercase">
                                     {log.user[0]}
                                  </div>
                                  <span className="text-xs font-medium text-secondary">{log.user}</span>
                               </div>
                            </td>
                            <td className="px-6 py-5 text-xs font-medium text-secondary font-mono">{log.ip}</td>
                            <td className="px-6 py-5">
                               <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            </td>
                            <td className="px-6 py-5 text-xs font-medium text-secondary">{log.time}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="p-6 bg-slate-900 text-slate-400 rounded-3xl font-mono text-[11px] leading-relaxed relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Activity size={40} />
                 </div>
                 <p className="text-slate-200 mb-2 font-bold tracking-tight uppercase tracking-widest opacity-60">Real-time Stream</p>
                 <p>[2026-05-03 09:56:12] INFO: Session garbage collection completed (cleared 142 stale sessions).</p>
                 <p>[2026-05-03 09:56:08] WARN: Multiple failed login attempts from 45.12.33.1 (Threshold reached).</p>
                 <p>[2026-05-03 09:55:54] INFO: API Key rotation initiated for Microservice: Payments.</p>
                 <p className="text-blue-400 mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" /> Listening for system events...
                 </p>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSystem;
