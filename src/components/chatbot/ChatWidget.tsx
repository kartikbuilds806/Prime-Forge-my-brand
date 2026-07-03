/**
 * ChatWidget Component (Phase 1)
 * Purpose: Top-level coordinator of the PrimeForge AI Chatbot.
 * Controls: Handles message lists, stream readers, input text states, event bindings (ESC key), and maps buttons to the layout stack.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FloatingCTAs } from '../ui/FloatingCTAs';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hey there! We are the PrimeForge team. We build custom-coded, lightning-fast websites and tailored AI automation solutions.\n\nWhat can we help you build today?'
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close chat window on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // Clear error states on toggling
    setError(null);
  };

  const handleSend = async (textOverride?: string) => {
    const content = (textOverride || input).trim();
    if (!content) return;

    // Reset input bar and save user message to view
    setInput('');
    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many messages. Please wait a minute and try again.");
        }
        throw new Error("Generative service is currently busy. Please try again.");
      }

      if (!response.body) {
        throw new Error("No response body received from stream API.");
      }

      // Append assistant placeholder message
      const assistantPlaceholder: Message = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantPlaceholder]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        accumulatedText += chunk;

        // Progressively stream delta content updates to message
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: accumulatedText };
          return next;
        });
      }

      setIsLoading(false);
    } catch (err: any) {
      console.error("AI response stream error:", err);
      setError(err.message || "Connection timed out. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    // Find last user message to retry
    const lastUserMsgIdx = [...messages].reverse().findIndex(m => m.role === 'user');
    if (lastUserMsgIdx !== -1) {
      const actualIdx = messages.length - 1 - lastUserMsgIdx;
      const textToRetry = messages[actualIdx].content;
      // Slice messages to exclude failed bubble and last user message (which will be re-sent)
      setMessages(messages.slice(0, actualIdx));
      handleSend(textToRetry);
    }
  };

  return (
    <>
      <FloatingCTAs>
        <ChatButton isOpen={isOpen} onClick={toggleOpen} />
      </FloatingCTAs>
      {isOpen && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          input={input}
          onInputChange={setInput}
          onSend={() => handleSend()}
          onClose={() => setIsOpen(false)}
          onQuickSelect={(prompt) => handleSend(prompt)}
          onRetry={handleRetry}
        />
      )}
    </>
  );
}
