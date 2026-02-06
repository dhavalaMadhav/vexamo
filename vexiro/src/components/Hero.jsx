import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// --- Main Hero Component ---

const Hero = () => {
  // Mouse tracking for subtle depth

  const words = ["Websites.", "Web Apps.", "Brands.", "Interfaces.", "Experiences."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Slight initial delay to let entrance animation finish
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 3500); // Slower, calm rhythm
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(startTimeout);
  }, []);



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

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  const underlineDraw = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.9,
        delay: 1.6,
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
    <section id="home" className="relative w-full h-screen bg-transparent text-white overflow-hidden font-sans">

      {/* 1. PREMIUM HEADER LAYER - PRESERVED NAV BAR (NO BACKGROUND/BORDER) */}
      <motion.header
        className="absolute top-0 left-0 w-full z-50 px-8 md:px-12 py-5 flex items-center justify-between pointer-events-auto"
        style={{}}
      >
        <div className="flex items-center gap-4">
          <img src="/vexamo.svg" alt="Vexamo" className="w-16 h-16 object-contain invert brightness-0" />
          <span className="text-xl font-black tracking-tighter text-white/95 uppercase font-sans">VEXAMO</span>
        </div>

        {/* Desktop Nav - PRESERVED STYLE (No liquid-morph, just links) */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 py-3 transition-all duration-500">
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
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
              >
                {item}
              </a>
            );
          })}
        </nav>
      </motion.header>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-[55%_45%] items-center px-6 md:px-12 lg:px-20 gap-12">

        {/* LEFT COLUMN: INFORMATION & BRANDING (SAFE ARCHITECTURE) */}
        <motion.div
          className="flex flex-col justify-center h-screen overflow-x-visible overflow-y-visible relative w-full z-20 min-w-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{}}
        >
          <div className="pointer-events-auto mt-16 w-full max-w-none lg:max-w-[48rem]">

            <motion.p
              variants={itemVariants}
              className="text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-white/40 mb-2"
            >
              Premium Digital Solutions
            </motion.p>

            {/* INNER HEADLINE WRAPPER (MANDATORY SAFE BOUNDS) */}
            <div className="relative overflow-visible py-4 pb-6 w-full max-w-[720px]">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 inline-block relative overflow-visible leading-[1.35] tracking-normal"
              >
                {/* MAIN TEXT WITH ROTATOR INLINE */}
                <motion.div
                  variants={lineVariants}
                  className="inline"
                >
                  <span className="inline mr-[0.4em] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">We Design, Build & Deliver</span>

                  {/* ROTATOR CONTAINER (INLINE BLOCK) */}
                  <span className="inline-flex relative h-[1.3em] items-center overflow-hidden min-w-[7ch] ml-1">
                    {/* INVISIBLE PLACEHOLDER FOR LAYOUT STABILITY */}
                    <span className="block italic font-cursive opacity-0 select-none whitespace-nowrap h-full leading-none">

                      Experiences.
                    </span>

                    {/* ANIMATED ROTATING WORD */}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={words[index]}
                        initial={{ y: "40%", opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: "-40%", opacity: 0, filter: "blur(4px)" }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1]
                        }}

                        className="absolute left-0 top-1 block italic font-cursive text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 whitespace-nowrap"
                      >

                        {words[index]}
                        {/* SVG UNDERLINE */}
                        <div className="absolute -bottom-2 left-0 w-full h-3">
                          <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <motion.path
                              d="M2.00025 7.00001C35.9529 3.01602 125.792 -2.12693 197.994 3.00631"
                              stroke="rgba(255, 255, 255, 0.3)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            />
                          </svg>
                        </div>
                      </motion.span>

                    </AnimatePresence>

                  </span>
                </motion.div>
              </motion.h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/50 font-medium mb-6 leading-relaxed max-w-lg"
            >
              From websites and web applications to branding and UI/UX — we help businesses build products that look premium, work flawlessly, and scale with confidence.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 pointer-events-auto"
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="text-white/40 font-medium text-xs tracking-widest uppercase hover:text-white transition-colors pointer-events-auto"
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: BENTO GRID (STABLE BOUNDS) */}
        <div className="h-full flex items-center justify-end overflow-visible pointer-events-none relative pl-0 lg:pl-0 -translate-x-16 lg:-translate-x-24">

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

      {/* SCROLL INDICATOR - HIDDEN ON MOBILE */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 pointer-events-none z-10"
        style={{}}
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
