import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  QrCode, 
  Mail, 
  Download,
  Ticket
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import Badge from '../components/ui/Badge';

const RegistrationSuccess = () => {
  const { id } = useParams();
  const savedData = JSON.parse(localStorage.getItem('last_registration') || '{"name": "Alex Rivera", "id": "HACK-2026-AR-91"}');

  return (
    <Layout>
      <Section className="min-h-[80vh] flex flex-col items-center justify-center py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl text-center space-y-12"
        >
          {/* Success Header */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100 shadow-soft">
              <CheckCircle2 size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-primary-text">You're registered!</h1>
              <p className="text-lg text-secondary font-medium">We've confirmed your spot for DevSpace 2026.</p>
            </div>
          </div>

          {/* Ticket Preview Card */}
          <div className="card-surface p-8 bg-white shadow-large border-accent/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4">
                <Badge variant="info">Paid & Verified</Badge>
             </div>
             <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-40 h-40 bg-gray-50 border border-border rounded-2xl flex items-center justify-center p-4">
                   {savedData.qrImage ? (
                     <img src={savedData.qrImage} alt="QR Code" className="w-full h-full object-contain" />
                   ) : (
                     <QrCode size={120} className="text-primary-text" />
                   )}
                </div>
                <div className="flex-1 text-left space-y-4">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60 mb-1">Official Entry Pass</p>
                      <h3 className="text-2xl font-bold">DevSpace 2026</h3>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs font-bold text-primary-text">Participant: {savedData.name}</p>
                      <p className="text-[10px] text-secondary font-black uppercase tracking-widest">Pass ID: {savedData.id}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Button href={`/ticket/${savedData.id}`} className="h-14 font-bold shadow-medium">
                <Ticket size={18} className="mr-2" /> View Full Ticket
             </Button>
             <Button variant="secondary" className="h-14 font-bold">
                <Download size={18} className="mr-2" /> Download Pass
             </Button>
          </div>

          <div className="pt-8 border-t border-border flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                <Mail size={16} className="text-accent" /> We sent a copy to {savedData.email || 'your email'}
             </div>
             <Link to="/" className="text-xs font-black uppercase tracking-widest text-secondary hover:text-primary-text transition-colors flex items-center gap-2">
                Back to home <ArrowRight size={14} />
             </Link>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default RegistrationSuccess;
