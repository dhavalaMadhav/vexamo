import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import tech1 from '../assets/hero/tech_1.png';
import tech2 from '../assets/hero/tech_2.png';
import tech3 from '../assets/hero/tech_3.png';
import tech4 from '../assets/hero/tech_4.png';
import tech5 from '../assets/hero/tech_5.png';
import tech6 from '../assets/hero/tech_6.png';

// --- Scrolling Bento Column Component ---
const BentoColumn = ({ images, speed = 20, reverse = false }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="flex flex-col gap-4 py-1 h-full relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          y: reverse
            ? isHovered
              ? "0%"
              : ["-50%", "0%"]
            : isHovered
              ? "0%"
              : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: isHovered ? 0 : Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden group aspect-[3/4] md:aspect-square transition-all duration-500"
          >
            <img
              src={img}
              alt="Work Preview"
              className="w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ProofMarquee = () => {
  return (
    <section className="relative py-6 overflow-hidden border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render duplicate sets for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0">
             {[1, 2, 3, 4].map((set) => (
              <span key={set} className="inline-flex items-center gap-8 text-[11px] tracking-[0.15em] uppercase text-white/40 px-4" style={{ fontWeight: 400 }}>
                <span>10+ Projects</span>
                <span className="text-[#5da9ff] font-bold">•</span>
                <span>Fast Delivery</span>
                <span className="text-[#5da9ff] font-bold">•</span>
                <span>Modern Stack</span>
                <span className="text-[#5da9ff] font-bold">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

// --- Main Hero Component ---

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.95]);

  const words = ["Websites.", "Web Apps.", "Brands.", "Interfaces.", "Experiences."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Slight initial delay to let entrance animation finish
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 4500); // Slower, calm rhythm
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(startTimeout);
  }, [words.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const bentoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
    }
  };

  const col1 = [tech1, tech2, tech3];
  const col2 = [tech4, tech5, tech6];

  return (
    <motion.section 
        id="home" 
        style={{ opacity, scale }}
        className="relative w-full min-h-screen lg:h-screen bg-transparent text-white overflow-hidden font-sans"
    >
      {/* 0. MOBILE BACKGROUND ELEMENTS */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Background Images (Themed) */}
        <div className="absolute inset-0 opacity-[0.12]">
          {/* Web Dev - Top Right - Code/Laptop */}
          <div className="absolute top-[5%] -right-[15%] w-[180px] h-[240px] transform rotate-12 blur-[0.5px]">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1080&auto=format&fit=crop"
              alt="Web Development"
              className="w-full h-full object-cover rounded-3xl opacity-90 shadow-2xl"
            />
          </div>
          {/* Branding - Mid Right - Paper/Design */}
          <div className="absolute top-[40%] -right-[5%] w-[150px] h-[200px] transform -rotate-6 blur-[0.5px]">
            <img 
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1080&auto=format&fit=crop"
              alt="Branding"
              className="w-full h-full object-cover rounded-2xl opacity-80 shadow-2xl"
            />
          </div>
          {/* UI/UX - Bottom Left - App Interface */}
          <div className="absolute bottom-[20%] -left-[10%] w-[160px] h-[220px] transform rotate-12 blur-[0.5px]">
            <img 
              src="https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1080&auto=format&fit=crop"
              alt="UI/UX Design"
              className="w-full h-full object-cover rounded-2xl opacity-90 border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Subtle glow accent */}
        <div className="absolute top-[25%] -right-20 w-[400px] h-[400px] bg-[#5da9ff]/15 rounded-full blur-[100px]" />
      </div>

      {/* 1. PREMIUM HEADER LAYER - PRESERVED NAV BAR */}
      <motion.header
        className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between pointer-events-auto gap-4 md:gap-0"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <img src="/vexamo.svg" alt="Vexamo" className="w-10 md:w-16 h-10 md:h-16 object-contain invert brightness-0" />
          <span className="text-lg md:text-xl font-black tracking-tighter text-white/95 uppercase font-sans">VEXAMO</span>
        </div>

        {/* Navigation - Centered on Desktop */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 py-3 transition-all duration-500 bg-transparent rounded-full px-0 border-none">
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
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-300 whitespace-nowrap"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
              >
                {item}
              </a>
            );
          })}
        </nav>

        {/* Mobile Nav Placeholder (Hidden on Desktop) */}
         <nav className="flex md:hidden items-center gap-6 py-2 transition-all duration-500 bg-white/5 backdrop-blur-md rounded-full px-6 border border-white/10">
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
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {item}
              </a>
            );
          })}
        </nav>
      </motion.header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-44 md:pt-0 pb-0">
        
        {/* CENTER: INFORMATION & BRANDING */}
        <div className="flex flex-col lg:grid lg:grid-cols-[55%_45%] items-center gap-12 flex-grow justify-center lg:justify-start lg:items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT */}
          <motion.div
            className="flex flex-col justify-center relative w-full z-20 min-w-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="pointer-events-auto w-full max-w-none lg:max-w-[48rem] flex flex-col items-start text-left">
              <motion.p
                variants={itemVariants}
                className="text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-white/40 mb-4 ml-1"
              >
                Premium Digital Solutions
              </motion.p>

              {/* INNER HEADLINE WRAPPER */}
              <div className="relative overflow-visible py-2 pb-6 w-full max-w-[900px]">
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                >
                  <motion.div variants={lineVariants} className="flex flex-col items-start">
                     {/* --- COMPONENTS --- */}
                    {(() => {
                      const RotatingWord = ({ strokeColor, className }) => (
                        <span className={`block relative h-[1.3em] overflow-visible min-w-[200px] ${className}`}>
                           {/* Invisible Shim */}
                           <span className="block italic font-cursive opacity-0 h-full leading-none px-1">Experiences.</span>
                           
                           <AnimatePresence mode="wait">
                             <motion.span
                               key={words[index]}
                                initial={{ y: "40%", opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: "-40%", opacity: 0, filter: "blur(4px)" }}
                               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                               className="absolute left-0 top-0 block italic font-cursive text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 whitespace-nowrap px-1"
                               style={{ transformOrigin: "bottom center" }}
                             >
                               {words[index]}
                               {/* Underline - Configurable Color */}
                               <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 md:h-6">
                                 <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                   <motion.path
                                     d="M2.00025 7.00001C35.9529 3.01602 125.792 -2.12693 197.994 3.00631"
                                     stroke={strokeColor} 
                                     strokeWidth="5"
                                     strokeLinecap="round"
                                     initial={{ pathLength: 0, opacity: 0 }}
                                     animate={{ pathLength: 1, opacity: 1 }}
                                     transition={{ duration: 0.8, ease: "easeOut" }} 
                                   />
                                 </svg>
                               </div>
                             </motion.span>
                           </AnimatePresence>
                        </span>
                      );

                      return (
                        <>
                          {/* MOBILE LAYOUT (Stacked + BLUE Underline) */}
                          <div className="lg:hidden flex flex-col items-start text-left">
                              <span className="block text-white">We Design,</span>
                              <span className="block text-white">Build & Deliver</span>
                              <RotatingWord strokeColor="#5da9ff" className="mt-1" />
                          </div>

                          {/* DESKTOP LAYOUT (Split Lines + WHITE Underline) */}
                          <div className="hidden lg:flex flex-col items-start">
                              <span className="block text-white">We Design, Build &</span>
                              <div className="flex items-center gap-4">
                                <span className="block text-white">Deliver</span>
                                <RotatingWord strokeColor="rgba(255, 255, 255, 0.3)" className="translate-y-2" />
                              </div>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                </motion.h1>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-white/60 font-medium mb-8 leading-relaxed max-w-md text-left"
              >
 From websites and web applications to branding and UI/UX — we help businesses build products that look premium, work flawlessly, and scale with confidence.              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-row items-center gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 pointer-events-auto"
                >
                  Start Your Project
                </motion.button>
                <motion.button
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/40 font-medium text-xs tracking-widest uppercase hover:text-white transition-colors pointer-events-auto"
                >
                  View Our Work
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: BENTO GRID (DESKTOP ONLY) */}
          <div className="hidden lg:flex h-full items-center justify-end overflow-visible pointer-events-none relative pl-0 lg:pl-0 -translate-x-16 lg:-translate-x-24">
            <motion.div
              className="group grid grid-cols-2 gap-4 h-[110vh] -rotate-12 scale-75 opacity-60 w-[100%] origin-right transition-opacity duration-500"
              variants={bentoVariants}
              initial="hidden"
              animate="visible"
            >
              <BentoColumn images={col1} speed={25} />
              <BentoColumn images={col2} speed={35} reverse={true} />
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: PROOF MARQUEE + SCROLL INDICATOR */}
        <div className="relative z-20 w-full flex flex-col items-center mt-12">
          <div className="w-full">
            <ProofMarquee />
          </div>
          
          {/* Subtle Scroll Down Indicator - Persistent */}
          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center pt-6 pb-2"
          >
           <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 mb-3">Scroll</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-white/80 to-transparent" />
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};

export default Hero;
