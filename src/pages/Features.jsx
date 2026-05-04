import React from 'react';
import { 
  QrCode, 
  BarChart3, 
  Smartphone, 
  Globe, 
  Shield, 
  Zap,
  Mail,
  Users,
  CreditCard,
  Lock,
  Search,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';

const FeatureDetail = ({ title, sub, desc, icon: Icon, image, reversed }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
    <div className={`space-y-8 ${reversed ? 'lg:order-2' : ''}`}>
      <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-accent shadow-soft">
        <Icon size={24} />
      </div>
      <div className="space-y-4">
        <p className="text-xs font-black uppercase tracking-widest text-accent">{sub}</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary-text">{title}</h2>
        <p className="text-lg text-secondary leading-relaxed font-medium">{desc}</p>
      </div>
      <Button variant="secondary" className="h-12 px-8 font-bold">Learn more</Button>
    </div>
    <div className={`relative ${reversed ? 'lg:order-1' : ''}`}>
       <div className="absolute inset-0 bg-gray-100 rounded-3xl translate-x-4 translate-y-4" />
       <div className="relative card-surface p-3 overflow-hidden shadow-large bg-white aspect-video flex items-center justify-center">
          <img src={image} alt={title} className="w-full h-full object-cover rounded-xl border border-border" />
       </div>
    </div>
  </div>
);

const Features = () => {
  const gridFeatures = [
    { icon: Mail, title: "Email Automation", desc: "Automated entry passes and confirmation emails sent instantly upon registration." },
    { icon: Users, title: "Team Management", desc: "Granular roles for your organizing committee. Track volunteer activity in real-time." },
    { icon: CreditCard, title: "Unified Payments", desc: "Connect Razorpay in one click. Automated reconciliation and receipt generation." },
    { icon: Lock, title: "Privacy First", desc: "GDPR compliant data handling. We never sell your participant data." },
    { icon: Search, title: "Global Search", desc: "Find any participant, registration, or transaction across all your events instantly." },
    { icon: Zap, title: "High Availability", desc: "Built on edge infrastructure. Zero downtime, even during 10k+ registration spikes." }
  ];

  return (
    <Layout>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text leading-[1.1]">
            Everything you need to run events smoothly.
          </h1>
          <p className="text-xl text-secondary font-medium leading-relaxed">
            From atomic registration flows to high-throughput gate scanning. We provide the infrastructure, you provide the experience.
          </p>
          <div className="pt-4">
             <Button href="/signup" className="h-14 px-10 text-base font-bold shadow-medium">Get Started for Free</Button>
          </div>
        </div>
      </Section>

      {/* Deep Dives */}
      <Section variant="white" id="qr" className="border-t border-border">
        <FeatureDetail 
          icon={QrCode}
          sub="Entry Management"
          title="QR check-in at the speed of light."
          desc="Our proprietary scanning engine is optimized for high-throughput venue gates. Validate thousands of participants with sub-200ms latency, even in low-connectivity environments."
          image="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=1200"
        />
      </Section>

      <Section variant="gray" id="analytics">
        <FeatureDetail 
          reversed
          icon={BarChart3}
          sub="Intelligence"
          title="Real-time analytics for informed decisions."
          desc="Monitor registration velocity, check-in percentages, and revenue streams from a single, unified source of truth. No more manual spreadsheets."
          image="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200"
        />
      </Section>

      <Section variant="white" id="volunteer">
        <FeatureDetail 
          icon={Smartphone}
          sub="Operations"
          title="Empower your volunteer force."
          desc="A dedicated mobile-first interface for your ground team. Assign specific gates, track scan counts, and ensure a seamless entry experience for every participant."
          image="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1200"
        />
      </Section>

      {/* Feature Grid */}
      <Section variant="gray" className="border-b border-border">
        <div className="space-y-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight">The details that make the difference.</h2>
            <p className="text-secondary font-medium">Engineered for the edge cases that crash other platforms.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridFeatures.map((f, i) => (
              <div key={i} className="card-surface p-8 space-y-6 hover:border-accent/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-primary-text border border-border">
                  <f.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed font-medium">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Comparison Section */}
      <Section variant="white">
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight">How we compare.</h2>
            <p className="text-secondary font-medium">Why top organizers are switching to Hackathonbuddy.</p>
          </div>
          
          <div className="max-w-4xl mx-auto overflow-hidden border border-border rounded-2xl shadow-soft">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-secondary">Feature</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-secondary">Manual/Others</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-accent">Hackathonbuddy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Check-in Speed", "2-3 mins / person", "< 5 secs / person"],
                  ["Data Accuracy", "Prone to manual errors", "100% verified source"],
                  ["Reconciliation", "Hours of manual work", "Automated real-time"],
                  ["Scale Capacity", "Bottlenecks at 500+", "Built for 10,000+"],
                  ["Team Coordination", "WhatsApp/Radios", "Integrated live-sync"]
                ].map(([f, o, h], i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-primary-text">{f}</td>
                    <td className="px-8 py-5 text-sm text-secondary font-medium">{o}</td>
                    <td className="px-8 py-5 text-sm font-bold text-primary-text">
                       <div className="flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check size={12} /></div>
                         {h}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="text-center space-y-8">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to upgrade your event?</h2>
           <p className="text-xl text-secondary font-medium max-w-2xl mx-auto">Join the 100+ organizations already hosting high-performance hackathons.</p>
           <div className="pt-4 flex justify-center gap-4">
              <Button href="/signup" className="h-14 px-10 text-base font-bold shadow-medium">Start Your First Event</Button>
              <Button variant="secondary" href="/pricing" className="h-14 px-10 text-base font-bold">View Pricing</Button>
           </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Features;
