import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw, LayoutDashboard, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Layout from '../components/Layout';

const ErrorPage = ({ message, errorId = "ERR-9124-HB" }) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white border border-border rounded-[40px] p-12 shadow-large text-center space-y-10"
        >
          <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mx-auto">
             <AlertCircle size={40} />
          </div>

          <div className="space-y-3">
             <h1 className="text-3xl font-bold tracking-tight text-primary-text">Something went wrong</h1>
             <p className="text-sm text-secondary font-medium leading-relaxed max-w-xs mx-auto">
                {message || "We encountered an unexpected issue while processing your request. Please try again."}
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Button 
               onClick={() => window.location.reload()}
               className="h-14 font-bold shadow-medium"
             >
                <RefreshCcw size={18} className="mr-2" /> Try Again
             </Button>
             <Button 
               variant="secondary"
               onClick={() => navigate('/dashboard')}
               className="h-14 font-bold"
             >
                <LayoutDashboard size={18} className="mr-2" /> Dashboard
             </Button>
          </div>

          <div className="pt-8 border-t border-border flex flex-col items-center gap-2">
             <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">Error ID: {errorId}</p>
             <button className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5">
                <MessageCircle size={14} /> Contact Support
             </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
