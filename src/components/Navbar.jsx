import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Rocket, 
  ChevronDown, 
  Menu, 
  X, 
  QrCode, 
  BarChart3, 
  Smartphone, 
  Globe, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const ProductMegaMenu = () => {
  const items = [
    { 
      title: "QR Pass System", 
      desc: "Secure, atomic entry management for high-stakes events.", 
      icon: QrCode,
      href: "/features#qr"
    },
    { 
      title: "Real-time Analytics", 
      desc: "Live source of truth for check-ins, revenue, and stats.", 
      icon: BarChart3,
      href: "/features#analytics"
    },
    { 
      title: "Volunteer App", 
      desc: "High-speed scanning engine for distributed teams.", 
      icon: Smartphone,
      href: "/features#volunteer"
    },
    { 
      title: "Whitelabel Pages", 
      desc: "Custom registration flows that feel like your brand.", 
      icon: Globe,
      href: "/features#whitelabel"
    }
  ];

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <div className="w-[640px] bg-white border border-border rounded-2xl shadow-large p-8 grid grid-cols-2 gap-8">
        {items.map((item, idx) => (
          <Link key={idx} to={item.href} className="flex gap-4 group/item p-3 -m-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-border flex items-center justify-center shrink-0 group-hover/item:border-accent/30 group-hover/item:bg-white transition-all">
              <item.icon size={20} className="text-secondary group-hover/item:text-accent" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-text mb-1">{item.title}</p>
              <p className="text-xs text-secondary leading-relaxed font-medium">{item.desc}</p>
            </div>
          </Link>
        ))}
        <div className="col-span-2 pt-6 mt-2 border-t border-border flex items-center justify-between">
           <div className="flex gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                 <ShieldCheck size={14} className="text-emerald-500" /> Enterprise Ready
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                 <Zap size={14} className="text-amber-500" /> High Performance
              </div>
           </div>
           <Link to="/features" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
             View All Features <ChevronDown size={14} className="-rotate-90" />
           </Link>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resources', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-soft py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-content flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary-text rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <Rocket className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">Hackathonbuddy</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group py-2">
            <button className="text-sm font-semibold text-secondary hover:text-primary-text transition-colors flex items-center gap-1">
              Product <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
            <ProductMegaMenu />
          </div>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-semibold transition-colors ${location.pathname === link.href ? 'text-primary-text' : 'text-secondary hover:text-primary-text'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block text-sm font-bold text-secondary hover:text-primary-text transition-colors px-4">Log in</Link>
          <Button href="/signup" className="h-11 px-6 text-sm font-bold shadow-medium">Create Event</Button>
          <button className="lg:hidden p-2 text-secondary" onClick={() => setMobileMenuOpen(true)}><Menu size={24} /></button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-80 bg-white z-[70] p-8 flex flex-col shadow-large">
              <div className="flex justify-between items-center mb-12">
                <span className="font-bold text-lg">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-50 rounded-lg"><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-8 flex-1">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Main Menu</p>
                  <Link to="/features" className="block text-xl font-bold hover:text-accent transition-colors">Features</Link>
                  <Link to="/pricing" className="block text-xl font-bold hover:text-accent transition-colors">Pricing</Link>
                  <Link to="/demo" className="block text-xl font-bold hover:text-accent transition-colors">Product Demo</Link>
                  <Link to="/faq" className="block text-xl font-bold hover:text-accent transition-colors">Resources</Link>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Company</p>
                  <Link to="/about" className="block text-lg font-bold text-secondary hover:text-primary-text">About Us</Link>
                  <Link to="/contact" className="block text-lg font-bold text-secondary hover:text-primary-text">Contact</Link>
                  <Link to="/careers" className="block text-lg font-bold text-secondary hover:text-primary-text">Careers</Link>
                </div>
              </div>
              <div className="pt-8 border-t border-border flex flex-col gap-4">
                <Button variant="secondary" href="/login" className="w-full">Log in</Button>
                <Button href="/signup" className="w-full">Create Event</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
