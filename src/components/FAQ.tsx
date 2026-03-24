'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackFaqExpand } from '@/lib/analytics';
import AnimateIn from './AnimateIn';
import faqData from '@/data/faq.json';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    if (openIndex !== i) {
      trackFaqExpand(faqData[i].question);
    }
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-text">
            Everything you need to know before your first visit.
          </p>
        </AnimateIn>

        <div className="mt-12 space-y-3">
          {faqData.map((item, i) => (
            <AnimateIn key={i} direction="up" delay={i * 0.05}>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-alt-bg transition-colors cursor-pointer"
                >
                  <span className="font-medium text-primary-dark pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-text shrink-0 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-200"
                  style={{
                    maxHeight: openIndex === i ? '200px' : '0',
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-5 text-gray-text leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
