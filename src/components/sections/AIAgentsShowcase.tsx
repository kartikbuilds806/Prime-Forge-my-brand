'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Database, Zap, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2, Play, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AgentWorkflow {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  nodes: {
    step: string;
    title: string;
    system: string;
    desc: string;
    status: string;
  }[];
}

const agentWorkflows: AgentWorkflow[] = [
  {
    id: 'whatsapp-lead-qualifier',
    title: 'Autonomous WhatsApp Lead Qualifier',
    badge: 'CONVERSATIONAL AI AGENT',
    subtitle: 'Qualifies inbound client leads 24/7 on WhatsApp without human delay.',
    description: 'When a new lead messages your WhatsApp, this autonomous Gemini agent asks screening questions, scores lead budget & timeline, and books qualified calls directly onto your calendar.',
    accentColor: '#10b981',
    metrics: [
      { label: 'Lead Response Time', value: '< 2 Seconds' },
      { label: 'Admin Time Saved', value: '-90% Hours' },
      { label: 'Booking Rate', value: '+3.4x Calls' },
    ],
    nodes: [
      { step: '01', title: 'Inbound WhatsApp Message', system: 'WhatsApp Cloud API', desc: 'Captures incoming client chat and triggers edge webhook handler.', status: 'Triggered' },
      { step: '02', title: 'Gemini NLP Analysis', system: 'Google Gemini 2.5 Flash', desc: 'Parses client project scope, budget range, and timeline intent.', status: 'Processing' },
      { step: '03', title: 'Lead Scoring Engine', system: 'Supabase Vector Database', desc: 'Scores lead quality against your agency target client criteria.', status: 'Evaluated' },
      { step: '04', title: 'Cal.com Booking Sync', system: 'Cal.com API & WhatsApp', desc: 'Sends direct calendar link or auto-confirms meeting slot in chat.', status: 'Completed' },
    ]
  },
  {
    id: 'rag-vector-bot',
    title: 'RAG Vector Knowledge Base Bot',
    badge: 'ENTERPRISE RAG ARCHITECTURE',
    subtitle: 'Instant contextual answers grounded strictly in your business documents.',
    description: 'Embeds your company documentation, FAQs, and service specs into 768-dimensional vectors. When clients ask complex questions, it performs semantic search and streams accurate responses.',
    accentColor: '#3b82f6',
    metrics: [
      { label: 'Semantic Query Speed', value: '85ms Vector' },
      { label: 'Accuracy Score', value: '100% Grounded' },
      { label: 'Hinglish & Multi-Lang', value: 'Auto-Detected' },
    ],
    nodes: [
      { step: '01', title: 'Client Natural Query', system: 'ChatWidget UI Component', desc: 'User submits inquiry in English, Hinglish, or native language.', status: 'Triggered' },
      { step: '02', title: '768-Dim Vector Embedding', system: 'text-embedding-004 API', desc: 'Converts query into high-dimensional vector representation.', status: 'Embedded' },
      { step: '03', title: 'Similarity Chunk Retrieval', system: 'Supabase pgvector', desc: 'Fetches top semantic match chunks via cosine similarity search.', status: 'Retrieved' },
      { step: '04', title: 'Streamed Gemini Output', system: 'Gemini SSE Stream', desc: 'Generates warm, accurate answer strictly constrained by RAG facts.', status: 'Completed' },
    ]
  },
  {
    id: 'crm-invoice-agent',
    title: 'CRM & Invoice Auto-Sync Engine',
    badge: 'WORKFLOW AUTOMATION PIPELINE',
    subtitle: 'Automates contract creation, Stripe invoices, and client CRM updates.',
    description: 'Connects your website lead submissions directly into Make/n8n automation pipelines. Automatically generates Stripe invoices, creates client tracking codes, and dispatches owner notifications.',
    accentColor: '#a855f7',
    metrics: [
      { label: 'Invoice Generation', value: 'Instant' },
      { label: 'Data Accuracy', value: '100% Zero-Error' },
      { label: 'Client Onboarding', value: '< 1 Minute' },
    ],
    nodes: [
      { step: '01', title: 'Project Form Submitted', system: 'Server Actions API', desc: 'Client completes multi-step scope questionnaire at /start-a-project.', status: 'Triggered' },
      { step: '02', title: 'Make / n8n Automation', system: 'Webhook Dispatcher', desc: 'Dispatches payload through serverless workflow automation nodes.', status: 'Dispatched' },
      { step: '03', title: 'Stripe & Tracking Code', system: 'Stripe API & Supabase', desc: 'Generates secure payment invoice and initializes client tracking portal.', status: 'Generated' },
      { step: '04', title: 'Resend & WhatsApp Alert', system: 'Resend Email API', desc: 'Sends immediate confirmation receipt to client and founder notification.', status: 'Completed' },
    ]
  }
];

export function AIAgentsShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [simulatingStep, setSimulatingStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const activeWorkflow = agentWorkflows[activeTab];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatingStep(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < activeWorkflow.nodes.length) {
        setSimulatingStep(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimulatingStep(null);
        }, 1000);
      }
    }, 900);
  };

  return (
    <section className="py-24 relative overflow-hidden border-t border-black/5 dark:border-white/10 bg-transparent">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Bot className="w-4 h-4 text-blue-400" />
            <span>AUTONOMOUS AI AGENTS & WORKFLOW SUITE</span>
          </div>
          <h2 className="heading-serif text-4xl md:text-6xl text-text-heading mb-6">
            Put Your Business on <span className="text-accent italic">Autopilot</span>
          </h2>
          <p className="text-text-body text-lg max-w-2xl mx-auto">
            Explore our production-ready AI agents and workflow automations engineered to qualify leads, execute RAG searches, and streamline business operations.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center overflow-x-auto no-scrollbar justify-start md:justify-center gap-2.5 mb-10 md:mb-14 w-full px-2">
          {agentWorkflows.map((workflow, idx) => (
            <button
              key={workflow.id}
              onClick={() => {
                setActiveTab(idx);
                setIsSimulating(false);
                setSimulatingStep(null);
              }}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 shrink-0 ${
                activeTab === idx
                  ? 'bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] scale-105'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/15'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{workflow.title}</span>
            </button>
          ))}
        </div>

        {/* Active Workflow Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorkflow.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#121216] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white space-y-8"
          >
            {/* Top Bar Details & Metrics */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  {activeWorkflow.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeWorkflow.title}
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {activeWorkflow.description}
                </p>
              </div>

              {/* Verified Metrics Badges */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                {activeWorkflow.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl min-w-[120px] text-center flex-1 sm:flex-none">
                    <div className="text-[11px] text-zinc-400">{metric.label}</div>
                    <div className="text-base sm:text-lg font-black text-emerald-400">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Node Pipeline Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Live Architectural Node Pipeline</span>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isSimulating
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Simulate Agent Run</span>
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Node Cards (Grid Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {activeWorkflow.nodes.map((node, index) => {
                const isActiveStep = simulatingStep === index;
                const isCompletedStep = simulatingStep !== null && simulatingStep > index;

                return (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border transition-all duration-500 relative flex flex-col justify-between ${
                      isActiveStep
                        ? 'bg-blue-950/40 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105'
                        : isCompletedStep
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                          isActiveStep ? 'bg-blue-500 text-white animate-pulse' : 'bg-white/10 text-zinc-300'
                        }`}>
                          {node.step}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isActiveStep
                            ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                            : isCompletedStep
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}>
                          {isActiveStep ? 'RUNNING' : isCompletedStep ? 'PASSED' : node.status}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mb-1">{node.title}</h4>
                      <p className="text-[11px] font-semibold text-blue-400 mb-3">{node.system}</p>
                      <p className="text-xs text-zinc-300 leading-relaxed">{node.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Node Latency</span>
                      <span className="font-mono text-zinc-200">&lt; 150ms</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout & CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-zinc-900 to-zinc-950 border border-blue-500/20 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Need a Custom AI Agent or n8n / Make Automation for Your Business?
                </h4>
                <p className="text-xs text-zinc-300">
                  We design, build, and deploy custom autonomous workflows tailored specifically to your agency or software business.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button href="/start-a-project" variant="primary" icon className="text-xs py-2.5 px-4">
                  Deploy AI Agent
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
