import React from 'react';
import { Check, Info, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import Accordion from '../components/ui/Accordion';
import Badge from '../components/ui/Badge';

const PricingCard = ({ tier, price, sub, features, cta, recommended, dark }) => (
  <div className={`card-surface p-10 flex flex-col h-full relative ${recommended ? 'border-accent ring-1 ring-accent bg-accent/[0.02]' : ''} ${dark ? 'bg-gray-900 border-gray-800 text-white' : ''}`}>
    {recommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent rounded text-[10px] font-black text-white uppercase tracking-widest shadow-medium">
        Most Popular
      </div>
    )}
    <div className="mb-8">
      <h3 className={`font-bold text-2xl mb-2 ${recommended && !dark ? 'text-accent' : ''}`}>{tier}</h3>
      <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-secondary'}`}>{sub}</p>
    </div>
    
    <div className="mb-8 flex items-baseline gap-1">
      <span className="text-5xl font-bold">{price}</span>
      {price !== 'Free' && price !== 'Custom' && <span className={`text-sm font-bold ${dark ? 'text-gray-400' : 'text-secondary'}`}>/event</span>}
    </div>

    <ul className="space-y-5 mb-10 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className={`mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${dark ? 'bg-white/10 text-white' : 'bg-accent/10 text-accent'}`}>
            <Check size={12} />
          </div>
          <span className={`text-sm font-bold leading-tight ${dark ? 'text-gray-300' : 'text-primary-text'}`}>{f}</span>
        </li>
      ))}
    </ul>

    <Button 
      href="/signup" 
      variant={recommended ? 'primary' : 'secondary'}
      className={`w-full h-12 text-sm font-bold shadow-soft ${recommended && !dark ? 'bg-accent hover:bg-accent-dark border-none' : ''} ${dark ? 'bg-white text-gray-900 hover:bg-gray-100 border-none' : ''}`}
    >
      {cta} <ArrowRight size={16} className="ml-2" />
    </Button>
  </div>
);

const Pricing = () => {
  const faqs = [
    { title: "Is the 'Professional' fee per registration or flat?", content: "It's a flat fee per event. We don't believe in taxing your success. Whether you have 500 or 5,000 participants, the price remains the same." },
    { title: "Can I upgrade from Starter to Professional mid-event?", content: "Absolutely. You can upgrade at any point to unlock pro features like QR generation and Razorpay integration. Your existing data will be preserved seamlessly." },
    { title: "What constitutes an 'event'?", content: "An event is defined as a single hackathon or workshop with a specific start and end date. Access to the dashboard for that event remains active for 3 months after the event ends." },
    { title: "Do you offer discounts for non-profits or student groups?", content: "Yes! We love supporting the community. Contact our sales team with your organization details for special pricing." }
  ];

  const comparisonTable = [
    { name: "Participants", free: "50", pro: "Unlimited", ent: "Unlimited" },
    { name: "QR Pass Generation", free: false, pro: true, ent: true },
    { name: "Razorpay Integration", free: false, pro: true, ent: true },
    { name: "Volunteer Accounts", free: "1", pro: "Unlimited", ent: "Unlimited" },
    { name: "Real-time Analytics", free: true, pro: true, ent: true },
    { name: "Custom Domain", free: false, pro: "Paid Add-on", ent: true },
    { name: "Dedicated Manager", free: false, pro: false, ent: true },
    { name: "SLA Guarantees", free: false, pro: false, ent: "99.99%" }
  ];

  return (
    <Layout>
      {/* Hero */}
      <Section className="text-center pb-0">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text">
            Simple, transparent pricing.
          </h1>
          <p className="text-xl text-secondary font-medium leading-relaxed">
            No hidden fees. No surprises. High-performance event infrastructure designed for every scale.
          </p>
        </div>
      </Section>

      {/* Cards */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard 
            tier="Starter"
            sub="For local community meetups"
            price="Free"
            features={[
              "Up to 50 participants",
              "1 Active event",
              "Live registration dashboard",
              "Basic csv export",
              "Community support"
            ]}
            cta="Get Started"
          />
          <PricingCard 
            recommended
            tier="Professional"
            sub="For high-stakes hackathons"
            price="₹4,999"
            features={[
              "Unlimited participants",
              "Secure QR Pass generation",
              "Razorpay integration",
              "Unlimited volunteer scans",
              "High-throughput gate logic",
              "Server-side validation"
            ]}
            cta="Deploy Event"
          />
          <PricingCard 
            dark
            tier="Enterprise"
            sub="For university-wide infra"
            price="Custom"
            features={[
              "Multi-event portal",
              "Custom whitelabeling",
              "Dedicated account manager",
              "On-site support available",
              "SSO & SAML integration",
              "SLA guarantees"
            ]}
            cta="Talk to Sales"
          />
        </div>
      </Section>

      {/* Comparison Table */}
      <Section variant="gray">
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight">Full Feature Comparison</h2>
            <p className="text-secondary font-medium">Everything you need to know about what's included.</p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white border border-border rounded-2xl shadow-soft overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Feature</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Starter</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-accent">Professional</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-secondary">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonTable.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-primary-text">{row.name}</td>
                    <td className="px-8 py-5 text-sm text-secondary font-medium">
                       {typeof row.free === 'boolean' ? (row.free ? <Check size={16} className="text-emerald-500" /> : <X className="text-gray-300" size={16} />) : row.free}
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-primary-text">
                       {typeof row.pro === 'boolean' ? (row.pro ? <Check size={16} className="text-accent" /> : <X className="text-gray-300" size={16} />) : row.pro}
                    </td>
                    <td className="px-8 py-5 text-sm text-secondary font-medium">
                       {typeof row.ent === 'boolean' ? (row.ent ? <Check size={16} className="text-emerald-500" /> : <X className="text-gray-300" size={16} />) : row.ent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Pricing FAQs */}
      <Section variant="white">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-primary-text">Pricing Questions</h2>
            <p className="text-secondary font-medium leading-relaxed">Everything you need to know about our billing and tiers.</p>
          </div>
          <Accordion items={faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="card-surface p-12 md:p-20 text-center space-y-8 bg-gray-50 border-accent/20">
           <h2 className="text-4xl font-bold tracking-tight">Need a custom plan for your institution?</h2>
           <p className="text-xl text-secondary font-medium max-w-2xl mx-auto">We offer special pricing for government-run universities and non-profit organizations.</p>
           <Button variant="secondary" href="/contact" className="h-14 px-10 font-bold">Contact Sales Team</Button>
        </div>
      </Section>
    </Layout>
  );
};

const X = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

export default Pricing;
