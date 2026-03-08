import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Globe, Award, BookOpen, Clock, CreditCard, ChevronRight, GraduationCap } from 'lucide-react';
import { University } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus } from 'lucide-react';

export const UniversityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [uni, setUni] = useState<University | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.getUniversity(id).then(data => {
        setUni(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  const handleApply = (course: any) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(course);
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!uni) return <div className="text-center py-20">University not found</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Header Image */}
      <div className="relative h-96 w-full">
        <img src={uni.image_url} alt={uni.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {uni.type}
              </span>
              <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Award className="h-3 w-3" />
                NIRF Rank #{uni.ranking}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{uni.name}</h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="h-5 w-5" />
              <span>{uni.location}, {uni.state}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the University</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {uni.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href={uni.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                >
                  <Globe className="h-4 w-4" />
                  Official Website
                </a>
              </div>
            </section>

            <section id="courses-section" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses Offered</h2>
              <div className="grid grid-cols-1 gap-4">
                {uni.courses?.map((course) => (
                  <div 
                    key={course.id} 
                    className="group p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <Link to={`/courses/${course.id}`} className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
                        <span className="flex items-center gap-1"><CreditCard className="h-4 w-4" /> ₹{course.fees.toLocaleString()}/yr</span>
                        <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {course.entrance_exam}</span>
                      </div>
                    </Link>
                    <div className="flex items-center gap-3">
                      {isInCart(course.id) ? (
                        <Link 
                          to="/apply"
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold border border-indigo-100"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          In Queue
                        </Link>
                      ) : (
                        <button 
                          onClick={() => handleApply(course)}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm"
                        >
                          <Plus className="h-4 w-4" />
                          Apply
                        </button>
                      )}
                      <Link to={`/courses/${course.id}`} className="p-2 text-gray-300 hover:text-indigo-600 transition-colors">
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Admission Status</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Applications</span>
                    <span className="text-green-600 font-bold">Open</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Deadline</span>
                    <span className="text-gray-900 font-semibold">30th June, 2026</span>
                  </div>
                </div>
                <button 
                  onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block w-full text-center bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Start Application
                </button>
              </div>

              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <h3 className="text-lg font-bold text-indigo-900 mb-4">Need Help?</h3>
                <p className="text-indigo-700 text-sm mb-6">
                  Our counselors are available to guide you through the admission process for {uni.name}.
                </p>
                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm border border-indigo-200 hover:bg-indigo-100 transition-all">
                  Chat with Counselor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
