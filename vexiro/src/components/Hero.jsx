import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import tech1 from '../assets/hero/tech_1.png';
import tech2 from '../assets/hero/tech_2.png';
import tech3 from '../assets/hero/tech_3.png';
import tech4 from '../assets/hero/tech_4.png';
import tech5 from '../assets/hero/tech_5.png';
import tech6 from '../assets/hero/tech_6.png';

// --- Scrolling Bento Column Component ---
const BentoColumn = ({ images, speed = 20, reverse = false }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        {[...images, ...images].map((img, i) => {
          // Mixed Aspect Ratios for Desktop
          const isWide = i % 3 === 0;
          const isSquare = i % 3 === 1;
          const isTall = i % 3 === 2;

          let aspectClass = "aspect-[3/4]";
          if (isWide) aspectClass = "aspect-video"; // Wide
          if (isSquare) aspectClass = "aspect-square"; // Square
          if (isTall) aspectClass = "aspect-[3/5]"; // Tall

          return (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden group ${aspectClass} transition-all duration-500 w-full`}
            >
              <img
                src={img}
                alt="Work Preview"
                className="w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

// --- Horizontal Scrolling Bento Row (Mobile) ---
// Using marquee logic for seamless swipe/scroll
const MobileBentoRow = ({ images, speed = 20, reverse = false }) => {
  const baseX = useMotionValue(0);
  const containerRef = useRef(null);

  // Clone images for infinite loop: 4 sets to ensure smooth wrapping
  // We will shift from 0% to -25% (width of 1 set) and then reset to 0%
  const duplicatedImages = [...images, ...images, ...images, ...images];

  useAnimationFrame((t, delta) => {
    let moveBy = (speed * delta) / 1000;
    if (reverse) moveBy = -moveBy;

    // Move
    baseX.set(baseX.get() - moveBy);
  });

  // Wrap logic: When we scrolled 25% (one full set width), reset to 0
  const x = useTransform(baseX, (v) => {
    // Assuming 4 sets, one set is 25% width.
    // We want to loop within -25% to 0%
    return `${(v % 25)}%`;
  });

  return (
    <div className="flex flex-row gap-3 overflow-hidden relative w-full h-full items-end pb-10" ref={containerRef}>
      <motion.div
        className="flex flex-row gap-3 h-40 cursor-grab active:cursor-grabbing"
        drag="x"
        // Bind drag effectively by just letting it influence, but for infinite loop visual
        // we use the 'x' transform that wraps.
        // Note: Strict 'drag' with 'style={{x}}' where x is a transform works, 
        // but 'dragConstraints' might need careful handling or be removed for infinite drag.
        // For true infinite drag + auto-scroll, we ideally modify baseX onDrag.
        // But for simplicity of "never finishes" and "swiping", keeping it simple:
        style={{ x }}
        onDrag={(event, info) => {
          // Apply drag delta to motion value
          baseX.set(baseX.get() + info.delta.x / 10); // scale drag for sensitivity
        }}
      >
        {duplicatedImages.map((img, i) => {
          // Mixed Aspect Ratios for "Real Bento" feel
          const isWide = i % 3 === 0;
          const isSquare = i % 3 === 1;
          const isTall = i % 3 === 2;

          let aspectClass = "aspect-[3/4]";
          let widthClass = "min-w-[120px]";

          if (isWide) { aspectClass = "aspect-video"; widthClass = "min-w-[200px]"; }
          if (isSquare) { aspectClass = "aspect-square"; widthClass = "min-w-[160px]"; }
          if (isTall) { aspectClass = "aspect-[3/5]"; widthClass = "min-w-[100px]"; }

          return (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden ${aspectClass} ${widthClass} flex-shrink-0`}
            >
              <img
                src={img}
                alt="Work Preview"
                className="w-full h-full object-cover opacity-90 pointer-events-none" // Prevent img drag interference
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

// --- Main Hero Component ---

const words = ["Websites.", "Web Apps.", "Brands.", "Interfaces.", "Experiences."];

const Hero = () => {
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

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0 }
    }
  };

  const lineVariants = {
    hidden: { y: 0, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0 }
    }
  };

  const bentoVariants = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0 }
    }
  };

  const col1 = [tech1, tech2, tech3];
  const col2 = [tech4, tech5, tech6];

  return (
    <section id="home" className="relative w-full h-screen bg-transparent text-white overflow-hidden font-sans">

      {/* 1. PREMIUM HEADER LAYER - PRESERVED NAV BAR */}
      <motion.header
        className="absolute top-0 left-0 w-full z-50 px-8 md:px-12 py-5 flex items-center justify-between pointer-events-auto"
      >
        <div className="flex items-center gap-4">
          <img src="/vexamo.svg" alt="Vexamo" className="w-10 h-10 object-contain invert brightness-0" />
          <span className="text-xl font-black tracking-tighter text-white/95 uppercase font-sans">VEXAMO</span>
        </div>

        {/* Desktop Nav */}
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
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-[55%_45%] items-start lg:items-center px-6 md:px-12 lg:px-20 gap-12 pt-28 lg:pt-0">

        {/* LEFT COLUMN: INFORMATION & BRANDING */}
        <motion.div
          className="flex flex-col justify-start lg:justify-center h-auto lg:h-screen overflow-visible relative w-full z-20 min-w-0 pb-32 lg:pb-0"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          <div className="pointer-events-auto w-full max-w-none lg:max-w-[48rem]">

            <motion.p
              variants={itemVariants}
              className="text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-white/40 mb-2"
            >
              Premium Digital Solutions
            </motion.p>

            {/* INNER HEADLINE WRAPPER */}
            <div className="relative overflow-visible py-4 pb-6 w-full max-w-full md:max-w-[720px]">
              <motion.h1
                className="text-[2rem] leading-tight md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 inline-block relative overflow-visible tracking-normal break-words"
              >
                <motion.div
                  variants={lineVariants}
                  className="inline"
                >
                  <span className="inline mr-[0.2em] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">We Design, Build & Deliver</span>

                  {/* ROTATOR */}
                  <span className="inline-flex relative h-[1.3em] items-baseline overflow-hidden min-w-[7ch] ml-0 align-baseline">
                    <span className="block italic font-cursive opacity-0 select-none whitespace-nowrap h-full leading-none">
                      Experiences.
                    </span>

                    <AnimatePresence mode="wait">
                      <motion.span
                        key={words[index]}
                        initial={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: "-40%", opacity: 0, filter: "blur(4px)" }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="absolute left-0 top-0 block italic font-cursive text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 whitespace-nowrap"
                      >
                        {words[index]}
                        <div className="absolute -bottom-2 left-0 w-full h-3">
                          <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <motion.path
                              d="M2.00025 7.00001C35.9529 3.01602 125.792 -2.12693 197.994 3.00631"
                              stroke="rgba(255, 255, 255, 0.3)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              initial={{ pathLength: 1, opacity: 1 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0 }}
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
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 pointer-events-auto group"
              >
                {/* Top Border Shine */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
                  }}
                />
                Start Your Project
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('projects');
                  if (element) {
                    const offset = 80; // Adjust for sticky header if any, though header is transparent/floating usually
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="text-white/40 font-medium text-xs tracking-widest uppercase hover:text-white transition-colors pointer-events-auto"
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: BENTO GRID (DESKTOP) */}
        <div className="hidden lg:flex h-full items-center justify-end overflow-visible pointer-events-none relative pl-0 lg:pl-0 -translate-x-16 lg:-translate-x-24">
          <motion.div
            className="group grid grid-cols-2 gap-4 h-[110vh] -rotate-12 scale-75 opacity-60 w-[100%] origin-right transition-opacity duration-500"
            variants={bentoVariants}
            initial="visible"
            animate="visible"
          >
            <BentoColumn images={col1} speed={25} />
            <BentoColumn images={col2} speed={35} reverse={true} />
          </motion.div>
        </div>

      </div>

      {/* MOBILE BENTO ROW (BOTTOM FIXED) - Moved up */}
      <div className="absolute bottom-32 left-0 w-full z-10 block lg:hidden pointer-events-none flex flex-col gap-3">
        <MobileBentoRow images={col1} speed={5} />
      </div>

      {/* SCROLL INDICATOR - HIDDEN ON MOBILE */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 pointer-events-none z-10"
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
