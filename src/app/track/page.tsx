"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackProjectAction, TrackedProjectData } from '@/app/actions/trackProject';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Building, 
  Sparkles, 
  MessageCircle, 
  Activity, 
  Terminal,
  ShieldAlert
} from 'lucide-react';

export default function TrackPage() {
  const [emailInput, setEmailInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<TrackedProjectData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent, searchEmail?: string) => {
    if (e) e.preventDefault();
    const query = searchEmail || emailInput;
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await trackProjectAction(query);
      if (res.success && res.data) {
        setProjectData(res.data);
        setHasSearched(true);
      } else {
        setError(res.error || 'Failed to retrieve project tracking information.');
        setProjectData(null);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoClick = () => {
    setEmailInput('demo@example.com');
    handleSearch(undefined, 'demo@example.com');
  };

  const handleReset = () => {
    setProjectData(null);
    setHasSearched(false);
    setEmailInput('');
    setError(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      if (emailParam) {
        setEmailInput(emailParam);
        handleSearch(undefined, emailParam);
      }
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'received':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'mockup':
      case 'design':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'development':
      case 'coding':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'testing':
      case 'qa':
        return 'bg-pink-500/20 text-pink-400 border border-pink-500/30';
      case 'live':
      case 'completed':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30';
    }
  };

  return (
    <div className="container pt-24 pb-12 md:pt-28 md:pb-24 min-h-[85vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!hasSearched ? (
          /* Search / Entry Screen */
          <motion.div 
            key="search-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto w-full"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/10 dark:border-white/10 mb-6 mx-auto">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span className="text-xs font-semibold text-text-heading/80 tracking-widest uppercase">REAL-TIME PORTAL</span>
              </div>
              <h1 className="heading-serif text-4xl md:text-5xl mb-4 text-text-heading">Track Your Build</h1>
              <p className="text-text-body">
                Enter your email address to check the live development timeline, view mockup milestones, and access staging environments for your project.
              </p>
            </div>

            <div className="glass-card p-8 md:p-10 relative overflow-hidden">
              {/* Glow effects inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10"></div>
              
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-heading mb-2">
                    Client Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. client@company.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-white/80 dark:bg-black/40 border border-black/15 dark:border-white/10 hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent rounded-xl py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm"
                  >
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <div>{error}</div>
                  </motion.div>
                )}

                <Button 
                  type="submit" 
                  className="w-full justify-center py-3.5 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Retrieving request details...' : 'Search Project Request'}
                </Button>
              </form>

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/10 dark:border-white/5"></div>
                </div>
                <span className="relative px-3 text-xs uppercase bg-transparent text-text-body font-semibold tracking-wider">
                  Or Test the Tracker
                </span>
              </div>

              <button
                onClick={handleDemoClick}
                className="w-full py-3.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/15 dark:border-white/10 text-text-heading rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-yellow-400 group-hover:scale-125 transition-transform" />
                <span>See Demo Tracker</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Tracker Dashboard Screen */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto w-full space-y-8"
          >
            {/* Header / Navigation Back */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button 
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm text-text-body hover:text-text-heading transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Search
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-text-body">Tracking ID:</span>
                <code className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded border border-zinc-700">
                  {projectData?.request.id}
                </code>
              </div>
            </div>

            {/* Main Stats Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Project Overview and Progress Timeline */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Project Header Card */}
                <div className="glass-card p-6 md:p-8 relative">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10"></div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
                        {projectData?.request.service_needed}
                      </span>
                      <h2 className="heading-serif text-3xl text-text-heading">
                        {projectData?.request.business_name || projectData?.request.full_name}
                      </h2>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(projectData?.request.status || '')}`}>
                      {projectData?.request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5 text-sm text-text-body">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-text-body/60 font-medium">Submitted On</p>
                        <p className="text-white font-medium">
                          {new Date(projectData?.request.submitted_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Building className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-text-body/60 font-medium">Contact Person</p>
                        <p className="text-white font-medium">{projectData?.request.full_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 col-span-2 md:col-span-1">
                      <Activity className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-text-body/60 font-medium">Overall Progress</p>
                        <p className="text-white font-medium">{projectData?.progressPercent}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="mt-8">
                    <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-text-body/80 mb-2 uppercase">
                      <span>Kickoff</span>
                      <span>Staging</span>
                      <span>Launch</span>
                    </div>
                    <div className="w-full bg-black/40 border border-white/5 h-3 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${projectData?.progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-accent h-full rounded-full shadow-[0_0_12px_rgba(37,99,235,0.6)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="glass-card p-6 md:p-8">
                  <h3 className="heading-serif text-2xl mb-8 text-white flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-accent" />
                    Development Steps
                  </h3>

                  <div className="relative border-l-2 border-white/10 ml-2 sm:ml-4 md:ml-6 pl-6 sm:pl-8 md:pl-10 space-y-8 sm:space-y-10">
                    {projectData?.steps.map((step, idx) => {
                      const isCompleted = step.status === 'completed';
                      const isCurrent = step.status === 'current';
                      
                      return (
                        <div key={idx} className="relative">
                          {/* Indicator Dot */}
                          <div className={`absolute -left-[37px] sm:-left-[45px] md:-left-[53px] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border z-10 transition-all ${
                            isCompleted 
                              ? 'bg-green-500 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                              : isCurrent
                                ? 'bg-accent border-accent text-white animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                                : 'bg-[#111] border-white/10 text-gray-500'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 fill-transparent" />
                            ) : (
                              <span className="text-xs font-bold">{idx + 1}</span>
                            )}
                          </div>

                          {/* Content Panel */}
                          <div className={`transition-all ${isCurrent ? 'opacity-100 scale-[1.01]' : 'opacity-70'}`}>
                            <h4 className={`text-lg font-semibold mb-1 ${isCurrent ? 'text-white' : 'text-text-heading'}`}>
                              {step.name}
                            </h4>
                            <p className="text-sm text-text-body leading-relaxed max-w-xl">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Actions & Update Logs */}
              <div className="lg:col-span-4 space-y-8 flex flex-col justify-start">
                
                {/* Deliverables / Client Staging links */}
                <div className="glass-card p-6 space-y-4">
                  <h3 className="heading-serif text-xl text-white">Project Deliverables</h3>
                  <p className="text-xs text-text-body">Access active design links and beta releases below as they get generated.</p>
                  
                  <div className="space-y-3 pt-2">
                    {projectData?.mockupUrl ? (
                      <a 
                        href={projectData.mockupUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm text-white font-medium transition-all group"
                      >
                        <span className="flex items-center gap-2.5">
                          🎨 <span className="underline-offset-4 group-hover:underline">Visual Design Mockup</span>
                        </span>
                        <ExternalLink className="w-4 h-4 text-text-body/60 group-hover:text-white transition-colors" />
                      </a>
                    ) : (
                      <div className="w-full flex items-center justify-between p-3.5 bg-black/20 border border-white/5 rounded-xl text-sm text-text-body/45 cursor-not-allowed">
                        <span className="flex items-center gap-2.5">🎨 Visual Design Mockup</span>
                        <span className="text-xs font-bold tracking-wider uppercase opacity-40">TBD</span>
                      </div>
                    )}

                    {projectData?.stagingUrl ? (
                      <a 
                        href={projectData.stagingUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full flex items-center justify-between p-3.5 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-xl text-sm text-white font-medium transition-all group shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      >
                        <span className="flex items-center gap-2.5">
                          🚀 <span className="underline-offset-4 group-hover:underline">Live Staging Beta</span>
                        </span>
                        <ExternalLink className="w-4 h-4 text-accent group-hover:text-white transition-colors animate-pulse" />
                      </a>
                    ) : (
                      <div className="w-full flex items-center justify-between p-3.5 bg-black/20 border border-white/5 rounded-xl text-sm text-text-body/45 cursor-not-allowed">
                        <span className="flex items-center gap-2.5">🚀 Live Staging Beta</span>
                        <span className="text-xs font-bold tracking-wider uppercase opacity-40">TBD</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Hub */}
                <div className="glass-card p-6 space-y-4">
                  <h3 className="heading-serif text-xl text-white">Client Action Center</h3>
                  
                  <div className="flex flex-col gap-3">
                    <Button href="/book-a-call" variant="primary" className="w-full justify-center font-medium">
                      Schedule Progress Call
                    </Button>
                    
                    <a
                      href={`mailto:primeforge7@gmail.com?subject=Feedback on Request: ${projectData?.request.business_name || projectData?.request.full_name}`}
                      className="w-full text-center py-3.5 border border-white/10 hover:bg-white/5 text-white rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Submit Feedback</span>
                    </a>

                    <a 
                      href="https://wa.me/918630070729"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full text-center py-3.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-transparent" />
                      <span>WhatsApp Direct chat</span>
                    </a>
                  </div>
                </div>

                {/* Developer Updates / Console Feed */}
                <div className="glass-card p-6 flex-grow flex flex-col min-h-[300px]">
                  <h3 className="heading-serif text-xl text-white mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    Developer logs
                  </h3>

                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-zinc-400 space-y-4 overflow-y-auto flex-grow max-h-[350px]">
                    {projectData?.logs && projectData.logs.length > 0 ? (
                      projectData.logs.map((log, index) => (
                        <div key={index} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <span className="text-accent font-semibold block mb-0.5">[{log.date}]</span>
                          <span className="text-zinc-300">{log.message}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 italic">No developer logs available.</div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
