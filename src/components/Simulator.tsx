'use client';

import { Globe, BarChart3, Target, Users, Video } from 'lucide-react';

const features = [
  { icon: Globe, title: '200+ Virtual Courses', description: 'Play Pebble Beach, St Andrews, and more.' },
  { icon: BarChart3, title: 'Full Swing Analytics', description: 'Ball speed, launch angle, spin rate, club path.' },
  { icon: Video, title: 'Slow-Mo Swing Replay', description: 'High-speed camera captures your swing for frame-by-frame analysis.' },
  { icon: Target, title: 'Practice Modes', description: 'Driving range, closest to pin, skills challenges.' },
  { icon: Users, title: 'Multiplayer Ready', description: 'Compete with friends in head-to-head rounds.' },
];

export default function Simulator() {
  return (
    <section className="min-h-full flex items-center bg-alt-bg pt-14 md:pt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-64 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1763117700007-a3133c847946?w=1200&q=80"
              alt="Golf simulator with Trackman technology"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Right — Info */}
          <div>
            <p className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase">Technology</p>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-primary-dark tracking-tight">
              Powered by Trackman iO
            </h2>
            <p className="mt-5 text-base md:text-lg text-gray-text leading-relaxed">
              The world&apos;s leading golf simulator technology, trusted by PGA Tour professionals.
              Dual-radar tracking captures every aspect of your swing with tour-level accuracy.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
              {features.map((f) => (
                <div key={f.title} className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <f.icon className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                    <h3 className="font-bold text-primary-dark text-sm md:text-base">{f.title}</h3>
                  </div>
                  <p className="mt-1 text-xs md:text-sm text-gray-text">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
