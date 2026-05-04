import React from 'react';
import { 
  Plus, 
  MoreVertical, 
  Users, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Settings,
  BarChart3,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Badge from '../../components/ui/Badge';
import Button from '../../components/Button';
import Input from '../../components/ui/Input';
import { db, auth } from '../../firebase/config';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const EventCard = ({ event }) => (
  <div className="card-surface bg-white shadow-soft p-6 flex flex-col justify-between group border border-border hover:border-accent/20 transition-all">
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-border flex items-center justify-center text-xl font-bold text-secondary group-hover:bg-accent group-hover:text-white transition-all duration-500">
          {event.title[0]}
        </div>
        <div className="flex gap-2">
           <Badge variant={event.status === 'Live' ? 'success' : 'secondary'}>{event.status}</Badge>
           <button className="p-2 rounded-lg hover:bg-gray-100 text-secondary transition-colors">
              <MoreVertical size={16} />
           </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-primary-text group-hover:text-accent transition-colors">{event.title}</h3>
        <p className="text-sm text-secondary font-medium line-clamp-2">{event.desc}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
         <div className="flex items-center gap-2 text-xs text-secondary font-bold">
            <Users size={14} className="text-accent" /> {event.regs} Regs
         </div>
         <div className="flex items-center gap-2 text-xs text-secondary font-bold">
            <Calendar size={14} className="text-accent" /> {event.date}
         </div>
      </div>
    </div>

    <div className="pt-8 flex gap-3">
       <Button variant="secondary" className="flex-1 h-10 text-xs font-black uppercase tracking-widest border-border hover:bg-gray-50">
          Manage
       </Button>
       <a 
         href={`/event/devspace-2026`} 
         target="_blank" 
         rel="noreferrer"
         className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text hover:bg-gray-50 transition-all"
       >
          <ExternalLink size={16} />
       </a>
    </div>
  </div>
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvenData, setNewEventData] = useState({ title: '', desc: '', date: '' });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'events'), where('organizerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Map fields to match EventCard
        regs: doc.data().totalRegistrations || 0,
        status: doc.data().status || 'Live'
      }));
      setEvents(eventsList);
      setLoading(false);
      console.log("Events refreshed:", eventsList.length);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...newEvenData,
        organizerId: user.uid,
        totalRegistrations: 0,
        totalCheckins: 0,
        totalRevenue: 0,
        status: 'Live',
        createdAt: serverTimestamp()
      });
      console.log("Event created with ID:", docRef.id);
      setIsModalOpen(false);
      setNewEventData({ title: '', desc: '', date: '' });
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-primary-text">Events</h1>
              <p className="text-sm text-secondary font-medium">Create and manage your hackathon ecosystem.</p>
           </div>
           <Button className="h-12 px-6 font-bold shadow-medium">
              <Plus size={18} className="mr-2" /> New Event
           </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 border-b border-border">
           {['All Events', 'Live', 'Planning', 'Completed'].map((tab, i) => (
             <button 
               key={tab}
               className={`pb-4 px-2 text-sm font-bold transition-all relative ${
                 i === 0 ? 'text-primary-text' : 'text-secondary hover:text-primary-text'
               }`}
             >
                {tab}
                {i === 0 && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
             </button>
           ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => setIsModalOpen(true)}
             className="aspect-[4/5] rounded-[32px] border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 text-secondary hover:text-accent hover:border-accent/40 transition-all bg-gray-50/50 group"
           >
              <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all">
                 <Plus size={24} />
              </div>
              <p className="font-bold text-sm">Create New Event</p>
           </motion.button>
           
           {events.map((event, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <EventCard event={event} />
             </motion.div>
           ))}
        </div>
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] border border-border shadow-large p-10 space-y-8"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight">New Event.</h2>
                  <p className="text-sm text-secondary font-medium">Configure your hackathon details.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-6">
                <div className="space-y-4">
                  <Input 
                    label="Event Title" 
                    placeholder="DevSpace Hackathon" 
                    value={newEvenData.title}
                    onChange={e => setNewEventData({...newEvenData, title: e.target.value})}
                    required 
                  />
                  <Input 
                    label="Description" 
                    placeholder="VIT's flagship hackathon..." 
                    value={newEvenData.desc}
                    onChange={e => setNewEventData({...newEvenData, desc: e.target.value})}
                    required 
                  />
                  <Input 
                    label="Event Date" 
                    type="date"
                    value={newEvenData.date}
                    onChange={e => setNewEventData({...newEvenData, date: e.target.value})}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full h-14 font-bold shadow-soft">Create Event</Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Events;
