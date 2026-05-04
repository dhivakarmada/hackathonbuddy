import React, { useState } from 'react';
import { db, auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import { Database, UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';

const SeedData = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const seed = async () => {
    setStatus('loading');
    try {
      // 1. Create Organizer
      const orgCred = await createUserWithEmailAndPassword(auth, 'organizer@test.com', 'password123');
      await setDoc(doc(db, 'users', orgCred.user.uid), {
        uid: orgCred.user.uid,
        name: 'Test Organizer',
        email: 'organizer@test.com',
        role: 'organizer',
        createdAt: new Date().toISOString()
      });

      // 2. Create Event for this organizer
      const eventId = 'DEVSPACE-2026';
      await setDoc(doc(db, 'events', eventId), {
        title: "DevSpace Hackathon 2026",
        desc: "VIT University's flagship spatial computing hackathon.",
        date: "2026-03-15",
        organizerId: orgCred.user.uid,
        totalRegistrations: 0,
        totalCheckins: 0,
        totalRevenue: 0,
        status: 'Live',
        createdAt: serverTimestamp()
      });

      // 3. Create Volunteer
      const volCred = await createUserWithEmailAndPassword(auth, 'volunteer@test.com', 'volunteer123');
      await setDoc(doc(db, 'users', volCred.user.uid), {
        uid: volCred.user.uid,
        name: 'Test Volunteer',
        email: 'volunteer@test.com',
        role: 'volunteer',
        createdAt: new Date().toISOString()
      });

      setStatus('success');
      setMessage('Test Organizer, Volunteer, and Event created successfully!');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <Layout>
      <Section className="py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mx-auto">
            <Database size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">System Seed Utility</h1>
            <p className="text-secondary font-medium">Click below to automatically create test credentials in your Firebase instance.</p>
          </div>

          <div className="card-surface p-8 bg-white shadow-soft space-y-6">
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="p-4 bg-gray-50 rounded-2xl border border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Organizer</p>
                <p className="font-bold">organizer@test.com / password123</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Volunteer</p>
                <p className="font-bold">volunteer@test.com / volunteer123</p>
              </div>
            </div>

            <Button 
              onClick={seed} 
              loading={status === 'loading'} 
              className="w-full h-14 text-lg font-bold"
              disabled={status === 'success'}
            >
              <UserPlus className="mr-2" size={20} /> {status === 'success' ? 'Data Seeded' : 'Seed Test Data'}
            </Button>

            {status === 'success' && (
              <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold text-sm">
                <CheckCircle2 size={18} /> {message}
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-sm">
                <AlertCircle size={18} /> {message}
              </div>
            )}
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default SeedData;
