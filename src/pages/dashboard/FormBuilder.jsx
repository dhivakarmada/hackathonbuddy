import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Eye, 
  Settings, 
  Save,
  ChevronRight,
  Smartphone,
  Monitor
} from 'lucide-react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/Button';
import Input from '../../components/ui/Input';

const FormBuilder = () => {
  const [fields, setFields] = useState([
    { id: '1', type: 'text', label: 'Full Name', required: true },
    { id: '2', type: 'email', label: 'Email Address', required: true },
    { id: '3', type: 'text', label: 'College / University', required: true }
  ]);
  const [previewMode, setPreviewMode] = useState('desktop');

  const addField = (type) => {
    const newField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: 'New Question',
      required: false
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-160px)] flex gap-8">
        {/* Left: Builder Panel */}
        <div className="flex-1 flex flex-col bg-white border border-border rounded-[32px] shadow-soft overflow-hidden">
           <div className="h-16 px-8 border-b border-border flex items-center justify-between shrink-0 bg-gray-50/50">
              <h2 className="font-bold text-lg">Registration Form Builder</h2>
              <div className="flex gap-3">
                 <Button variant="secondary" className="h-9 text-xs font-bold px-4">
                    <Save size={14} className="mr-2" /> Save Draft
                 </Button>
                 <Button className="h-9 text-xs font-bold px-4">Publish Form</Button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Add Fields</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                       {['Text', 'Email', 'Dropdown', 'Phone', 'GitHub', 'LinkedIn'].map(type => (
                         <button 
                           key={type}
                           onClick={() => addField(type.toLowerCase())}
                           className="h-12 border border-border rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-secondary hover:text-primary-text hover:border-accent/40 transition-all bg-white"
                         >
                            <Plus size={14} /> {type}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Form Structure</p>
                    <Reorder.Group axis="y" values={fields} onReorder={setFields} className="space-y-4">
                       {fields.map((field) => (
                         <Reorder.Item 
                           key={field.id} 
                           value={field}
                           className="p-6 bg-white border border-border rounded-2xl flex items-center gap-6 shadow-soft cursor-default group"
                         >
                            <div className="cursor-grab active:cursor-grabbing text-secondary/40 hover:text-secondary">
                               <GripVertical size={20} />
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                               <Input 
                                 label="Field Label" 
                                 value={field.label} 
                                 onChange={() => {}} // In a real app, update state
                               />
                               <div className="flex items-end pb-2.5">
                                  <label className="flex items-center gap-3 cursor-pointer group/label">
                                     <div className={`w-10 h-5 rounded-full border border-border relative transition-colors ${field.required ? 'bg-accent border-accent' : 'bg-gray-100'}`}>
                                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${field.required ? 'left-6' : 'left-1'}`} />
                                     </div>
                                     <span className="text-xs font-bold text-secondary">Required</span>
                                  </label>
                               </div>
                            </div>
                            <button 
                              onClick={() => removeField(field.id)}
                              className="p-2 rounded-lg text-secondary/40 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                            >
                               <Trash2 size={18} />
                            </button>
                         </Reorder.Item>
                       ))}
                    </Reorder.Group>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Preview Panel */}
        <div className="hidden lg:flex w-[400px] xl:w-[500px] flex-col gap-6">
           <div className="flex justify-center gap-2">
              <button 
                onClick={() => setPreviewMode('desktop')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  previewMode === 'desktop' ? 'bg-primary-text text-white border-primary-text' : 'bg-white text-secondary border-border'
                }`}
              >
                 <Monitor size={18} />
              </button>
              <button 
                onClick={() => setPreviewMode('mobile')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  previewMode === 'mobile' ? 'bg-primary-text text-white border-primary-text' : 'bg-white text-secondary border-border'
                }`}
              >
                 <Smartphone size={18} />
              </button>
           </div>

           <div className="flex-1 bg-gray-200/50 rounded-[40px] p-8 border-4 border-white shadow-large relative overflow-hidden flex flex-col items-center">
              <div className={`bg-white rounded-[32px] shadow-large h-full overflow-y-auto transition-all duration-500 custom-scrollbar ${
                previewMode === 'mobile' ? 'w-[320px]' : 'w-full'
              }`}>
                 <div className="p-10 space-y-8">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-bold tracking-tight">Event Registration</h3>
                       <p className="text-sm text-secondary font-medium">Please fill in the details below.</p>
                    </div>
                    <div className="space-y-6">
                       {fields.map((field) => (
                         <div key={field.id} className="space-y-2">
                            <label className="text-xs font-bold text-primary-text flex items-center gap-1">
                               {field.label} {field.required && <span className="text-rose-500">*</span>}
                            </label>
                            <div className="w-full h-11 bg-gray-50 border border-border rounded-xl px-4 flex items-center text-secondary/40 text-sm italic">
                               Value for {field.label.toLowerCase()}...
                            </div>
                         </div>
                       ))}
                       <Button className="w-full h-12 font-bold shadow-medium">Submit Registration</Button>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-40">Live Preview Engine</p>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FormBuilder;
