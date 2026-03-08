import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { User, Mail, Phone, GraduationCap, MapPin, Edit2, ShieldCheck, FileText, Settings, Bell, ChevronRight, Camera, Save, X, Upload, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'applications' | 'documents' | 'settings'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync formData with user when user changes (e.g. after successful update)
  React.useEffect(() => {
    if (user && !isEditing) {
      setFormData(user);
    }
  }, [user, isEditing]);

  React.useEffect(() => {
    if (user && activeTab === 'applications') {
      setIsLoadingApps(true);
      api.getApplications(user.id).then(data => {
        setApplications(data);
        setIsLoadingApps(false);
      });
    }
  }, [user, activeTab]);

  if (!user) return null;

  const handleSave = async () => {
    await updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newDoc = {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          type: file.type.split('/')[1].toUpperCase(),
          url: event.target?.result as string
        };
        const updatedDocs = [...(user.documents || []), newDoc];
        updateUser({ documents: updatedDocs });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadDocument = (doc: { name: string, url: string }) => {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate your account? This action is permanent and will delete all your data.')) {
      // In a real app, call API to delete. For now, just logout and clear local storage.
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  const deleteDocument = (index: number) => {
    const updatedDocs = (user.documents || []).filter((_, i) => i !== index);
    updateUser({ documents: updatedDocs });
  };

  const toggleSetting = (key: 'email_notifications' | 'sms_alerts' | 'profile_visibility') => {
    const currentSettings = user.settings || { email_notifications: true, sms_alerts: false, profile_visibility: true };
    updateUser({
      settings: {
        ...currentSettings,
        [key]: !currentSettings[key]
      }
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="h-4 w-4" /> },
    { id: 'academic', label: 'Academic Records', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'applications', label: 'My Applications', icon: <FileText className="h-4 w-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const userSettings = user.settings || { email_notifications: true, sms_alerts: false, profile_visibility: true };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-indigo-200 overflow-hidden">
                {user.name.charAt(0)}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-500 hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {user.email}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> India</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
            <button className="p-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl hover:text-indigo-600 transition-all">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsEditing(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    {tab.label}
                  </div>
                  <ChevronRight className={cn("h-4 w-4 opacity-50", activeTab === tab.id ? "opacity-100" : "opacity-0")} />
                </button>
              ))}
            </div>

            <div className="mt-8 bg-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-xs text-indigo-200 mb-4 leading-relaxed">Our support team is available 24/7 to assist you with your application.</p>
                <button className="w-full py-2.5 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all">
                  Contact Support
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-800 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[500px]"
              >
                {activeTab === 'personal' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                      {!isEditing && (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        >
                          <Edit2 className="h-3 w-3" />
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: 'Full Name', key: 'name', type: 'text' },
                        { label: 'Email Address', key: 'email', type: 'email' },
                        { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                        { label: 'Date of Birth', key: 'dob', type: 'date' },
                        { label: 'Gender', key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                        { label: 'Nationality', key: 'nationality', type: 'text', placeholder: 'Indian' },
                        { label: 'Address', key: 'address', type: 'textarea', fullWidth: true },
                      ].map((field) => (
                        <div key={field.key} className={cn("space-y-2", field.fullWidth && "md:col-span-2")}>
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{field.label}</label>
                          {!isEditing ? (
                            <p className="text-gray-900 font-semibold text-lg">{(user as any)[field.key] || field.placeholder || 'Not specified'}</p>
                          ) : (
                            field.type === 'select' ? (
                              <select 
                                value={(formData as any)[field.key] || ''}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                            ) : field.type === 'textarea' ? (
                              <textarea 
                                value={(formData as any)[field.key] || ''}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all min-h-[100px]"
                              />
                            ) : (
                              <input 
                                type={field.type}
                                value={(formData as any)[field.key] || ''}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                              />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'academic' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-gray-900">Academic Records</h3>
                      {!isEditing && (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        >
                          <Edit2 className="h-3 w-3" />
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="space-y-8">
                      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                              <GraduationCap className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">Education History</h4>
                              <p className="text-xs text-gray-500">Last updated recently</p>
                            </div>
                          </div>
                        </div>
                        {!isEditing ? (
                          <p className="text-gray-600 leading-relaxed">
                            {user.education_history || 'No education history provided.'}
                          </p>
                        ) : (
                          <textarea 
                            value={formData.education_history || ''}
                            onChange={(e) => setFormData({ ...formData, education_history: e.target.value })}
                            placeholder="Describe your education history (e.g., School name, stream, percentage...)"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all min-h-[120px] bg-white"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { label: 'Class 10th Marks (%)', key: 'tenth_marks', icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />, color: 'indigo', bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', title: 'text-indigo-900' },
                          { label: 'Class 12th Marks (%)', key: 'twelfth_marks', icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />, color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', title: 'text-emerald-900' },
                          { label: 'JEE Main Percentile', key: 'jee_percentile', icon: <ShieldCheck className="h-6 w-6 text-orange-600" />, color: 'orange', bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600', title: 'text-orange-900' },
                          { label: 'CUET Score', key: 'cuet_score', icon: <ShieldCheck className="h-6 w-6 text-purple-600" />, color: 'purple', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', title: 'text-purple-900' },
                        ].map((score) => (
                          <div key={score.key} className={cn("p-6 rounded-2xl border", score.bg, score.border)}>
                            <div className="flex items-center justify-between mb-4">
                              {score.icon}
                              <span className={cn("text-xs font-bold bg-white px-2 py-1 rounded-lg", score.text)}>Verified</span>
                            </div>
                            <h4 className={cn("font-bold mb-1", score.title)}>{score.label}</h4>
                            {!isEditing ? (
                              <p className={cn("text-2xl font-black", score.text)}>{(user as any)[score.key] || 'N/A'}</p>
                            ) : (
                              <input 
                                type="text"
                                value={(formData as any)[score.key] || ''}
                                onChange={(e) => setFormData({ ...formData, [score.key]: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white"
                                placeholder="Enter score"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-8">My Applications</h3>
                    {isLoadingApps ? (
                      <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
                    ) : applications.length > 0 ? (
                      <div className="space-y-4">
                        {applications.map((app) => (
                          <div key={app.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="bg-white p-3 rounded-xl shadow-sm">
                                <GraduationCap className="h-6 w-6 text-indigo-600" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">{app.course_name}</h4>
                                <p className="text-xs text-gray-500">{app.university_name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                app.status === 'Accepted' ? "bg-green-50 text-green-700 border-green-100" :
                                app.status === 'Rejected' ? "bg-red-50 text-red-700 border-red-100" :
                                app.status === 'Under Review' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                "bg-blue-50 text-blue-700 border-blue-100"
                              )}>
                                {app.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">You haven't submitted any applications yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-8">Uploaded Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(user.documents && user.documents.length > 0 ? user.documents : [
                        { name: 'Class 10 Marksheet', size: '1.2 MB', type: 'PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
                        { name: 'Class 12 Marksheet', size: '1.5 MB', type: 'PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
                        { name: 'Identity Proof (Aadhar)', size: '800 KB', type: 'JPG', url: 'https://picsum.photos/seed/aadhar/800/1200' },
                      ]).map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                          <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => setViewingDoc(doc)}>
                            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                              <FileText className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-gray-900">{doc.name}</h4>
                              <p className="text-xs text-gray-500">{doc.size} • {doc.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setViewingDoc(doc)}
                              className="text-xs font-bold text-indigo-600 hover:underline"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => downloadDocument(doc)}
                              className="text-xs font-bold text-gray-400 hover:text-indigo-600"
                            >
                              Download
                            </button>
                            <button 
                              onClick={() => deleteDocument(i)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
                      >
                        <div className="p-3 bg-gray-50 rounded-full mb-2">
                          <Upload className="h-5 w-5 text-gray-400" />
                        </div>
                        <span className="text-sm font-bold text-gray-500">Upload New Document</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-8">Account Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <h4 className="font-bold text-gray-900">Email Notifications</h4>
                          <p className="text-xs text-gray-500">Receive updates about your applications via email.</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting('email_notifications')}
                          className={cn(
                            "w-12 h-6 rounded-full relative transition-all",
                            userSettings.email_notifications ? "bg-indigo-600" : "bg-gray-300"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                            userSettings.email_notifications ? "right-1" : "left-1"
                          )}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <h4 className="font-bold text-gray-900">SMS Alerts</h4>
                          <p className="text-xs text-gray-500">Get instant alerts for admission offers.</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting('sms_alerts')}
                          className={cn(
                            "w-12 h-6 rounded-full relative transition-all",
                            userSettings.sms_alerts ? "bg-indigo-600" : "bg-gray-300"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                            userSettings.sms_alerts ? "right-1" : "left-1"
                          )}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <h4 className="font-bold text-gray-900">Public Profile Visibility</h4>
                          <p className="text-xs text-gray-500">Allow universities to find your profile in searches.</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting('profile_visibility')}
                          className={cn(
                            "w-12 h-6 rounded-full relative transition-all",
                            userSettings.profile_visibility ? "bg-indigo-600" : "bg-gray-300"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                            userSettings.profile_visibility ? "right-1" : "left-1"
                          )}></div>
                        </button>
                      </div>
                      <div className="pt-6 border-t border-gray-100">
                        <button 
                          onClick={handleDeactivate}
                          className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                        >
                          Deactivate Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {isEditing && (
                  <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {viewingDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setViewingDoc(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{viewingDoc.name}</h3>
                    <p className="text-xs text-gray-500">{viewingDoc.size} • {viewingDoc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => downloadDocument(viewingDoc)}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Download"
                  >
                    <Upload className="h-5 w-5 rotate-180" />
                  </button>
                  <button 
                    onClick={() => setViewingDoc(null)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 overflow-auto p-8 flex items-center justify-center">
                {viewingDoc.type === 'JPG' || viewingDoc.type === 'PNG' || viewingDoc.type === 'JPEG' ? (
                  <img src={viewingDoc.url} alt={viewingDoc.name} className="max-w-full h-auto shadow-lg rounded-lg" />
                ) : viewingDoc.type === 'PDF' ? (
                  <iframe src={viewingDoc.url} className="w-full h-full rounded-lg shadow-lg" title={viewingDoc.name} />
                ) : (
                  <div className="text-center">
                    <FileText className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium mb-6">Preview not available for {viewingDoc.type} files.</p>
                    <button 
                      onClick={() => downloadDocument(viewingDoc)}
                      className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                    >
                      Download to View
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
