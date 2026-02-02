import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import tech1 from '../assets/hero/tech_1.png';
import tech2 from '../assets/hero/tech_2.png';
import tech3 from '../assets/hero/tech_3.png';
import tech4 from '../assets/hero/tech_4.png';
import tech5 from '../assets/hero/tech_5.png';
import tech6 from '../assets/hero/tech_6.png';

// --- Word Rotator Component ---

const words = ['Aesthetic.', 'Experience.', 'Presence.', 'Craft.', 'Identity.'];

function WordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 3500);
      return () => clearInterval(interval);
    }, 2000);
    
    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <div className="relative inline-flex items-center ml-2 md:ml-4 overflow-visible align-top h-[1.1em]">
      <div className="relative overflow-hidden h-full min-w-[5ch] flex flex-col justify-end">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 pb-1 font-cursive text-4xl md:text-6xl lg:text-7xl relative z-10"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
        <motion.div 
          className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-white/0 via-white/80 to-white/0"
          layoutId="rotator-underline"
        />
      </div>
    </div>
  );
}

// --- Scrolling Bento Column Component ---
const BentoColumn = ({ images, speed = 20, reverse = false }) => {
  return (
    <div className="flex flex-col gap-4 py-4 h-full relative overflow-hidden">
      <motion.div
        animate={{ 
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] 
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex flex-col gap-4"
      >
        {[...images, ...images].map((img, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden group aspect-[3/4] md:aspect-square">
            <img 
              src={img} 
              alt="Work Preview" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Hero Component ---

const Hero = () => {
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const bentoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.6, 
      scale: 1,
      transition: { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 } 
    }
  };

  const col1 = [tech1, tech2, tech3];
  const col2 = [tech4, tech5, tech6];

  return (
    <section id="home" className="relative w-full h-screen bg-[#050507] text-white overflow-hidden font-sans">
      
      {/* 1. PREMIUM HEADER LAYER */}
      <motion.header 
        className="absolute top-0 left-0 w-full z-50 px-8 md:px-12 py-10 flex items-center justify-between pointer-events-auto"
        style={{ opacity: heroOpacity }}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white/95">VEXAMO</span>
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 px-8 py-3 rounded-full liquid-morph transition-all duration-500">
          {['Our Services', 'Projects', 'Contact'].map((item) => {
            const id = item.toLowerCase().replace(' ', '-');
            return (
              <a 
                key={item} 
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {item}
              </a>
            );
          })}
        </nav>
      </motion.header>

      {/* MAIN CONTENT GRID */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2 items-center px-10 md:px-20 lg:px-32">
        
        {/* LEFT COLUMN: INFORMATION */}
        <motion.div 
          className="max-w-xl pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.p 
            variants={itemVariants} 
            className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-white/40 mb-8"
          >
            Digital Experience Studio
          </motion.p>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8 text-white flex flex-col"
          >
            <span className="block">Refining the</span>
            <div className="flex items-center">
              <span className="text-white/90">Digital</span>
              <WordRotator />
            </div>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-lg text-white/60 font-light mb-12 leading-relaxed max-w-lg"
          >
            We adhere to a philosophy of reductive design, crafting immersive digital systems that perform with silence and precision.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-row items-center gap-8"
          >
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-medium text-xs tracking-widest uppercase transition-all duration-300"
            >
              Start Project
            </motion.button>
            <motion.button 
               className="text-white/40 font-medium text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              Our Vision
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: BENTO GRID */}
        <motion.div 
          className="hidden lg:grid grid-cols-2 gap-4 h-[120vh] -rotate-12 scale-110 opacity-60 pointer-events-none"
          variants={bentoVariants}
          initial="hidden"
          animate="visible"
        >
          <BentoColumn images={col1} speed={25} />
          <BentoColumn images={col2} speed={35} reverse={true} />
        </motion.div>
        
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-10"
        style={{ opacity: heroOpacity }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-medium">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-[1px] bg-gradient-to-b from-white/40 to-transparent relative"
        />
      </motion.div>

    </section>
  );
};

export default Hero;
