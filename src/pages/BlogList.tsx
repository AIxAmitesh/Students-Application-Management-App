import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MessageSquare, Bookmark, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogList: React.FC = () => {
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
    },
    {
      id: 4,
      title: "The Rise of Data Science Careers in India",
      excerpt: "Why data science is becoming the most sought-after field for undergraduate students.",
      author: "Dr. Sneha Patil",
      date: "Feb 25, 2026",
      image: "https://picsum.photos/seed/data/800/500",
      category: "Career Guidance"
    },
    {
      id: 5,
      title: "Scholarships for Indian Students: 2026 Edition",
      excerpt: "A list of government and private scholarships you can apply for this academic year.",
      author: "Vikram Singh",
      date: "Feb 20, 2026",
      image: "https://picsum.photos/seed/money/800/500",
      category: "Financial Aid"
    },
    {
      id: 6,
      title: "Life at an IIT: Expectations vs Reality",
      excerpt: "Current students share their experiences about the academic pressure and campus life.",
      author: "Rahul Mehta",
      date: "Feb 15, 2026",
      image: "https://picsum.photos/seed/iitlife/800/500",
      category: "Campus Life"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">UniApply Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Expert advice, university news, and student stories to help you navigate your higher education journey in India.</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 font-bold hover:bg-gray-50 transition-all">
              <Filter className="h-5 w-5" />
              Filter
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={blog.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <Link to={`/blog/${blog.id}`}>
                <div className="relative h-56 overflow-hidden">
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
              <div className="p-6">
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
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold">1</button>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50">2</button>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50">3</button>
          <button className="px-4 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};
