import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, CreditCard, GraduationCap, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Course } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.getCourse(id).then(data => {
        setCourse(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  const handleApply = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (course) {
      addToCart(course);
      navigate('/apply');
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!course) return <div className="text-center py-20">Course not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/courses" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-indigo-600 p-10 text-white">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {course.type}
              </span>
              <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Verified Course
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-indigo-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                <span className="font-semibold">{course.university_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{course.university_location}</span>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-2xl text-center">
                <Clock className="h-6 w-6 text-indigo-600 mx-auto mb-3" />
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Duration</div>
                <div className="text-lg font-bold text-gray-900">{course.duration}</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl text-center">
                <CreditCard className="h-6 w-6 text-indigo-600 mx-auto mb-3" />
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Tuition Fees</div>
                <div className="text-lg font-bold text-gray-900">₹{course.fees.toLocaleString()}/yr</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl text-center">
                <GraduationCap className="h-6 w-6 text-indigo-600 mx-auto mb-3" />
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Entrance Exam</div>
                <div className="text-lg font-bold text-gray-900">{course.entrance_exam}</div>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {course.description || "This program offers a comprehensive curriculum designed to prepare students for a successful career in their chosen field. With a focus on both theoretical knowledge and practical application, students will gain the skills necessary to excel in the industry."}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
              <ul className="space-y-4">
                {[
                  "Minimum 60% in Class 12th from a recognized board.",
                  "Valid score in the required entrance examination.",
                  "English proficiency (for international students).",
                  "Completed application form with all necessary documents."
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Ready to apply?</p>
                <p className="text-gray-900 font-bold">Applications are currently open for 2026 intake.</p>
              </div>
              {isInCart(course.id) ? (
                <Link 
                  to="/apply"
                  className="bg-indigo-50 text-indigo-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-indigo-100 transition-all border border-indigo-100 flex items-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  In Application Queue
                </Link>
              ) : (
                <button 
                  onClick={handleApply}
                  disabled={isApplying}
                  className="bg-indigo-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                >
                  {isApplying ? 'Processing...' : 'Apply Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
