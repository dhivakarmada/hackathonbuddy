import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, Globe } from 'lucide-react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <Layout>
      <Section className="pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left: Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text leading-[1.1]">
                Let's talk about your event.
              </h1>
              <p className="text-xl text-secondary font-medium leading-relaxed max-w-lg">
                Whether you're running a 100-person workshop or a 10,000-person global hackathon, we're here to help you scale.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-secondary shadow-soft"><Mail size={20} /></div>
                 <div><p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Email us</p><p className="font-bold text-lg">hello@hackathonbuddy.com</p></div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-secondary shadow-soft"><MapPin size={20} /></div>
                 <div><p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Our Base</p><p className="font-bold text-lg">Telangana, India</p></div>
              </div>
            </div>

            <div className="pt-12 border-t border-border space-y-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Follow our journey</p>
               <div className="flex gap-4">
                  {[Globe].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text hover:border-accent/20 transition-all shadow-soft"><Icon size={18} /></a>
                  ))}
                  <a href="#" className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text hover:border-accent/20 transition-all shadow-soft">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
               </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-[32px] translate-x-4 translate-y-4" />
            <div className="relative card-surface p-10 bg-white shadow-large border border-border rounded-[32px]">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-6">
                   <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100"><Send size={32} /></div>
                   <div className="space-y-2">
                      <h2 className="text-3xl font-bold">Message sent!</h2>
                      <p className="text-secondary font-medium">We'll get back to you within 2 business hours.</p>
                   </div>
                   <Button variant="secondary" onClick={() => setSubmitted(false)} className="h-12 px-8">Send another</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Full name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <Input 
                      label="Work email" 
                      type="email" 
                      placeholder="john@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <Input 
                    label="Subject" 
                    placeholder="Inquiry about Enterprise plan" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-secondary">Message</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Tell us about your event..."
                      className="w-full p-4 rounded-xl border border-border bg-gray-50/30 text-sm font-medium focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-bold">
                    {loading ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Map Placeholder */}
      <Section className="pt-24">
         <div className="aspect-[21/9] bg-gray-100 rounded-[32px] border border-border relative overflow-hidden shadow-inner grayscale opacity-50">
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center space-y-2">
                  <MapPin size={32} className="mx-auto text-secondary" />
                  <p className="text-xs font-black uppercase tracking-widest text-secondary">Headquarters: Telangana, India</p>
               </div>
            </div>
         </div>
      </Section>
    </Layout>
  );
};

export default Contact;
