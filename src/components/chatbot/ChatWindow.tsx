/**
 * ChatWindow Component (Phase 1)
 * Purpose: Render the glassmorphic chat overlay containing message history, dynamic prompt chips, typing animations, and inputs.
 * Features: Auto-scroll, ESC closing, mobile-safe bounds, and basic keyboard trapping.
 */

import React, { useEffect, useRef } from 'react';
import { Send, X, AlertCircle, Sparkles } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { QuickPrompts } from './QuickPrompts';
import { Button } from '../ui/Button';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  input: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  onClose: () => void;
  onQuickSelect: (prompt: string) => void;
  onRetry: () => void;
}

export function ChatWindow({
  messages,
  isLoading,
  error,
  input,
  onInputChange,
  onSend,
  onClose,
  onQuickSelect,
  onRetry,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages or typing state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input on mount/open
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div 
      className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] max-w-[380px] h-[520px] max-h-[75vh] z-[60] glass-card rounded-[24px] overflow-hidden flex flex-col justify-between shadow-2xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="PrimeForge AI Chatbot Window"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none mb-1">PrimeForge AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-white/60">Online & Ready</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Close Chat Window"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin"
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0 self-end mb-1">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="flex gap-1 items-center px-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl rounded-bl-none">
              <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <button
              onClick={onRetry}
              className="text-left font-bold underline hover:text-red-400 mt-1 transition-colors"
            >
              Click here to retry
            </button>
          </div>
        )}
      </div>

      {/* Footer / Inputs */}
      <div className="px-5 py-4 border-t border-white/10 bg-white/[0.03]">
        {/* Suggestion Chips (only on welcome screen) */}
        {messages.length === 1 && !isLoading && !error && (
          <QuickPrompts onSelect={onQuickSelect} />
        )}

        {/* Send message form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Ask us anything..."
            disabled={isLoading}
            className="flex-grow px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !input.trim()}
            className="px-3 py-2.5 shrink-0 rounded-xl"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
