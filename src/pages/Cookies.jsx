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
           {/* Sidebar TOC */}
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

const Cookies = () => (
  <LegalLayout 
    title="Cookie Policy" 
    date="May 01, 2026"
    toc={['What are Cookies', 'How we use them', 'Types of Cookies', 'Managing Cookies', 'Third Party', 'Contact']}
  >
    <h2 id="what-are-cookies">1. What are Cookies</h2>
    <p>Cookies are small text files that are stored on your device when you visit a website. They help us recognize your device and remember your preferences.</p>

    <h2 id="how-we-use-them">2. How we use them</h2>
    <p>We use cookies to enhance your experience, analyze site traffic, and support our marketing efforts. Some cookies are essential for the operation of the Platform.</p>

    <h2 id="types-of-cookies">3. Types of Cookies</h2>
    <p>We use session cookies (which expire when you close your browser) and persistent cookies (which stay on your device until you delete them).</p>

    <h2 id="managing-cookies">4. Managing Cookies</h2>
    <p>Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, but this may affect the functionality of the Platform.</p>

    <h2 id="third-party">5. Third Party Cookies</h2>
    <p>We may also use third-party cookies, such as those from Google Analytics, to help us understand how users interact with our site.</p>

    <h2 id="contact">6. Contact Us</h2>
    <p>If you have any questions about our Cookie Policy, please contact us at legal@hackathonbuddy.com.</p>
  </LegalLayout>
);

export default Cookies;
