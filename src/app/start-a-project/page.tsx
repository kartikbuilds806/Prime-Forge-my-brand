"use client";

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { submitProjectAction } from '@/app/actions/submitProject';
import { FadeUp, ScaleIn } from '@/components/animations/AnimateOnScroll';

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    requirements: '',
    serviceNeeded: 'Custom Website Design',
    digitalSignature: '',
    agreedToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.digitalSignature || !formData.agreedToTerms) {
      setError("You must agree to the terms and provide a digital signature.");
      return;
    }

    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    // Add "on" for the checkbox since boolean to string is "true"/"false" but server action checks "on"
    data.set('agreedToTerms', formData.agreedToTerms ? "on" : "off");

    try {
      const result = await submitProjectAction(data);
      if (result.success) {
        setStep(3);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 md:py-24 max-w-4xl mx-auto">
      {step !== 3 && (
        <FadeUp>
          <div className="text-center mb-16">
            <h1 className="heading-serif text-5xl md:text-6xl mb-6 text-text-heading">
              Let's Build Something <span className="text-accent italic">Extraordinary</span>
            </h1>
            <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto">
              Fill out the form below to initiate your project. We'll review your requirements and get back to you within 24 hours.
            </p>
          </div>
        </FadeUp>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-8 animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <ScaleIn delay={0.2}>
        <div className="bg-surface border border-black/10 dark:border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

          {step === 1 && (
          <form onSubmit={handleContinue} className="animate-fade-in relative z-10">
            <h3 className="text-2xl text-text-heading font-medium mb-8">Start Your Project</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-text-heading mb-2">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-text-heading focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-text-heading mb-2">Email Address *</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-text-heading focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-text-heading mb-2">Phone Number / WhatsApp *</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-text-heading focus:outline-none focus:border-accent transition-colors" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm text-text-heading mb-2">Business Name</label>
                  <input name="businessName" value={formData.businessName} onChange={handleInputChange} type="text" className="w-full bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-text-heading focus:outline-none focus:border-accent transition-colors" placeholder="Your Agency / Shop" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-heading mb-2">Service Needed *</label>
                <select name="serviceNeeded" value={formData.serviceNeeded} onChange={handleInputChange} className="w-full bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-text-heading focus:outline-none focus:border-accent transition-colors appearance-none">
                  <option value="Custom Website Design">Custom Website</option>
                  <option value="High-Converting Landing Page">Landing Page</option>
                  <option value="SEO / AEO / GEO Package">SEO Package</option>
                  <option value="AI Chatbot or Voice Agent">AI Chatbot</option>
                  <option value="Full Package (Web + SEO + AI)">Full Package</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text-heading mb-2">Requirements</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} rows={4} className="w-full bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-text-heading focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Briefly describe what you need..."></textarea>
              </div>
            </div>

            <button type="submit" className="w-full mt-10 py-4 rounded-full font-medium transition-all bg-accent text-text-heading hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2">
              Continue <span className="text-xl leading-none">→</span>
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="animate-fade-in relative z-10">
            <h3 className="text-2xl text-text-heading font-medium mb-8">Terms & Conditions</h3>
            
            <div className="bg-black/30 border border-black/5 dark:border-white/5 rounded-xl p-6 mb-8 max-h-[300px] overflow-y-auto text-text-body text-sm leading-relaxed">
              <p>I hereby request a digital project. I agree to the 5-step process outlined by PrimeForge. The mockup phase is free. Further continuation after mockup approval implies commitment to payment. I understand that PrimeForge will contact me within 24 hours to confirm project details.</p>
            </div>

            <div className="space-y-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input required name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleInputChange} type="checkbox" className="peer w-5 h-5 appearance-none border border-white/20 rounded bg-black/50 checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
                  <CheckCircle2 className="w-4 h-4 text-text-heading absolute left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <span className="text-text-heading group-hover:text-accent transition-colors">I agree to the Terms & Conditions</span>
              </label>

              <div>
                <label className="block text-sm text-text-heading mb-2">Digital Signature (Type your full name) *</label>
                <input required name="digitalSignature" value={formData.digitalSignature} onChange={handleInputChange} type="text" className="w-full bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-text-heading focus:outline-none focus:border-accent transition-colors font-serif italic" placeholder="Your Name" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
              <button type="button" onClick={() => setStep(1)} disabled={loading} className="w-full sm:w-auto px-8 py-4 rounded-full font-medium transition-all bg-transparent border border-white/20 text-text-heading hover:bg-black/5 dark:bg-white/5">
                Back
              </button>
              <button type="submit" disabled={loading} className="w-full sm:flex-1 py-4 rounded-full font-medium transition-all bg-accent text-text-heading hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? "Submitting..." : "Sign & Submit Request"}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-12 animate-fade-in flex flex-col items-center relative z-10">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="heading-serif text-3xl md:text-4xl text-text-heading mb-4">Request Submitted Successfully!</h3>
            <p className="text-text-body mb-10 max-w-lg mx-auto text-lg">
              We've sent a confirmation email to <strong className="text-text-heading">{formData.email}</strong>. Kartik will personally reach out within 24 hours.
            </p>
            <Button href="/" variant="primary">Back to Home</Button>
            </div>
          )}
        </div>
      </ScaleIn>
    </div>
  );
}
