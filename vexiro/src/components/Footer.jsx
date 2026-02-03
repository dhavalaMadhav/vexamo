import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050507] border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-black tracking-tighter text-white">
                VEXIRO
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
                Crafting digital experiences that transcend the ordinary. We build the future of the web, one pixel at a time.
              </p>
            </motion.div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-widest text-[#409EFF] uppercase mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase() === 'home' ? 'root' : item.toLowerCase().replace(' ', '-')}`}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide flex items-center group"
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
            <h3 className="text-sm font-bold tracking-widest text-[#409EFF] uppercase mb-6">Connect</h3>
            <div className="flex gap-4 mb-8">
               <SocialLink href="#" icon={<GithubIcon />} />
               <SocialLink href="#" icon={<LinkedinIcon />} />
               <SocialLink href="#" icon={<TwitterIcon />} />
            </div>
            <div className="space-y-2">
                 <p className="text-white/40 text-xs font-light">
                    hello@vexiro.dev
                 </p>
                 <p className="text-white/40 text-xs font-light">
                    Los Angeles, CA
                 </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-[10px] uppercase tracking-widest">
                © {currentYear} VEXIRO. All Rights Reserved.
            </p>
            <div className="flex gap-8">
                <a href="#" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</a>
                <a href="#" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
    <a 
        href={href}
        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300"
    >
        {icon}
    </a>
);

const GithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

export default Footer;
