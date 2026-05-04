import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, activeTab, onChange, className = "" }) => {
  return (
    <div className={`flex p-1 bg-gray-100 rounded-xl w-fit ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-5 py-2 text-xs font-bold capitalize rounded-lg transition-all ${
            activeTab === tab.id 
              ? 'text-primary-text' 
              : 'text-secondary hover:text-primary-text'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-lg shadow-soft"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
