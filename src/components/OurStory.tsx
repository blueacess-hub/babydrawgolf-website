'use client';

import { Heart, Trophy, Users, Clock } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Born from Passion', desc: 'We are golfers first. This bay exists because we wanted one in our neighborhood.' },
  { icon: Users, title: 'Bridgeland Community', desc: 'Built for our neighbors — raising the game from Bridgeland to Cypress.' },
  { icon: Trophy, title: 'Compete & Grow', desc: 'Monthly tournaments, leagues, and Bridgeland-wide challenges.' },
  { icon: Clock, title: '24/7 Your Schedule', desc: 'No tee times, no waiting. Practice at midnight or 6am.' },
];

export default function OurStory() {
  return (
    <section className="h-full flex flex-col justify-center bg-white pt-14 md:pt-0">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 lg:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          {/* Story */}
          <div>
            <p className="text-primary font-semibold text-xs md:text-sm tracking-widest uppercase">Our Story</p>
            <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight leading-tight">
              Built in Bridgeland,<br />for Bridgeland.
            </h2>
            <p className="mt-3 md:mt-6 text-sm md:text-base text-gray-text leading-relaxed">
              We live in Bridgeland. We love golf. And we were frustrated — the nearest quality
              simulator was a 30-minute drive, always crowded, always on someone else&apos;s schedule.
              So we built BABYDRAW GOLF right here in our own community.
            </p>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-text leading-relaxed">
              We want to raise the level of golf across Bridgeland and Cypress — hosting monthly
              tournaments, organizing neighborhood leagues, and giving every golfer here access to
              the same Trackman iO technology the PGA Tour pros use.
            </p>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-primary-dark font-medium">
              Whether you are picking up a club for the first time or grinding to break 80,
              this is your home course.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-alt-bg rounded-lg md:rounded-xl p-3 md:p-5">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <v.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <h3 className="mt-2 font-bold text-primary-dark text-xs md:text-sm">{v.title}</h3>
                <p className="mt-0.5 text-[10px] md:text-xs text-gray-text leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
