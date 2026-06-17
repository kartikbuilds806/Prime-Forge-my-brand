"use client";

import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function BookCallPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    "Custom Website Design",
    "Website Redesign",
    "High-Converting Landing Page",
    "SEO / AEO / GEO Package",
    "AI Chatbot or Voice Agent",
    "Free Strategy Call"
  ];

  const dates = ["Mon 19", "Tue 20", "Wed 21", "Thu 22", "Fri 23"];
  const times = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-16">
        <h1 className="heading-serif text-5xl md:text-6xl mb-6 text-white">Let's build your pipeline.</h1>
        <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto">
          Select a time that works for you, or skip the line and talk to us directly right now.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-4 space-y-12">
          <div>
            <p className="text-xs font-bold tracking-wider text-white/50 uppercase mb-4">Director / Founder</p>
            <h2 className="heading-serif text-3xl mb-4 text-white">Kartik Sharma</h2>
            <div className="bg-surface/50 border-l-4 border-accent p-6 rounded-r-xl italic text-text-body">
              "I personally oversee every core strategy session to ensure your website is engineered to convert."
            </div>
          </div>

          <hr className="border-white/10" />

          <div>
            <p className="text-xs font-bold tracking-wider text-white/50 uppercase mb-6">Instant Access</p>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-text-body mb-2">Direct Phone</p>
                <a href="tel:+918533925291" className="inline-flex items-center gap-3 text-xl text-white hover:text-accent transition-colors font-medium">
                  <Phone className="w-5 h-5" />
                  +91 8533925291
                </a>
              </div>
              
              <div>
                <p className="text-sm text-text-body mb-2">Fastest Reply</p>
                <a href="https://wa.me/918533925291" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-xl text-green-500 hover:text-green-400 transition-colors font-medium">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Flow */}
        <div className="lg:col-span-8 bg-surface border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl text-white font-medium mb-2">What do you need help with?</h3>
              <p className="text-text-body mb-8">Select a service to discuss during our call.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {services.map((service, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedService(service)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedService === service 
                        ? 'border-accent bg-accent/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                        : 'border-white/10 text-text-body hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{service}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedService === service ? 'border-accent bg-accent text-white' : 'border-white/30'
                      }`}>
                        {selectedService === service && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setStep(2)}
                disabled={!selectedService}
                className={`w-full py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                  selectedService 
                    ? 'bg-accent text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' 
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                Book a Meeting <span className="text-xl leading-none">→</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <button onClick={() => setStep(1)} className="text-sm text-accent hover:text-white transition-colors mb-6 flex items-center gap-1">
                ← Back
              </button>
              
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl text-white font-medium mb-2">Select an available slot</h3>
                  <p className="text-text-body flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Timezone: India Standard Time (IST)
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium text-white mb-4">Next availability</p>
                <div className="flex overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide">
                  {dates.map((date, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`shrink-0 snap-start px-6 py-4 rounded-xl border transition-all text-center min-w-[100px] ${
                        selectedDate === date
                          ? 'border-accent bg-accent/10 text-white'
                          : 'border-white/10 text-text-body hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="text-xs uppercase mb-1">{date.split(' ')[0]}</div>
                      <div className="text-xl font-bold text-white">{date.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="mb-10 animate-fade-in">
                  <p className="text-sm font-medium text-white mb-4">Available Times</p>
                  <div className="grid grid-cols-3 gap-3">
                    {times.map((time, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'border-accent bg-accent text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                            : 'border-white/10 text-text-body hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                  selectedDate && selectedTime 
                    ? 'bg-accent text-white hover:bg-blue-600' 
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                Confirm Time <span className="text-xl leading-none">→</span>
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <button onClick={() => setStep(2)} className="text-sm text-accent hover:text-white transition-colors mb-6 flex items-center gap-1">
                ← Back
              </button>
              
              <h3 className="text-2xl text-white font-medium mb-2">Almost done!</h3>
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-8 flex items-start gap-4">
                <Calendar className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">You've selected</p>
                  <p className="text-accent">{selectedDate} at {selectedTime}</p>
                  <p className="text-sm text-text-body mt-1">Topic: {selectedService}</p>
                </div>
              </div>

              <form onSubmit={(e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const phone = formData.get('phone');
                const business = formData.get('business');
                const message = `Hi Kartik, I want to book a meeting for ${selectedService}.\n\nName: ${name}\nPhone: ${phone}\nBusiness: ${business || 'N/A'}\nPreferred Time: ${selectedDate} at ${selectedTime}`;
                const whatsappUrl = `https://wa.me/918533925291?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                setStep(4); 
              }} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm text-white mb-2">Your Name *</label>
                  <input required name="name" type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">Phone / WhatsApp Number *</label>
                  <input required name="phone" type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">Business Website or Name</label>
                  <input name="business" type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="https://..." />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 mt-4 rounded-full font-medium transition-all bg-accent text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  Book Meeting
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-fade-in flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-3xl text-white font-medium mb-4">Meeting Confirmed!</h3>
              <p className="text-text-body mb-8 max-w-md mx-auto">
                Your meeting is set for <strong>{selectedDate} at {selectedTime}</strong>. We've sent a calendar invitation to your email. Kartik will call you at the scheduled time.
              </p>
              <Button href="/" variant="secondary">Back to Home</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
