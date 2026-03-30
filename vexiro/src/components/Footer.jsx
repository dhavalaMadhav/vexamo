import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000000] overflow-hidden">
      {/* Short, Tapered Partition Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="container mx-auto px-8 md:px-16 pt-16 pb-32 md:pt-24 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <img src="/vexamo.svg" alt="Vexamo" className="w-12 h-12 object-contain invert brightness-0" />
                <h2 className="text-3xl font-black tracking-tighter text-white">
                  VEXAMO
                </h2>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
                Crafting digital experiences that transcend the ordinary. We build the future of the web, one pixel at a time.
              </p>
            </motion.div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h3 className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase() === 'home' ? 'root' : item.toLowerCase().replace(' ', '-')}`}
                    className="text-white/30 hover:text-white transition-colors duration-300 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Legal Column */}
          <div className="md:col-span-4">
            <h3 className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mb-6">Connect</h3>
            <div className="flex flex-wrap gap-4 mb-8">
              <SocialLink href="https://www.instagram.com/madhav_dhavala/" icon={<InstagramIcon />} label="Instagram" />
              <SocialLink href="https://wa.me/917207127948?text=Hello" icon={<WhatsappIcon />} label="WhatsApp" />
              <SocialLink href="tel:+917207127948" icon={<PhoneIcon />} label="Call Us" />
              <SocialLink href="https://www.linkedin.com/in/madhav-dhavala/" icon={<LinkedinIcon />} label="LinkedIn" />
              <SocialLink href="https://twitter.com/" icon={<TwitterIcon />} label="Twitter" />
              <SocialLink href="https://github.com/dhavalaMadhav" icon={<GithubIcon />} label="Github" />
            </div>
            <div className="space-y-2">
              <p className="text-white/40 text-xs font-light">
                madhavdhavala0@gmail.com
              </p>
              <p className="text-white/40 text-xs font-light">
                Visakhapatnam, Andhra Pradesh, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          © {currentYear} VEXAMO. All Rights Reserved.
          <div className="flex gap-8">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    className="flex flex-col items-center gap-2 group relative p-2"
  >
    {/* Icon Container - No border/bg */}
    <div className="text-white/60 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
      {React.cloneElement(icon, { width: "20", height: "20", className: "stroke-current" })}
    </div>

    {/* Text Reveal - Vertical style */}
    <div className="absolute top-full mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 min-w-[max-content] pointer-events-none group-hover:pointer-events-auto">
      <span className="text-white text-[10px] font-medium tracking-wide uppercase">{label}</span>
      <div className="w-[1px] h-2 bg-gradient-to-b from-white/50 to-transparent absolute -top-2 left-1/2 -translate-x-1/2 opacity-50" />
    </div>
  </a>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const WhatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

export default Footer;
