import React from 'react';
import { QrCode, Download, Send, Search, Filter, RefreshCw, Smartphone, Zap } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import Badge from '../../components/ui/Badge';

const QRManagement = () => {
  const stats = [
    { label: 'Generated', value: '1,284', icon: QrCode, color: 'text-accent' },
    { label: 'Sent via Email', value: '1,250', icon: Send, color: 'text-emerald-500' },
    { label: 'Pending Payment', value: '34', icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Management</h1>
          <p className="text-secondary text-sm font-medium">Bulk generate, monitor, and distribute secure entry passes.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="h-10 text-xs font-bold shadow-soft">
            <RefreshCw size={14} className="mr-2" /> Sync Records
          </Button>
          <Button className="h-10 text-xs font-bold shadow-medium">
            <QrCode size={14} className="mr-2" /> Bulk Generate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="p-6 flex items-center gap-5 group hover:border-border transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gray-50 border border-border flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-secondary">{stat.label}</p>
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="overflow-hidden shadow-medium">
            <div className="p-6 border-b border-border bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-bold text-sm">Pass Distribution Queue</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                  <input type="text" placeholder="Search pass..." className="input-base pl-9 h-8 text-xs w-48" />
                </div>
                <button className="p-1.5 border border-border rounded-lg bg-white hover:bg-gray-50 transition-colors"><Filter size={14} className="text-secondary" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black text-secondary uppercase tracking-widest border-b border-border">
                  <tr>
                    <th className="px-6 py-3">Reference ID</th>
                    <th className="px-6 py-3">Owner</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-accent">#QR-9284-{idx}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold">Alex Rivera</p>
                          <p className="text-[10px] text-secondary font-medium">alex@rivera.com</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Delivered</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Resend</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50/30 border-t border-border flex justify-center">
              <button className="text-[10px] font-black text-secondary uppercase tracking-widest hover:text-accent transition-colors">View All Distributions</button>
            </div>
          </GlassCard>
        </div>

        {/* Side Controls */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold">Entry Pass Template</h3>
              <p className="text-xs text-secondary font-medium">Customize the look and data of your generated tickets.</p>
            </div>
            <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 text-secondary group hover:border-accent hover:bg-accent/5 transition-all">
              <QrCode size={48} className="opacity-20 group-hover:opacity-40" />
              <span className="text-[10px] font-black uppercase tracking-widest">Preview Pass</span>
            </div>
            <Button variant="secondary" className="w-full h-11 text-xs font-bold">
              Customize Design
            </Button>
          </GlassCard>

          <GlassCard className="p-6 space-y-4 bg-accent/5 border-accent/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                <Smartphone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Volunteer Access</h3>
                <p className="text-[10px] text-secondary font-medium uppercase tracking-widest">Device Sync Active</p>
              </div>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Scan from any mobile device by sharing the secure volunteer link. All data syncs atomically to prevent duplicate entry.
            </p>
            <button className="text-xs font-bold text-accent hover:underline">Generate Sync Key</button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default QRManagement;
