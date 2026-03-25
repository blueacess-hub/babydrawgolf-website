'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const TELEGRAM_BOT_URL = 'https://t.me/babydrawgolf_ops_bot';

const quickReplies = [
  { label: '📅 Booking & Pricing', msg: 'Hi! I want to know about booking and pricing.' },
  { label: '🏌️ Equipment & Clubs', msg: 'What equipment do you have? Can I rent clubs?' },
  { label: '📍 Location & Hours', msg: 'Where are you located and what are your hours?' },
  { label: '🎉 Events & Parties', msg: 'Can I book for a group event or party?' },
];

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  const openTelegram = (msg?: string) => {
    const url = msg
      ? `${TELEGRAM_BOT_URL}?start=${encodeURIComponent(msg)}`
      : TELEGRAM_BOT_URL;
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
    <>
      {/* Full overlay chat panel */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 md:p-6">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />

          {/* Chat card */}
          <div className="relative w-full max-w-[340px] mb-14 md:mb-16 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-primary-dark px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">BABYDRAW GOLF</p>
                  <p className="text-white/60 text-[10px]">Usually replies instantly</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="bg-alt-bg rounded-lg p-3 mb-3">
                <p className="text-sm text-primary-dark font-medium">Hey there! 👋</p>
                <p className="text-xs text-gray-text mt-1">
                  Got questions about booking, pricing, or anything else?
                  Our AI assistant is ready to help 24/7.
                </p>
              </div>

              <p className="text-[10px] text-gray-text uppercase tracking-wider mb-2">Quick Questions</p>
              <div className="space-y-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => openTelegram(qr.msg)}
                    className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-light/20 transition-colors text-xs text-primary-dark cursor-pointer"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => openTelegram()}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm py-2.5 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Open Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
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
