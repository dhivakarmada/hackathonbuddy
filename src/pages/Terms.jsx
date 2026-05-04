import React from 'react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';

const LegalLayout = ({ title, date, children }) => {
  return (
    <Layout>
      <Section className="pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text">{title}</h1>
           <p className="text-sm font-black uppercase tracking-widest text-secondary">Last Updated: {date}</p>
        </div>
      </Section>
      
      <Section variant="white" className="pt-0">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
           {/* Sidebar TOC */}
           <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-32 space-y-8">
                 <div className="p-8 bg-gray-50 border border-border rounded-2xl space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Table of Contents</p>
                    <nav className="flex flex-col gap-4">
                       {['Acceptance', 'User Accounts', 'Event Creation', 'Payment Terms', 'Liability', 'Termination'].map((item, i) => (
                         <a key={i} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-secondary hover:text-accent transition-colors">
                            {i + 1}. {item}
                         </a>
                       ))}
                    </nav>
                 </div>
                 <div className="p-8 border border-border rounded-2xl space-y-4">
                    <p className="font-bold text-sm">Need help?</p>
                    <p className="text-xs text-secondary font-medium">If you have questions about our terms, please contact legal@hackathonbuddy.com</p>
                 </div>
              </div>
           </div>

           {/* Content */}
           <div className="lg:col-span-8">
              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-primary-text prose-p:text-secondary prose-p:font-medium prose-li:text-secondary prose-li:font-medium">
                 {children}
              </div>
           </div>
        </div>
      </Section>
    </Layout>
  );
};

const Terms = () => (
  <LegalLayout title="Terms of Service" date="May 01, 2026">
    <h2 id="acceptance">1. Acceptance of Terms</h2>
    <p>By accessing and using Hackathonbuddy (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

    <h2 id="user-accounts">2. User Accounts</h2>
    <p>To use certain features of the Platform, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

    <h2 id="event-creation">3. Event Creation</h2>
    <p>Organizers are responsible for the content, management, and fulfillment of the events they create on the Platform. Hackathonbuddy acts solely as a technical service provider.</p>

    <h2 id="payment-terms">4. Payment Terms</h2>
    <p>Fees for our Professional and Enterprise tiers are processed through our payment partners. All fees are non-refundable unless otherwise specified in your specific service agreement.</p>

    <h2 id="liability">5. Limitation of Liability</h2>
    <p>To the maximum extent permitted by law, Hackathonbuddy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform.</p>

    <h2 id="termination">6. Termination</h2>
    <p>We reserve the right to suspend or terminate your account at our sole discretion if we determine you have violated these Terms of Service.</p>
  </LegalLayout>
);

export default Terms;
