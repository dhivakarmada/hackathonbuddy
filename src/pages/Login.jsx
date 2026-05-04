import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Globe, Rocket } from 'lucide-react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful for:", userCredential.user.uid);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
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
          <h1 className="text-3xl font-bold text-primary-text">Welcome back</h1>
          <p className="text-secondary text-sm">Enter your credentials to access your dashboard.</p>
        </div>

        <GlassCard className="p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              label="Email address" 
              type="email" 
              placeholder="name@company.com" 
              icon={Mail} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-primary-text">Password</label>
                <a href="#" className="text-sm font-medium text-accent hover:underline">Forgot password?</a>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                icon={Lock} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'} <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-secondary">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => alert('Social Login is temporarily unavailable. Please use Email/Password.')}
              className="flex items-center justify-center gap-2 h-12 border border-border rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <Globe size={18} /> Google
            </button>
            <button 
              onClick={() => alert('Social Login is temporarily unavailable. Please use Email/Password.')}
              className="flex items-center justify-center gap-2 h-12 border border-border rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <Globe size={18} /> GitHub
            </button>
          </div>
        </GlassCard>

        <p className="text-center text-sm text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent font-bold hover:underline">Create an event</Link>
        </p>

        <div className="flex justify-center gap-8 text-xs text-secondary font-medium">
          <a href="#" className="hover:text-primary-text">Terms of Service</a>
          <a href="#" className="hover:text-primary-text">Privacy Policy</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
