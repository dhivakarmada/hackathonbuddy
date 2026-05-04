import React from 'react';

const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    success: 'bg-success/10 text-success border border-success/20',
    error: 'bg-error/10 text-error border border-error/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    info: 'bg-primary/10 text-primary border border-primary/20',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
