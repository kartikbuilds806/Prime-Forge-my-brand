"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAdminRequestsAction, updateRequestStatusAction } from '@/app/actions/adminActions';
import { Button } from '@/components/ui/Button';
import {
  Lock,
  Search,
  Calendar,
  Phone,
  Mail,
  Building,
  FileText,
  User,
  ExternalLink,
  ShieldCheck,
  Loader2,
  RefreshCw,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface ClientRequest {
  id: string | number;
  full_name: string;
  email: string;
  phone: string;
  business_name: string | null;
  requirements: string | null;
  service_needed: string;
  status: string;
  submitted_at: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const savedPass = sessionStorage.getItem('pf_admin_passcode');
    if (savedPass) {
      setPasscode(savedPass);
      autoLogin(savedPass);
    }
  }, []);

  const autoLogin = async (savedPass: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminRequestsAction(savedPass);
      if (res.success && res.data) {
        setRequests(res.data as ClientRequest[]);
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('pf_admin_passcode');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminRequestsAction(passcode);
      if (res.success && res.data) {
        setRequests(res.data as ClientRequest[]);
        setIsAuthenticated(true);
        sessionStorage.setItem('pf_admin_passcode', passcode);
      } else {
        setError(res.error || 'Invalid passcode. Access Denied.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string | number, newStatus: string) => {
    setUpdatingId(id);
    setToastMessage(null);
    try {
      const res = await updateRequestStatusAction(id, newStatus, passcode);
      if (res.success) {
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
        showToast(`Request status updated to "${newStatus}"!`, 'success');
      } else {
        showToast(res.error || 'Failed to update status.', 'error');
      }
    } catch (err) {
      showToast('Error sending database update statement.', 'error');
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const showToast = (text: string, type: 'success' | 'error') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('pf_admin_passcode');
    setIsAuthenticated(false);
    setRequests([]);
    setPasscode('');
    setError(null);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminRequestsAction(passcode);
      if (res.success && res.data) {
        setRequests(res.data as ClientRequest[]);
        showToast('Requests list re-synchronized.', 'success');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    const q = searchQuery.toLowerCase();
    return (
      req.full_name.toLowerCase().includes(q) ||
      (req.business_name && req.business_name.toLowerCase().includes(q)) ||
      req.email.toLowerCase().includes(q) ||
      req.service_needed.toLowerCase().includes(q)
    );
  });

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'received': return 'Kickoff';
      case 'mockup':
      case 'design': return 'Mockup';
      case 'development':
      case 'coding': return 'Coding';
      case 'testing':
      case 'qa': return 'SEO & QA';
      case 'live':
      case 'completed': return 'Live';
      default: return status;
    }
  };

  const statuses = [
    { value: 'received', label: 'Kickoff', color: 'hover:bg-blue-600/20 active:bg-blue-600 border-blue-500/30' },
    { value: 'mockup', label: 'Mockup', color: 'hover:bg-purple-600/20 active:bg-purple-600 border-purple-500/30' },
    { value: 'development', label: 'Coding', color: 'hover:bg-amber-600/20 active:bg-amber-600 border-amber-500/30' },
    { value: 'testing', label: 'QA Polish', color: 'hover:bg-pink-600/20 active:bg-pink-600 border-pink-500/30' },
    { value: 'completed', label: 'Live Site', color: 'hover:bg-green-600/20 active:bg-green-600 border-green-500/30' },
  ];

  return (
    <div className="container py-12 md:py-24 min-h-[85vh] flex flex-col justify-center">
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-xl shadow-2xl border text-sm font-semibold flex items-center gap-3 backdrop-blur-md ${
              toastMessage.type === 'success' 
                ? 'bg-green-950/85 border-green-500/30 text-green-400' 
                : 'bg-red-950/85 border-red-500/30 text-red-400'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <ShieldCheck className="w-5 h-5 text-green-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400" />
            )}
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-md mx-auto w-full"
          >
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-accent/15 border border-accent/20 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="heading-serif text-3xl md:text-4xl mb-3 text-text-heading">Admin Gateway</h1>
              <p className="text-sm text-text-body">
                Verify authentication passcode to manage customer submissions and compile development status.
              </p>
            </div>

            <div className="glass-card p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="pass" className="block text-xs font-bold tracking-wider text-text-heading/60 uppercase mb-2">
                    Security Passcode
                  </label>
                  <input
                    type="password"
                    id="pass"
                    required
                    placeholder="Enter admin passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-semibold">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full justify-center py-3" disabled={isLoading}>
                  {isLoading ? 'Verifying Credentials...' : 'Unlock Workspace'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Tip: Use default passcode <code className="text-white bg-white/5 border border-white/10 px-1 py-0.5 rounded">forge-admin-2026</code> for testing.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
              <div>
                <span className="text-xs font-bold tracking-widest text-accent uppercase block mb-1">
                  PrimeForge Studio Control
                </span>
                <h1 className="heading-serif text-4xl text-text-heading">Project Intake Desk</h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all disabled:opacity-50"
                  title="Resync list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>

                <Button onClick={handleLogout} variant="secondary" className="px-5 py-2.5">
                  Sign Out
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 relative">
                <input
                  type="text"
                  placeholder="Filter requests by name, business, email, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 hover:border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <div className="md:col-span-4 bg-surface border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/15 border border-accent/20 rounded-lg flex items-center justify-center text-accent">
                    <TrendingUp className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs text-text-body/60 font-semibold uppercase">Database Load</p>
                    <p className="text-white font-bold text-lg">{requests.length} Requests</p>
                  </div>
                </div>
                {searchQuery && (
                  <span className="text-xs font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-text-heading">
                    {filteredRequests.length} Found
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {filteredRequests.length === 0 ? (
                <div className="glass-card p-12 text-center text-text-body">
                  <p className="text-lg font-serif mb-2 text-white">No database entries matched your filter</p>
                  <p className="text-sm">Try clearing your search query or refreshing the lists.</p>
                </div>
              ) : (
                filteredRequests.map((req) => (
                  <div key={req.id} className="glass-card p-6 md:p-8 relative overflow-hidden">
                    {updatingId === req.id && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                        <span className="text-white text-sm font-semibold">Updating Supabase...</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-zinc-300 font-semibold">
                              {req.service_needed}
                            </span>
                            <h3 className="heading-serif text-2xl text-white mt-2">
                              {req.business_name || 'No Business Name'}
                            </h3>
                          </div>

                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            req.status === 'completed' || req.status === 'live'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-accent/20 text-accent border border-accent/30'
                          }`}>
                            {getStatusLabel(req.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-body">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-accent/70 shrink-0" />
                            <span className="text-white truncate font-medium">{req.full_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent/70 shrink-0" />
                            <span>{new Date(req.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <a href={`mailto:${req.email}`} className="flex items-center gap-2 hover:text-accent truncate">
                            <Mail className="w-4 h-4 text-accent/70 shrink-0" />
                            <span className="truncate">{req.email}</span>
                          </a>
                          <a href={`tel:${req.phone}`} className="flex items-center gap-2 hover:text-accent">
                            <Phone className="w-4 h-4 text-accent/70 shrink-0" />
                            <span>{req.phone}</span>
                          </a>
                        </div>

                        {req.requirements && (
                          <div className="bg-black/30 border border-white/5 rounded-xl p-4">
                            <p className="text-[10px] font-bold text-text-heading/65 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                              <FileText className="w-3.5 h-3.5" />
                              Project Requirements
                            </p>
                            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-300">
                              {req.requirements}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                        <div className="bg-black/20 border border-white/5 rounded-2xl p-4">
                          <p className="text-xs font-semibold text-white/80 mb-3 uppercase tracking-wider">
                            Update tracking stage:
                          </p>
                          <div className="grid grid-cols-5 gap-1.5">
                            {statuses.map((statusItem) => {
                              const normalizedCurrentStatus = (req.status || 'new').toLowerCase();
                              const isActive = 
                                (statusItem.value === 'received' && ['new', 'received'].includes(normalizedCurrentStatus)) ||
                                (statusItem.value === 'mockup' && ['design', 'mockup'].includes(normalizedCurrentStatus)) ||
                                (statusItem.value === 'development' && ['coding', 'development'].includes(normalizedCurrentStatus)) ||
                                (statusItem.value === 'testing' && ['qa', 'testing'].includes(normalizedCurrentStatus)) ||
                                (statusItem.value === 'completed' && ['live', 'completed'].includes(normalizedCurrentStatus));

                              return (
                                <button
                                  key={statusItem.value}
                                  onClick={() => handleStatusChange(req.id, statusItem.value)}
                                  className={`py-2.5 px-1 rounded-lg text-[10px] font-semibold transition-all border cursor-pointer ${
                                    isActive
                                      ? 'bg-accent/25 border-accent text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] font-bold'
                                      : `bg-[#0f0f0f] border-white/5 text-gray-500 ${statusItem.color}`
                                  }`}
                                >
                                  {statusItem.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center justify-end">
                          <a
                            href={`/track?email=${encodeURIComponent(req.email)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-accent hover:text-white font-medium transition-colors group"
                          >
                            <span>Open Public Tracker</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>

                          <a
                            href={`mailto:${req.email}?subject=PrimeForge — Progress Update on ${req.business_name || 'Your Website'}&body=Hello ${req.full_name},%0D%0A%0D%0AI have updated your project status dashboard! You can track live build logs here: http://localhost:3000/track?email=${encodeURIComponent(req.email)}%0D%0A%0D%0A— Kartik Sharma, Director`}
                            className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-full text-xs font-semibold text-white transition-all cursor-pointer"
                          >
                            Email client update
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
