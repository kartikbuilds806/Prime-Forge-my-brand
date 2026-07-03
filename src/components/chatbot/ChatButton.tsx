/**
 * ChatButton Component (Phase 1)
 * Purpose: Render the floating trigger button in the FloatingCTAs stack, matching the visual language, shadow, and hover patterns of the WhatsApp CTA.
 */

import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110 ${
        isOpen
          ? 'bg-surface border border-black/10 dark:border-white/10 text-text-heading hover:bg-white/10'
          : 'bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]'
      }`}
      aria-label={isOpen ? "Close Chat Assistant" : "Open Chat Assistant"}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <Sparkles className="w-6 h-6 text-accent animate-pulse" />
      ) : (
        <MessageSquare className="w-6 h-6" />
      )}
    </button>
  );
}
