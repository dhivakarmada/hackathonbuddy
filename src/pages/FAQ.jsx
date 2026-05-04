import React, { useState } from 'react';
import { Search, Mail, MessageSquare, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Accordion from '../components/ui/Accordion';
import Tabs from '../components/ui/Tabs';
import Input from '../components/ui/Input';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'technical', label: 'Technical' },
    { id: 'volunteer', label: 'Volunteer' }
  ];

  const faqData = {
    general: [
      { title: "What is Hackathonbuddy?", content: "Hackathonbuddy is a high-precision CRM and entry management platform designed specifically for hackathons, workshops, and large-scale developer events. We provide the infrastructure for registrations, QR-based check-ins, and real-time analytics." },
      { title: "How do I get started?", content: "Simply click 'Create Event' in the top right corner. You'll be guided through a 60-second setup process where you can define your event rules, pricing, and team members." },
      { title: "Can I use it for small events?", content: "Yes! Our 'Starter' plan is completely free for up to 50 participants, making it perfect for local meetups and small community workshops." }
    ],
    pricing: [
      { title: "Is the Professional plan a monthly subscription?", content: "No. The Professional plan is a flat fee per event. We don't believe in recurring costs for seasonal events. You pay once per event and get full access to all premium features." },
      { title: "Do you offer university discounts?", content: "We offer significant discounts for government-run universities and non-profit student communities. Contact our support team for a custom quote." }
    ],
    technical: [
      { title: "Does the scanner work offline?", content: "Yes. Our volunteer scanner app caches participant data locally. In case of connectivity issues, you can continue scanning; the data will atomically sync once the connection is restored." },
      { title: "Can I integrate with my own registration form?", content: "We provide a RESTful API and Webhooks for the 'Enterprise' tier. For 'Professional' users, we recommend our white-labeled registration pages which are optimized for conversion." }
    ],
    volunteer: [
      { title: "How many volunteers can I have?", content: "Unlimited. Both our Professional and Enterprise tiers allow you to add as many volunteer accounts as needed for your event gates." },
      { title: "Do volunteers need to download an app?", content: "No. The volunteer scanner is a Progressive Web App (PWA) that runs directly in any modern mobile browser (Chrome, Safari) without any installation." }
    ]
  };

  const filteredFAQs = searchQuery 
    ? Object.values(faqData).flat().filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData[activeCategory];

  return (
    <Layout>
      {/* Header & Search */}
      <Section className="pb-12">
        <div className="max-w-3xl mx-auto space-y-12 text-center">
           <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text">How can we help?</h1>
              <p className="text-xl text-secondary font-medium">Search our documentation or browse categories below.</p>
           </div>
           <div className="relative max-w-xl mx-auto group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search for questions (e.g. 'QR scanning', 'refunds')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-8 bg-white border border-border rounded-2xl shadow-medium focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium"
              />
           </div>
        </div>
      </Section>

      {/* Main Content */}
      <Section variant="white" className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
           {/* Sidebar Categories */}
           {!searchQuery && (
             <div className="lg:col-span-3 space-y-8">
                <div className="space-y-4 sticky top-32">
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Categories</p>
                   <div className="flex flex-col gap-1">
                      {categories.map((cat) => (
                        <button 
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeCategory === cat.id ? 'bg-accent/5 text-accent border border-accent/10' : 'text-secondary hover:bg-gray-50'}`}
                        >
                          {cat.label}
                          <ChevronRight size={16} className={`transition-transform ${activeCategory === cat.id ? 'translate-x-1' : 'opacity-0'}`} />
                        </button>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {/* FAQ List */}
           <div className={searchQuery ? "lg:col-span-12" : "lg:col-span-9"}>
              <div className="space-y-12">
                 {searchQuery && (
                   <p className="text-sm font-bold text-secondary">
                     Found {filteredFAQs.length} results for "{searchQuery}"
                   </p>
                 )}
                 <Accordion items={filteredFAQs} />
                 {filteredFAQs.length === 0 && (
                   <div className="text-center py-20 space-y-4">
                      <p className="text-xl font-bold">No results found.</p>
                      <p className="text-sm text-secondary">Try a different search term or contact our support team.</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </Section>

      {/* Support CTA */}
      <Section variant="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           <div className="card-surface p-8 space-y-6 bg-white hover:border-accent/20 transition-colors">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-accent"><Mail size={24} /></div>
              <div className="space-y-2">
                 <h3 className="text-xl font-bold">Email Support</h3>
                 <p className="text-sm text-secondary font-medium">Average response time: &lt; 2 hours.</p>
              </div>
              <a href="mailto:support@hackathonbuddy.com" className="text-sm font-bold text-accent hover:underline flex items-center gap-2">support@hackathonbuddy.com <ChevronRight size={14} /></a>
           </div>
           <div className="card-surface p-8 space-y-6 bg-white hover:border-accent/20 transition-colors">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-accent"><MessageSquare size={24} /></div>
              <div className="space-y-2">
                 <h3 className="text-xl font-bold">Community Discord</h3>
                 <p className="text-sm text-secondary font-medium">Get instant help from other organizers.</p>
              </div>
              <a href="#" className="text-sm font-bold text-accent hover:underline flex items-center gap-2">Join Community <ChevronRight size={14} /></a>
           </div>
        </div>
      </Section>
    </Layout>
  );
};

export default FAQ;
