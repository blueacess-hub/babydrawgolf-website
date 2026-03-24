'use client';

import { CalendarCheck, KeyRound, DoorOpen, MonitorPlay } from 'lucide-react';
import AnimateIn from './AnimateIn';

const steps = [
  {
    icon: CalendarCheck,
    step: '1',
    title: 'Book Online',
    description:
      'Choose your date and time through our booking system. Pay securely online.',
  },
  {
    icon: KeyRound,
    step: '2',
    title: 'Get Your PIN',
    description:
      'Receive a unique access PIN via email and the Trackman Golf App.',
  },
  {
    icon: DoorOpen,
    step: '3',
    title: 'Walk In',
    description:
      'Enter the facility using your PIN code. The bay will be ready for you.',
  },
  {
    icon: MonitorPlay,
    step: '4',
    title: 'Play',
    description:
      'The simulator starts automatically. Choose your course and enjoy!',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            From booking to first swing in 4 simple steps. No staff, no
            friction, just golf.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {steps.map((step, i) => (
            <AnimateIn
              key={step.step}
              direction="up"
              delay={i * 0.15}
              className="text-center relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-white/20" />
              )}
              <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center relative">
                <step.icon className="w-9 h-9 text-white" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn direction="none" delay={0.6}>
          <p className="mt-14 text-center text-white/60 text-sm">
            Need help? Contact us anytime at{' '}
            <a
              href="mailto:info@babydrawgolf.net"
              className="text-primary-light underline underline-offset-2"
            >
              info@babydrawgolf.net
            </a>
            . Our team typically responds within 1 hour.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
