import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Rocket, Users, Heart, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Button from '../components/Button';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';

const JobCard = ({ job, onClick }) => (
  <div 
    onClick={() => onClick(job)}
    className="card-surface p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-pointer hover:border-accent/30 transition-all group"
  >
    <div className="space-y-4">
       <div className="flex flex-wrap gap-2">
          <Badge variant="info">{job.type}</Badge>
          <Badge variant="secondary">{job.dept}</Badge>
       </div>
       <div className="space-y-1">
          <h3 className="text-2xl font-bold text-primary-text group-hover:text-accent transition-colors">{job.title}</h3>
          <div className="flex items-center gap-4 text-sm text-secondary font-medium">
             <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
             <span className="flex items-center gap-1.5"><Clock size={14} /> {job.posted}</span>
          </div>
       </div>
    </div>
    <div className="flex items-center gap-2 font-bold text-sm group-hover:translate-x-1 transition-transform">
       View Details <ArrowRight size={18} />
    </div>
  </div>
);

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    { 
      id: 1, 
      title: "Senior Product Designer", 
      type: "Full-time", 
      dept: "Design", 
      location: "Remote / Telangana", 
      posted: "2 days ago",
      desc: "We're looking for a product designer who obsesses over minimalist, editorial-grade UIs. You'll lead the visual evolution of our dashboard and marketing platforms.",
      reqs: ["5+ years of experience", "Strong portfolio in SaaS design", "Proficiency in Figma and Framer", "Love for high-whitespace layouts"]
    },
    { 
      id: 2, 
      title: "Lead Frontend Engineer", 
      type: "Full-time", 
      dept: "Engineering", 
      location: "Remote", 
      posted: "5 days ago",
      desc: "Architect and build high-performance React components. Focus on latency, accessibility, and pixel-perfect implementation of our design system.",
      reqs: ["React, Tailwind, Framer Motion expertise", "Focus on performance optimization", "Experience with Firebase/Firestore", "Love for clean code"]
    },
    { 
      id: 3, 
      title: "DevRel Manager", 
      type: "Contract", 
      dept: "Growth", 
      location: "Remote", 
      posted: "1 week ago",
      desc: "Connect with hackathon organizers globally. Help communities deploy Hackathonbuddy and gather feedback for our product roadmap.",
      reqs: ["Active in developer communities", "Strong communication skills", "Experience organizing hackathons", "Self-starter attitude"]
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text leading-[1.1]">
            Build the future of events with us.
          </h1>
          <p className="text-xl text-secondary font-medium leading-relaxed">
            We're a small team making a massive impact. No bureaucracy, just intentional engineering and design.
          </p>
        </div>
      </Section>

      {/* Benefits */}
      <Section variant="white" className="border-t border-border">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Zap, title: "Speed & Autonomy", desc: "We move fast and trust our team. You'll own your work from day one." },
              { icon: Heart, title: "Health & Wellness", desc: "Comprehensive insurance and a focus on long-term sustainable work." },
              { icon: Users, title: "Remote-First", desc: "Work from anywhere in India. We value output over seat time." },
              { icon: Rocket, title: "Growth & Equity", desc: "Early-stage opportunity with real skin in the game for everyone." }
            ].map((b, i) => (
              <div key={i} className="space-y-4">
                 <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-accent"><b.icon size={20} /></div>
                 <h3 className="font-bold text-lg">{b.title}</h3>
                 <p className="text-sm text-secondary font-medium leading-relaxed">{b.desc}</p>
              </div>
            ))}
         </div>
      </Section>

      {/* Job Listings */}
      <Section variant="gray" className="border-y border-border">
         <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div className="max-w-xl">
                  <h2 className="text-4xl font-bold tracking-tight mb-2">Open Positions</h2>
                  <p className="text-secondary font-medium">Join us in the next chapter of our journey.</p>
               </div>
               <div className="flex gap-2">
                  <Badge variant="info">Engineering (1)</Badge>
                  <Badge variant="secondary">Design (1)</Badge>
                  <Badge variant="secondary">Growth (1)</Badge>
               </div>
            </div>
            <div className="space-y-4">
               {jobs.map(job => (
                 <JobCard key={job.id} job={job} onClick={setSelectedJob} />
               ))}
            </div>
         </div>
      </Section>

      {/* CTA */}
      <Section>
         <div className="card-surface p-12 md:p-20 text-center space-y-8 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">Don't see a role that fits?</h2>
              <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">We're always looking for exceptional talent. Send us a general application and let's talk.</p>
              <Button className="h-14 px-10 bg-white text-gray-900 font-bold hover:bg-gray-100 border-none">General Application</Button>
            </div>
         </div>
      </Section>

      {/* Job Detail Modal */}
      <Modal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
        title={selectedJob?.title}
        maxWidth="max-w-2xl"
      >
        {selectedJob && (
          <div className="space-y-8">
             <div className="flex flex-wrap gap-4 text-sm text-secondary font-bold border-b border-border pb-6">
                <span className="flex items-center gap-1.5"><Briefcase size={16} /> {selectedJob.type}</span>
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {selectedJob.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> {selectedJob.posted}</span>
             </div>
             <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-primary-text">Role Overview</h4>
                <p className="text-secondary font-medium leading-relaxed">{selectedJob.desc}</p>
             </div>
             <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-primary-text">Requirements</h4>
                <ul className="space-y-2">
                   {selectedJob.reqs.map((r, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm text-secondary font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {r}
                     </li>
                   ))}
                </ul>
             </div>
             <div className="pt-8 flex gap-4">
                <Button className="flex-1 h-12 font-bold">Apply Now</Button>
                <Button variant="secondary" onClick={() => setSelectedJob(null)} className="h-12 px-6">Close</Button>
             </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Careers;
