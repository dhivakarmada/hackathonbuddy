import React from 'react';
import { Target, Users, Zap, Shield, Rocket, Heart } from 'lucide-react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';

const ValueCard = ({ icon: Icon, title, desc }) => (
  <div className="space-y-6">
    <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-accent shadow-soft">
      <Icon size={24} />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-primary-text">{title}</h3>
      <p className="text-sm text-secondary font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text leading-[1.1]">
            Engineering the future of hackathons.
          </h1>
          <p className="text-xl text-secondary font-medium leading-relaxed">
            We're a small, intentional team building the high-precision infrastructure that powers the world's most innovative developer events.
          </p>
        </div>
      </Section>

      {/* Mission */}
      <Section variant="white" className="border-t border-border">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent">
                  <Target size={14} /> Our Mission
               </div>
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">Clarity over chaos. Always.</h2>
               <p className="text-lg text-secondary font-medium leading-relaxed">
                 Hackathons are the lifeblood of innovation, but managing them shouldn't be a logistical nightmare. We started Hackathonbuddy with a single goal: to replace fragmented tools and manual spreadsheets with a unified, high-performance engine.
               </p>
               <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="space-y-1"><p className="text-3xl font-bold text-primary-text">100+</p><p className="text-[10px] font-black uppercase tracking-widest text-secondary">Events Powered</p></div>
                  <div className="space-y-1"><p className="text-3xl font-bold text-primary-text">10k+</p><p className="text-[10px] font-black uppercase tracking-widest text-secondary">Participants</p></div>
               </div>
            </div>
            <div className="relative aspect-square">
               <div className="absolute inset-0 bg-gray-100 rounded-[32px] translate-x-4 translate-y-4" />
               <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                 alt="Team working" 
                 className="relative w-full h-full object-cover rounded-[32px] border border-border shadow-large grayscale"
               />
            </div>
         </div>
      </Section>

      {/* Values */}
      <Section variant="gray">
        <div className="space-y-20">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-lg text-secondary font-medium">The principles that guide every line of code we write.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
            <ValueCard icon={Zap} title="Speed is a feature" desc="We optimize for latency. Whether it's the dashboard load time or QR scan speed, performance is non-negotiable." />
            <ValueCard icon={Shield} title="Data is sacred" desc="We believe in radical privacy. We handle your event data with the same security we'd want for our own." />
            <ValueCard icon={Users} title="Built for organizers" desc="We listen to the logistics teams. Every feature we build solves a real problem faced on the ground." />
            <ValueCard icon={Rocket} title="Iterate for precision" desc="We're never done. We're constantly refining our algorithms to ensure 100% reliability at scale." />
            <ValueCard icon={Heart} title="Community first" desc="Developer communities are our roots. We actively support student hackathons and open-source sprints." />
            <ValueCard icon={Target} title="Radical clarity" desc="Our UI reflects our philosophy: no clutter, no fluff. Just the tools you need to succeed." />
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section variant="white" className="border-b border-border">
         <div className="space-y-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div className="max-w-xl">
                  <h2 className="text-4xl font-bold tracking-tight mb-4">Meet the architects.</h2>
                  <p className="text-lg text-secondary font-medium">A diverse group of engineers and designers obsessed with event logistics.</p>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { name: "Arjun Mehta", role: "Founder & Lead Architect", img: "https://i.pravatar.cc/300?u=1" },
                 { name: "Priya Sharma", role: "Head of Product Design", img: "https://i.pravatar.cc/300?u=2" },
                 { name: "Kevin Zhang", role: "Principal Engineer", img: "https://i.pravatar.cc/300?u=3" },
                 { name: "Sarah Connor", role: "Head of Operations", img: "https://i.pravatar.cc/300?u=4" }
               ].map((member, i) => (
                 <div key={i} className="space-y-4 group">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-border">
                       <img src={member.img} alt={member.name} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500" />
                    </div>
                    <div>
                       <p className="font-bold text-lg">{member.name}</p>
                       <p className="text-xs text-secondary font-black uppercase tracking-widest">{member.role}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </Section>

      {/* CTA */}
      <Section>
         <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">Want to join the mission?</h2>
            <p className="text-xl text-secondary font-medium max-w-2xl mx-auto">We're always looking for intentional, high-performance individuals to help us build the future of events.</p>
            <div className="pt-4">
               <a href="/careers" className="inline-flex items-center gap-2 font-bold text-accent hover:underline text-lg">View Open Roles <Rocket size={20} /></a>
            </div>
         </div>
      </Section>
    </Layout>
  );
};

export default About;
