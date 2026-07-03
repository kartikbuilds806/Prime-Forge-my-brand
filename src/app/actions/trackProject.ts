'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface ProjectRequest {
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

export interface ProjectStep {
  name: string;
  description: string;
  status: 'pending' | 'current' | 'completed';
}

export interface DeveloperLog {
  date: string;
  message: string;
}

export interface TrackedProjectData {
  request: ProjectRequest;
  progressPercent: number;
  currentStepIndex: number;
  steps: ProjectStep[];
  logs: DeveloperLog[];
  stagingUrl?: string;
  mockupUrl?: string;
}

// Maps supabase status string to our 5 steps progress
function mapStatusToSteps(status: string, submittedAt: string): { steps: ProjectStep[], progressPercent: number, currentStepIndex: number } {
  const steps: ProjectStep[] = [
    { name: "Intake & Strategy", description: "Reviewing requirements & setting up strategy.", status: "pending" },
    { name: "Interactive Mockup", description: "Designing layout mockup & live demo.", status: "pending" },
    { name: "Core Engineering", description: "Developing Next.js pages & database integration.", status: "pending" },
    { name: "SEO & QA Polish", description: "Configuring metadata & performing speed audits.", status: "pending" },
    { name: "Final Handover", description: "Pointing domain & deploying production site.", status: "pending" },
  ];

  let currentStepIndex = 0;
  let progressPercent = 10;

  const normalizedStatus = (status || 'new').toLowerCase();

  if (normalizedStatus === 'new' || normalizedStatus === 'received') {
    currentStepIndex = 0;
    progressPercent = 20;
    steps[0].status = 'current';
  } else if (normalizedStatus === 'mockup' || normalizedStatus === 'design') {
    currentStepIndex = 1;
    progressPercent = 40;
    steps[0].status = 'completed';
    steps[1].status = 'current';
  } else if (normalizedStatus === 'development' || normalizedStatus === 'coding') {
    currentStepIndex = 2;
    progressPercent = 65;
    steps[0].status = 'completed';
    steps[1].status = 'completed';
    steps[2].status = 'current';
  } else if (normalizedStatus === 'testing' || normalizedStatus === 'qa') {
    currentStepIndex = 3;
    progressPercent = 85;
    steps[0].status = 'completed';
    steps[1].status = 'completed';
    steps[2].status = 'completed';
    steps[3].status = 'current';
  } else if (normalizedStatus === 'live' || normalizedStatus === 'completed') {
    currentStepIndex = 4;
    progressPercent = 100;
    steps[0].status = 'completed';
    steps[1].status = 'completed';
    steps[2].status = 'completed';
    steps[3].status = 'completed';
    steps[4].status = 'completed';
  } else {
    currentStepIndex = 0;
    progressPercent = 20;
    steps[0].status = 'current';
  }

  return { steps, progressPercent, currentStepIndex };
}

// Generate rich updates history based on status
function getDeveloperLogs(status: string, submittedAt: string, businessName: string): DeveloperLog[] {
  const normalizedStatus = (status || 'new').toLowerCase();
  const dateObj = new Date(submittedAt);
  const formatDate = (daysToAdd: number) => {
    const d = new Date(dateObj);
    d.setDate(d.getDate() + daysToAdd);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const logs: DeveloperLog[] = [];

  logs.push({
    date: formatDate(0),
    message: `Project intake submitted. Initial briefing document compiled for ${businessName || 'the project'}.`
  });

  if (normalizedStatus === 'new' || normalizedStatus === 'received') {
    logs.push({
      date: formatDate(0),
      message: `Setup project workspaces, GitHub repository, and initialized local environment configuration.`
    });
    return logs.reverse();
  }

  logs.push({
    date: formatDate(1),
    message: "Initial visual styles defined. Drafting the interactive user interface mockup."
  });

  if (normalizedStatus === 'mockup' || normalizedStatus === 'design') {
    logs.push({
      date: formatDate(2),
      message: "Interactive live demo and mockup published. Awaiting client design feedback & approval."
    });
    return logs.reverse();
  }

  logs.push({
    date: formatDate(2),
    message: "Mockup approved! Core engineering kick-off: establishing layout structures & page transitions."
  });
  logs.push({
    date: formatDate(3),
    message: "Backend initialization: creating database schemas, security access rules, and Supabase integration."
  });

  if (normalizedStatus === 'development' || normalizedStatus === 'coding') {
    logs.push({
      date: formatDate(4),
      message: "Component construction ongoing. Implementing form handlers and UI micro-animations."
    });
    return logs.reverse();
  }

  logs.push({
    date: formatDate(4),
    message: "Core development finalized. Transitioning into audits: performance profile and responsive layouts verification."
  });
  logs.push({
    date: formatDate(5),
    message: "Search Optimization setup: deploying meta tag tags, JSON-LD Schema markup, and Upstash rate-limit middleware."
  });

  if (normalizedStatus === 'testing' || normalizedStatus === 'qa') {
    logs.push({
      date: formatDate(5),
      message: "Staging deployment active. Running automated audits and final quality assurance checks."
    });
    return logs.reverse();
  }

  logs.push({
    date: formatDate(5),
    message: "Audit tests fully cleared (Performance Score > 95/100). Handover preparation complete."
  });
  logs.push({
    date: formatDate(6),
    message: `Production website successfully linked to custom domain. Live deployment complete!`
  });

  return logs.reverse();
}

// Demo dataset for testing
const demoProject: TrackedProjectData = {
  request: {
    id: "demo-pf-992",
    full_name: "Jane Sterling",
    email: "demo@example.com",
    phone: "+1 (555) 349-2810",
    business_name: "Sterling Real Estate",
    requirements: "We need a ultra-premium website to showcase multi-million dollar luxury listings. Requirements include smooth page transitions, a booking scheduler for property viewings, and full SEO/GEO integration so we rank in local organic results.",
    service_needed: "Business Website Development",
    status: "development",
    submitted_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  progressPercent: 65,
  currentStepIndex: 2,
  steps: [
    { name: "Intake & Strategy", description: "Reviewing requirements & setting up strategy.", status: "completed" },
    { name: "Interactive Mockup", description: "Designing layout mockup & live demo.", status: "completed" },
    { name: "Core Engineering", description: "Developing Next.js pages & database integration.", status: "current" },
    { name: "SEO & QA Polish", description: "Configuring metadata & performing speed audits.", status: "pending" },
    { name: "Final Handover", description: "Pointing domain & deploying production site.", status: "pending" },
  ],
  logs: [
    { date: "July 2, 2026", message: "Component construction ongoing. Implementing form handlers and UI micro-animations." },
    { date: "July 1, 2026", message: "Backend initialization: creating database schemas, security access rules, and Supabase integration." },
    { date: "June 30, 2026", message: "Mockup approved! Core engineering kick-off: establishing layout structures & page transitions." },
    { date: "June 29, 2026", message: "Initial visual styles defined. Drafting the interactive user interface mockup." },
    { date: "June 29, 2026", message: "Project intake submitted. Initial briefing document compiled for Sterling Real Estate." }
  ],
  stagingUrl: "https://sterling-staging.primeforge.agency",
  mockupUrl: "https://figma.com/file/demo-sterling-mockup"
};

export async function trackProjectAction(email: string) {
  try {
    const cleanEmail = email.trim().toLowerCase();
    
    if (cleanEmail === 'demo@example.com' || cleanEmail === 'demo') {
      return { success: true, data: demoProject };
    }

    // Query Supabase
    const { data: requests, error } = await supabase
      .from('client_requests')
      .select('*')
      .eq('email', cleanEmail)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Supabase track error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!requests || requests.length === 0) {
      return { success: false, error: "No request found for this email address. Try using 'demo@example.com' to see how the portal works." };
    }

    const rawRequest = requests[0];
    const { steps, progressPercent, currentStepIndex } = mapStatusToSteps(rawRequest.status, rawRequest.submitted_at);
    const logs = getDeveloperLogs(rawRequest.status, rawRequest.submitted_at, rawRequest.business_name || rawRequest.full_name);

    const request: ProjectRequest = {
      id: rawRequest.id,
      full_name: rawRequest.full_name,
      email: rawRequest.email,
      phone: rawRequest.phone,
      business_name: rawRequest.business_name,
      requirements: rawRequest.requirements,
      service_needed: rawRequest.service_needed,
      status: rawRequest.status,
      submitted_at: rawRequest.submitted_at
    };

    const projectData: TrackedProjectData = {
      request,
      progressPercent,
      currentStepIndex,
      steps,
      logs,
      stagingUrl: ['development', 'coding', 'testing', 'qa', 'live', 'completed'].includes(rawRequest.status.toLowerCase()) 
        ? `https://${(rawRequest.business_name || 'project').toLowerCase().replace(/[^a-z0-9]/g, '')}-staging.primeforge.agency` 
        : undefined,
      mockupUrl: ['mockup', 'design', 'development', 'coding', 'testing', 'qa', 'live', 'completed'].includes(rawRequest.status.toLowerCase())
        ? `https://figma.com/file/placeholder-${rawRequest.id}`
        : undefined
    };

    return { success: true, data: projectData };

  } catch (error) {
    console.error('Full track error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred during tracking.' 
    };
  }
}
