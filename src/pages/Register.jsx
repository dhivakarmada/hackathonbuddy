import React, { useState, useReducer } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  User,
  Mail,
  School,
  Lock,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import Stepper from '../components/ui/Stepper';
import ProgressBar from '../components/ui/ProgressBar';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    teamName: '',
    github: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const steps = ["Basic Info", "Details", "Review", "Payment"];
  const progress = (step / steps.length) * 100;

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // 1. Create Payment Order via Cloud Function
      const orderResponse = await fetch('https://us-central1-hackathon-buddy-a7413.cloudfunctions.net/createPaymentOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 499 }) // Hardcoded for now
      });
      const orderData = await orderResponse.json();

      if (!orderData.id) throw new Error("Failed to create order");

      // 2. Initiate Razorpay
      const options = {
        key: "YOUR_RAZORPAY_KEY", // In production, this can come from an API or env
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Hackathonbuddy",
        description: "DevSpace 2026 Registration",
        order_id: orderData.id,
        handler: async (response) => {
          // 3. Verify Payment
          const verifyResponse = await fetch('https://us-central1-hackathon-buddy-a7413.cloudfunctions.net/verifyPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: 499,
              eventId: id
            })
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // 4. Create Registration (Server-side handled)
            const regResponse = await fetch('https://us-central1-hackathon-buddy-a7413.cloudfunctions.net/createRegistration', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...formData,
                eventId: id,
                paymentId: response.razorpay_payment_id
              })
            });
            const regData = await regResponse.json();

            localStorage.setItem('last_registration', JSON.stringify({
              ...formData,
              id: regData.registrationId,
              qrId: regData.qrId,
              qrImage: regData.qrImage
            }));

            navigate(`/event/${id}/success`);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: "#6C63FF" },
        modal: {
          ondismiss: () => setLoading(false)
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
    console.log("Registration process initiated for:", formData.email);
  };

  return (
    <Layout>
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <ProgressBar progress={progress} />
      </div>

      <Section className="min-h-[80vh] flex flex-col items-center pt-24">
        <div className="w-full max-w-2xl space-y-12">
          {/* Header */}
          <div className="flex items-center justify-between">
             <button 
               onClick={() => step === 1 ? navigate(`/event/${id}`) : handleBack()}
               className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary-text transition-colors group"
             >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                {step === 1 ? 'Back to event' : 'Previous step'}
             </button>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Step {step} of 4</p>
                <p className="font-bold text-sm text-primary-text">{steps[step-1]}</p>
             </div>
          </div>

          <div className="py-4">
             <Stepper steps={steps} currentStep={step} />
          </div>

          {/* Form Card */}
          <div className="card-surface p-8 md:p-12 bg-white shadow-large relative overflow-hidden">
             <AnimatePresence mode="wait">
               <motion.div
                 key={step}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3, ease: "circOut" }}
                 className="space-y-8"
               >
                 {step === 1 && (
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight">Tell us about yourself.</h2>
                         <p className="text-sm text-secondary font-medium">Use your official college email if possible.</p>
                      </div>
                      <div className="space-y-4">
                         <Input 
                           label="Full Name" 
                           placeholder="Alex Rivera" 
                           value={formData.name}
                           onChange={(e) => dispatch({type: 'UPDATE_FIELD', field: 'name', value: e.target.value})}
                         />
                         <Input 
                           label="Email Address" 
                           type="email" 
                           placeholder="alex@university.edu" 
                           value={formData.email}
                           onChange={(e) => dispatch({type: 'UPDATE_FIELD', field: 'email', value: e.target.value})}
                         />
                         <Input 
                           label="Phone Number" 
                           placeholder="+91 98765 43210" 
                           value={formData.phone}
                           onChange={(e) => dispatch({type: 'UPDATE_FIELD', field: 'phone', value: e.target.value})}
                         />
                      </div>
                   </div>
                 )}

                 {step === 2 && (
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight">Academic Details.</h2>
                         <p className="text-sm text-secondary font-medium">This helps us verify your student status.</p>
                      </div>
                      <div className="space-y-4">
                         <Input 
                           label="College / University" 
                           placeholder="VIT University, Vellore" 
                           value={formData.college}
                           onChange={(e) => dispatch({type: 'UPDATE_FIELD', field: 'college', value: e.target.value})}
                         />
                         <div className="grid grid-cols-2 gap-4">
                            <Input 
                              label="Year of Study" 
                              placeholder="3rd Year" 
                              value={formData.year}
                              onChange={(e) => dispatch({type: 'UPDATE_FIELD', field: 'year', value: e.target.value})}
                            />
                            <Input 
                              label="Team Name (Optional)" 
                              placeholder="Zero Byte" 
                              value={formData.teamName}
                              onChange={(e) => dispatch({type: 'UPDATE_FIELD', field: 'teamName', value: e.target.value})}
                            />
                         </div>
                         <Input 
                           label="GitHub Profile URL" 
                           placeholder="https://github.com/alexrivera" 
                           value={formData.github}
                           onChange={(e) => dispatch({type: 'UPDATE_FIELD', field: 'github', value: e.target.value})}
                         />
                      </div>
                   </div>
                 )}

                 {step === 3 && (
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight">Review details.</h2>
                         <p className="text-sm text-secondary font-medium">Ensure everything is correct before proceeding.</p>
                      </div>
                      <div className="space-y-4 p-6 bg-gray-50 border border-border rounded-2xl">
                         {[
                           { label: "Name", val: formData.name },
                           { label: "Email", val: formData.email },
                           { label: "College", val: formData.college },
                           { label: "Team", val: formData.teamName || "Individual" }
                         ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                              <p className="text-[10px] font-black uppercase tracking-widest text-secondary">{item.label}</p>
                              <p className="text-sm font-bold text-primary-text">{item.val || "Not provided"}</p>
                           </div>
                         ))}
                      </div>
                      <div className="p-4 border border-accent/20 bg-accent/[0.02] rounded-xl flex items-center gap-4">
                         <Info size={18} className="text-accent shrink-0" />
                         <p className="text-xs text-secondary font-medium">By proceeding, you agree to the event rules and code of conduct.</p>
                      </div>
                   </div>
                 )}

                 {step === 4 && (
                   <div className="space-y-8">
                      <div className="space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight">Secure Payment.</h2>
                         <p className="text-sm text-secondary font-medium">Powered by Razorpay. All transactions are encrypted.</p>
                      </div>
                      <div className="p-8 border border-border rounded-2xl space-y-8">
                         <div className="flex justify-between items-end">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black uppercase tracking-widest text-secondary">DevSpace 2026</p>
                               <p className="text-xl font-bold">Registration Fee</p>
                            </div>
                            <p className="text-3xl font-bold text-accent">₹499</p>
                         </div>
                         <div className="space-y-4 pt-8 border-t border-border">
                            <div className="flex items-center gap-3 text-xs text-secondary font-bold">
                               <ShieldCheck size={16} className="text-emerald-500" /> Secure SSL Connection
                            </div>
                            <div className="flex items-center gap-3 text-xs text-secondary font-bold">
                               <Lock size={16} className="text-emerald-500" /> 256-bit Encryption
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center justify-center gap-6 opacity-40 grayscale">
                         <CreditCard size={24} />
                         <Zap size={24} />
                         <ShieldCheck size={24} />
                      </div>
                   </div>
                 )}

                 <div className="pt-8 flex gap-4">
                    <Button 
                      className="flex-1 h-14 text-lg font-bold shadow-medium"
                      onClick={handleNext}
                      loading={loading}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : step === 4 ? 'Proceed to Payment' : 'Continue'} 
                      {!loading && <ArrowRight size={20} className="ml-2" />}
                    </Button>
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Trust Elements */}
          <div className="flex justify-center items-center gap-8 text-secondary opacity-60">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} /> Trustworthy
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <Lock size={14} /> Encrypted
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <Check size={14} /> Verified
             </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Register;
