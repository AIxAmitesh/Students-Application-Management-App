import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle, Shield, FileText, Phone, Award, BookOpen, HelpCircle as FaqIcon } from 'lucide-react';

export const StaticPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const getPageContent = () => {
    switch (slug) {
      case 'rankings':
        return {
          title: 'University Rankings 2026',
          icon: <Award className="h-12 w-12 text-indigo-600" />,
          content: 'Explore the latest rankings of Indian universities based on academic reputation, employer reputation, faculty/student ratio, and research impact. We provide comprehensive data from NIRF, QS, and our own proprietary student satisfaction surveys.'
        };
      case 'scholarships':
        return {
          title: 'Scholarships & Financial Aid',
          icon: <Award className="h-12 w-12 text-indigo-600" />,
          content: 'Discover thousands of scholarship opportunities for undergraduate and postgraduate students in India. From government-funded schemes like NSP to private corporate scholarships, we help you find the financial support you need for your education.'
        };
      case 'help':
        return {
          title: 'Help Center',
          icon: <HelpCircle className="h-12 w-12 text-indigo-600" />,
          content: 'Need assistance with your application? Our help center provides step-by-step guides on how to use the UniApply platform, upload documents, and track your admission status. Our support team is also available for live chat during business hours.'
        };
      case 'contact':
        return {
          title: 'Contact Us',
          icon: <Phone className="h-12 w-12 text-indigo-600" />,
          content: 'Have questions? We are here to help. You can reach us via email at support@uniapply.in or call our toll-free student helpline at 1800-123-4567. Our office is located in New Delhi, India.'
        };
      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          icon: <FaqIcon className="h-12 w-12 text-indigo-600" />,
          content: 'Find quick answers to common questions about the unified application process, entrance exam requirements, application fees, and university deadlines. We update our FAQ regularly based on student feedback.'
        };
      case 'resources':
        return {
          title: 'Student Resources',
          icon: <BookOpen className="h-12 w-12 text-indigo-600" />,
          content: 'Access a wealth of resources including sample entrance exam papers, interview preparation tips, and guidebooks on writing effective statements of purpose (SOPs). All resources are free for registered UniApply users.'
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Shield className="h-12 w-12 text-indigo-600" />,
          content: 'At UniApply India, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal and academic data. We are committed to maintaining the highest standards of data security and transparency.'
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="h-12 w-12 text-indigo-600" />,
          content: 'By using UniApply India, you agree to our terms of service. This document outlines the rules and regulations for using our platform, including user responsibilities, intellectual property rights, and limitation of liability.'
        };
      default:
        return {
          title: 'Information Page',
          icon: <FileText className="h-12 w-12 text-indigo-600" />,
          content: 'This page contains important information about UniApply India and its services. We are dedicated to providing students with the best possible university admission experience.'
        };
    }
  };

  const { title, icon, content } = getPageContent();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100"
        >
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-indigo-50 p-6 rounded-2xl">
              {icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-6">{content}</p>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
