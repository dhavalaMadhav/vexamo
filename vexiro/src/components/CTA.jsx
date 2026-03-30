import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';

// --- Animated Stars Component ---
// Stars Removed

const CTA = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const bottomContentY = useTransform(scrollYProgress, [0.7, 0.9], [100, 0]);
  const bottomContentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-center bg-[#000000] overflow-hidden">

      {/* Background Canvas */}
      {/* Background Canvas Removed */}

      {/* Subtle Gradient Glow in Background (Requested) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen animate-pulse" />

      <div className="relative z-10 text-center px-4 w-full max-w-[90vw]">

        {/* Text and Button Removed as requested */}
        <div className="flex gap-8 justify-center mt-12 mb-32">
          <SocialBox icon={<GithubIcon />} />
          <SocialBox icon={<LinkedinIcon />} />
          <SocialBox icon={<MailIcon />} />
        </div>

      </div>
    </section>
  );
};

// Social Box Component
const SocialBox = ({ icon }) => (
  <motion.a
    href="#"
    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)', boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
    className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/[0.02]"
  >
    {icon}
  </motion.a>
);

// Icons
const GithubIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const LinkedinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const MailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" /><path d="M22 6L12 13L2 6" /></svg>
);

export default CTA;
