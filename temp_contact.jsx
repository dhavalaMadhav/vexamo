import React, { useState } from 'react';
import { motion } from 'framer-motion';


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
    window.location.href = `mailto:contact@vexamo.dev?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative min-h-screen py-16 flex flex-col items-center justify-center bg-transparent overflow-hidden">

      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 px-4">

        {/* Main Header Content - Added as requested */}
        <motion.div
          className="text-center mb-8 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-[clamp(1.5rem,8vw,3.5rem)] md:text-6xl font-black tracking-tighter uppercase mb-4 relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side Content Wrapper */}
          <div className="relative flex flex-col items-center justify-center">

            {/* Text Container - Moved Above Images */}


            {/* Infinity Loop - Dual Overlapping Organic Shapes */}
            {/* Image Section - Commented out temporarily
            <div className="relative w-full max-w-[700px] aspect-[700/460] drop-shadow-2xl group cursor-pointer">
               ... (Image code) ...
            </div>
            */}

            {/* Text Replacement */}
            <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-8 max-w-lg mx-auto">
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase">
                Wanna <span className="text-[#8a3dff]">Connect?</span>
              </h3>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                We are a team of passionate designers and developers dedicated to crafting exceptional digital experiences. Whether you have a project in mind or just want to say hi, we'd love to hear from you.
              </p>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </div>


          {/* Right Side - Form Container */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="flex flex-col md:flex-row gap-6">
                {/* Name Input */}
                <div className="flex-1 space-y-2 group">
                  <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-white/50 uppercase ml-1">NAME</label>
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
                    {/* Simple Bottom Border - Default (Solid Line) */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
                    {/* Simple Bottom Border - Focus (Solid Line) */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100 origin-left" />
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex-1 space-y-2 group">
                  <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-white/50 uppercase ml-1">EMAIL</label>
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
                    {/* Simple Bottom Border - Default (Solid Line) */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
                    {/* Simple Bottom Border - Focus (Solid Line) */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100 origin-left" />
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2 group">
                <label htmlFor="message" className="text-[10px] font-bold tracking-widest text-white/50 uppercase ml-1">MESSAGE</label>
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
                  {/* Simple Bottom Border - Default (Solid Line) */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
                  {/* Simple Bottom Border - Focus (Solid Line) */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 transform scale-x-0 group-focus-within:scale-x-100 origin-left" />
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
              <ContactItem
                icon={<PhoneIcon />}
                value="+91 7207127948"
                label="PHONE"
                href="tel:+917207127948"
              />
              <ContactItem
                icon={<WhatsAppIcon />}
                value="+91 7207127948"
                label="WHATSAPP"
                href="https://wa.me/917207127948?text=I%20would%20like%20to%20collaborate"
              />
              <ContactItem
                icon={<MailIcon />}
                value="madhavdhavala0@gmail.com"
                label="EMAIL"
                href="mailto:madhavdhavala0@gmail.com"
              />
            </div>
          </div>

        </div>
      </div>
    </section >
  );
};

// Simple Icon Components
const ContactItem = ({ icon, value, href }) => (
  <a
    href={href}
    className="flex flex-col items-center gap-2 group relative"
  >
    {/* Icon Container - No border/bg, larger icon */}
    <div className="text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
      {React.cloneElement(icon, { width: "20", height: "20", className: "stroke-current" })}
    </div>

    {/* Text Reveal - Vertical style */}
    <div className="absolute top-full mt-4 flex flex-col items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 min-w-[max-content] pointer-events-none group-hover:pointer-events-auto">
      <span className="text-white text-sm font-medium tracking-wide">{value}</span>
      <div className="w-1 h-3 bg-gradient-to-b from-white/50 to-transparent absolute -top-3 left-1/2 -translate-x-1/2 opacity-50" />
    </div>
  </a>
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
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

export default Contact;
