'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const initParticles = () => {
      particles.length = 0;
      const isMobile = width < 768;
      const spacing = isMobile ? 65 : 45;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.5 + 1,
            color: 'rgba(59, 130, 246, 0.35)',
          });
        }
      }
    };

    initParticles();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      for (let particle of particles) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          const pushX = Math.cos(angle) * force * 25;
          const pushY = Math.sin(angle) * force * 25;

          particle.x -= (pushX + (particle.x - particle.originX)) * 0.1;
          particle.y -= (pushY + (particle.y - particle.originY)) * 0.1;
        } else {
          particle.x += (particle.originX - particle.x) * 0.08;
          particle.y += (particle.originY - particle.y) * 0.08;
        }

        // Draw particle dot
        const distFromMouse = Math.sqrt(
          (mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2
        );
        const intensity = Math.max(0, 1 - distFromMouse / 200);

        if (isDark) {
          ctx.fillStyle = intensity > 0
            ? `rgba(59, 130, 246, ${0.35 + intensity * 0.65})`
            : 'rgba(255, 255, 255, 0.12)';
        } else {
          ctx.fillStyle = intensity > 0
            ? `rgba(37, 99, 235, ${0.4 + intensity * 0.6})`
            : 'rgba(0, 0, 0, 0.08)';
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size + intensity * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw glowing radial spotlight following cursor
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          350
        );

        if (isDark) {
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
          gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.08)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.10)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
