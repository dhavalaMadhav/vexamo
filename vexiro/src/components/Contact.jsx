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
            <div className="relative w-full max-w-[700px] aspect-[700/460] drop-shadow-2xl group cursor-pointer">
              {/* Hover Overlay Text */}
              <div className="absolute top-[25%] right-[15%] z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase text-white"
                  style={{ textShadow: '0px 2px 4px #000000, 0px 4px 8px #000000' }}
                >
                  FOUNDER: MADHAV DHAVALA
                </span>
              </div>

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
                    d="M 240,440 C 110,460 30,340 60,220 C 90,100 200,40 320,60 C 420,80 450,220 360,320 C 320,365 240,440 240,440 Z"
                  />
                  {/* Right Shape Path - More Curvy and Organic */}
                  <path
                    id="blob-right"
                    d="M 460,20 C 590,0 670,120 640,240 C 610,360 500,420 380,400 C 280,380 250,240 340,140 C 380,95 460,20 460,20 Z"
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

            {/* Contact Details Footnote - Added Phone/WhatsApp/Mail closer to button */}
            <div className="mt-8 flex justify-center items-start gap-12 md:gap-20">
              <ContactItem icon={<PhoneIcon />} value="+91 98765 43210" label="PHONE" />
              <ContactItem icon={<WhatsAppIcon />} value="+91 98765 43210" label="WHATSAPP" />
              <ContactItem icon={<MailIcon />} value="contact@vexamo.dev" label="EMAIL" />
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

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.2436 6.72533 15.1951 5.11999 12.78C3.43135 10.177 2.37877 7.2144 2.04999 4.13C2.02484 3.85303 2.05797 3.57396 2.14704 3.31055C2.23611 3.04715 2.37922 2.80517 2.56715 2.60012C2.75508 2.39507 2.98363 2.23158 3.23842 2.12028C3.4932 2.00898 3.76865 1.95232 4.04699 1.954H7.04999C7.5401 1.94902 8.01297 2.13324 8.37525 2.47056C8.73753 2.80788 8.96623 3.27555 9.01999 3.78C9.11765 4.70769 9.34446 5.61741 9.69999 6.47C9.84377 6.81803 9.87522 7.20011 9.78985 7.56708C9.70448 7.93405 9.50616 8.26799 9.21999 8.53L7.94999 9.8C9.37517 12.2882 11.4518 14.3648 13.94 15.79L15.21 14.52C15.4746 14.2372 15.8089 14.0416 16.1755 13.9582C16.5422 13.8748 16.9231 13.9079 17.27 14.05C18.1226 14.4055 19.0323 14.6323 19.96 14.73C20.4674 14.7845 20.9372 15.0152 21.2752 15.38C21.6132 15.7447 21.7963 16.2192 21.79 16.71L22 16.92V16.92Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      fill="currentColor"
    />
  </svg>
);

export default Contact;
