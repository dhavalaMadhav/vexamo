import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';

// --- Animated Stars Component (Matching Work Section) ---
const AnimatedStars = () => {
  const starsRef = useRef();
  useFrame((state) => {
    if (!starsRef.current) return;
    starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });
  return <Stars ref={starsRef} radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />;
};

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Scroll Progress Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Animations tied to scroll
  // Left Card: Slides in from left (-100px -> 0), Opacity (0 -> 1)
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  // Right Form: Slides in from right (100px -> 0)
  const xRight = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:contact@vexiro.dev?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={containerRef} id="contact" className="relative min-h-[120vh] py-32 flex flex-col items-center justify-center bg-[#050507] overflow-hidden">
      
      {/* Background Canvas (Exactly matching Work Section) */}
      <div className="absolute inset-0 z-0">
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <AnimatedStars />
            <Sparkles count={50} scale={20} size={2} color="#ffffff" />
        </Canvas>
      </div>
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 px-4">
        
        {/* Header - Stays relatively static or simple fade */}
        <motion.div 
          className="text-center mb-24 relative z-10"
          style={{ opacity }}
        >
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 animate-pulse">
            CONTACT US
          </h2>
          <div className="h-[1px] w-24 bg-white/20 mx-auto mb-4" />
          <p className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase">
            Start your digital transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Side - Info Card */}
          <motion.div
            style={{ x: xLeft, opacity }}
            className="group relative bg-black/40 backdrop-blur-3xl rounded-[2rem] p-10 border border-white/[0.01] transition-all duration-500 hover:border-white/20 overflow-hidden shadow-2xl flex flex-col justify-between h-full min-h-[500px]"
          >
             {/* Hover Glow Effect - Blue #409EFF */}
            <div
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at bottom, #409EFF, transparent 70%)` }}
            />

            <div className="relative z-10">
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[0.9] tracking-tight">
                Let’s Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  Together.
                </span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-12 font-light max-w-sm">
                 We’re a team of designers and developers crafting high-impact websites, branding, and digital experiences. Have an idea or project in mind? Let’s talk.
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              <ContactItem 
                icon={<MailIcon />} 
                value="contact@vexiro.dev" 
              />
              <ContactItem 
                icon={<MapPinIcon />} 
                value="Remote / Worldwide" 
              />
              <ContactItem 
                icon={<TeamIcon />} 
                value="Vexiro Digital Studio" 
              />
            </div>
          </motion.div>

          {/* Right Side - Form Container */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="flex flex-col justify-center"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex flex-col md:flex-row gap-6">
                 {/* Name Input */}
                 <div className="flex-1 space-y-2 group">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-[#409EFF] uppercase ml-1">NAME</label>
                    <div className="relative bg-white/[0.02] border border-white/5 rounded-xl transition-all duration-300 group-focus-within:border-[#409EFF]/50 group-hover:border-white/10 overflow-hidden">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          required
                          className="w-full bg-transparent px-6 py-4 text-white placeholder-white/20 focus:outline-none text-sm transition-all"
                        />
                         {/* Input Bottom Glow */}
                         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#409EFF] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                 </div>

                 {/* Email Input */}
                 <div className="flex-1 space-y-2 group">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-[#409EFF] uppercase ml-1">EMAIL</label>
                    <div className="relative bg-white/[0.02] border border-white/5 rounded-xl transition-all duration-300 group-focus-within:border-[#409EFF]/50 group-hover:border-white/10 overflow-hidden">
                         <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full bg-transparent px-6 py-4 text-white placeholder-white/20 focus:outline-none text-sm transition-all"
                        />
                         {/* Input Bottom Glow */}
                         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#409EFF] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                 </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2 group">
                <label htmlFor="message" className="text-[10px] font-bold tracking-widest text-[#409EFF] uppercase ml-1">MESSAGE</label>
                <div className="relative bg-white/[0.02] border border-white/5 rounded-xl transition-all duration-300 group-focus-within:border-[#409EFF]/50 group-hover:border-white/10 overflow-hidden">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows="6"
                      required
                      className="w-full bg-transparent px-6 py-4 text-white placeholder-white/20 focus:outline-none text-sm transition-all resize-none"
                    />
                     {/* Input Bottom Glow */}
                     <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#409EFF] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black font-black tracking-widest uppercase rounded-full py-4 text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group mt-4"
              >
                SEND MESSAGE
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </motion.button>
            </form>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
};

// Simple Icon Components
const ContactItem = ({ icon, value }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
      {icon}
    </div>
    <div className="text-white text-sm font-medium tracking-wide">{value}</div>
  </div>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-white/80">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-white/80">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-white/80">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Contact;
