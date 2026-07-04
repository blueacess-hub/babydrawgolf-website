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

/* Render a line of assistant/user text with **bold**, [label](url) and bare
   URLs (Kimi replies contain both link styles — they must be tappable). */
function renderRich(line: string, keyPrefix: string) {
  const tokens = line.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)\]]+|\*\*[^*]+\*\*)/g);
  return tokens.map((part, k) => {
    if (!part) return null;
    const md = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (md) {
      return (
        <a key={`${keyPrefix}-${k}`} href={md[2]} target="_blank" rel="noopener noreferrer"
          className="text-trace-soft underline underline-offset-2 hover:text-trace break-all">
          {md[1]}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={`${keyPrefix}-${k}`} href={part} target="_blank" rel="noopener noreferrer"
          className="text-trace-soft underline underline-offset-2 hover:text-trace break-all">
          {part.replace(/^https?:\/\//, '')}
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${k}`} className="text-ink">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function MessageBody({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <>
      {lines.map((line, j) => (
        <span key={j}>
          {renderRich(line, `l${j}`)}
          {j < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

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

  // Focus input when opened, and re-focus once a reply lands
  useEffect(() => {
    if (open && !loading) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open, loading]);

  // Esc closes the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
          {/* Backdrop — tap outside to close */}
          <div
            className="absolute inset-0 bg-black/50 md:bg-black/10"
            style={{ animation: 'fadeIn .25s ease-out both' }}
            onClick={() => setOpen(false)}
          />

          {/* Chat window — mobile: bottom sheet on dvh (tracks the keyboard);
              desktop: floating card above the FAB */}
          <div
            className="chat-sheet-h relative w-full flex flex-col bg-carbon-2 overflow-hidden rounded-t-2xl border-t border-x border-[var(--hairline)] shadow-[var(--shadow-card)]
              max-h-[720px]
              md:w-[420px] md:h-[min(620px,calc(100dvh-140px))] md:max-h-none md:mr-6 md:mb-[104px] md:rounded-card md:border md:border-line"
            style={{ animation: 'chatPanelIn .32s var(--ease-hud) both' }}
            role="dialog"
            aria-label="Chat with Caddie"
          >
            {/* Mobile grab handle */}
            <div className="md:hidden pt-2 pb-0 flex justify-center shrink-0" aria-hidden="true">
              <span className="w-9 h-1 rounded-full bg-[rgba(213,255,229,.2)]" />
            </div>

            {/* Header */}
            <div className="bg-carbon-3 md:border-t-0 border-b border-[var(--hairline)] px-4 py-3 flex items-center justify-between shrink-0">
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
              <button
                onClick={() => setOpen(false)}
                className="w-11 h-11 -mr-2 flex items-center justify-center text-ink-mute hover:text-ink cursor-pointer rounded-full hover:bg-[rgba(213,255,229,.06)] transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 bg-carbon-1">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div>
                  <div className="bg-carbon-3 border border-[var(--hairline)] rounded-xl rounded-tl-md p-3.5 max-w-[85%]">
                    <p className="text-[15px] text-ink font-medium">Hey there! 👋</p>
                    <p className="text-[13px] text-ink-mute mt-1 font-normal leading-relaxed">
                      I&apos;m Caddie, your BABYDRAW GOLF assistant. Ask me about pricing, booking, memberships — anything!
                    </p>
                  </div>
                  {/* Quick replies */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="px-3.5 py-2 rounded-full border border-[rgba(69,240,166,.3)] text-[13px] text-trace-soft hover:bg-[rgba(69,240,166,.1)] active:bg-[rgba(69,240,166,.16)] transition-colors cursor-pointer font-normal"
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
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-[15px] md:text-sm leading-relaxed font-normal break-words ${
                      msg.role === 'user'
                        ? 'bg-[rgba(69,240,166,.14)] border border-[rgba(69,240,166,.25)] text-[#DFFCEB] rounded-br-md'
                        : 'bg-carbon-3 border border-[var(--hairline)] text-ink-body rounded-bl-md'
                    }`}
                  >
                    <MessageBody content={msg.content} />
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-carbon-3 border border-[var(--hairline)] rounded-xl rounded-bl-md px-3.5 py-3">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-ink-mute rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-ink-mute rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-ink-mute rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area — 16px font so iOS doesn't auto-zoom on focus */}
            <div className="border-t border-[var(--hairline)] px-3 pt-2.5 pb-[calc(0.625rem_+_env(safe-area-inset-bottom))] md:pb-2.5 bg-carbon-2 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 min-w-0 text-base md:text-sm px-3.5 py-2.5 rounded-btn bg-carbon-1 border border-line text-ink placeholder:text-ink-mute focus:outline-none focus:border-[rgba(69,240,166,.6)] focus:ring-1 focus:ring-[rgba(69,240,166,.3)] font-normal"
                  disabled={loading}
                  maxLength={500}
                  enterKeyHint="send"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-11 h-11 bg-trace text-carbon-0 rounded-btn flex items-center justify-center hover:bg-trace-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  aria-label="Send message"
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
        className={`fixed-bottom-safe fixed right-4 md:right-6 z-[70] w-13 h-13 md:w-14 md:h-14 bg-carbon-2 border border-line text-trace-soft rounded-full shadow-[var(--shadow-card)] hover:border-[rgba(69,240,166,.5)] hover:text-trace hover:scale-105 transition-all items-center justify-center cursor-pointer ${open ? 'hidden md:flex' : 'flex'}`}
        aria-label={open ? 'Close chat' : 'Chat with us'}
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
