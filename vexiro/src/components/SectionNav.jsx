import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', name: 'Home' },
  { id: 'our-services', name: 'Services' },
  { id: 'projects', name: 'Projects' },
  { id: 'team', name: 'Team' },
  { id: 'contact', name: 'Contact' }
];

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after hero section (100vh)
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      setIsVisible(scrollPosition > windowHeight * 0.5);

      // Detect active section
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop Side Nav */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-8 top-[45%] -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-6"
          >
            {sections.map((section) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                className="group relative flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                <span className="mr-4 text-[10px] font-bold tracking-widest uppercase text-white/0 group-hover:text-white/60 transition-all duration-300 pointer-events-none">
                  {section.name}
                </span>
                <div className="relative cursor-pointer py-2">
                  <motion.div
                    animate={{
                      width: activeSection === section.id ? 40 : 16,
                      height: activeSection === section.id ? 3 : 2,
                      backgroundColor: activeSection === section.id ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.2)",
                      boxShadow: "none"
                    }}
                    className="rounded-full transition-all duration-300 group-hover:bg-white"
                  />
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Burger Menu Button - Visible after scroll */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="hidden fixed top-6 right-6 z-[60] p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1.5 w-6">
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </motion.button>

          {/* Mobile Full Screen Menu Overlay */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? "0%" : "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[55] flex flex-col items-center justify-center gap-8 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            {sections.filter(s => s.id !== 'home').map((section) => (
              <React.Fragment key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    scrollToSection(section.id);
                  }}
                  className="text-2xl font-black tracking-tighter uppercase text-white hover:text-white/50 transition-colors"
                >
                  {section.name}
                </a>
                <div className="w-24 h-[1px] bg-white/20" />
              </React.Fragment>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SectionNav;