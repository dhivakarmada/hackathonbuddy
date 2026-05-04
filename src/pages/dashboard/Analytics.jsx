import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  ChevronRight, 
  ArrowUpRight, 
  Calendar,
  Globe,
  Smartphone,
  Download,
  Filter
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-text">Advanced Analytics</h1>
          <p className="text-secondary text-sm font-medium">Deep insights into event performance and participant behavior.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="h-10 text-xs font-bold shadow-soft">
            <Filter size={14} className="mr-2" /> 2026 Reports
          </Button>
          <Button className="h-10 text-xs font-bold shadow-medium">
            <Download size={14} className="mr-2" /> Generate Full Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Conversion', value: '78.2%', trend: '+4.2%', icon: TrendingUp },
          { label: 'Unique Visitors', value: '12.4K', trend: '+12.5%', icon: Globe },
          { label: 'Scan Velocity', value: '120/hr', trend: '+18.2%', icon: Zap },
          { label: 'Mobile Users', value: '84.2%', trend: '-2.1%', icon: Smartphone },
        ].map((kpi, idx) => (
          <GlassCard key={idx} className="p-6 space-y-3 group hover:border-border transition-all">
            <div className="flex justify-between items-start">
              <div className="w-9 h-9 rounded-lg bg-gray-50 border border-border flex items-center justify-center text-secondary group-hover:text-accent transition-colors">
                <kpi.icon size={18} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${kpi.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.1em] text-secondary">{kpi.label}</p>
              <h3 className="text-2xl font-bold tracking-tight">{kpi.value}</h3>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Chart */}
        <GlassCard className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Growth Trend</h3>
              <p className="text-sm text-secondary font-medium">Monthly registration velocity across all events.</p>
            </div>
            <select className="h-9 px-3 rounded-lg border border-border bg-gray-50 text-[10px] font-black uppercase tracking-widest outline-none">
              <option>Last 6 Months</option>
              <option>Year 2026</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11, fontWeight: '600'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11, fontWeight: '600'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                  itemStyle={{color: '#111827', fontWeight: 'bold'}}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Distribution Chart */}
        <GlassCard className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Event Share</h3>
              <p className="text-sm text-secondary font-medium">Registration distribution by hackathon type.</p>
            </div>
            <div className="flex gap-2">
               <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-gray-50"><Download size={14} /></button>
            </div>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Internal', value: 400 },
                    { name: 'Open', value: 300 },
                    { name: 'Invited', value: 300 },
                    { name: 'Corporate', value: 200 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {[1, 2, 3, 4].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 pr-8">
              {['Internal', 'Open', 'Invited', 'Corporate'].map((label, idx) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx]}} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Top Events Table */}
      <GlassCard className="overflow-hidden shadow-medium">
        <div className="p-6 border-b border-border bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-bold text-sm">Top Performance Indices</h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Full Ranking</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black text-secondary uppercase tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-4">Event Name</th>
              <th className="px-6 py-4">Total Reach</th>
              <th className="px-6 py-4">Conversion</th>
              <th className="px-6 py-4">ROI Status</th>
              <th className="px-6 py-4 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { name: 'DevSpace 2026', reach: '12,482', conv: '84%', roi: 'High' },
              { name: 'CodeRush Hack', reach: '4,500', conv: '62%', roi: 'Moderate' },
              { name: 'AI Builders 2.0', reach: '2,800', conv: '45%', roi: 'Stable' },
            ].map((event, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-sm">{event.name}</td>
                <td className="px-6 py-4 text-sm font-medium text-secondary">{event.reach}</td>
                <td className="px-6 py-4">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{width: event.conv}} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="info">{event.roi}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <ArrowUpRight className="ml-auto text-emerald-500" size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default Analytics;
