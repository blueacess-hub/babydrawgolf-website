'use client';

import { Globe, BarChart3, Target, Users } from 'lucide-react';
import AnimateIn from './AnimateIn';

const features = [
  {
    icon: Globe,
    title: '200+ Virtual Courses',
    description: 'Play Pebble Beach, St Andrews, and more.',
  },
  {
    icon: BarChart3,
    title: 'Full Swing Analytics',
    description: 'Ball speed, launch angle, spin rate, club path — every detail.',
  },
  {
    icon: Target,
    title: 'Practice Modes',
    description: 'Driving range, closest to pin, skills challenges.',
  },
  {
    icon: Users,
    title: 'Multiplayer Ready',
    description: 'Compete with friends in head-to-head rounds.',
  },
];

export default function Simulator() {
  return (
    <section id="simulator" className="py-20 lg:py-28 bg-alt-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
            Powered by Trackman iO
          </h2>
          <p className="mt-6 text-lg text-gray-text leading-relaxed">
            Trackman iO is the world&apos;s leading golf simulator technology,
            trusted by PGA Tour professionals. Its dual-radar system tracks
            every aspect of your swing with tour-level accuracy.
          </p>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.1}>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1763117700007-a3133c847946?w=1200&q=80"
              alt="Golf simulator with Trackman technology"
              className="w-full h-64 sm:h-80 lg:h-[28rem] object-cover"
            />
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} direction="up" delay={i * 0.1}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-primary-dark">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-text">
                  {feature.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
