import React from 'react';

const GlassCard = ({ children, className = '', hover = false }) => {
  return (
    <div className={`card-surface ${hover ? 'hover:shadow-medium hover:border-gray-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
