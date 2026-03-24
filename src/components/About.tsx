'use client';

import { Clock, Crosshair, Zap } from 'lucide-react';
import AnimateIn from './AnimateIn';

const features = [
  {
    icon: Clock,
    title: '24/7 Access',
    description: 'Play at midnight or 6am. We never close.',
  },
  {
    icon: Crosshair,
    title: 'Tour-Level Tech',
    description: 'Trackman iO. The same technology used on the PGA Tour.',
  },
  {
    icon: Zap,
    title: 'Zero Hassle',
    description: 'Book online. Get your PIN. Walk in and play.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimateIn direction="left" className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1704863619926-ff5427e043aa?w=800&q=80"
                alt="Indoor golf simulator bay"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
              24/7 Open
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
              Golf On Your Schedule
            </h2>
            <p className="mt-6 text-lg text-gray-text leading-relaxed">
              BABYDRAW GOLF is your private indoor golf bay — no tee times, no
              waiting, no crowded driving ranges. Just you, a world-class
              Trackman iO simulator, and all the time you need.
            </p>
            <p className="mt-4 text-lg text-gray-text leading-relaxed">
              Our fully automated, unmanned facility in Cypress, TX gives you
              24/7 access to tour-level golf technology. Book online, walk in
              with your PIN, and start playing. It&apos;s that simple.
            </p>
          </AnimateIn>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} direction="up" delay={i * 0.15}>
              <div className="bg-alt-bg rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto bg-primary-light rounded-full flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary-dark">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-text">{feature.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
