import React from 'react';

interface QuickPromptsProps {
  onSelect: (prompt: string) => void;
}

export function QuickPrompts({ onSelect }: QuickPromptsProps) {
  const prompts = [
    "What's included in the Starter package?",
    "How does the 48-hour free demo process work?",
    "Why custom Next.js code instead of WordPress?",
    "Which business niches do you build for?"
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(prompt)}
          className="text-xs px-3.5 py-2 rounded-full border border-zinc-700 bg-zinc-900 text-white font-medium hover:bg-black transition-all text-left shadow-sm"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
