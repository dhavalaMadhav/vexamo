import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
    { id: 'home', name: 'Home' },
    { id: 'our-services', name: 'Services' },
    { id: 'projects', name: 'Work' }, // "Projects" in id, "Work" in Mobile View maybe? adhering to existing names
    { id: 'team', name: 'Team' },
    { id: 'contact', name: 'Contact' }
];

const MobileNav = ({ showLinks = true, isLogoCompetition = false }) => {
    const [activeSection, setActiveSection] = useState('home');
    const { scrollY } = useScroll();
    const rotate = useTransform(scrollY, (value) => value / 3);
    // Actually reusing App.js gear logic:
    // "make sure the gear(back to top bottom) is also in that blurred section on the right side."

    useEffect(() => {
        const handleScroll = () => {
            // Active Section Logic
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
        setActiveSection(id); // Immediate feedback
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-0 left-0 w-full h-[80px] z-50 md:hidden pointer-events-none">
            {/* Background Blur Container */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-xl border-t border-white/10 pointer-events-auto flex items-center justify-between px-8"
                style={{ borderRadius: '50% 50% 0 0 / 24px 24px 0 0' }}
            >

                {/* Left: Navigation Indicators (Horizontal Row of Vertical Lines) OR Back Button */}
                {showLinks ? (
                    <div className="flex items-center gap-6">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="group relative flex flex-col items-center justify-center p-2 cursor-pointer"
                                onClick={() => scrollToSection(section.id)}
                            >
                                {/* Vertical Line */}
                                <motion.div
                                    animate={{
                                        height: activeSection === section.id ? 24 : 12,
                                        width: 2,
                                        backgroundColor: activeSection === section.id ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.2)",
                                    }}
                                    className="rounded-full transition-all duration-300"
                                />
                            </div>
                        ))}
                    </div>
                ) : isLogoCompetition ? (
                    <Link to="/">
                        <button
                            className="relative overflow-hidden px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 group hover:bg-white/10 flex items-center gap-2"
                        >
                            {/* Top Border Shine */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)',
                                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
                                }}
                            />
                            <svg className="w-3 h-3 text-white transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </button>
                    </Link>
                ) : <div />}

                {/* Right: Gear Icon (Scroll to Top) */}
                <button
                    onClick={scrollToTop}
                    className="relative w-10 h-10 flex items-center justify-center bg-transparent border-none outline-none"
                >
                    <motion.svg
                        style={{ rotate }}
                        className="w-full h-full text-white/50"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </motion.svg>
                </button>
            </div>
        </div>
    );
};

export default MobileNav;
