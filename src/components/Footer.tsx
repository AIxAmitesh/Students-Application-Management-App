import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white mb-4">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold tracking-tight">UniApply India</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Simplifying university admissions for millions of students across India. One application, endless possibilities.
            </p>
            <div className="flex space-x-4 mt-6">
              <Twitter className="h-5 w-5 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Github className="h-5 w-5 hover:text-indigo-400 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/universities" className="hover:text-indigo-400 transition-colors">Universities</Link></li>
              <li><Link to="/courses" className="hover:text-indigo-400 transition-colors">Courses</Link></li>
              <li><Link to="/rankings" className="hover:text-indigo-400 transition-colors">Rankings</Link></li>
              <li><Link to="/scholarships" className="hover:text-indigo-400 transition-colors">Scholarships</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-400 transition-colors">FAQs</Link></li>
              <li><Link to="/resources" className="hover:text-indigo-400 transition-colors">Student Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} UniApply India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
