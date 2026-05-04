import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex items-center justify-between relative px-2">
      {/* Connector Line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />
      
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={idx} className="relative z-10 flex flex-col items-center gap-2 group">
            <div 
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all duration-300 ${
                isActive 
                  ? 'bg-primary-text border-primary-text text-white shadow-soft scale-110' 
                  : isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'bg-white border-border text-secondary'
              }`}
            >
              {isCompleted ? <Check size={14} /> : stepNum}
            </div>
            <span 
              className={`absolute top-full mt-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${
                isActive ? 'text-primary-text' : 'text-secondary opacity-60'
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
