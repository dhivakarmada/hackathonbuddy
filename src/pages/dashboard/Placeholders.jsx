import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Placeholder = ({ title }) => (
  <DashboardLayout>
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 bg-gray-50 border border-border rounded-[20px] flex items-center justify-center text-secondary opacity-40">
        <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-primary-text">{title} Module</h1>
        <p className="text-sm text-secondary font-medium">This section is currently under development.</p>
      </div>
    </div>
  </DashboardLayout>
);

export const Payments = () => <Placeholder title="Payments" />;
export const CheckIns = () => <Placeholder title="QR & Check-ins" />;
export const Settings = () => <Placeholder title="Dashboard Settings" />;
export const Billing = () => <Placeholder title="Billing & Plans" />;
export const Communication = () => <Placeholder title="Communication" />;
export const Updates = () => <Placeholder title="Updates Feed" />;
