import React from 'react';

const Section = ({ 
  children, 
  className = "", 
  containerClassName = "", 
  id,
  variant = "default" // default, white, gray, dark
}) => {
  const variants = {
    default: "bg-background",
    white: "bg-white",
    gray: "bg-gray-50 border-y border-border",
    dark: "bg-gray-900 text-white"
  };

  return (
    <section 
      id={id} 
      className={`py-20 md:py-32 overflow-hidden ${variants[variant]} ${className}`}
    >
      <div className={`max-w-content ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
