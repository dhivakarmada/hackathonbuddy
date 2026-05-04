import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Download, 
  Share2, 
  MapPin, 
  Calendar, 
  User, 
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import Badge from '../components/ui/Badge';

const TicketView = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem('last_registration') || '{}');

  const ticketData = {
    eventName: "DevSpace Hackathon 2026",
    participantName: savedData.name || "Alex Rivera",
    email: savedData.email || "alex@university.edu",
    id: registrationId || savedData.id || "HACK-2026-AR-91",
    date: "March 15-17, 2026",
    location: "VIT University, Vellore",
    status: "Valid"
  };

  return (
    <Layout>
      <Section className="min-h-screen flex flex-col items-center justify-center py-24">
        <div className="w-full max-w-lg space-y-12">
          {/* Back Action */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary-text transition-colors group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          {/* Ticket Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface bg-white shadow-large border-accent/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-text p-8 text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
               <div className="relative z-10 flex justify-between items-center">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Entry Pass</p>
                     <h2 className="text-2xl font-bold">{ticketData.eventName}</h2>
                  </div>
                  <Badge className="bg-white/10 text-white border-white/20">{ticketData.status}</Badge>
               </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-10">
               {/* QR Section */}
               <div className="flex flex-col items-center gap-6 py-4">
                  <div className="p-6 bg-gray-50 border border-border rounded-[32px] shadow-inner group">
                     <div className="p-4 bg-white rounded-2xl border border-border shadow-soft group-hover:scale-105 transition-transform duration-500">
                        <QRCodeSVG value={ticketData.id} size={180} />
                     </div>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary">{ticketData.id}</p>
               </div>

               {/* Participant Info */}
               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-dashed border-border">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Participant</p>
                     <p className="font-bold text-primary-text flex items-center gap-2">
                        <User size={14} className="text-accent" /> {ticketData.participantName}
                     </p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Status</p>
                     <p className="font-bold text-emerald-500 flex items-center gap-2">
                        <ShieldCheck size={14} /> Verified Access
                     </p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Date</p>
                     <p className="font-bold text-primary-text flex items-center gap-2">
                        <Calendar size={14} className="text-accent" /> {ticketData.date}
                     </p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Location</p>
                     <p className="font-bold text-primary-text flex items-center gap-2">
                        <MapPin size={14} className="text-accent" /> Vellore, India
                     </p>
                  </div>
               </div>
            </div>

            {/* Footer / Actions */}
            <div className="p-8 bg-gray-50 border-t border-border flex gap-4">
               <Button className="flex-1 h-12 font-bold shadow-soft">
                  <Download size={18} className="mr-2" /> Download
               </Button>
               <Button variant="secondary" className="w-12 h-12 p-0 flex items-center justify-center">
                  <Share2 size={18} />
               </Button>
            </div>
          </motion.div>

          <p className="text-center text-[10px] text-secondary font-black uppercase tracking-[0.2em]">
            Present this pass at the registration desk for verification.
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default TicketView;
