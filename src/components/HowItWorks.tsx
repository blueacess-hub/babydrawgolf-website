'use client';

import { CalendarCheck, KeyRound, DoorOpen, MonitorPlay } from 'lucide-react';

const steps = [
  { icon: CalendarCheck, step: '1', title: 'Book Online', desc: 'Choose your date and time. Pay securely online.' },
  { icon: KeyRound, step: '2', title: 'Get Your PIN', desc: 'Receive a unique access PIN via email and the Trackman App.' },
  { icon: DoorOpen, step: '3', title: 'Walk In', desc: 'Enter the facility with your PIN code. The bay is ready.' },
  { icon: MonitorPlay, step: '4', title: 'Play', desc: 'The simulator starts automatically. Choose your course and enjoy!' },
];

export default function HowItWorks() {
  return (
    <section className="h-full flex items-center bg-primary-dark pt-14 md:pt-0">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12 w-full text-center">
        <p className="text-primary-light font-semibold text-sm tracking-widest uppercase">Getting Started</p>
        <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-white tracking-tight">
          How It Works
        </h2>
        <p className="mt-3 text-white/60 max-w-xl mx-auto">
          From booking to first swing in 4 simple steps.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {steps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center relative">
                <step.icon className="w-7 h-7 text-white" />
                <span className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-1.5 text-white/60 text-sm leading-relaxed max-w-[200px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-white/50 text-sm">
          Need help? Contact us at{' '}
          <a href="mailto:info@babydrawgolf.net" className="text-primary-light underline underline-offset-2">
            info@babydrawgolf.net
          </a>
        </p>
      </div>
    </section>
  );
}
