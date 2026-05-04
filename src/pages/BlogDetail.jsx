import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Globe } from 'lucide-react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';
import Button from '../components/Button';

const BlogDetail = () => {
  const { id } = useParams();

  // Mock post data
  const post = {
    title: "How DevSpace Hackathon managed 2,500+ participants with zero lag.",
    date: "May 12, 2026",
    readTime: "8 min read",
    tag: "Case Study",
    author: "Arjun Mehta",
    authorRole: "Lead Architect",
    authorImg: "https://i.pravatar.cc/100?u=1",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1400",
    content: `
      <p>Managing large-scale hackathons is a logistical challenge that grows exponentially with the number of participants. When DevSpace announced their 2026 flagship event, they expected over 2,000 registrations. The primary concern was the bottleneck at the entry gates.</p>
      
      <h2>The Bottleneck Problem</h2>
      <p>Traditional registration systems often rely on manual name-searching or slow database queries that struggle under high concurrency. For DevSpace, a 2-minute delay per participant would have resulted in hours of queueing time, damaging the initial event experience.</p>
      
      <blockquote>
        "Our goal was sub-5 second check-ins for every single attendee, including pass validation and kit distribution."
      </blockquote>

      <h2>The Hackathonbuddy Solution</h2>
      <p>We deployed our high-throughput QR Pass system. Each participant received a unique, cryptographically signed digital pass. Our volunteer scanner app, built on an atomic local-sync architecture, allowed volunteers to scan and validate passes in under 200ms.</p>

      <h2>Key Outcomes</h2>
      <ul>
        <li>Processed 1,120 check-ins in the first 45 minutes.</li>
        <li>Zero database race conditions during peak registration.</li>
        <li>Real-time transparency for organizers via the live dashboard.</li>
      </ul>

      <p>The success of DevSpace 2026 demonstrated that with the right infrastructure, scale doesn't have to mean chaos. By focusing on precision and speed, the organizing team was able to focus on what matters most: the hackers.</p>
    `
  };

  return (
    <Layout>
      <Section className="pb-12">
        <div className="max-w-3xl mx-auto space-y-12">
           <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary-text transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Resources
           </Link>
           
           <div className="space-y-6">
              <Badge variant="info">{post.tag}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-text leading-[1.1]">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-secondary font-medium">
                 <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                 <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
              </div>
           </div>
        </div>
      </Section>

      <Section variant="white" className="pt-0">
         <div className="max-w-5xl mx-auto">
            <div className="aspect-[21/9] rounded-[32px] overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-700 shadow-large mb-16">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="max-w-2xl mx-auto">
               <div 
                 className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-blockquote:border-accent prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-xl"
                 dangerouslySetInnerHTML={{ __html: post.content }}
               />
               
               <div className="mt-20 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-4">
                     <img src={post.authorImg} alt={post.author} className="w-12 h-12 rounded-full border border-border" />
                     <div>
                        <p className="font-bold text-lg">{post.author}</p>
                        <p className="text-xs text-secondary font-black uppercase tracking-widest">{post.authorRole}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text transition-all shadow-soft"><Share2 size={18} /></button>
                      <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text transition-all shadow-soft">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </button>
                     <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-secondary hover:text-primary-text transition-all shadow-soft"><Globe size={18} /></button>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* Recommended Posts */}
      <Section variant="gray">
         <div className="space-y-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight">Read next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[1, 2].map((i) => (
                 <div key={i} className="card-surface p-8 bg-white space-y-4 hover:border-accent/20 transition-all cursor-pointer group">
                    <Badge variant="secondary">Engineering</Badge>
                    <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Atomic local-sync for high-throughput gates.</h3>
                    <p className="text-sm text-secondary font-medium">How we optimized for offline stability at scale.</p>
                    <div className="pt-4 flex items-center gap-2 text-xs font-bold text-accent">Read Case Study <ArrowRight size={14} /></div>
                 </div>
               ))}
            </div>
         </div>
      </Section>
    </Layout>
  );
};

export default BlogDetail;
