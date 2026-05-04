import React from 'react';
import { motion } from 'framer-motion';

const ScannerOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Hole in the middle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
           {/* The Scanning Box */}
           <div className="absolute inset-0 border-2 border-white/20 rounded-[32px] overflow-hidden">
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
           </div>

           {/* Corner Indicators */}
           <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
           <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
           <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
           <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />

           {/* Pulsing effect */}
           <motion.div 
             animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute -inset-4 border border-white/20 rounded-[40px]"
           />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-32 left-0 right-0 text-center">
         <p className="text-sm font-bold text-white/80 tracking-wide bg-black/20 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-white/10">
            Align QR code within frame
         </p>
      </div>
    </div>
  );
};

export default ScannerOverlay;
