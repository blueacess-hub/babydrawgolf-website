'use client';

import { MapPin, Clock, Car, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import faqData from '@/data/faq.json';
import siteData from '@/data/site.json';
import Logo from './Logo';

export default function Location() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const mapSrc =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55394.77842697!2d-95.7!3d29.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCypress%2C+TX!5e0!3m2!1sen!2sus!4v1';

  return (
    <section className="h-full flex flex-col bg-alt-bg overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left — Map + Info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-primary font-semibold text-sm tracking-widest uppercase">Visit Us</p>
              <h2 className="mt-1 text-3xl font-bold text-primary-dark tracking-tight">Find Us in Cypress</h2>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg flex-1 min-h-[200px]">
              <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="BABYDRAW GOLF Location" />
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-xs">Address</p>
                  <p className="text-gray-text text-xs">Suite 501, Oakhouse Business Park, Cypress, TX</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-xs">Hours</p>
                  <p className="text-gray-text text-xs">24/7 Self-Service</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Car className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-xs">Parking</p>
                  <p className="text-gray-text text-xs">Free on-site</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — FAQ */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-primary-dark mb-3">FAQ</h3>
            <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
              {faqData.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-alt-bg transition-colors cursor-pointer">
                    <span className="font-medium text-primary-dark text-sm pr-3">{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-text shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="overflow-hidden transition-all duration-200" style={{ maxHeight: openFaq === i ? '150px' : '0', opacity: openFaq === i ? 1 : 0 }}>
                    <p className="px-4 pb-3 text-gray-text text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-primary-dark py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Logo color="white" height={28} />
            <span className="text-white/50 text-xs">{siteData.address.full}</span>
            <a href={`mailto:${siteData.email}`} className="text-primary-light text-xs hover:underline">{siteData.email}</a>
          </div>
          <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
