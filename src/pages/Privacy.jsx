import React from 'react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';

const LegalLayout = ({ title, date, children, toc }) => {
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
           <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-32 space-y-8">
                 <div className="p-8 bg-gray-50 border border-border rounded-2xl space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Table of Contents</p>
                    <nav className="flex flex-col gap-4">
                       {toc.map((item, i) => (
                         <a key={i} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-secondary hover:text-accent transition-colors">
                            {i + 1}. {item}
                         </a>
                       ))}
                    </nav>
                 </div>
              </div>
           </div>
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

const Privacy = () => (
  <LegalLayout 
    title="Privacy Policy" 
    date="May 01, 2026"
    toc={['Collection', 'Usage', 'Storage', 'Cookies', 'Your Rights', 'Contact']}
  >
    <h2 id="collection">1. Information Collection</h2>
    <p>We collect information you provide directly to us, such as when you create an account, register for an event, or contact support.</p>

    <h2 id="usage">2. Use of Information</h2>
    <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account and events.</p>

    <h2 id="storage">3. Data Storage</h2>
    <p>Your data is stored securely on encrypted servers. We implement industry-standard security measures to protect your personal information.</p>

    <h2 id="cookies">4. Cookies</h2>
    <p>We use cookies and similar technologies to track activity on our platform and hold certain information to improve your experience.</p>

    <h2 id="your-rights">5. Your Rights</h2>
    <p>You have the right to access, correct, or delete your personal data. Please contact us to exercise these rights.</p>

    <h2 id="contact">6. Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at privacy@hackathonbuddy.com.</p>
  </LegalLayout>
);

export default Privacy;
