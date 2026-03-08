import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Globe, ShieldCheck, Zap, Users, BarChart3, BookOpen, MessageSquare, Calendar, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const blogs = [
    {
      id: 1,
      title: "How to Choose the Right Engineering Branch in 2026",
      excerpt: "A comprehensive guide to understanding the future prospects of CSE, AI, and Core branches.",
      author: "Dr. Rajesh Kumar",
      date: "Mar 5, 2026",
      image: "https://picsum.photos/seed/engineering/800/500",
      category: "Career Guidance"
    },
    {
      id: 2,
      title: "CUET 2026: Everything You Need to Know",
      excerpt: "Important dates, syllabus changes, and preparation strategies for the upcoming central university entrance test.",
      author: "Priya Sharma",
      date: "Mar 2, 2026",
      image: "https://picsum.photos/seed/exam/800/500",
      category: "Exams"
    },
    {
      id: 3,
      title: "Top 10 Private Universities for Liberal Arts in India",
      excerpt: "Exploring institutions that offer world-class holistic education and interdisciplinary studies.",
      author: "Amit Verma",
      date: "Feb 28, 2026",
      image: "https://picsum.photos/seed/campus/800/500",
      category: "University Reviews"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070" 
            alt="Students on campus" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Your future <br />
                <span className="text-indigo-400">starts here</span>
              </h1>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                Apply to Indian universities for the first time or transfer to complete your degree. Navigate your entire college application journey with UniApply India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/auth" 
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl flex items-center justify-center"
                >
                  Start your application
                </Link>
                <Link 
                  to="/universities" 
                  className="bg-transparent text-white border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  Find Colleges
                  <Search className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Universities", value: "500+" },
              { label: "Courses", value: "2000+" },
              { label: "Applications", value: "1M+" },
              { label: "Success Rate", value: "98%" }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                The most trusted way to apply to <span className="text-indigo-600">Indian Universities</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                We've partnered with India's leading institutions to provide a seamless, transparent, and efficient application experience.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />, title: "Verified Institutions", desc: "Every university on our platform is UGC/AICTE recognized." },
                  { icon: <Zap className="h-6 w-6 text-indigo-600" />, title: "Fast-Track Admissions", desc: "Direct integration with university portals for quicker processing." },
                  { icon: <Users className="h-6 w-6 text-indigo-600" />, title: "Expert Counseling", desc: "Access to certified counselors to help you make the right choice." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                alt="Students collaborating" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl hidden md:block max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="font-bold text-gray-900">Application Verified</div>
                </div>
                <p className="text-sm text-gray-500">Your profile has been successfully verified by 5 universities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it Works</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Three simple steps to your dream university.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Search className="h-8 w-8 text-indigo-600" />,
                title: "1. Discover",
                desc: "Search through thousands of courses and universities based on your preferences."
              },
              {
                icon: <Zap className="h-8 w-8 text-indigo-600" />,
                title: "2. Build Profile",
                desc: "Create one unified profile with your academic records and entrance scores."
              },
              {
                icon: <Globe className="h-8 w-8 text-indigo-600" />,
                title: "3. Apply",
                desc: "Select multiple universities and apply with a single click. Track everything in real-time."
              }
            ].map((step, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Universities */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Universities</h2>
              <p className="text-gray-600">Top-tier institutions currently accepting applications.</p>
            </div>
            <Link to="/universities" className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "IIT Bombay", location: "Mumbai, Maharashtra", type: "Government", rank: 1, img: "https://picsum.photos/seed/iitb/800/600" },
              { name: "BITS Pilani", location: "Pilani, Rajasthan", type: "Private", rank: 5, img: "https://picsum.photos/seed/bits/800/600" },
              { name: "AIIMS Delhi", location: "New Delhi, Delhi", type: "Government", rank: 1, img: "https://picsum.photos/seed/aiims/800/600" },
            ].map((uni, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                <img src={uni.img} alt={uni.name} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{uni.name}</h3>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded">Rank #{uni.rank}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{uni.location}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{uni.type}</span>
                  </div>
                  <Link to={`/universities/${i+1}`} className="block text-center bg-gray-50 text-gray-900 py-2 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest from our Blog</h2>
              <p className="text-gray-600">Expert advice and news to help you navigate your college journey.</p>
            </div>
            <Link to="/blog" className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Read all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="group">
                <Link to={`/blog/${blog.id}`} className="block">
                  <div className="relative h-56 mb-6 overflow-hidden rounded-2xl">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> 12 Comments</span>
                </div>
                <Link to={`/blog/${blog.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      {blog.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                  </div>
                  <Bookmark className="h-4 w-4 text-gray-300 hover:text-indigo-600 transition-colors cursor-pointer" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to start your journey?</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students who have already simplified their admission process.
          </p>
          <Link to="/auth" className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl">
            Create Your Account
          </Link>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-400 rounded-full opacity-20"></div>
      </section>
    </div>
  );
};

// Missing icon from lucide-react in previous version
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
