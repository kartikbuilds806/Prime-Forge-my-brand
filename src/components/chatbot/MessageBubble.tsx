/**
 * MessageBubble Component (Phase 1)
 * Purpose: Render message blocks, styling user bubbles in accent and assistant bubbles in readable card outlines.
 * Custom Parser: Implements zero-dependency inline markdown helper for bullet lists and bold text.
 */

import React from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {/* Bot Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0 self-end mb-1">
          <Bot className="w-4 h-4 text-accent" />
        </div>
      )}

      {/* Bubble Panel */}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
          isUser
            ? 'bg-accent text-white rounded-br-none font-medium'
            : 'bg-white/[0.04] border border-white/10 text-white/90 rounded-bl-none'
        }`}
      >
        {isUser ? (
          <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <ul className="list-inside space-y-0.5">
            {parseMarkdown(message.content)}
          </ul>
        )}
      </div>

      {/* User Icon */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 self-end mb-1">
          <User className="w-4 h-4 text-text-heading/85" />
        </div>
      )}
    </div>
  );
}

/**
 * Custom zero-dependency markdown parser helper
 */
function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    // 1. Bullet list points (e.g. "* item" or "- item")
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const content = line.trim().replace(/^[\*\-]\s+/, '');
      return (
        <li key={lineIdx} className="ml-4 list-disc text-sm mb-1.5 leading-relaxed text-white/90">
          {parseInlineFormatting(content)}
        </li>
      );
    }

    // 2. Ordered lists (e.g. "1. item")
    const orderedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      const content = orderedMatch[2];
      return (
        <li key={lineIdx} className="ml-4 list-decimal text-sm mb-1.5 leading-relaxed text-white/90">
          {parseInlineFormatting(content)}
        </li>
      );
    }

    // 3. Blank spaces
    if (!line.trim()) {
      return <div key={lineIdx} className="h-2" />;
    }

    // 4. Standard Paragraph
    return (
      <p key={lineIdx} className="text-sm mb-1.5 leading-relaxed text-white/90">
        {parseInlineFormatting(line)}
      </p>
    );
  });
}

function parseInlineFormatting(text: string): React.ReactNode {
  // Split on bold text markers: **text**
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  if (parts.length === 1) return text;

  return parts.map((part, idx) => {
    // Odd indexes represent text parsed inside double asterisks
    if (idx % 2 === 1) {
      return (
        <strong key={idx} className="font-bold text-white">
          {part}
        </strong>
      );
    }
    return part;
  });
}
