import React, { useState } from 'react';
import { 
  QrCode, 
  Shield, 
  Zap, 
  Smartphone, 
  BarChart3, 
  Check, 
  Play,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Tabs from '../components/ui/Tabs';
import Badge from '../components/ui/Badge';

const FeatureCard = ({ icon: Icon, title, desc, className, large }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`card-surface-hover p-8 md:p-10 flex flex-col justify-between ${className}`}
  >
    <div>
      <div className="w-12 h-12 bg-gray-50 border border-border rounded-xl flex items-center justify-center text-primary-text mb-8 shadow-soft">
        <Icon size={24} />
      </div>
      <h3 className={`font-bold mb-4 ${large ? 'text-3xl' : 'text-xl'}`}>{title}</h3>
      <p className="text-secondary leading-relaxed font-medium">{desc}</p>
    </div>
    {large && (
      <div className="mt-12 pt-8 border-t border-border flex gap-8">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Throughput</p>
          <p className="font-bold text-xl">120 scans/m</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Latency</p>
          <p className="font-bold text-xl">&lt;200ms</p>
        </div>
      </div>
    )}
  </motion.div>
);

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const testimonials = [
    { name: "John Chen", role: "Organizer, DevSpace", quote: "Hackathonbuddy turned our registration chaos into a streamlined engine. The precision is unmatched." },
    { name: "Sarah Miller", role: "Lead, CodeRush", quote: "The volunteer scanner app is a game changer. We processed 1,000+ entries in under an hour." },
    { name: "David Kim", role: "Founder, HackMIT", quote: "Simple, intentional, and focused. It's exactly what event organizers need today." }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="relative pt-12 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light border border-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              All-in-one hackathon CRM
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-primary-text">
              Manage registrations, QR check-ins, and analytics.
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-lg leading-relaxed font-medium">
              A high-precision event management engine designed for organizers who value clarity over noise.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/signup" className="h-14 px-10 text-base font-bold shadow-medium">Create Event</Button>
              <Button variant="secondary" href="/demo" className="h-14 px-10 text-base font-bold">
                <Play size={18} className="mr-2 fill-current" /> View Demo
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:scale-110"
          >
            <div className="absolute inset-0 bg-gray-100 rounded-[32px] -rotate-1 translate-x-4 translate-y-4" />
            <div className="bg-white border border-border p-3 rounded-[32px] shadow-large relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                alt="Product Dashboard" 
                className="rounded-[22px] border border-border"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-large flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play size={24} className="text-primary-text fill-current ml-1" />
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Trust Strip */}
      <section className="py-16 border-y border-border bg-white overflow-hidden">
        <div className="max-w-content text-center space-y-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Trusted by 100+ colleges & communities</p>
          <div className="relative flex overflow-hidden">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-20 items-center opacity-40 grayscale"
            >
              {['VIT UNIVERSITY', 'MIT HACK', 'IIT MADRAS', 'STANFORD CS', 'GITHUB UNIV', 'BITS PILANI', 'NIT TRICHY', 'DTU DELHI', 'PES UNIV', 'LPU GLOBAL'].map((t, i) => (
                <span key={i} className="text-2xl font-bold tracking-tighter shrink-0">{t}</span>
              ))}
              {['VIT UNIVERSITY', 'MIT HACK', 'IIT MADRAS', 'STANFORD CS', 'GITHUB UNIV', 'BITS PILANI', 'NIT TRICHY', 'DTU DELHI', 'PES UNIV', 'LPU GLOBAL'].map((t, i) => (
                <span key={`dup-${i}`} className="text-2xl font-bold tracking-tighter shrink-0">{t}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid Core Features */}
      <Section id="features">
        <div className="space-y-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for speed, engineered for scale.</h2>
            <p className="text-xl text-secondary font-medium">No decorative fluff. Only the high-precision tools your team needs to host a flawless event.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <FeatureCard className="md:col-span-8" large icon={QrCode} title="QR-based Entry System" desc="Ultra-fast generation and distribution. Every participant gets a unique pass instantly. Atomic transactions prevent double scans." />
            <FeatureCard className="md:col-span-4" icon={BarChart3} title="Real-time Analytics" desc="Monitor conversion rates, check-in velocity, and revenue distribution from a live source of truth." />
            <FeatureCard className="md:col-span-4" icon={Smartphone} title="Volunteer Scanner" desc="A dedicated mobile interface for high-throughput scanning. Zero training required." />
            <FeatureCard className="md:col-span-4" icon={Zap} title="Payment Integration" desc="Seamless Razorpay support with server-side signature verification for automated tracking." />
            <FeatureCard className="md:col-span-4" icon={Shield} title="Role-based Security" desc="Granular access controls for admins, volunteers, and participants. Data privacy by design." />
          </div>
        </div>
      </Section>

      {/* Product Showcase Tabs */}
      <Section variant="gray">
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight mb-4">A unified interface for everyone.</h2>
              <p className="text-secondary font-medium">Tailored views for organizers, volunteers, and participants.</p>
            </div>
            <Tabs 
              activeTab={activeTab} 
              onChange={setActiveTab} 
              tabs={[
                { id: 'admin', label: 'Admin View' },
                { id: 'volunteer', label: 'Volunteer View' },
                { id: 'participant', label: 'Participant View' }
              ]} 
            />
          </div>

          <div className="card-surface p-4 overflow-hidden shadow-large bg-gray-50/50">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="aspect-[16/10] md:aspect-[16/8] bg-white rounded-xl border border-border flex items-center justify-center overflow-hidden relative shadow-inner"
              >
                {activeTab === 'admin' && (
                  <div className="w-full h-full p-6 md:p-12 flex flex-col gap-8 animate-fade-in">
                    <div className="flex justify-between items-center pb-6 border-b border-border">
                      <div className="space-y-1"><p className="text-xs font-bold text-primary-text">Overview</p><p className="text-[10px] text-secondary font-medium uppercase tracking-widest">DevSpace Hackathon 2026</p></div>
                      <div className="flex gap-2"><div className="w-8 h-8 rounded-lg bg-gray-50 border border-border" /><div className="w-8 h-8 rounded-lg bg-gray-900" /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                       <div className="p-4 rounded-xl border border-border bg-gray-50/50 space-y-2"><p className="text-[10px] font-black text-secondary uppercase">Registrations</p><p className="text-2xl font-bold">2,482</p></div>
                       <div className="p-4 rounded-xl border border-border bg-gray-50/50 space-y-2"><p className="text-[10px] font-black text-secondary uppercase">Check-ins</p><p className="text-2xl font-bold">1,120</p></div>
                       <div className="p-4 rounded-xl border border-border bg-gray-50/50 space-y-2"><p className="text-[10px] font-black text-secondary uppercase">Revenue</p><p className="text-2xl font-bold">₹4.2L</p></div>
                    </div>
                    <div className="flex-1 bg-gray-50 border border-border rounded-xl p-4 relative flex items-end gap-2 px-8 overflow-hidden">
                       {[40, 60, 45, 80, 50, 90, 70, 55, 75, 40, 65, 85].map((h, i) => (<div key={i} className="flex-1 bg-accent rounded-t-sm" style={{height: `${h}%`}} />))}
                       <p className="absolute top-4 left-4 text-[10px] font-black text-secondary uppercase">Live Velocity</p>
                    </div>
                  </div>
                )}
                {activeTab === 'volunteer' && (
                  <div className="w-full h-full p-6 md:p-12 flex flex-col items-center justify-center gap-8 animate-fade-in bg-gray-900 text-white">
                    <div className="w-full max-w-sm aspect-square border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center relative">
                       <div className="absolute inset-8 border-2 border-accent rounded-lg" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-accent/40 animate-pulse" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Scanning Viewport</p>
                    </div>
                    <div className="w-full max-w-sm p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Check size={20} /></div>
                       <div><p className="text-xs font-bold uppercase tracking-widest">Success</p><p className="text-[10px] text-white/60">Participant Verified: Alex Rivera</p></div>
                    </div>
                  </div>
                )}
                {activeTab === 'participant' && (
                  <div className="w-full h-full p-6 md:p-12 flex items-center justify-center animate-fade-in">
                    <div className="w-64 bg-white border border-border rounded-2xl shadow-large overflow-hidden">
                       <div className="p-5 bg-primary-text text-white text-center"><p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Official Entry Pass</p><p className="font-bold">DevSpace 2026</p></div>
                       <div className="p-8 flex flex-col items-center gap-6">
                          <div className="w-32 h-32 border border-border p-2 rounded-xl"><QrCode size={112} className="text-primary-text" /></div>
                          <div className="text-center space-y-1"><p className="text-xs font-black uppercase tracking-widest text-secondary">Alex Rivera</p><p className="text-[10px] text-secondary font-medium">HACK-2938-X2</p></div>
                       </div>
                       <div className="p-4 border-t border-dashed border-border bg-gray-50 flex justify-center"><Badge variant="info">Verified Account</Badge></div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* Testimonials Carousel */}
      <Section variant="white">
        <div className="card-surface p-12 md:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 text-[100px] font-black text-gray-50 leading-none select-none">“</div>
             <motion.div 
               key={testimonialIdx}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="relative z-10 space-y-8 max-w-2xl"
             >
               <p className="text-2xl md:text-3xl font-bold leading-tight">
                 {testimonials[testimonialIdx].quote}
               </p>
               <div>
                 <p className="font-bold text-lg">{testimonials[testimonialIdx].name}</p>
                 <p className="text-sm text-secondary font-medium uppercase tracking-widest">{testimonials[testimonialIdx].role}</p>
               </div>
             </motion.div>
             <div className="flex gap-4 mt-12 relative z-10">
                <button 
                  onClick={() => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
             </div>
          </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="bg-primary-text rounded-[32px] p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
           <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">Run your next hackathon without the chaos.</h2>
             <p className="text-xl text-gray-400 font-medium leading-relaxed">Join the most intentional event organizers in the world. Deploy your event engine today.</p>
             <div className="pt-8 flex flex-wrap justify-center gap-4">
               <Button href="/signup" className="h-16 px-12 text-lg font-bold bg-white text-primary-text hover:bg-gray-100 border-none">Start for Free</Button>
               <Button variant="secondary" href="/contact" className="h-16 px-12 text-lg font-bold bg-transparent border-gray-700 text-white hover:bg-white/5">Request Demo</Button>
             </div>
           </div>
        </div>
      </Section>
    </Layout>
  );
};

export default LandingPage;
