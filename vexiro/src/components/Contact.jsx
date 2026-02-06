import React, { useState } from 'react';
import { motion } from 'framer-motion';
import techImg from '../assets/hero/tech_1.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    <section id="contact" className="relative min-h-screen py-16 flex flex-col items-center justify-center bg-transparent overflow-hidden">

      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 px-4">

        {/* Main Header Content - Added as requested */}
        <div className="text-center mb-24 relative z-10 fade-in">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            GET IN TOUCH
            <div className="absolute -bottom-2 left-0 w-full h-4 -z-10">
              <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M2.00025 7.00001C35.9529 3.01602 125.792 -2.12693 197.994 3.00631" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </h2>
          <p className="text-[10px] md:text-xs tracking-[0.3em] font-light uppercase bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/50">
            Let's build something extraordinary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side Content Wrapper */}
          <div className="relative flex flex-col items-center justify-center">

            {/* Text Container - Moved Above Images */}
            <div className="flex flex-col items-start w-full pl-4 md:pl-0 max-w-md mb-8">
              {/* "Team Building" Title - Scrollytelling Style */}
              <p className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mt-2">
                Team Building
                <div className="h-[1px] w-12 bg-white/20 mt-2" />
              </p>

              {/* Team Description */}
              <p className="text-white/60 text-sm font-light leading-relaxed text-left mt-4">
                Our team of designers and engineers work in perfect harmony to build digital products that stand the test of time.
              </p>
            </div>

            {/* Infinity Loop - Dual Overlapping Organic Shapes */}
            <div className="relative w-full max-w-[700px] aspect-[700/460] drop-shadow-2xl">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 460">
                <defs>
                  {/* Drop Shadow Filter for Irregular Shapes */}
                  <filter id="blob-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="rgba(0,0,0,0.9)" />
                  </filter>

                  {/* Left Shape Path - Modeled after the "blue blob" reference */}
                  {/* Left Shape Path - Taller and Curvier */}
                  <path
                    id="blob-left"
                    d="M 220,20 C 350,0 430,120 400,240 C 370,360 260,420 140,400 C 40,380 10,240 70,120 C 110,40 220,20 220,20 Z"
                  />
                  {/* Right Shape Path - More Curvy and Organic */}
                  <path
                    id="blob-right"
                    d="M 400,30 C 600,0 680,180 620,330 C 560,450 320,410 280,290 C 240,160 300,50 400,30 Z"
                  />

                  <mask id="mask-left">
                    <use href="#blob-left" fill="white" />
                  </mask>
                  <mask id="mask-right">
                    <use href="#blob-right" fill="white" />
                  </mask>
                </defs>

                {/* Left Shape Layer */}
                <g filter="url(#blob-shadow)">
                  <image
                    href="/us.image.jpeg"
                    width="700"
                    height="460"
                    preserveAspectRatio="xMidYMid slice"
                    mask="url(#mask-left)"
                  />
                  <use href="#blob-left" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Right Shape Layer (Overlapping) */}
                <g filter="url(#blob-shadow)">
                  <image
                    href="/us.image.jpeg"
                    width="700"
                    height="460"
                    preserveAspectRatio="xMidYMid slice"
                    mask="url(#mask-right)"
                  />
                  <use href="#blob-right" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          </div>


          {/* Right Side - Form Container */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="flex flex-col md:flex-row gap-6">
                {/* Name Input */}
                <div className="flex-1 space-y-2 group">
                  <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-[#409EFF] uppercase ml-1">NAME</label>
                  <div className="relative transition-all duration-300">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="What's your name?"
                      required
                      className="w-full bg-transparent px-2 py-4 text-white placeholder-white/20 border-none outline-none ring-0 focus:ring-0 focus:outline-none text-sm font-light"
                    />
                    {/* Tapered Bottom Border - Default */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    {/* Tapered Bottom Border - Focus */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#409EFF] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100" />
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex-1 space-y-2 group">
                  <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-[#409EFF] uppercase ml-1">EMAIL</label>
                  <div className="relative transition-all duration-300">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-transparent px-2 py-4 text-white placeholder-white/20 border-none outline-none ring-0 focus:ring-0 focus:outline-none text-sm font-light"
                    />
                    {/* Tapered Bottom Border - Default */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    {/* Tapered Bottom Border - Focus */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#409EFF] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100" />
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2 group">
                <label htmlFor="message" className="text-[10px] font-bold tracking-widest text-[#409EFF] uppercase ml-1">MESSAGE</label>
                <div className="relative transition-all duration-300">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="4"
                    required
                    className="w-full bg-transparent px-2 py-4 text-white placeholder-white/20 border-none outline-none ring-0 focus:ring-0 focus:outline-none text-sm resize-none font-light"
                  />
                  {/* Tapered Bottom Border - Default */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  {/* Tapered Bottom Border - Focus */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#409EFF] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100" />
                </div>
              </div>

              {/* Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1, boxShadow: "-4px 4px 15px rgba(255, 255, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-black font-black tracking-widest uppercase rounded-full py-4 text-sm transition-all duration-300 flex items-center justify-center gap-3 group mt-4 relative overflow-hidden"
              >
                <span className="relative z-10">SEND MESSAGE</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300 relative z-10">→</span>
              </motion.button>
            </form>

            {/* Contact Details Footnote */}
            <div className="mt-16 flex justify-center items-start gap-12 md:gap-20 pt-10">
              <ContactItem icon={<MailIcon />} value="contact@vexamo.dev" label="EMAIL" />
              <ContactItem icon={<MapPinIcon />} value="Visakhapatnam, Andhra Pradesh, India" label="LOCATION" />
              <ContactItem icon={<TeamIcon />} value="Vexamo Studio" label="STUDIO" />
            </div>
          </div>

        </div>
      </div>
    </section >
  );
};

// Simple Icon Components
const ContactItem = ({ icon, value }) => (
  <div className="flex flex-col items-center gap-2 group relative">
    {/* Icon Container - No border/bg, larger icon */}
    <div className="text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
      {React.cloneElement(icon, { width: "20", height: "20", className: "stroke-current" })}
    </div>

    {/* Text Reveal - Vertical style */}
    <div className="absolute top-full mt-4 flex flex-col items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 min-w-[max-content] pointer-events-none group-hover:pointer-events-auto">
      <span className="text-white text-sm font-medium tracking-wide">{value}</span>
      <div className="w-1 h-3 bg-gradient-to-b from-white/50 to-transparent absolute -top-3 left-1/2 -translate-x-1/2 opacity-50" />
    </div>
  </div>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 6L12 13L2 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TeamIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Contact;
