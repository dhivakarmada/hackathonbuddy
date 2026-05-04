import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const columns = [
    { 
      title: 'Product', 
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Demo Walkthrough', href: '/demo' },
        { name: 'Live Scanner', href: '/scanner' },
        { name: 'API Docs', href: '#' }
      ]
    },
    { 
      title: 'Company', 
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Brand Kit', href: '#' },
        { name: 'Status', href: '#' }
      ]
    },
    { 
      title: 'Resources', 
      links: [
        { name: 'Documentation', href: '/faq' },
        { name: 'Help Center', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'Blog', href: '/blog' },
        { name: 'Changelog', href: '#' }
      ]
    },
    { 
      title: 'Legal', 
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Security', href: '#' }
      ]
    }
  ];

  return (
    <footer className="pt-24 pb-12 bg-white border-t border-border mt-auto">
      <div className="max-w-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-8 mb-24">
           {/* Logo + Brand */}
           <div className="lg:col-span-2 space-y-8">
             <Link to="/" className="flex items-center gap-2.5">
               <div className="w-9 h-9 bg-primary-text rounded-xl flex items-center justify-center">
                 <Rocket className="text-white" size={20} />
               </div>
               <span className="font-bold text-xl tracking-tight">Hackathonbuddy</span>
             </Link>
             <p className="text-sm text-secondary font-medium leading-relaxed max-w-xs">
               High-precision event management infrastructure for the next generation of developers and organizers.
             </p>
             <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text transition-colors shadow-soft"><Mail size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text transition-colors shadow-soft">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
               </a>
               <a href="#" className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text transition-colors shadow-soft">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
             </div>
           </div>

           {/* Links */}
           {columns.map((col) => (
             <div key={col.title} className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">{col.title}</h4>
               <ul className="space-y-4">
                 {col.links.map((link) => (
                   <li key={link.name}>
                     <Link to={link.href} className="text-sm font-bold text-secondary hover:text-primary-text transition-colors">
                       {link.name}
                     </Link>
                   </li>
                 ))}
               </ul>
             </div>
           ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-black uppercase tracking-widest text-secondary">
             © 2026 Hackathonbuddy Engine. Engineered for precision.
           </p>
           <div className="flex gap-8">
             <Link to="/faq" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary-text transition-colors">Documentation</Link>
             <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary-text transition-colors">Support</Link>
             <Link to="/status" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary-text transition-colors">Status</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
