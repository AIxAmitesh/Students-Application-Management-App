import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, CreditCard, Filter, Plus, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ExploreCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filtered, setFiltered] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.getCourses().then(data => {
      setCourses(data);
      setFiltered(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = courses;
    if (search) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.university_name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (typeFilter !== 'All') {
      result = result.filter(c => c.type === typeFilter);
    }
    setFiltered(result);
  }, [search, typeFilter, courses]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Courses</h1>
          <p className="text-gray-600">Discover thousands of degree programs from top Indian universities.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by course or university..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Fields</option>
              <option value="Engineering">Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="Arts">Arts</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={course.id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-50 p-3 rounded-2xl">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded">
                    {course.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 font-medium">{course.university_name}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    ₹{course.fees.toLocaleString()}/yr
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link 
                    to={`/courses/${course.id}`}
                    className="flex-1 text-center py-3 bg-gray-50 text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm"
                  >
                    Details
                  </Link>
                  {isInCart(course.id) ? (
                    <Link 
                      to="/apply"
                      className="flex-1 text-center py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all text-sm flex items-center justify-center gap-1 border border-indigo-100"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      In Queue
                    </Link>
                  ) : (
                    <button 
                      onClick={() => {
                        if (!user) navigate('/auth');
                        else addToCart(course);
                      }}
                      className="flex-1 text-center py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all text-sm flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Apply
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
