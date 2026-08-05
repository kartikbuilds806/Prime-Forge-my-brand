'use client';

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
      className="fixed bottom-16 right-3 left-3 md:left-auto md:right-6 md:bottom-24 w-auto md:w-[380px] h-[78vh] md:h-[520px] max-h-[600px] z-[60] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[24px] overflow-hidden flex flex-col justify-between shadow-2xl animate-fade-in text-zinc-900 dark:text-white"
      role="dialog"
      aria-modal="true"
      aria-label="PrimeForge AI Chatbot Window"
    >
      {/* Dark Header for high contrast */}
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none mb-1">PrimeForge AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-zinc-300">Online & Ready</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
          aria-label="Close Chat Window"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto px-5 py-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/60"
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0 self-end mb-1">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex gap-1 items-center px-4 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-2xl rounded-bl-none">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <button
              onClick={onRetry}
              className="text-left font-bold underline hover:text-red-500 mt-1 transition-colors"
            >
              Click here to retry
            </button>
          </div>
        )}
      </div>

      {/* Footer / Inputs */}
      <div className="px-5 py-4 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900">
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
            className="flex-grow px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-black transition-all disabled:opacity-50"
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
