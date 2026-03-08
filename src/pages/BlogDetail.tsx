import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Bookmark, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const blogs = [
    {
      id: 1,
      title: "How to Choose the Right Engineering Branch in 2026",
      excerpt: "A comprehensive guide to understanding the future prospects of CSE, AI, and Core branches.",
      author: "Dr. Rajesh Kumar",
      date: "Mar 5, 2026",
      image: "https://picsum.photos/seed/engineering/1200/600",
      category: "Career Guidance",
      content: `
        <p className="mb-6">Choosing the right engineering branch is one of the most critical decisions for a student. With the rapid evolution of technology, the landscape of engineering careers is shifting dramatically in 2026.</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Dominance of Computer Science and AI</h2>
        <p className="mb-6">Computer Science Engineering (CSE) remains the most sought-after branch, but with a significant twist. In 2026, specialization in Artificial Intelligence (AI) and Machine Learning (ML) is no longer just an option; it's becoming the core of the curriculum. Students are increasingly looking for programs that integrate AI with traditional software development.</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Resilience of Core Branches</h2>
        <p className="mb-6">While CSE takes the spotlight, core branches like Mechanical, Civil, and Electrical Engineering are undergoing a digital transformation. "Smart Manufacturing" and "Green Energy" are revitalizing these fields. A Mechanical Engineer today needs to understand robotics and IoT just as much as thermodynamics.</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors to Consider</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li><strong>Interest and Aptitude:</strong> Don't just follow the trend. If you love building physical things, Mechanical might be better than coding.</li>
          <li><strong>Future Job Market:</strong> Research which industries are growing. Sustainability and Healthcare technology are massive growth areas.</li>
          <li><strong>Higher Studies:</strong> Some branches offer better pathways for research and specialized Master's programs.</li>
        </ul>
        
        <p className="mb-6">Ultimately, the "best" branch is the one that aligns with your long-term career goals and personal interests. Take the time to talk to professionals in the field and attend university open days.</p>
      `
    },
    {
      id: 2,
      title: "CUET 2026: Everything You Need to Know",
      excerpt: "Important dates, syllabus changes, and preparation strategies for the upcoming central university entrance test.",
      author: "Priya Sharma",
      date: "Mar 2, 2026",
      image: "https://picsum.photos/seed/exam/1200/600",
      category: "Exams",
      content: `
        <p className="mb-6">The Common University Entrance Test (CUET) has become the gateway to India's most prestigious central universities. As we approach the 2026 exam cycle, several key changes have been announced by the National Testing Agency (NTA).</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Dates for 2026</h2>
        <p className="mb-6">Registration is expected to open in early February 2026, with the exams scheduled across multiple windows in May and June. It's crucial to keep an eye on the official NTA website for the exact schedule.</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Syllabus Updates</h2>
        <p className="mb-6">The 2026 syllabus places a greater emphasis on analytical reasoning and application-based questions rather than rote memorization. The General Test section has been revamped to include more current affairs related to global sustainability and technology trends.</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparation Strategy</h2>
        <p className="mb-6">Start early. Focus on your NCERT textbooks as they remain the foundation. Practice with mock tests that simulate the computer-based testing environment. Time management is often the biggest challenge for CUET aspirants.</p>
      `
    },
    {
      id: 3,
      title: "Top 10 Private Universities for Liberal Arts in India",
      excerpt: "Exploring institutions that offer world-class holistic education and interdisciplinary studies.",
      author: "Amit Verma",
      date: "Feb 28, 2026",
      image: "https://picsum.photos/seed/campus/1200/600",
      category: "University Reviews",
      content: `
        <p className="mb-6">Liberal Arts education is gaining massive traction in India, moving away from the traditional siloed approach to education. Students are now seeking programs that allow them to study Economics alongside Psychology, or Computer Science with Philosophy.</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Liberal Arts?</h2>
        <p className="mb-6">In an era of AI, "human" skills like critical thinking, creative problem solving, and effective communication are more valuable than ever. Liberal Arts colleges focus on these transferable skills.</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Institutions to Watch</h2>
        <p className="mb-6">Institutions like Ashoka University, Flame University, and Krea University have set high benchmarks. However, newer players like Jio Institute and several established private universities are also launching robust Liberal Arts programs.</p>
      `
    }
  ];

  const blog = blogs.find(b => b.id === Number(id)) || blogs[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <span className="block bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold w-fit mb-4 uppercase tracking-widest">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xs font-bold text-white border border-white/30">
                  {blog.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {blog.date}
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                12 Comments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            <div className="mt-12 pt-12 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this article</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors">
                <Bookmark className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Save</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b-2 border-indigo-600 w-fit">Related Articles</h3>
              <div className="space-y-6">
                {blogs.filter(b => b.id !== Number(id)).map(related => (
                  <Link key={related.id} to={`/blog/${related.id}`} className="group block">
                    <div className="flex gap-4">
                      <img 
                        src={related.image} 
                        alt={related.title} 
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                          {related.title}
                        </h4>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 block">
                          {related.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 p-8 rounded-3xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Subscribe to our Newsletter</h3>
              <p className="text-sm text-gray-600 mb-6">Get the latest admission news and expert advice delivered to your inbox.</p>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
              />
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
