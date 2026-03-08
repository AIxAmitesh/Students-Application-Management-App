import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Application } from '../types';
import { LayoutDashboard, FileText, Settings, Bell, Clock, CheckCircle, XCircle, AlertCircle, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.getApplications(user.id).then(data => {
        setApplications(data);
        setIsLoading(false);
      });
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Rejected': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Under Review': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'Submitted': return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default: return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-50 text-green-700 border-green-100';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-100';
      case 'Under Review': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Submitted': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100">
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-10 p-4 bg-indigo-50 rounded-3xl border border-indigo-100">
            <div className="bg-indigo-600 h-16 w-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-100 mb-4">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 mb-1">{user.name}</div>
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-indigo-100">
                Student ID: #{user.id}
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-indigo-600 bg-indigo-50 rounded-xl font-semibold">
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </Link>
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-all">
              <FileText className="h-5 w-5" />
              My Profile
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-all">
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-500">Track and manage your university applications.</p>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 text-sm font-medium mb-2">Total Applications</div>
              <div className="text-3xl font-bold text-gray-900">{applications.length}</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 text-sm font-medium mb-2">Under Review</div>
              <div className="text-3xl font-bold text-amber-600">
                {applications.filter(a => a.status === 'Under Review').length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 text-sm font-medium mb-2">Offers Received</div>
              <div className="text-3xl font-bold text-green-600">
                {applications.filter(a => a.status === 'Accepted').length}
              </div>
            </div>
          </div>

          {/* Applications List */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <Link to="/universities" className="text-indigo-600 text-sm font-bold hover:underline">Apply to more</Link>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
            ) : applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={app.id} 
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-50 p-3 rounded-2xl">
                        <GraduationCap className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{app.course_name}</h3>
                        <p className="text-sm text-gray-500">{app.university_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Applied On</div>
                        <div className="text-sm font-medium text-gray-700">
                          {new Date(app.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold",
                        getStatusColor(app.status)
                      )}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-500 mb-6">Start exploring universities and courses to begin your journey.</p>
                <Link to="/universities" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                  Browse Universities
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};
