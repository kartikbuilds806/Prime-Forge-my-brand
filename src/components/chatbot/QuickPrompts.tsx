/**
 * QuickPrompts suggestion chips (Phase 1)
 * Purpose: Render suggestion chips for common FAQs to guide client conversation.
 */

import React from 'react';

interface QuickPromptsProps {
  onSelect: (prompt: string) => void;
}

export function QuickPrompts({ onSelect }: QuickPromptsProps) {
  const prompts = [
    "What's included in the Popular package?",
    "How does the free demo process work?",
    "Why custom code instead of WordPress?",
    "Which business niches do you build for?"
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(prompt)}
          className="text-xs px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium text-left"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
