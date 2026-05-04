import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowUpDown,
  X,
  User,
  CreditCard,
  QrCode,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { subscribeToRegistrations } from '../../firebase/services';

const RegistrationDrawer = ({ isOpen, onClose, data }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
        />
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white border-l border-border shadow-large z-[70] flex flex-col"
        >
          {/* Drawer Header */}
          <div className="h-16 px-8 border-b border-border flex items-center justify-between shrink-0">
             <h2 className="font-bold text-lg">Registration Details</h2>
             <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-secondary transition-colors">
                <X size={20} />
             </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
             {/* Profile Header */}
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[28px] bg-gray-100 border border-border flex items-center justify-center text-2xl font-bold text-secondary">
                   {data?.name?.[0]}
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-bold tracking-tight">{data?.name}</h3>
                   <div className="flex gap-2">
                      <Badge variant={data?.status === 'confirmed' ? 'success' : 'warning'}>{data?.status}</Badge>
                      <Badge variant="secondary">Individual</Badge>
                   </div>
                </div>
             </div>

             {/* Sections */}
             <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Email Address</p>
                   <p className="text-sm font-bold text-primary-text flex items-center gap-2 truncate"><Mail size={14} className="text-accent" /> {data?.email}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Registration ID</p>
                   <p className="text-sm font-bold text-primary-text flex items-center gap-2"><QrCode size={14} className="text-accent" /> {data?.qrId || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Payment Status</p>
                   <p className="text-sm font-bold text-emerald-500 flex items-center gap-2"><CreditCard size={14} /> {data?.paymentStatus === 'paid' ? 'Paid ₹499' : 'Unpaid'}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Registered Date</p>
                   <p className="text-sm font-bold text-primary-text flex items-center gap-2"><Clock size={14} /> {data?.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A'}</p>
                </div>
             </div>

             <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Form Responses</p>
                <div className="space-y-6 p-6 bg-gray-50 border border-border rounded-2xl">
                   <div className="space-y-1">
                      <p className="text-xs font-bold text-secondary">College / University</p>
                      <p className="text-sm font-bold text-primary-text">{data?.college || 'Not provided'}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs font-bold text-secondary">Year of Study</p>
                      <p className="text-sm font-bold text-primary-text">{data?.year || 'Not provided'}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs font-bold text-secondary">GitHub Profile</p>
                      {data?.github ? (
                        <a href={data.github} target="_blank" rel="noreferrer" className="text-sm font-bold text-accent hover:underline flex items-center gap-1">
                          {data.github.replace('https://', '').replace('http://', '')} <ExternalLink size={12} />
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-primary-text">Not provided</p>
                      )}
                   </div>
                </div>
             </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-8 border-t border-border bg-gray-50 flex gap-4">
             <Button className="flex-1 h-12 font-bold shadow-soft">Resend QR Pass</Button>
             <Button variant="secondary" className="flex-1 h-12 font-bold">Edit Status</Button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Registrations = () => {
  const { user } = useAuth();
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToRegistrations((data) => {
      setAllRegistrations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(allRegistrations);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = allRegistrations.filter(reg => 
        reg.name?.toLowerCase().includes(lowerSearch) || 
        reg.email?.toLowerCase().includes(lowerSearch) ||
        reg.id?.toLowerCase().includes(lowerSearch)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, allRegistrations]);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-primary-text">Registrations</h1>
              <p className="text-sm text-secondary font-medium">Manage and verify participants for DevSpace 2026.</p>
           </div>
           <div className="flex gap-3">
              <button className="h-10 px-4 rounded-xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text transition-colors flex items-center gap-2 shadow-soft">
                 <Download size={16} /> Export CSV
              </button>
           </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, email, or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
              />
           </div>
           <div className="flex gap-3">
              <button className="h-11 px-4 rounded-xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text transition-colors flex items-center gap-2">
                 <Filter size={16} /> Filters
              </button>
              <button className="h-11 px-4 rounded-xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text transition-colors flex items-center gap-2">
                 <ArrowUpDown size={16} /> Sort
              </button>
           </div>
        </div>

        {/* Data Table */}
        <div className="card-surface bg-white shadow-soft overflow-hidden border border-border">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-50 border-b border-border">
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Name</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Email</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Status</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Payment</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Checked-in</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-secondary">Date</th>
                       <th className="px-6 py-4"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-secondary font-medium">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                            Loading registrations...
                          </div>
                        </td>
                      </tr>
                    ) : filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-secondary font-medium">
                          No registrations found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((reg, i) => (
                        <tr 
                          key={reg.id} 
                          onClick={() => handleRowClick(reg)}
                          className="hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                           <td className="px-6 py-4 font-bold text-sm text-primary-text">{reg.name}</td>
                           <td className="px-6 py-4 text-sm text-secondary font-medium">{reg.email}</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 <div className={`w-1.5 h-1.5 rounded-full ${
                                   reg.paymentStatus === 'paid' ? 'bg-emerald-500' :
                                   reg.paymentStatus === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                                 }`} />
                                 <span className="text-xs font-bold capitalize">{reg.paymentStatus || 'pending'}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <Badge variant={reg.paymentStatus === 'paid' ? 'success' : 'warning'}>
                                 {reg.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                              </Badge>
                           </td>
                           <td className="px-6 py-4">
                              {reg.isCheckedIn ? 
                                <CheckCircle2 size={18} className="text-emerald-500" /> : 
                                <XCircle size={18} className="text-gray-200" />}
                           </td>
                           <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-secondary opacity-60">
                             {reg.createdAt?.toDate ? reg.createdAt.toDate().toLocaleDateString() : 'N/A'}
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-2 rounded-lg hover:bg-gray-200 text-secondary transition-colors opacity-0 group-hover:opacity-100">
                                 <MoreHorizontal size={16} />
                              </button>
                           </td>
                        </tr>
                      ))
                    )}
                 </tbody>
              </table>
           </div>

           {/* Pagination */}
           <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-gray-50/50">
              <p className="text-xs text-secondary font-medium">Showing <span className="font-bold text-primary-text">{filteredData.length}</span> of <span className="font-bold text-primary-text">{allRegistrations.length}</span> registrations</p>
              <div className="flex gap-2">
                 <button className="h-8 px-3 rounded-lg border border-border bg-white text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary-text disabled:opacity-40" disabled>Prev</button>
                 <button className="h-8 px-3 rounded-lg border border-border bg-white text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary-text">Next</button>
              </div>
           </div>
        </div>

        <RegistrationDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          data={selectedUser} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Registrations;
