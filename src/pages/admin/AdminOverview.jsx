import React from 'react';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Activity,
  Server,
  Zap,
  Globe,
  Database,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';

const KpiCard = ({ title, value, change, trend, icon: Icon }) => (
  <div className="bg-white border border-border p-6 rounded-2xl shadow-soft group hover:border-blue-500/20 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 mb-1">{title}</p>
    <p className="text-3xl font-bold text-primary-text">{value}</p>
  </div>
);

const AdminOverview = () => {
  const data = [
    { name: 'Jan', regs: 400, events: 240 },
    { name: 'Feb', regs: 300, events: 139 },
    { name: 'Mar', regs: 200, events: 980 },
    { name: 'Apr', regs: 278, events: 390 },
    { name: 'May', regs: 189, events: 480 },
    { name: 'Jun', regs: 239, events: 380 },
    { name: 'Jul', regs: 349, events: 430 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
             <h1 className="text-2xl font-bold tracking-tight text-primary-text">Platform Overview</h1>
             <p className="text-sm text-secondary font-medium">Global health and performance metrics for Hackathonbuddy.</p>
          </div>
          <div className="flex gap-4 px-4 py-2 bg-white border border-border rounded-xl">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">API: 99.9%</span>
             </div>
             <div className="w-px h-3 bg-border mt-0.5" />
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">DB: 12ms</span>
             </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <KpiCard title="Total Users" value="24.8k" change="+12.5%" trend="up" icon={Users} />
           <KpiCard title="Total Events" value="1,420" change="+8.2%" trend="up" icon={Calendar} />
           <KpiCard title="Total Registrations" value="154k" change="+24.1%" trend="up" icon={Activity} />
           <KpiCard title="Total Revenue" value="₹84.2M" change="-2.4%" trend="down" icon={CreditCard} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white border border-border rounded-3xl p-8 shadow-soft h-[450px] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-bold text-lg flex items-center gap-2">
                    <TrendingUp size={18} className="text-blue-500" /> Platform Growth
                 </h3>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                       <div className="w-2 h-2 rounded-full bg-blue-500" /> Registrations
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                       <div className="w-2 h-2 rounded-full bg-slate-300" /> Events Created
                    </div>
                 </div>
              </div>
              <div className="flex-1 min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                       <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                       <Area type="monotone" dataKey="regs" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRegs)" />
                       <Area type="monotone" dataKey="events" stroke="#94a3b8" strokeWidth={2} fillOpacity={0} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white border border-border rounded-3xl p-8 shadow-soft h-[450px] flex flex-col">
              <h3 className="font-bold text-lg mb-8 flex items-center gap-2">
                 <Server size={18} className="text-blue-500" /> System Resources
              </h3>
              <div className="space-y-8 overflow-y-auto custom-scrollbar pr-2">
                 {[
                   { label: 'API Response Time', value: '124ms', status: 'optimal', icon: Zap },
                   { label: 'Database Load', value: '34%', status: 'optimal', icon: Database },
                   { label: 'Edge Nodes', value: '24 Active', status: 'optimal', icon: Globe },
                   { label: 'Auth Success Rate', value: '99.98%', status: 'optimal', icon: ShieldCheck }
                 ].map((metric, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-gray-50 border border-border flex items-center justify-center text-slate-400">
                            <metric.icon size={18} />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-primary-text">{metric.label}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{metric.status}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-black text-primary-text">{metric.value}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-auto pt-8">
                 <button className="w-full h-12 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                    View Infrastructure Details
                 </button>
              </div>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white border border-border rounded-3xl p-8 shadow-soft">
              <h3 className="font-bold text-lg mb-6">Recent Organizers</h3>
              <div className="space-y-6">
                 {[
                   { name: 'TechLabs Global', email: 'hello@techlabs.com', events: 12, date: '2h ago' },
                   { name: 'DevX Community', email: 'admin@devx.org', events: 4, date: '5h ago' },
                   { name: 'Startup Hub', email: 'contact@shub.io', events: 8, date: '1d ago' }
                 ].map((org, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-gray-50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-black">
                            {org.name[0]}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-primary-text">{org.name}</p>
                            <p className="text-xs text-secondary font-medium">{org.email}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-primary-text">{org.events} Events</p>
                         <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">{org.date}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white border border-border rounded-3xl p-8 shadow-soft h-[350px] flex flex-col">
              <h3 className="font-bold text-lg mb-8">Payout Requests</h3>
              <div className="flex-1 overflow-y-auto space-y-4">
                 {[
                   { org: 'Campus Events', amount: '₹12,400', status: 'Pending' },
                   { org: 'Hack India', amount: '₹45,000', status: 'Pending' },
                   { org: 'AI Council', amount: '₹2,500', status: 'Pending' }
                 ].map((p, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border">
                      <div>
                         <p className="text-sm font-bold text-primary-text">{p.org}</p>
                         <p className="text-xs text-secondary font-medium">{p.amount}</p>
                      </div>
                      <button className="h-8 px-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all">
                         Approve
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
