import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', name: 'Home' },
  { id: 'our-services', name: 'Services' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' }
];

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

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
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-6"
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              className="group relative flex items-center"
              onClick={() => scrollToSection(section.id)}
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
                    boxShadow: activeSection === section.id ? "0 0 12px rgba(255, 255, 255, 0.5)" : "none"
                  }}
                  className="rounded-full transition-all duration-300 group-hover:bg-white"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionNav;