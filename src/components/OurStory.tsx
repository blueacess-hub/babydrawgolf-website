'use client';

import { Heart, Trophy, Users, Clock } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Born from Passion', desc: 'We live and breathe golf. This bay exists because we wanted one ourselves.' },
  { icon: Users, title: 'Community First', desc: 'Raising the game for every golfer in Cypress — beginners to scratch players.' },
  { icon: Trophy, title: 'Compete & Grow', desc: 'Monthly tournaments, leagues, and skill challenges to push each other.' },
  { icon: Clock, title: '24/7 Your Schedule', desc: 'No tee times, no waiting. Practice at midnight or 6am — we never close.' },
];

export default function OurStory() {
  return (
    <section className="h-full flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Story */}
          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase">Our Story</p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-primary-dark tracking-tight leading-tight">
              Built by Golfers,<br />for Golfers.
            </h2>
            <p className="mt-6 text-gray-text leading-relaxed">
              BABYDRAW GOLF started with a simple frustration: there was nowhere in Cypress to practice with tour-level
              technology without driving 30 minutes or waiting for a crowded bay. So we built our own.
            </p>
            <p className="mt-4 text-gray-text leading-relaxed">
              But this is bigger than one bay. We want to raise the level of golf in Cypress. That means
              building a community — hosting monthly tournaments, running skill-building leagues, and giving
              every golfer in the area access to the same Trackman iO technology the pros use.
            </p>
            <p className="mt-4 text-primary-dark font-medium">
              Whether you are picking up a club for the first time or chasing a single-digit handicap,
              this is your space. Come practice, compete, and grow with us.
            </p>
          </div>

          {/* Right — Values Grid */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-alt-bg rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="mt-3 font-bold text-primary-dark text-sm">{v.title}</h3>
                <p className="mt-1 text-xs text-gray-text leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
