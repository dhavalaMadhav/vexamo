import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Countdown Utility ---
const calculateTimeLeft = () => {
    const difference = +new Date("2026-03-31") - +new Date(); // Mock deadline for demo
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

// --- Main Component ---
const LogoCompetition = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [submissionsLeft] = useState(3); // Mock state

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];
    const intervals = Object.keys(timeLeft);

    intervals.forEach((interval, index) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-1 md:mx-2">
                <div className="flex items-start">
                    {/* Digit Container - Transparent, no border */}
                    <div className="flex flex-col items-center">
                        <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg leading-none">
                            {String(timeLeft[interval]).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-[#8a3dff] mt-2 drop-shadow-md">
                            {interval}
                        </span>
                    </div>

                    {/* Separator - Only show if not the last element */}
                    {index < intervals.length - 1 && (
                        <span className="text-2xl md:text-4xl font-light text-white/20 mx-2 md:mx-4 mt-2">:</span>
                    )}
                </div>
            </div>
        );
    });

    return (
        <div className="relative w-full min-h-screen bg-transparent text-white overflow-x-hidden font-sans selection:bg-[#8a3dff]/30 selection:text-white pt-24 px-6 flex flex-col">

            {/* Background Atmosphere handled by App.js global background */}

            {/* Back Button */}
            <Link
                to="/"
                className="hidden md:block absolute top-6 left-6 md:top-10 md:right-10 md:left-auto z-50 group"
            >
                <button
                    className="relative overflow-hidden px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 group-hover:bg-white/10 flex items-center gap-2"
                >
                    {/* Top Border Shine */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)',
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
                        }}
                    />
                    <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </button>
            </Link>

            <div className="container mx-auto max-w-7xl relative z-10 flex-grow flex flex-col">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left mb-16 pl-4 md:pl-0"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#8a3dff]/30 bg-[#8a3dff]/10 backdrop-blur-md mb-6">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#8a3dff] uppercase">Premium Design Challenge</span>
                    </div>
                    {/* Silver Shaded Title with Violet Highlight & Mobile Size Adjustment */}
                    <h1 className="text-[clamp(2rem,5vw,5rem)] font-black tracking-tighter uppercase mb-2 leading-none drop-shadow-2xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-200 via-gray-400 to-gray-300">MPDL</span> <span className="text-[#8a3dff]">Logo Competition</span>
                    </h1>
                    <p className="text-sm md:text-base text-white/50 tracking-widest uppercase font-light max-w-2xl">
                        Forging the Face of Global Indian Exports
                    </p>
                </motion.div>

                {/* Main Split Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-24 items-start mb-16">

                    {/* LEFT COLUMN: Specs & Theme */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-12"
                    >
                        {/* Theme Section */}
                        <div>
                            <h3 className="text-xl font-bold uppercase mb-6 text-white flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#8a3dff]"></span>
                                The Theme
                            </h3>
                            <p className="text-white/70 leading-relaxed font-light mb-6 text-lg">
                                Design a logo for <span className="text-white font-medium">MPDL</span> that embodies the export of premium <span className="text-[#e2b714]">Grains</span> and <span className="text-[#ff5f56]">Fruits</span>.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="text-[#8a3dff] mr-4 text-xs mt-1">01</span>
                                    <p className="text-white/50 text-sm uppercase tracking-wide">Reflect Freshness & Global Scale</p>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-[#8a3dff] mr-4 text-xs mt-1">02</span>
                                    <p className="text-white/50 text-sm uppercase tracking-wide">Subtle Nature Elements (Grain/Leaf)</p>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-[#8a3dff] mr-4 text-xs mt-1">03</span>
                                    <p className="text-white/50 text-sm uppercase tracking-wide">Minimalist & Scalable</p>
                                </div>
                            </div>
                        </div>

                        {/* Specs Section */}
                        <div>
                            <h3 className="text-xl font-bold uppercase mb-6 text-white flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#8a3dff]"></span>
                                Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-1">Dimensions</span>
                                    <p className="text-white text-base">1080px <span className="text-white/40 text-xs">Min side</span></p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-1">Formats</span>
                                    <p className="text-white text-base">AI, EPS, PNG</p>
                                </div>
                            </div>
                        </div>

                        {/* Prize Section */}
                        <div>
                            <h3 className="text-xl font-bold uppercase mb-6 text-white flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#8a3dff]"></span>
                                Bounty
                            </h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-white">₹100</span>
                                {/* Green INR */}
                                <span className="text-[#27ca3f] text-sm uppercase tracking-wider font-bold">INR</span>
                            </div>
                            <p className="text-white/30 text-[10px] mt-2 uppercase tracking-widest">Instant Transfer to Winner</p>
                        </div>

                    </motion.div>

                    {/* VERTICAL DIVIDER */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent min-h-[400px]"
                    />

                    {/* RIGHT COLUMN: Submission */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col h-full justify-center"
                    >
                        <h3 className="text-3xl font-black uppercase mb-2 text-white">Enter the Arena</h3>
                        <p className="text-white/40 text-sm font-light mb-10 max-w-md">
                            Submissions are currently accepted via email. Ensure your files meet the specifications before sending.
                        </p>

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                                    <span className="text-white/30">Remaining Entries</span>
                                    <span className="text-[#8a3dff]">{submissionsLeft} / 3</span>
                                </div>
                                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                    <div className="bg-[#8a3dff] h-full w-[0%]" /> {/* Mock Progress */}
                                </div>
                            </div>

                            <a
                                href="mailto:madhavdhavala0@gmail.com?subject=MPDL%20Logo%20Entry"
                                className="group flex items-center gap-6 text-left w-full sm:w-auto"
                            >
                                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#8a3dff] group-hover:border-[#8a3dff] transition-all duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-white font-bold uppercase tracking-widest text-sm group-hover:translate-x-1 transition-transform duration-300">Submit Design</span>
                                    <span className="block text-white/30 text-[10px] uppercase tracking-widest mt-1">Via Email Client</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                </div>

                {/* BOTTOM SECTION: Timer & Competitions List */}
                <div className="mt-auto flex flex-col items-center w-full">

                    {/* Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="pt-10 pb-16 flex flex-col items-center justify-center w-full"
                    >
                        <div className="flex flex-wrap justify-center items-center">
                            {timerComponents.length ? timerComponents : <span className="text-xl text-white/50">Competition Closed</span>}
                        </div>
                    </motion.div>

                    {/* Ongoing & Upcoming Competitions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="w-full border-t border-white/5 pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                        {/* Ongoing */}
                        <div className="flex flex-col items-start md:items-end px-4 md:px-12 border-b md:border-b-0 border-white/5 md:border-r pb-8 md:pb-0">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#8a3dff] uppercase mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#8a3dff] animate-pulse"></span>
                                Ongoing Competitions
                            </h4>
                            <ul className="space-y-4 text-right w-full">
                                <li className="group cursor-pointer">
                                    <div className="flex justify-between md:justify-end items-center gap-4">
                                        <span className="text-white/40 text-[10px] uppercase tracking-wider group-hover:text-white transition-colors">Ends in 2 days</span>
                                        <span className="text-white font-bold uppercase tracking-wide group-hover:text-[#8a3dff] transition-colors">MPDL Logo Design</span>
                                    </div>
                                </li>
                                <li className="opacity-40 pointer-events-none">
                                    <span className="text-white/20 text-sm italic">No other active competitions</span>
                                </li>
                            </ul>
                        </div>

                        {/* Upcoming */}
                        <div className="flex flex-col items-start px-4 md:px-12">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase mb-6">
                                Upcoming Competitions
                            </h4>
                            <ul className="space-y-6 w-full">
                                <li className="group cursor-pointer">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold uppercase tracking-wide group-hover:text-[#8a3dff] transition-colors">Urban Wear Branding</span>
                                        <span className="text-white/30 text-[10px] uppercase tracking-wider">Starts April 10, 2026</span>
                                    </div>
                                </li>
                                <li className="group cursor-pointer">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold uppercase tracking-wide group-hover:text-[#8a3dff] transition-colors">Vexiro UI Challenge</span>
                                        <span className="text-white/30 text-[10px] uppercase tracking-wider">Starts May 01, 2026</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default LogoCompetition;
