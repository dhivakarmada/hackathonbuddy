import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-1 bg-gray-100 overflow-hidden rounded-full">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="h-full bg-accent"
      />
    </div>
  );
};

export default ProgressBar;
