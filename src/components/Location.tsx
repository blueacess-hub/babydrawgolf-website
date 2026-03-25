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
    <section className="h-full flex flex-col bg-alt-bg pt-14 md:pt-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-10 w-full flex-1 overflow-y-auto">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left — Map + Info */}
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-primary font-semibold text-xs tracking-widest uppercase">Visit Us</p>
              <h2 className="mt-1 text-xl md:text-3xl font-bold text-primary-dark tracking-tight">Find Us in Cypress</h2>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-40 md:h-auto md:flex-1 md:min-h-[200px]">
              <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="BABYDRAW GOLF Location" />
            </div>
            <div className="flex gap-4 md:gap-6 text-sm">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-[10px] md:text-xs">Address</p>
                  <p className="text-gray-text text-[10px] md:text-xs">Suite 501, Oakhouse Business Park, Cypress, TX</p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-[10px] md:text-xs">Hours</p>
                  <p className="text-gray-text text-[10px] md:text-xs">24/7 Self-Service</p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <Car className="w-3.5 h-3.5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-[10px] md:text-xs">Parking</p>
                  <p className="text-gray-text text-[10px] md:text-xs">Free on-site</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — FAQ */}
          <div className="flex flex-col">
            <h3 className="text-sm md:text-lg font-bold text-primary-dark mb-2">FAQ</h3>
            <div className="space-y-1 md:space-y-1.5 flex-1 overflow-y-auto">
              {faqData.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-3 md:px-4 py-2 md:py-3 text-left hover:bg-alt-bg transition-colors cursor-pointer">
                    <span className="font-medium text-primary-dark text-xs md:text-sm pr-2">{item.question}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-text shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="overflow-hidden transition-all duration-200" style={{ maxHeight: openFaq === i ? '150px' : '0', opacity: openFaq === i ? 1 : 0 }}>
                    <p className="px-3 md:px-4 pb-2 md:pb-3 text-gray-text text-xs leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-primary-dark py-2 md:py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4">
            <Logo color="white" height={20} className="md:h-7" />
            <span className="text-white/50 text-[9px] md:text-xs hidden sm:inline">{siteData.address.full}</span>
            <a href={`mailto:${siteData.email}`} className="text-primary-light text-[9px] md:text-xs hover:underline">{siteData.email}</a>
          </div>
          <p className="text-white/40 text-[9px] md:text-xs">&copy; {new Date().getFullYear()} {siteData.name}</p>
        </div>
      </div>
    </section>
  );
}
