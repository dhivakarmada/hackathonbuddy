import React from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Download,
  Bell
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', regs: 400 },
  { name: 'Tue', regs: 300 },
  { name: 'Wed', regs: 600 },
  { name: 'Thu', regs: 800 },
  { name: 'Fri', regs: 500 },
  { name: 'Sat', regs: 900 },
  { name: 'Sun', regs: 1200 },
];

const StatCard = ({ title, value, change, trend, icon: Icon }) => (
  <GlassCard className="p-6 space-y-4">
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary-text border border-border">
        <Icon size={20} />
      </div>
      <div className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {change}% {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-secondary">{title}</p>
      <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
    </div>
  </GlassCard>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-secondary text-sm font-medium">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl border border-border bg-white hover:bg-gray-50 transition-colors relative">
            <Bell size={20} className="text-secondary" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
          </button>
          <Button className="h-11 px-5 shadow-medium">
            <Plus size={18} className="mr-2" /> Create Event
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Registrations" value="2,482" change="12.5" trend="up" icon={Users} />
        <StatCard title="Active Events" value="12" change="4.2" trend="up" icon={Calendar} />
        <StatCard title="Conversion Rate" value="64.2%" change="2.1" trend="down" icon={TrendingUp} />
        <StatCard title="Total Revenue" value="₹4.2L" change="18.4" trend="up" icon={DollarSign} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold">Registration Velocity</h3>
              <p className="text-sm text-secondary">Number of participants joining per day</p>
            </div>
            <div className="flex bg-gray-50 p-1 rounded-lg border border-border">
              {['1D', '1W', '1M', '1Y'].map(t => (
                <button key={t} className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${t === '1W' ? 'bg-white shadow-soft text-primary-text' : 'text-secondary hover:text-primary-text'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                  itemStyle={{color: '#111827', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="regs" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRegs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-8 space-y-6">
          <h3 className="text-xl font-bold">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { name: 'John Doe', action: 'registered for', target: 'CodeRush Hack', time: '2m ago' },
              { name: 'Sarah Smith', action: 'checked in at', target: 'DevSpace 2026', time: '15m ago' },
              { name: 'Mike Johnson', action: 'created a new event', target: 'AI Builders', time: '1h ago' },
              { name: 'Jane Williams', action: 'verified payment for', target: 'MIT Hack', time: '3h ago' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 font-bold text-xs">
                  {item.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-primary-text">
                    <span className="font-bold">{item.name}</span> {item.action} <span className="font-bold">{item.target}</span>
                  </p>
                  <p className="text-xs text-secondary">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-black uppercase tracking-widest text-accent border border-accent/20 rounded-xl hover:bg-accent/5 transition-all">
            View All Activity
          </button>
        </GlassCard>
      </div>

      {/* Quick Actions / Tables Preview */}
      <GlassCard className="overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold">Active Registrations</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={14} />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-white border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
            </div>
            <button className="p-1.5 border border-border rounded-lg bg-white hover:bg-gray-50 transition-colors"><Filter size={14} className="text-secondary" /></button>
            <button className="p-1.5 border border-border rounded-lg bg-white hover:bg-gray-50 transition-colors"><Download size={14} className="text-secondary" /></button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black text-secondary uppercase tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-3">Participant</th>
              <th className="px-6 py-3">Event</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Revenue</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-border flex items-center justify-center font-bold text-[10px]">JD</div>
                    <div>
                      <p className="text-sm font-bold">John Doe</p>
                      <p className="text-xs text-secondary">john@example.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-secondary">DevSpace 2026</td>
                <td className="px-6 py-4">
                  <span className="badge-base bg-emerald-50 text-emerald-600">Checked-in</span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">₹499.00</td>
                <td className="px-6 py-4">
                  <button className="text-xs font-bold text-accent hover:underline">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 bg-gray-50/50 border-t border-border flex items-center justify-center">
          <button className="text-xs font-black text-secondary hover:text-primary-text transition-colors">View full table</button>
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
