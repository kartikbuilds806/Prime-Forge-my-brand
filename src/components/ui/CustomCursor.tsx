'use client';

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.onclick !== null ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer');

      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Precision Cursor Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-accent transition-transform duration-75 ease-out shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        style={{
          width: isPointer ? '12px' : '8px',
          height: isPointer ? '12px' : '8px',
          transform: `translate3d(${position.x - (isPointer ? 6 : 4)}px, ${position.y - (isPointer ? 6 : 4)}px, 0)`,
        }}
      />

      {/* Outer Radial Glow Ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-blue-500/40 bg-blue-500/5 transition-all duration-200 ease-out backdrop-blur-[1px]"
        style={{
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          transform: `translate3d(${position.x - (isPointer ? 24 : 16)}px, ${position.y - (isPointer ? 24 : 16)}px, 0)`,
        }}
      />
    </>
  );
}
