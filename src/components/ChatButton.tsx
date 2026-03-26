'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function genSessionId() {
  return 'cs_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

const quickReplies = [
  '📅 What are your prices?',
  '🏌️ Do you have clubs to rent?',
  '📍 Where are you located?',
  '🎉 Can I book for a group?',
];

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(genSessionId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          sessionId,
          history: [...messages, userMsg].slice(-10),
        }),
      });

      const data = await resp.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection issue. Please email info@babydrawgolf.net for help!',
      }]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, sessionId]);

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 md:bg-transparent" onClick={() => setOpen(false)} />

          {/* Chat window */}
          <div className="relative w-full md:w-[380px] h-[70vh] md:h-[500px] md:max-h-[70vh] md:mr-6 md:mb-20 flex flex-col bg-white md:rounded-2xl shadow-2xl md:border md:border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-primary-dark px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">BABYDRAW GOLF</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <p className="text-white/60 text-[11px]">Online — replies instantly</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div>
                  <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%]">
                    <p className="text-sm text-primary-dark font-medium">Hey there! 👋</p>
                    <p className="text-xs text-gray-text mt-1">
                      I&apos;m your BABYDRAW GOLF assistant. Ask me about pricing, booking, equipment, or anything else!
                    </p>
                  </div>
                  {/* Quick replies */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="px-3 py-1.5 rounded-full border border-primary/30 text-xs text-primary-dark hover:bg-primary-light/30 transition-colors cursor-pointer"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white text-primary-dark rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 px-3 py-2 bg-white shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-sm px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  disabled={loading}
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating chat button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-3 right-4 md:bottom-6 md:right-6 z-[70] w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full shadow-xl hover:bg-accent hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
        aria-label="Chat with us"
      >
        {open ? (
          <X className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>
    </>
  );
}
