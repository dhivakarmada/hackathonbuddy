import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle, 
  Calendar, 
  Users, 
  QrCode, 
  Smartphone,
  ArrowRight,
  Zap,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Tabs from '../components/ui/Tabs';
import Button from '../components/Button';

const Step = ({ number, title, desc, active }) => (
  <div className={`flex gap-6 items-start transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-40'}`}>
    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold shrink-0 transition-colors ${active ? 'bg-accent border-accent text-white shadow-medium' : 'bg-white border-border text-secondary'}`}>
      {number}
    </div>
    <div className="space-y-1">
      <h3 className={`font-bold transition-colors ${active ? 'text-primary-text' : 'text-secondary'}`}>{title}</h3>
      <p className="text-xs text-secondary font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Demo = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { number: 1, title: "Initialize Event", desc: "Define rules, registration fees, and team access levels." },
    { number: 2, title: "Distribute Passes", desc: "Automated QR delivery to participants via email/SMS." },
    { number: 3, title: "Venue Check-in", desc: "Volunteer-led scanning with real-time server validation." },
    { number: 4, title: "Live Analytics", desc: "Monitor entry velocity and revenue as it happens." }
  ];

  return (
    <Layout>
      {/* Hero */}
      <Section className="text-center pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text">
            See how it works.
          </h1>
          <p className="text-xl text-secondary font-medium leading-relaxed">
            A high-precision walkthrough of the Hackathonbuddy ecosystem. From setup to scan.
          </p>
        </div>
      </Section>

      {/* Interactive Tabs Showcase */}
      <Section variant="white" className="pt-0">
        <div className="space-y-12">
          <div className="flex justify-center">
            <Tabs 
              activeTab={activeTab} 
              onChange={setActiveTab} 
              tabs={[
                { id: 'admin', label: 'Admin Dashboard' },
                { id: 'participant', label: 'Participant Flow' },
                { id: 'scanner', label: 'Volunteer Scanner' }
              ]} 
            />
          </div>

          <div className="card-surface p-4 bg-gray-50/50 shadow-large aspect-[16/9] md:aspect-[16/7] relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full h-full bg-white rounded-xl border border-border shadow-inner overflow-hidden flex items-center justify-center"
              >
                {activeTab === 'admin' && (
                  <div className="p-12 w-full h-full flex flex-col gap-8 animate-fade-in">
                     <div className="flex justify-between items-center pb-6 border-b border-border">
                        <div className="space-y-1"><p className="text-xs font-bold">Control Center</p><p className="text-[10px] text-secondary font-medium uppercase tracking-widest">Managing 3 active events</p></div>
                        <Button className="h-9 px-4 text-xs">Create New Event</Button>
                     </div>
                     <div className="grid grid-cols-4 gap-6">
                        {[1,2,3,4].map(i => <div key={i} className="h-20 rounded-xl bg-gray-50 border border-border animate-pulse" />)}
                     </div>
                     <div className="flex-1 bg-gray-50 border border-border rounded-xl p-8 flex items-center justify-center">
                        <BarChart3 size={48} className="text-gray-200" />
                     </div>
                  </div>
                )}
                {activeTab === 'participant' && (
                  <div className="p-12 w-full h-full flex items-center justify-center gap-16 animate-fade-in">
                     <div className="w-64 aspect-[9/16] bg-gray-50 border border-border rounded-3xl p-6 space-y-6 relative overflow-hidden shadow-medium">
                        <div className="w-full h-32 bg-accent/10 rounded-2xl flex items-center justify-center"><QrCode size={48} className="text-accent" /></div>
                        <div className="space-y-3"><div className="h-4 bg-gray-200 rounded w-3/4" /><div className="h-4 bg-gray-200 rounded w-1/2" /></div>
                        <div className="h-10 bg-accent rounded-xl w-full" />
                     </div>
                     <div className="max-w-xs space-y-4">
                        <h3 className="text-2xl font-bold">Registration Flow</h3>
                        <p className="text-sm text-secondary font-medium leading-relaxed">Participants register through a white-labeled form and receive their digital pass instantly via email.</p>
                     </div>
                  </div>
                )}
                {activeTab === 'scanner' && (
                  <div className="w-full h-full bg-gray-900 text-white flex items-center justify-center animate-fade-in relative">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                     <div className="w-72 aspect-square border-2 border-accent rounded-2xl flex flex-col items-center justify-center gap-4 shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                        <Smartphone size={64} className="text-accent mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Ready to Scan</p>
                        <div className="w-48 h-1 bg-accent/20 rounded-full overflow-hidden"><motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-full h-full bg-accent shadow-[0_0_10px_#2563eb]" /></div>
                     </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[2px] pointer-events-none">
               <div className="w-16 h-16 bg-white rounded-full shadow-large flex items-center justify-center"><Play size={24} className="fill-current ml-1" /></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lifecycle Stepper */}
      <Section variant="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">The event lifecycle.</h2>
              <p className="text-lg text-secondary font-medium leading-relaxed">Follow the 4-step process to deploy your high-performance hackathon infrastructure.</p>
            </div>
            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.number} onClick={() => setActiveStep(step.number)} className="cursor-pointer">
                  <Step {...step} active={activeStep === step.number} />
                </div>
              ))}
            </div>
            <div className="pt-6">
               <Button href="/signup" className="h-14 px-10 font-bold shadow-medium">Initialize Your First Event <ArrowRight size={18} className="ml-2" /></Button>
            </div>
          </div>
          <div className="relative aspect-square">
             <AnimatePresence mode="wait">
               <motion.div 
                 key={activeStep}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="w-full h-full card-surface bg-white shadow-large p-12 flex flex-col items-center justify-center text-center gap-8"
               >
                 {activeStep === 1 && <><div className="w-32 h-32 bg-gray-50 border border-border rounded-3xl flex items-center justify-center"><Calendar size={64} className="text-accent" /></div><div className="space-y-2"><p className="text-2xl font-bold">Step 1: Setup</p><p className="text-sm text-secondary font-medium">Configure rules, dates, and registration types.</p></div></>}
                 {activeStep === 2 && <><div className="w-32 h-32 bg-gray-50 border border-border rounded-3xl flex items-center justify-center"><Users size={64} className="text-accent" /></div><div className="space-y-2"><p className="text-2xl font-bold">Step 2: Onboard</p><p className="text-sm text-secondary font-medium">Auto-distribute digital passes to participants.</p></div></>}
                 {activeStep === 3 && <><div className="w-32 h-32 bg-gray-50 border border-border rounded-3xl flex items-center justify-center"><QrCode size={64} className="text-accent" /></div><div className="space-y-2"><p className="text-2xl font-bold">Step 3: Validate</p><p className="text-sm text-secondary font-medium">High-speed entry scanning at the venue.</p></div></>}
                 {activeStep === 4 && <><div className="w-32 h-32 bg-gray-50 border border-border rounded-3xl flex items-center justify-center"><BarChart3 size={64} className="text-accent" /></div><div className="space-y-2"><p className="text-2xl font-bold">Step 4: Report</p><p className="text-sm text-secondary font-medium">Export real-time logs and revenue reports.</p></div></>}
               </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* Video CTA */}
      <Section variant="white">
         <div className="card-surface p-12 md:p-24 bg-gray-900 text-white text-center space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Prefer a video walkthrough?</h2>
              <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">Watch a 3-minute guided tour of our platform's most powerful features.</p>
              <div className="pt-6 flex justify-center gap-4">
                 <Button className="h-16 px-10 bg-white text-gray-900 font-bold hover:bg-gray-100 border-none"><Play size={20} className="fill-current mr-2" /> Watch Video</Button>
              </div>
            </div>
         </div>
      </Section>
    </Layout>
  );
};

export default Demo;
