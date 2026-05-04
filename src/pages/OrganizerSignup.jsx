import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Rocket, Shield } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';

const OrganizerSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create organizer profile in users collection
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        role: 'organizer',
        createdAt: new Date().toISOString()
      });

      console.log("Organizer account created in Firestore:", user.uid);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 bg-primary-text rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Rocket className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Hackathonbuddy</span>
          </Link>
          <h1 className="text-3xl font-bold text-primary-text">Create your account</h1>
          <p className="text-secondary text-sm font-medium">Start managing your hackathons with precision.</p>
        </div>

        <GlassCard className="p-8 space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <Input 
              label="Full name" 
              type="text" 
              placeholder="John Doe" 
              icon={User} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input 
              label="Work email" 
              type="email" 
              placeholder="john@company.com" 
              icon={Mail} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={Lock} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-border">
              <Shield className="text-accent shrink-0 mt-0.5" size={16} />
              <p className="text-[10px] text-secondary leading-relaxed font-medium">
                By creating an account, you agree to our Terms of Service and Privacy Policy. Your data is encrypted and secure.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold" 
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'} <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>
        </GlassCard>

        <p className="text-center text-sm text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-bold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default OrganizerSignup;
