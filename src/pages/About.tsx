import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Target, Users, History, Handshake, BarChart } from 'lucide-react';

export const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();

  const getSectionContent = () => {
    switch (section) {
      case 'overview':
        return {
          title: 'Overview',
          icon: <Info className="h-12 w-12 text-indigo-600" />,
          content: 'UniApply India is a centralized university admission system designed to simplify the college application process for students across India. Our platform acts as a bridge between aspiring students and top-tier educational institutions.'
        };
      case 'principles':
        return {
          title: 'Guiding Principles',
          icon: <Target className="h-12 w-12 text-indigo-600" />,
          content: 'Transparency, accessibility, and student-centricity are at the heart of everything we do. We believe that every student deserves a fair and efficient way to pursue their higher education goals.'
        };
      case 'leadership':
        return {
          title: 'Leadership and Board',
          icon: <Users className="h-12 w-12 text-indigo-600" />,
          content: 'Our team consists of experienced educators, technologists, and policy experts dedicated to transforming the landscape of higher education admissions in India.'
        };
      case 'next-chapter':
        return {
          title: 'Next Chapter',
          icon: <History className="h-12 w-12 text-indigo-600" />,
          content: 'We are constantly evolving. Our roadmap includes AI-driven course recommendations, integrated scholarship discovery, and direct chat features with university admissions offices.'
        };
      case 'partners':
        return {
          title: 'Partners',
          icon: <Handshake className="h-12 w-12 text-indigo-600" />,
          content: 'We partner with over 500+ recognized universities, including IITs, AIIMS, and leading private institutions, to provide students with a wide range of choices.'
        };
      case 'reports':
        return {
          title: 'Reports and Insights',
          icon: <BarChart className="h-12 w-12 text-indigo-600" />,
          content: 'We provide data-driven insights into admission trends, popular courses, and university rankings to help students make informed decisions.'
        };
      default:
        return {
          title: 'About UniApply India',
          icon: <GraduationCap className="h-12 w-12 text-indigo-600" />,
          content: 'UniApply India is your one-stop destination for university admissions in India. We simplify the journey from discovery to enrollment.'
        };
    }
  };

  const { title, icon, content } = getSectionContent();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-50 p-6 rounded-2xl">
              {icon}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {content}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const GraduationCap = ({ className }: { className?: string }) => (
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
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
