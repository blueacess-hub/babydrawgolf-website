'use client';

import AnimateIn from './AnimateIn';
import BookNowButton from './BookNowButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/31212256/pexels-photo-31212256.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <AnimateIn direction="up" delay={0}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Your Private Golf Bay.
            <br />
            <span className="text-primary-light">Open 24/7.</span>
          </h1>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.2}>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Tour-level Trackman iO simulator in Cypress, TX. Book anytime. No
            staff needed.
          </p>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookNowButton location="hero" size="lg" />
            <a
              href="#how-it-works"
              className="text-white/80 hover:text-white font-medium underline underline-offset-4 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </AnimateIn>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
