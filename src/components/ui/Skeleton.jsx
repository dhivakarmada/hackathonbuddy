import React from 'react';
import { motion } from 'framer-motion';

const Shimmer = () => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: '100%' }}
    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
  />
);

const SkeletonBase = ({ className, children }) => (
  <div className={`relative overflow-hidden bg-gray-200/60 rounded-xl ${className}`}>
    <Shimmer />
    {children}
  </div>
);

export const Skeleton = ({ variant = 'text', className }) => {
  if (variant === 'circle') return <SkeletonBase className={`rounded-full ${className}`} />;
  if (variant === 'rectangle') return <SkeletonBase className={`${className}`} />;
  return <SkeletonBase className={`h-4 w-full ${className}`} />;
};

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="w-full space-y-4">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-white">
        <Skeleton variant="rectangle" className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
           <Skeleton className="w-[30%] h-4" />
           <Skeleton className="w-[15%] h-3" />
        </div>
        <Skeleton className="w-20 h-4 mt-1" />
      </div>
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="card-surface p-6 bg-white border border-border rounded-3xl space-y-4">
    <div className="flex justify-between">
       <Skeleton variant="rectangle" className="w-12 h-12 rounded-2xl" />
       <Skeleton variant="rectangle" className="w-20 h-6 rounded-lg" />
    </div>
    <div className="space-y-2 pt-2">
       <Skeleton className="w-[70%] h-5" />
       <Skeleton className="w-[40%] h-4" />
    </div>
    <div className="flex gap-4 pt-4">
       <Skeleton className="flex-1 h-10 rounded-xl" />
       <Skeleton className="flex-1 h-10 rounded-xl" />
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="card-surface p-8 bg-white border border-border rounded-3xl h-[400px] flex flex-col">
    <div className="flex justify-between items-center mb-8">
       <Skeleton className="w-32 h-6" />
       <Skeleton className="w-24 h-4" />
    </div>
    <div className="flex-1 flex items-end gap-4 pb-4">
       {[...Array(7)].map((_, i) => (
         <Skeleton 
           key={i} 
           variant="rectangle" 
           className="flex-1 rounded-t-lg" 
           style={{ height: `${Math.random() * 60 + 20}%` }} 
         />
       ))}
    </div>
    <div className="flex justify-between pt-4 border-t border-border">
       {[...Array(7)].map((_, i) => <Skeleton key={i} className="w-8 h-3" />)}
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-8">
     {[...Array(3)].map((_, i) => (
       <div key={i} className="space-y-3">
          <Skeleton className="w-24 h-4" />
          <Skeleton variant="rectangle" className="w-full h-12 rounded-xl" />
       </div>
     ))}
     <Skeleton variant="rectangle" className="w-full h-14 rounded-2xl mt-4" />
  </div>
);
