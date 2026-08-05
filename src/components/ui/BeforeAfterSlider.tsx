'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Gauge, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>REAL AGENCY TRANSFORMATION</span>
        </div>
        <h2 className="heading-serif text-3xl md:text-5xl mb-4 text-text-heading">
          Standard Templates vs <span className="text-accent italic">PrimeForge Engine</span>
        </h2>
        <p className="text-text-body text-base md:text-lg max-w-2xl mx-auto">
          Drag the slider to compare generic WordPress templates against custom-coded, ultra-fast PrimeForge digital platforms.
        </p>
      </div>

      {/* Interactive Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER PANEL (Right Side - PrimeForge) */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 md:p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> PRIMEFORGE CUSTOM CODE
            </span>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-zinc-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>PageSpeed: <strong>99/100</strong></span>
            </div>
          </div>

          <div className="space-y-4 my-auto max-w-md ml-auto text-right">
            <div className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              0.4s <span className="text-lg font-normal text-emerald-400">Load Time</span>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Custom Next.js 16 code, optimized images, zero bloat, instant SSR, and automated lead capture.
            </p>
            <div className="grid grid-cols-2 gap-3 text-left pt-2">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <div className="text-xs text-zinc-400">Conversion Rate</div>
                <div className="text-lg font-bold text-emerald-400">5.4% (+157%)</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <div className="text-xs text-zinc-400">Search Rank</div>
                <div className="text-lg font-bold text-blue-400">Top 3 Organic</div>
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE PANEL (Left Side - Generic Template) */}
        <div 
          className="absolute top-0 left-0 bottom-0 overflow-hidden bg-zinc-900 border-r border-white/20 p-6 md:p-10 flex flex-col justify-between transition-all duration-75"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="w-[800px] h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> GENERIC TEMPLATE / WORDPRESS
              </span>
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-zinc-400">
                <Gauge className="w-3.5 h-3.5 text-red-400" />
                <span>PageSpeed: <strong>34/100</strong></span>
              </div>
            </div>

            <div className="space-y-4 my-auto max-w-md text-left">
              <div className="text-4xl md:text-6xl font-bold text-red-400 tracking-tight">
                4.2s <span className="text-lg font-normal text-zinc-400">Slow Load Time</span>
              </div>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Heavy plugins, slow server response, broken mobile layouts, and lost high-ticket clients.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-black/40 border border-red-500/20 p-3 rounded-xl">
                  <div className="text-xs text-zinc-500">Conversion Rate</div>
                  <div className="text-lg font-bold text-red-400">1.8% (Poor)</div>
                </div>
                <div className="bg-black/40 border border-red-500/20 p-3 rounded-xl">
                  <div className="text-xs text-zinc-500">Mobile Layout</div>
                  <div className="text-lg font-bold text-amber-400">Stuttery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDER DRAG BAR */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-white text-zinc-950 font-bold text-xs flex items-center justify-center shadow-lg border-2 border-zinc-950 hover:scale-110 transition-transform">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}
