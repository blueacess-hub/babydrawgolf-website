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
  '🚀 When do you open?',
  '📅 What are your prices?',
  '⭐ What is Founding 25?',
  '🏌️ Do you have clubs to rent?',
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
          <div className="absolute inset-0 bg-black/40 md:bg-transparent" onClick={() => setOpen(false)} />

          {/* Chat window */}
          <div className="relative w-full md:w-[380px] h-[70svh] md:h-[500px] md:max-h-[70svh] md:mr-6 md:mb-20 flex flex-col bg-carbon-2 md:rounded-card shadow-[var(--shadow-card)] md:border md:border-line overflow-hidden">
            {/* Header */}
            <div className="bg-carbon-3 border-b border-[var(--hairline)] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[rgba(69,240,166,.12)] border border-[rgba(69,240,166,.3)] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-trace" />
                </div>
                <div>
                  <p className="font-data text-ink text-[12px] font-bold tracking-[.18em] uppercase">Caddie</p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 bg-trace rounded-full"
                      style={{ animation: 'liveDot 2s ease-in-out infinite' }}
                    />
                    <p className="text-ink-mute text-[11px] font-normal">Online — replies instantly</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-ink-mute hover:text-ink cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-carbon-1">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div>
                  <div className="bg-carbon-3 border border-[var(--hairline)] rounded-lg rounded-tl-none p-3 max-w-[85%]">
                    <p className="text-sm text-ink font-medium">Hey there! 👋</p>
                    <p className="text-xs text-ink-mute mt-1 font-normal">
                      I&apos;m your BABYDRAW GOLF assistant. Ask me about pricing, booking, equipment, or anything else!
                    </p>
                  </div>
                  {/* Quick replies */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="px-3 py-1.5 rounded-full border border-[rgba(69,240,166,.3)] text-xs text-trace-soft hover:bg-[rgba(69,240,166,.1)] transition-colors cursor-pointer font-normal"
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
                    className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed font-normal ${
                      msg.role === 'user'
                        ? 'bg-[rgba(69,240,166,.14)] border border-[rgba(69,240,166,.25)] text-[#DFFCEB] rounded-br-none'
                        : 'bg-carbon-3 border border-[var(--hairline)] text-ink-body rounded-bl-none'
                    }`}
                  >
                    {msg.content.split('\n').map((line, j) => (
                      <span key={j}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={k} className="text-ink">{part.slice(2, -2)}</strong>
                            : part
                        )}
                        {j < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-carbon-3 border border-[var(--hairline)] rounded-lg rounded-bl-none p-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-ink-mute rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-ink-mute rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-ink-mute rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-[var(--hairline)] px-3 pt-2 pb-[calc(0.5rem_+_env(safe-area-inset-bottom))] bg-carbon-2 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-sm px-3 py-2.5 rounded-btn bg-carbon-1 border border-line text-ink placeholder:text-ink-mute focus:outline-none focus:border-[rgba(69,240,166,.6)] focus:ring-1 focus:ring-[rgba(69,240,166,.3)] font-normal"
                  disabled={loading}
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 bg-trace text-carbon-0 rounded-btn flex items-center justify-center hover:bg-trace-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
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
        className="fixed-bottom-safe fixed right-4 md:right-6 z-[70] w-12 h-12 md:w-14 md:h-14 bg-carbon-2 border border-line text-trace-soft rounded-full shadow-[var(--shadow-card)] hover:border-[rgba(69,240,166,.5)] hover:text-trace hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
        aria-label="Chat with us"
      >
        {open ? (
          <X className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span
              className="absolute top-1 right-1 w-2 h-2 bg-rec rounded-full"
              style={{ animation: 'liveDot 2s ease-in-out infinite' }}
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </>
  );
}
