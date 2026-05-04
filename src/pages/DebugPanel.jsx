import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';
import { Database, Shield, Activity, Clock, Server } from 'lucide-react';

const DebugPanel = () => {
  const [status, setStatus] = useState('checking');
  const [docCount, setDocCount] = useState(0);
  const [lastSync, setLastSync] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const q = query(collection(db, 'events'), limit(1));
        const snap = await getDocs(q);
        setStatus('connected');
        setDocCount(snap.size);
        setLastSync(new Date().toLocaleTimeString());
      } catch (err) {
        setStatus('error');
        console.error(err);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    checkStatus();
    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <Section className="py-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="text-accent" /> Firebase Debug Panel
            </h1>
            <p className="text-secondary font-medium">Real-time system health and connectivity status.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-surface p-6 bg-white shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Database size={18} className="text-accent" /> Firestore Status
                </div>
                <Badge variant={status === 'connected' ? 'success' : 'danger'}>
                  {status === 'connected' ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-secondary">Sample Docs</span>
                  <span className="font-bold">{docCount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-secondary">Last Sync</span>
                  <span className="font-bold">{lastSync || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="card-surface p-6 bg-white shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Shield size={18} className="text-accent" /> Auth Status
                </div>
                <Badge variant={user ? 'success' : 'secondary'}>
                  {user ? 'Authenticated' : 'Guest'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-secondary">User ID</span>
                  <span className="font-bold truncate max-w-[150px]">{user?.uid || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-secondary">Email</span>
                  <span className="font-bold">{user?.email || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-surface p-8 bg-gray-50 border-dashed border-2 border-border text-center space-y-4">
             <Server className="mx-auto text-secondary opacity-40" size={32} />
             <div className="space-y-1">
                <p className="text-sm font-bold text-primary-text">Infrastructure Verified</p>
                <p className="text-xs text-secondary font-medium">Firebase Client SDK initialized with projectId: hackathon-buddy-a7413</p>
             </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default DebugPanel;
