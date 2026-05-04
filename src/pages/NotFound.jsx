import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Layout from '../components/Layout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8 max-w-md"
        >
          {/* Visual Element */}
          <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
             <div className="absolute inset-0 bg-gray-50 border border-border rounded-[40px] rotate-6" />
             <div className="absolute inset-0 bg-white border border-border rounded-[40px] -rotate-3 shadow-soft flex items-center justify-center">
                <Search size={48} className="text-secondary opacity-20" />
             </div>
             <p className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-medium">404</p>
          </div>

          <div className="space-y-3">
             <h1 className="text-3xl font-bold tracking-tight text-primary-text">Page not found</h1>
             <p className="text-sm text-secondary font-medium leading-relaxed">
                The page you’re looking for doesn’t exist or has been moved to a new location.
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <Button 
               onClick={() => navigate('/')} 
               className="flex-1 h-12 font-bold shadow-medium"
             >
                <Home size={18} className="mr-2" /> Go to Home
             </Button>
             <button 
               onClick={() => navigate(-1)}
               className="flex-1 h-12 px-6 rounded-2xl border border-border bg-white text-sm font-bold text-secondary hover:text-primary-text hover:bg-gray-50 transition-all flex items-center justify-center"
             >
                <ArrowLeft size={18} className="mr-2" /> Go Back
             </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
