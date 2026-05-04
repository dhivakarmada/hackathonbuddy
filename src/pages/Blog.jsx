import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Layout from '../components/Layout';
import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';
import Button from '../components/Button';

const BlogCard = ({ post }) => (
  <Link 
    to={`/blog/${post.id}`} 
    className="group flex flex-col h-full card-surface overflow-hidden hover:border-accent/20 transition-all shadow-soft"
  >
    <div className="aspect-[16/10] overflow-hidden bg-gray-100 border-b border-border">
       <img 
         src={post.image} 
         alt={post.title} 
         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" 
       />
    </div>
    <div className="p-8 flex flex-col flex-1 space-y-6">
       <div className="flex justify-between items-center">
          <Badge variant="secondary">{post.tag}</Badge>
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{post.readTime}</span>
       </div>
       <div className="space-y-3 flex-1">
          <h3 className="text-2xl font-bold text-primary-text group-hover:text-accent transition-colors leading-tight">{post.title}</h3>
          <p className="text-sm text-secondary font-medium leading-relaxed line-clamp-3">{post.excerpt}</p>
       </div>
       <div className="pt-6 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-100 border border-border overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${post.authorId}`} alt={post.author} />
             </div>
             <p className="text-xs font-bold text-primary-text">{post.author}</p>
          </div>
          <ArrowRight size={18} className="text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
       </div>
    </div>
  </Link>
);

const Blog = () => {
  const posts = [
    {
      id: 1,
      tag: "Case Study",
      readTime: "8 min read",
      title: "How DevSpace Hackathon managed 2,500+ participants with zero lag.",
      excerpt: "A deep dive into the high-performance entry management system used at India's largest university hackathon.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      author: "Arjun Mehta",
      authorId: 1
    },
    {
      id: 2,
      tag: "Product Update",
      readTime: "4 min read",
      title: "Introducing atomic local-sync for volunteer scanning.",
      excerpt: "Our latest update ensures that your event gates never stop moving, even when the internet goes down.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
      author: "Kevin Zhang",
      authorId: 3
    },
    {
      id: 3,
      tag: "Best Practices",
      readTime: "12 min read",
      title: "The Ultimate Guide to Hackathon Logistics for 2026.",
      excerpt: "From registration workflows to gate coordination. Everything you need to host a flawless developer event.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200",
      author: "Sarah Connor",
      authorId: 4
    },
    {
      id: 4,
      tag: "Engineering",
      readTime: "15 min read",
      title: "Why we built our own QR validation engine instead of using libraries.",
      excerpt: "Lessons learned in optimizing for sub-200ms latency at the edge.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
      author: "Arjun Mehta",
      authorId: 1
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <Section className="pb-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text">Resources & Stories.</h1>
           <p className="text-xl text-secondary font-medium leading-relaxed">
             Insights, technical deep-dives, and success stories from the front lines of event management.
           </p>
        </div>
      </Section>

      {/* Blog Grid */}
      <Section variant="white" className="pt-0">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
         </div>
         <div className="mt-20 text-center">
            <Button variant="secondary" className="h-12 px-10 font-bold">Load More Articles</Button>
         </div>
      </Section>

      {/* Newsletter */}
      <Section variant="gray" className="border-y border-border">
         <div className="max-w-4xl mx-auto card-surface p-12 md:p-16 bg-white flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-4">
               <h2 className="text-3xl font-bold tracking-tight">Stay in the loop.</h2>
               <p className="text-sm text-secondary font-medium leading-relaxed">Get the latest product updates and hackathon logistics guides delivered to your inbox.</p>
            </div>
            <div className="w-full md:w-80 space-y-3">
               <input 
                 type="email" 
                 placeholder="name@company.com" 
                 className="input-base text-sm font-medium"
               />
               <Button className="w-full h-12 font-bold shadow-soft">Subscribe Now</Button>
            </div>
         </div>
      </Section>
    </Layout>
  );
};

export default Blog;
