import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminPlaceholder = ({ title }) => (
  <AdminLayout>
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 bg-gray-50 border border-border rounded-[20px] flex items-center justify-center text-slate-300">
        <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-primary-text">Admin: {title} Module</h1>
        <p className="text-sm text-secondary font-medium">This high-authority module is currently under development.</p>
      </div>
    </div>
  </AdminLayout>
);

export const AdminAnalytics = () => <AdminPlaceholder title="Deep Analytics" />;
export const AdminPayments = () => <AdminPlaceholder title="Platform Payments" />;
