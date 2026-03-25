'use client';

import { Globe, BarChart3, Target, Users } from 'lucide-react';

const features = [
  { icon: Globe, title: '200+ Virtual Courses', description: 'Play Pebble Beach, St Andrews, and more.' },
  { icon: BarChart3, title: 'Full Swing Analytics', description: 'Ball speed, launch angle, spin rate, club path.' },
  { icon: Target, title: 'Practice Modes', description: 'Driving range, closest to pin, skills challenges.' },
  { icon: Users, title: 'Multiplayer Ready', description: 'Compete with friends in head-to-head rounds.' },
];

export default function Simulator() {
  return (
    <section className="h-full flex items-center bg-alt-bg pt-14 md:pt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-56 lg:h-80">
            <img
              src="https://images.unsplash.com/photo-1763117700007-a3133c847946?w=1200&q=80"
              alt="Golf simulator with Trackman technology"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — Info */}
          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase">Technology</p>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight">
              Powered by Trackman iO
            </h2>
            <p className="mt-4 text-gray-text leading-relaxed">
              The world&apos;s leading golf simulator technology, trusted by PGA Tour professionals.
              Dual-radar tracking captures every aspect of your swing with tour-level accuracy.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {features.map((f) => (
                <div key={f.title} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <f.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-primary-dark text-sm">{f.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-gray-text">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
