import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, User, GraduationCap, ShieldCheck, AlertCircle, Trash2, ShoppingCart, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

export const Apply: React.FC = () => {
  const { user } = useAuth();
  const { items, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  const handleSubmitAll = async () => {
    if (!user || items.length === 0) return;
    setIsSubmitting(true);
    setError(null);
    try {
      // Submit each application
      const promises = items.map(item => 
        api.submitApplication({
          student_id: user.id,
          university_id: item.university_id,
          course_id: item.id,
          status: 'Submitted'
        })
      );
      
      await Promise.all(promises);
      clearCart();
      setStep(3);
    } catch (err) {
      setError("Failed to submit one or more applications. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
          {step < 3 && (
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <span className={cn(step >= 1 ? "text-indigo-600" : "")}>Review</span>
              <ChevronRight className="h-4 w-4" />
              <span className={cn(step >= 2 ? "text-indigo-600" : "")}>Confirm</span>
              <ChevronRight className="h-4 w-4" />
              <span>Success</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Progress Bar */}
          <div className="bg-gray-100 h-2 flex">
            <div className={cn("bg-indigo-600 transition-all duration-500", step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full")}></div>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-indigo-600 rounded-2xl text-white">
                      <ShoppingCart className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Application Queue</h2>
                      <p className="text-gray-500">You are about to apply for {items.length} course(s).</p>
                    </div>
                  </div>

                  {items.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200 mb-8">
                      <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Your queue is empty</h3>
                      <p className="text-gray-500 mb-6">Explore courses and add them to your queue to apply.</p>
                      <Link to="/courses" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                        Browse Courses
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-10">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-bold border border-gray-100">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">{item.university_name}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <div className="flex items-center gap-4 mb-4">
                        <User className="h-5 w-5 text-indigo-600" />
                        <h3 className="font-bold text-indigo-900">Personal Details</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-indigo-400">Name</span> <span className="font-bold">{user.name}</span></div>
                        <div className="flex justify-between"><span className="text-indigo-400">Email</span> <span className="font-bold">{user.email}</span></div>
                      </div>
                    </div>

                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <div className="flex items-center gap-4 mb-4">
                        <GraduationCap className="h-5 w-5 text-emerald-600" />
                        <h3 className="font-bold text-emerald-900">Academic Status</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-emerald-400">12th Marks</span> <span className="font-bold">{user.twelfth_marks || 'N/A'}</span></div>
                        <div className="flex justify-between"><span className="text-emerald-400">JEE/CUET</span> <span className="font-bold">{user.jee_percentile || user.cuet_score || 'N/A'}</span></div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-6">
                    <Link to="/profile" className="text-sm font-bold text-indigo-600 hover:underline">Update Profile</Link>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={items.length === 0}
                      className="px-12 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Proceed to Submit
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Final Confirmation</h2>
                  <p className="text-gray-500 mb-8 text-lg">Please confirm that you want to submit applications for all {items.length} courses.</p>

                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-amber-800 text-sm mb-10 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold mb-1">Important Notice</p>
                      <p>By clicking "Confirm & Submit All", your profile information will be shared with the respective universities. This action cannot be undone.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                    <button 
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto px-8 py-4 text-gray-500 font-bold hover:text-gray-700 transition-all"
                    >
                      Back to Queue
                    </button>
                    <button 
                      onClick={handleSubmitAll}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-12 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting Applications...' : 'Confirm & Submit All'}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 mb-4">Success!</h2>
                  <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
                    Your applications have been successfully submitted. You can track their status in your dashboard.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      to="/dashboard"
                      className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      Go to Dashboard
                    </Link>
                    <Link 
                      to="/courses"
                      className="w-full sm:w-auto px-10 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                      Explore More
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
