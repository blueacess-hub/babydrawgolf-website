'use client';

import BookNowButton from './BookNowButton';

export default function Hero() {
  return (
    <section className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Background image as <img> for better mobile compatibility */}
      <img
        src="https://images.pexels.com/photos/31212256/pexels-photo-31212256.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
          Your Private Golf Bay.
          <br />
          <span className="text-primary-light">Open 24/7.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
          Tour-level Trackman iO simulator in Cypress, TX. Book anytime. No
          staff needed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <BookNowButton location="hero" size="lg" />
        </div>
      </div>
    </section>
  );
}
