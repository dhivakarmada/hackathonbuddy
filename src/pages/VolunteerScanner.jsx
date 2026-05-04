import React, { useState, useEffect, useRef } from 'react';
import { 
  ScanLine, 
  History, 
  LogOut, 
  Zap, 
  Camera, 
  Search,
  WifiOff,
  User,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { scanQR } from '../firebase/functions';
import ScannerOverlay from '../components/scanner/ScannerOverlay';
import ScanResult from '../components/scanner/ScanResult';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Button from '../components/Button';

const VolunteerScanner = () => {
  const [view, setView] = useState('login'); // login, scan, history
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [scanResult, setScanResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize Scanner
  useEffect(() => {
    if (view === 'scan' && !scannerRef.current) {
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleScan(decodedText);
        },
        (errorMessage) => {
          // ignore scan errors
        }
      ).catch(err => {
        console.error("Camera start error:", err);
        // Handle specific errors like NotAllowedError
        if (err.name === 'NotAllowedError' || err.name === 'NotFoundError') {
           setScanResult({ status: 'error', data: { name: 'Camera Error', id: 'Permission Denied' } });
        }
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(e => console.error(e));
        scannerRef.current = null;
      }
    };
  }, [view]);

  const handleScan = async (qrId) => {
    try {
      const result = await scanQR(qrId, 'DEVSPACE-2026', 'volunteer-01');

      if (result.status === 'invalid') {
        setScanResult({ status: 'error', data: { name: 'Invalid QR', id: qrId } });
        return;
      }

      if (result.status === 'used') {
        setScanResult({ status: 'warning', data: { name: result.data.name, id: qrId } });
        return;
      }

      // Success
      const scanOutput = {
        status: 'success',
        data: { name: result.data.name, id: qrId },
        time: new Date().toLocaleTimeString()
      };

      setScanResult(scanOutput);
      setHistory([scanOutput, ...history]);
      console.log("Scan result:", scanOutput.status, "for QR:", qrId);
    } catch (error) {
      console.error("Scan validation error:", error);
      setScanResult({ status: 'error', data: { name: 'System Error', id: 'Try Again' } });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Volunteer logged in successfully");
      setView('scan');
    } catch (error) {
      console.error("Volunteer login failed:", error.message);
      alert("Invalid volunteer credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Offline Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            className="fixed top-0 left-0 right-0 z-[110] bg-amber-500 p-2 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-black"
          >
            <WifiOff size={14} /> Offline Mode Active
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LOGIN VIEW --- */}
      {view === 'login' && (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full max-w-sm bg-white rounded-3xl border border-border shadow-large p-10 space-y-8"
           >
              <div className="space-y-2 text-center">
                 <div className="w-16 h-16 bg-gray-50 border border-border rounded-2xl flex items-center justify-center text-primary-text mx-auto mb-4">
                    <Camera size={32} />
                 </div>
                 <h1 className="text-2xl font-bold text-primary-text tracking-tight">Volunteer Access</h1>
                 <p className="text-sm text-secondary font-medium">Scan participant passes instantly.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                 <div className="space-y-4">
                    <Input label="Email" placeholder="volunteer@event.com" required />
                    <Input label="Access Code" type="password" placeholder="••••••••" required />
                 </div>
                 <Button className="w-full h-14 text-lg font-bold">Launch Scanner</Button>
                 <p className="text-center text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">
                    Use credentials provided by organizer
                 </p>
              </form>
           </motion.div>
        </div>
      )}

      {/* --- SCAN VIEW --- */}
      {view === 'scan' && (
        <div className="relative h-screen flex flex-col bg-black">
           {/* Top Bar */}
           <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 relative z-20 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-xs font-black uppercase tracking-widest opacity-80">DevSpace 2026</p>
              </div>
              <button 
                onClick={() => setView('login')}
                className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                 <LogOut size={18} />
              </button>
           </div>

           {/* Scanner Area */}
           <div className="flex-1 relative">
              <div id="reader" className="w-full h-full object-cover grayscale opacity-60" />
              <ScannerOverlay />
           </div>

           {/* Quick Actions */}
           <div className="h-32 px-12 flex items-center justify-center gap-12 relative z-20 bg-gradient-to-t from-black to-transparent">
              <button 
                onClick={() => setView('history')}
                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                 <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                    <History size={20} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest">History</span>
              </button>
              
              <button 
                onClick={() => setIsFlashlightOn(!isFlashlightOn)}
                className={`flex flex-col items-center gap-2 transition-all ${isFlashlightOn ? 'text-amber-400' : 'opacity-60 hover:opacity-100'}`}
              >
                 <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${isFlashlightOn ? 'border-amber-400 bg-amber-400/10' : 'border-white/20'}`}>
                    <Zap size={20} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest">Flash</span>
              </button>
           </div>
        </div>
      )}

      {/* --- HISTORY VIEW --- */}
      {view === 'history' && (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
           <div className="h-16 px-6 border-b border-border bg-white flex items-center justify-between sticky top-0 z-20">
              <button 
                onClick={() => setView('scan')}
                className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary-text transition-colors"
              >
                 <ArrowLeft size={18} /> Back to Scan
              </button>
              <h2 className="font-bold text-primary-text">Scan History</h2>
              <div className="w-10" />
           </div>

           <div className="flex-1 p-6 space-y-4 overflow-y-auto max-w-2xl mx-auto w-full">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search scans..." 
                   className="w-full h-11 pl-10 bg-white border border-border rounded-xl text-sm text-primary-text focus:outline-none shadow-soft"
                 />
              </div>

              <div className="space-y-3 pb-20">
                 {history.length > 0 ? history.map((item, i) => (
                   <div key={i} className="bg-white border border-border p-4 rounded-2xl flex items-center justify-between shadow-soft">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                           item.status === 'success' ? 'bg-emerald-50 text-emerald-500' :
                           item.status === 'warning' ? 'bg-amber-50 text-amber-500' :
                           'bg-rose-50 text-rose-500'
                         }`}>
                            {item.status === 'success' ? <CheckCircle2 size={18} /> :
                             item.status === 'warning' ? <AlertCircle size={18} /> :
                             <XCircle size={18} />}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-primary-text">{item.data.name}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">{item.time}</p>
                         </div>
                      </div>
                      <Badge variant={item.status === 'success' ? 'success' : item.status === 'warning' ? 'warning' : 'danger'}>
                         {item.status === 'success' ? 'Allowed' : item.status === 'warning' ? 'Duplicate' : 'Invalid'}
                      </Badge>
                   </div>
                 )) : (
                   <div className="py-20 text-center space-y-4 opacity-40">
                      <ScanLine size={48} className="mx-auto" />
                      <p className="text-sm font-bold text-secondary">No scans recorded yet</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* --- SCAN RESULT OVERLAY --- */}
      <AnimatePresence>
        {scanResult && (
          <ScanResult 
            status={scanResult.status} 
            data={scanResult.data} 
            onDismiss={() => setScanResult(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VolunteerScanner;
