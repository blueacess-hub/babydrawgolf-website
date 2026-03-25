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
    <section className="min-h-full flex flex-col bg-alt-bg pt-14 md:pt-0">
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-8 md:py-14 w-full flex-1">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
          {/* Left — Map + Info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase">Visit Us</p>
              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-primary-dark tracking-tight">Find Us in Cypress</h2>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-48 md:h-64 lg:h-80">
              <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="BABYDRAW GOLF Location" />
            </div>
            <div className="flex gap-5 md:gap-8">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-xs md:text-sm">Address</p>
                  <p className="text-gray-text text-xs md:text-sm">Suite 501, Oakhouse Business Park, Cypress, TX</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-xs md:text-sm">Hours</p>
                  <p className="text-gray-text text-xs md:text-sm">24/7 Self-Service</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Car className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-primary-dark text-xs md:text-sm">Parking</p>
                  <p className="text-gray-text text-xs md:text-sm">Free on-site</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — FAQ */}
          <div className="flex flex-col">
            <h3 className="text-base md:text-xl font-bold text-primary-dark mb-3">FAQ</h3>
            <div className="space-y-2 md:space-y-2.5">
              {faqData.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4 text-left hover:bg-alt-bg transition-colors cursor-pointer">
                    <span className="font-medium text-primary-dark text-sm md:text-base pr-2">{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-text shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="overflow-hidden transition-all duration-200" style={{ maxHeight: openFaq === i ? '200px' : '0', opacity: openFaq === i ? 1 : 0 }}>
                    <p className="px-4 md:px-5 pb-3 md:pb-4 text-gray-text text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-primary-dark py-3 md:py-5 px-5 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-5">
            <Logo color="white" height={22} className="md:h-8" />
            <span className="text-white/50 text-xs md:text-sm hidden sm:inline">{siteData.address.full}</span>
            <a href={`mailto:${siteData.email}`} className="text-primary-light text-xs md:text-sm hover:underline">{siteData.email}</a>
          </div>
          <p className="text-white/40 text-xs md:text-sm">&copy; {new Date().getFullYear()} {siteData.name}</p>
        </div>
      </div>
    </section>
  );
}
