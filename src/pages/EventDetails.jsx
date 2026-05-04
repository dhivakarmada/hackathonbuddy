import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Info,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import Badge from '../components/ui/Badge';
import Accordion from '../components/ui/Accordion';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        } else {
          // If not found in DB, try a hardcoded one for existing "DEVSPACE-2026" demo
          if (id === 'DEVSPACE-2026') {
             setEvent({
                title: "DevSpace Hackathon 2026",
                tagline: "Building the next generation of spatial computing apps.",
                date: "March 15-17, 2026",
                location: "VIT University, Vellore",
                mode: "Offline",
                teamSize: "2-4 People",
                price: "₹499 / person",
                duration: "48 Hours",
                poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
                about: "DevSpace is more than just a competition; it's a launchpad for world-changing ideas. Join over 500 developers in an intensive 48-hour sprint to build applications that redefine how we interact with the physical and digital worlds.",
                schedule: [
                  { time: "09:00 AM", activity: "Opening Ceremony & Keynote" },
                  { time: "11:00 AM", activity: "Hacking Begins" },
                  { time: "01:00 PM", activity: "Lunch & Networking" },
                  { time: "04:00 PM", activity: "Technical Workshops (Spatial UI)" },
                  { time: "08:00 PM", activity: "Dinner & Midnight Snack" }
                ],
                rules: [
                  { title: "Eligibility", content: "Open to all university students and recent graduates within 1 year of completion." },
                  { title: "Team Formation", content: "Minimum 2 members, maximum 4. Cross-university teams are allowed and encouraged." },
                  { title: "Intellectual Property", content: "All projects developed during the hackathon remain the intellectual property of the participants." },
                  { title: "Code of Conduct", content: "We strictly follow a professional code of conduct. Harassment of any kind will result in immediate disqualification." }
                ]
             });
          }
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </Layout>
  );

  if (!event) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center text-secondary font-bold">
        Event not found.
      </div>
    </Layout>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap gap-2">
               <Badge variant="info">{event.date}</Badge>
               <Badge variant="secondary">{event.location}</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary-text leading-tight">{event.title}</h1>
              <p className="text-xl text-secondary font-medium leading-relaxed max-w-lg">{event.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href={`/event/${id}/register`} className="h-14 px-10 text-base font-bold shadow-medium">Register Now</Button>
              <Button variant="secondary" className="h-14 px-10 text-base font-bold">
                Download Brochure
              </Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-gray-100 rounded-[32px] translate-x-4 translate-y-4" />
             <div className="relative aspect-video rounded-[32px] overflow-hidden border border-border shadow-large grayscale hover:grayscale-0 transition-all duration-700">
                <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
             </div>
          </motion.div>
        </div>
      </Section>

      {/* Info Bar */}
      <Section className="pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 card-surface bg-white shadow-soft">
           {[
             { label: "Duration", val: event.duration, icon: Clock },
             { label: "Mode", val: event.mode, icon: MapPin },
             { label: "Team Size", val: event.teamSize, icon: Users },
             { label: "Price", val: event.price, icon: Trophy }
           ].map((item, i) => (
             <div key={i} className="space-y-2">
               <p className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                 <item.icon size={12} className="text-accent" /> {item.label}
               </p>
               <p className="text-lg font-bold text-primary-text">{item.val}</p>
             </div>
           ))}
        </div>
      </Section>

      {/* About & Schedule */}
      <Section variant="white" className="border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
           <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                 <h2 className="text-3xl font-bold tracking-tight">About the event</h2>
                 <p className="text-lg text-secondary leading-relaxed font-medium">{event.about}</p>
              </div>
              
              <div className="space-y-8">
                 <h2 className="text-3xl font-bold tracking-tight">Rules & Eligibility</h2>
                 <Accordion items={event.rules} />
              </div>
           </div>

           <div className="lg:col-span-5 space-y-12">
              <div className="p-10 bg-gray-50 border border-border rounded-3xl space-y-8">
                 <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Calendar size={20} className="text-accent" /> Event Schedule
                 </h3>
                 <div className="space-y-8 relative">
                    <div className="absolute top-0 bottom-0 left-3.5 w-px bg-border" />
                    {event.schedule.map((item, i) => (
                      <div key={i} className="flex gap-8 relative z-10">
                         <div className="w-7 h-7 rounded-full bg-white border-2 border-border flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs font-black uppercase tracking-widest text-accent">{item.time}</p>
                            <p className="font-bold text-primary-text">{item.activity}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-8 border border-accent/20 bg-accent/[0.02] rounded-3xl flex items-center gap-6">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-soft shrink-0 border border-border">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <p className="font-bold text-sm">Verified Event</p>
                    <p className="text-xs text-secondary font-medium">This event is officially hosted on the Hackathonbuddy engine.</p>
                 </div>
              </div>
           </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section variant="gray" className="border-b border-border">
         <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to build the future?</h2>
               <p className="text-xl text-secondary font-medium">Secure your spot today and join the elite spatial developers league.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
               <Button href={`/event/${id}/register`} className="h-16 px-12 text-lg font-bold shadow-large w-full sm:w-auto">
                 Complete Registration <ArrowRight size={20} className="ml-2" />
               </Button>
               <p className="text-sm text-secondary font-bold">Limited slots available (Only 42 remaining)</p>
            </div>
         </div>
      </Section>
    </Layout>
  );
};

export default EventDetails;
