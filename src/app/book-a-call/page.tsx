"use client";
 
import React, { useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";
 
export default function BookCallPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", { styles: { branding: { brandColor: "#000000" } }, hideEventTypeDetails: false });
    })();
  }, []);
 
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-16">
        <h1 className="heading-serif text-5xl md:text-6xl mb-6 text-text-heading">Let's build your pipeline.</h1>
        <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto">
          Select a time that works for you, or skip the line and talk to us directly right now.
        </p>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs font-bold tracking-wider text-text-heading/50 uppercase mb-3">Director / Founder</p>
            <h2 className="heading-serif text-3xl mb-4 text-text-heading">Kartik Sharma</h2>
            <div className="bg-surface/50 border-l-4 border-accent p-6 rounded-r-xl italic text-text-body">
              "I personally oversee every core strategy session to ensure your website is engineered to convert."
            </div>
          </div>
 
          <hr className="border-black/10 dark:border-white/10" />
 
          <div>
            <p className="text-xs font-bold tracking-wider text-text-heading/50 uppercase mb-4">Instant Access</p>
            
            <div className="space-y-5">
              <div>
                <p className="text-sm text-text-body mb-2">Direct Phone</p>
                <a href="tel:+918533925291" className="inline-flex items-center gap-3 text-lg text-text-heading hover:text-accent transition-colors font-medium">
                  <Phone className="w-5 h-5" />
                  +91 8533925291
                </a>
              </div>
              
              <div>
                <p className="text-sm text-text-body mb-2">Fastest Reply</p>
                <a href="https://wa.me/918533925291" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg text-green-500 hover:text-green-400 transition-colors font-medium">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
 
        {/* Right Column - Booking Flow */}
        <div className="lg:col-span-7 bg-surface border border-black/10 dark:border-white/10 rounded-2xl p-4 md:p-6 shadow-xl w-full">
          <div className="w-full h-[520px] overflow-hidden rounded-xl">
            <Cal
              calLink="prime-forge-lhgrch/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
