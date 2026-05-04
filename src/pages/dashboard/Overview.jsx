import React from 'react';
import { 
  Users, 
  QrCode, 
  CreditCard, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChevronRight,
  TrendingUp as TrendIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { subscribeToEventStats, subscribeToRecentRegistrations } from '../../firebase/services';

const StatCard = ({ title, value, change, trend, icon: Icon }) => (
  <div className="card-surface p-6 bg-white shadow-soft flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-border flex items-center justify-center text-secondary">
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div className="mt-4 space-y-1">
      <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">{title}</p>
      <p className="text-2xl font-bold text-primary-text">{value}</p>
    </div>
  </div>
);

const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalCheckins: 0,
    revenue: 0,
    activeEvents: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [regData, setRegData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    // 1. Listen to Event Aggregated Stats (Real-time)
    const eventId = 'DEVSPACE-2026'; // Currently hardcoded
    const unsubscribeStats = subscribeToEventStats(eventId, (data) => {
      setStats({
        totalRegistrations: data.totalRegistrations || 0,
        totalCheckins: data.totalCheckins || 0,
        revenue: data.totalRevenue || 0,
        activeEvents: 1 // Since we are viewing one event
      });
      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    // 2. Listen to Recent Activity & Build Trend Data
    const unsubscribeActivity = subscribeToRecentRegistrations(50, (registrations) => {
      // Activity Feed
      const activities = registrations.slice(0, 5).map(reg => ({
        type: reg.paymentStatus === 'paid' ? 'registration' : 'pending',
        user: reg.name,
        event: 'DevSpace 2026',
        time: reg.time
      }));
      setRecentActivity(activities);

      // Trend Data (Last 7 Days)
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return { 
          name: d.toLocaleDateString([], { weekday: 'short' }),
          dateStr: d.toDateString(),
          value: 0 
        };
      }).reverse();

      registrations.forEach(reg => {
        const regDate = reg.createdAt?.toDate?.()?.toDateString();
        const dayMatch = last7Days.find(d => d.dateStr === regDate);
        if (dayMatch) dayMatch.value++;
      });

      setRegData(last7Days);
      console.log("Trend data updated:", last7Days);
    });

    // 3. Fetch Top Events
    const fetchTopEvents = async () => {
      const q = query(collection(db, 'events'), where('organizerId', '==', user.uid), limit(5));
      const snap = await getDocs(q);
      setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchTopEvents();

    return () => {
      unsubscribeStats();
      unsubscribeActivity();
    };
  }, [user]);

  const checkInData = [
    { name: '08:00', value: 20 },
    { name: '10:00', value: 80 },
    { name: '12:00', value: 150 },
    { name: '14:00', value: 40 },
    { name: '16:00', value: 30 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
             <h1 className="text-2xl font-bold tracking-tight text-primary-text">Overview</h1>
             <p className="text-sm text-secondary font-medium">Insights and performance for your active events.</p>
          </div>
          <div className="flex gap-2">
             <button className="h-10 px-4 rounded-xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text transition-colors flex items-center gap-2">
                Last 7 Days <ChevronRight size={14} className="rotate-90" />
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Registrations" value={stats.totalRegistrations.toLocaleString()} change="+12.5%" trend="up" icon={Users} />
          <StatCard title="Total Check-ins" value={stats.totalCheckins.toLocaleString()} change="+8.2%" trend="up" icon={QrCode} />
          <StatCard title="Revenue (INR)" value={`₹${(stats.revenue / 1000).toFixed(1)}k`} change="-2.4%" trend="down" icon={CreditCard} />
          <StatCard title="Active Events" value={stats.activeEvents} change="0%" trend="up" icon={Calendar} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Registration Trend */}
           <div className="lg:col-span-8 space-y-4">
              <div className="card-surface p-8 bg-white shadow-soft h-[400px] flex flex-col">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                       <TrendingUp size={18} className="text-accent" /> Registration Trend
                    </h3>
                    <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">
                       <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent" /> This Week</span>
                    </div>
                 </div>
                 <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={regData}>
                          <defs>
                             <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis 
                             dataKey="name" 
                             axisLine={false} 
                             tickLine={false} 
                             tick={{fontSize: 12, fontWeight: 500, fill: '#6B7280'}} 
                             dy={10}
                          />
                          <YAxis 
                             axisLine={false} 
                             tickLine={false} 
                             tick={{fontSize: 12, fontWeight: 500, fill: '#6B7280'}} 
                          />
                          <Tooltip 
                             contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* Activity Feed */}
           <div className="lg:col-span-4 space-y-4">
              <div className="card-surface p-8 bg-white shadow-soft h-[400px] flex flex-col">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Clock size={18} className="text-accent" /> Recent Activity
                 </h3>
                  <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                    {recentActivity.map((item, i) => (
                      <div key={i} className="flex gap-4">
                         <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                           item.type === 'registration' ? 'bg-blue-50 text-blue-500' :
                           item.type === 'checkin' ? 'bg-emerald-50 text-emerald-500' :
                           'bg-amber-50 text-amber-500'
                         }`}>
                            {item.type === 'registration' ? <Users size={14} /> :
                             item.type === 'checkin' ? <QrCode size={14} /> :
                             <CreditCard size={14} />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-primary-text truncate">
                               {item.user} <span className="font-medium text-secondary">
                                  {item.type === 'registration' ? 'registered for' :
                                   item.type === 'checkin' ? 'checked in to' :
                                   'paid for'}
                               </span> {item.event}
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">{item.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="mt-6 w-full py-2.5 rounded-xl border border-border text-xs font-black uppercase tracking-widest text-secondary hover:text-primary-text hover:bg-gray-50 transition-all">
                    View All Activity
                 </button>
              </div>
           </div>
        </div>

        {/* Secondary Charts / Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="card-surface p-8 bg-white shadow-soft h-[350px] flex flex-col">
              <h3 className="font-bold text-lg mb-8">Check-ins by Hour</h3>
              <div className="flex-1 min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={checkInData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                       <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }} />
                       <Bar dataKey="value" fill="#111827" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

            <div className="card-surface p-8 bg-white shadow-soft h-[350px] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-bold text-lg">Your Events</h3>
                 <Link to="/dashboard/events" className="text-xs font-bold text-accent hover:underline">Manage All</Link>
              </div>
              <div className="space-y-6 overflow-y-auto custom-scrollbar">
                 {events.length === 0 ? (
                   <div className="py-12 text-center text-secondary opacity-40 text-sm font-bold">
                      No events created yet.
                   </div>
                 ) : (
                   events.map((event, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-black">
                              {event.title?.[0]}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-primary-text group-hover:text-accent transition-colors">{event.title}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">{event.status}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-sm">{event.totalRegistrations || 0}</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">Regs</p>
                        </div>
                     </div>
                   ))
                 )}
              </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
