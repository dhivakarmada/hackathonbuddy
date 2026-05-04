import React from 'react';
import { User, Bell, Shield, Wallet, Globe, Mail, Phone, Camera, Save } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import Input from '../../components/ui/Input';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-secondary">Manage your account and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Tabs */}
        <div className="space-y-2">
          {[
            { icon: User, label: 'Profile', active: true },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: Shield, label: 'Security', active: false },
            { icon: Wallet, label: 'Billing', active: false },
            { icon: Globe, label: 'Integrations', active: false },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-accent-gradient text-white shadow-lg shadow-primary/10' 
                  : 'text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8 space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-accent-gradient p-px">
                    <div className="w-full h-full bg-surface-dark rounded-[15px] flex items-center justify-center overflow-hidden">
                      <User size={40} className="text-secondary" />
                    </div>
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center border-2 border-background hover:scale-110 transition-transform">
                    <Camera size={14} className="text-white" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Admin Profile</h3>
                  <p className="text-secondary text-sm">Update your photo and personal details.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input label="Full Name" placeholder="Admin User" icon={User} />
                <Input label="Public Email" placeholder="admin@hackathonbuddy.com" icon={Mail} />
                <Input label="Phone Number" placeholder="+91 98765 43210" icon={Phone} />
                <Input label="Timezone" placeholder="IST (UTC+5:30)" icon={Globe} />
              </div>

              <div className="space-y-4">
                <h4 className="font-bold border-b border-white/5 pb-2">Bio</h4>
                <textarea 
                  className="input-field h-24 resize-none"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="pt-6 flex justify-end gap-4">
                <Button variant="secondary">Discard Changes</Button>
                <Button variant="primary">
                  <Save size={18} className="mr-2" /> Save Settings
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-6">Platform Preferences</h3>
              <div className="space-y-6">
                {[
                  { title: 'Public Registration', desc: 'Allow anyone with the link to register.', active: true },
                  { title: 'Email Notifications', desc: 'Receive daily summary of registrations.', active: false },
                  { title: 'Dark Mode', desc: 'Use high-contrast dark theme throughout.', active: true },
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="font-medium text-sm">{pref.title}</p>
                      <p className="text-xs text-secondary">{pref.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={pref.active} />
                      <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
