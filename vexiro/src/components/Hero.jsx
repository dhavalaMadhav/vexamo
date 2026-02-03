import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
  
  // Mouse tracking for subtle depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

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
      opacity: 0.6, 
      scale: 1,
      transition: { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 } 
    }
  };

  const col1 = [tech1, tech2, tech3];
  const col2 = [tech4, tech5, tech6];

  return (
    <section id="home" className="relative w-full h-screen bg-[#050507] text-white overflow-hidden font-sans">
      
      {/* OPTIONAL DEPTH ENHANCEMENT */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ 
          opacity: heroOpacity,
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(255,255,255,0.06) 0%, transparent 40%)`
          )
        }}
      />

      {/* 1. PREMIUM HEADER LAYER */}
      <motion.header 
        className="absolute top-0 left-0 w-full z-50 px-8 md:px-12 py-10 flex items-center justify-between pointer-events-auto"
        style={{ opacity: heroOpacity }}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white/95 uppercase font-sans">VEXAMO</span>
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

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-[55%_45%] items-center px-6 md:px-12 lg:px-20 gap-12">
        
        {/* LEFT COLUMN: INFORMATION & BRANDING (SAFE ARCHITECTURE) */}
        <motion.div 
  className="flex flex-col justify-center h-screen overflow-x-visible overflow-y-visible relative w-full z-20 min-w-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="pointer-events-auto mt-16 w-full max-w-none lg:max-w-[48rem]">

            <motion.p 
              variants={itemVariants} 
              className="text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-white/40 mb-2"
            >
              Premium Digital Solutions
            </motion.p>
            
            {/* INNER HEADLINE WRAPPER (MANDATORY SAFE BOUNDS) */}
            <div className="relative overflow-visible py-4 pb-6 w-full">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white flex flex-col gap-2 overflow-visible"
              >
                {/* LINE 1 WRAPPER */}
                <div className="block relative overflow-visible">
                  <div className="block relative overflow-hidden min-h-[1.3em]">
                    <motion.span
  variants={lineVariants}
  className="block leading-[1.1] break-normal"
>
  We Design, Build & Deliver
</motion.span>

                  </div>
                </div>

                {/* LINE 2 WRAPPER (CURSIVE) */}
                <div className="block relative overflow-visible pb-2">
                  <div className="block relative overflow-hidden min-h-[1.6em]">
                   <motion.span 
  variants={lineVariants} 
  className="block italic font-cursive text-white/95 opacity-90 leading-[1.3] pb-2 break-normal"
>

                      High-Quality <span className="font-sans italic-none not-italic">Digital Products.</span>
                      <motion.div 
                        variants={underlineVariants}
                        className="absolute bottom-2 left-0 w-32 md:w-48 h-[1px] bg-white/30" 
                      />
                    </motion.span>
                  </div>
                </div>
              </motion.h1>
            </div>

            <motion.p 
              variants={itemVariants} 
              className="text-sm md:text-base text-white/60 font-light mb-6 leading-relaxed max-w-md"
            >
              From websites and web applications to branding, UI/UX, and digital experiences — we help businesses build products that look premium, work flawlessly, and scale with confidence.
            </motion.p>

            <motion.p 
              variants={itemVariants} 
              className="text-[10px] tracking-widest uppercase text-white/30 mb-8 font-medium"
            >
              Focused on performance, precision, and long-term value.
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
       <div className="h-full flex items-center justify-end overflow-visible pointer-events-none relative pl-2 lg:pl-6 -translate-x-4 lg:-translate-x-8">

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
