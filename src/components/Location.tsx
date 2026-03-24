'use client';

import { MapPin, Car, Clock } from 'lucide-react';
import AnimateIn from './AnimateIn';

export default function Location() {
  const mapSrc =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55394.77842697!2d-95.7!3d29.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCypress%2C+TX!5e0!3m2!1sen!2sus!4v1';

  return (
    <section id="location" className="py-20 lg:py-28 bg-alt-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
            Find Us in Cypress
          </h2>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-10 mt-12">
          <AnimateIn direction="left" className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-full min-h-[320px]">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BABYDRAW GOLF Location"
            />
          </AnimateIn>

          <AnimateIn direction="right" className="flex flex-col justify-center gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary-dark">Address</h3>
                <p className="mt-1 text-gray-text">
                  Suite 501, Oakhouse Business Park
                  <br />
                  Cypress, TX
                </p>
                <a
                  href="https://www.google.com/maps/search/Suite+501+Oakhouse+Business+Park+Cypress+TX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-primary font-medium hover:underline"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary-dark">Hours</h3>
                <p className="mt-1 text-gray-text">
                  Open 24 hours, 7 days a week
                  <br />
                  <span className="text-sm">Unmanned, self-service facility</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary-dark">Parking</h3>
                <p className="mt-1 text-gray-text">
                  Free parking available on-site at Oakhouse Business Park.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
