import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import Services from './components/Services';
import BackgroundSystem from './components/BackgroundSystem';
import Work from './components/Work';
import SectionNav from './components/SectionNav';
import useLocomotiveScroll from './hooks/useLocomotiveScroll';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import CurvedDivider from './components/CurvedDivider';

function App() {
  useLocomotiveScroll();
  const [showIntro, setShowIntro] = useState(true);

  // Force scroll to top on refresh/load
  useEffect(() => {
    window.scrollTo(0, 0);
    // If Lenis is being used, it handles its own internal scroll state, 
    // but window.scrollTo(0,0) is a safe baseline for browser behavior.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  
  // Scroll to Top Logic with Gear
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, (value) => value / 3);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App selection:bg-white/10 selection:text-white">
      {/* Intro Animation Layer */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <BackgroundSystem />
      <SectionNav />
      
      <div className="relative z-10">
        <Hero />
        <Services />
        <CurvedDivider />
        <Work/>
        <Contact />
        <Footer />
      </div>

      {/* Scroll To Top Gear - Fixed Bottom Right */}
      <div
        className={`fixed bottom-10 right-10 z-50 transition-all duration-500 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <button
          onClick={scrollToTop}
          className="relative w-16 h-16 flex items-center justify-center bg-transparent border-none outline-none group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* "TOP" Text - Positioned Above */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-widest whitespace-nowrap">
            TOP
          </span>

          {/* Gear Icon with Scroll-Linked Rotation */}
          <motion.svg
            style={{ rotate }}
            className="w-full h-full text-white/30 group-hover:text-white transition-colors duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </motion.svg>
        </button>
      </div>
    </div>
  );
}

export default App;