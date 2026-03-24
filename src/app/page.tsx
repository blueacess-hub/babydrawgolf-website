import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Simulator from '@/components/Simulator';
import Pricing from '@/components/Pricing';
import HowItWorks from '@/components/HowItWorks';
import Location from '@/components/Location';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Simulator />
        <Pricing />
        <HowItWorks />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
