import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Countdown Utility ---
const calculateTimeLeft = () => {
    const difference = +new Date("2026-04-30") - +new Date(); // Updated deadline to April 30th, 2026
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
    const videoRef = useRef(null);

    // Timer Update Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    // Camera Feed Effect
    useEffect(() => {
        let stream = null;
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const timerComponents = [];
    const intervals = Object.keys(timeLeft);

    intervals.forEach((interval, index) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-[2px] md:mx-2">
                <div className="flex items-start">
                    {/* Digit Container - Transparent, no border */}
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-6xl font-black text-white leading-none" style={{ textShadow: "0 4px 8px rgba(0,0,0,1)" }}>
                            {String(timeLeft[interval]).padStart(2, '0')}
                        </span>
                        {/* Updated label color to Green */}
                        <span className="text-[8px] md:text-xs tracking-[0.2em] font-bold uppercase text-white mt-1 md:mt-2" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                            {interval}
                        </span>
                    </div>

                    {index < intervals.length - 1 && (
                        <span className="text-xl md:text-4xl font-light text-white/50 mx-0.5 md:mx-4 mt-0.5 md:mt-3 leading-none" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>:</span>
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
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0 }}
                    className="text-left mb-16 pl-4 md:pl-0"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#8a3dff]/30 bg-[#8a3dff]/10 backdrop-blur-md mb-6">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#8a3dff] uppercase">Website Design Challenge</span>
                    </div>
                    {/* Simplified Title */}
                    <h1 className="text-[clamp(2rem,5vw,5rem)] font-black tracking-tighter uppercase mb-2 leading-none drop-shadow-2xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-200 via-gray-400 to-gray-300">Website</span> <span className="text-[#8a3dff]">Competition</span>
                    </h1>
                </motion.div>

                {/* Main Split Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-24 items-start mb-16">

                    {/* LEFT COLUMN: Specs & Theme */}
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0 }}
                        className="space-y-12"
                    >
                        {/* Theme Section */}
                        <div>
                            <h3 className="text-xl font-bold uppercase mb-6 text-white flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#8a3dff]"></span>
                                The Theme
                            </h3>
                            <p className="text-white/70 leading-relaxed font-light mb-6 text-lg">
                                Design a modern website for a <span className="text-white font-bold">Premium Cafe</span>, known for its artisan coffee and cozy atmosphere. The website should embody <span className="text-white font-medium">Warmth</span>, <span className="text-[#e2b714]">Quality</span>, and an <span className="text-[#ff5f56]">Inviting User Experience</span>.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="text-[#8a3dff] mr-4 text-xs mt-1">01</span>
                                    <p className="text-white/50 text-sm uppercase tracking-wide">High-End & Luxurious Feel</p>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-[#8a3dff] mr-4 text-xs mt-1">02</span>
                                    <p className="text-white/50 text-sm uppercase tracking-wide">Modern & Timeless Design</p>
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
                                    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-1">Pages</span>
                                    <p className="text-white text-base">Home, About, Services, Contact</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-1">Formats</span>
                                    <p className="text-white text-base">Figma, React, Next.js</p>
                                </div>
                            </div>
                        </div>

                        {/* Prize Section */}
                        <div>
                            <h3 className="text-xl font-bold uppercase mb-6 text-white flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#8a3dff]"></span>
                                Bounty
                            </h3>
                            <div className="space-y-4">
                                {/* 1st Place */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd700] to-[#e2b714] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(226,183,20,0.4)]">
                                            <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                        </div>
                                        <span className="text-white/70 text-sm font-light uppercase tracking-widest">1st Place</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-white">₹1000</span>
                                        <span className="text-[#27ca3f] text-[10px] uppercase tracking-wider font-bold">INR</span>
                                    </div>
                                </div>
                                {/* 2nd Place */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e0e0e0] to-[#c0c0c0] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(192,192,192,0.3)]">
                                            <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                        </div>
                                        <span className="text-white/70 text-sm font-light uppercase tracking-widest">2nd Place</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-white/90">₹500</span>
                                        <span className="text-[#27ca3f] text-[10px] uppercase tracking-wider font-bold">INR</span>
                                    </div>
                                </div>
                                {/* 3rd Place */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#cd7f32] to-[#b06a25] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(205,127,50,0.3)]">
                                            <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                        </div>
                                        <span className="text-white/70 text-sm font-light uppercase tracking-widest">3rd Place</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-white/80">₹100</span>
                                        <span className="text-[#27ca3f] text-[10px] uppercase tracking-wider font-bold">INR</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/30 text-[10px] mt-4 uppercase tracking-widest">Instant Transfer to Winners</p>
                        </div>

                    </motion.div>

                    {/* VERTICAL DIVIDER */}
                    <motion.div
                        initial={{ height: "100%" }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0 }}
                        className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent min-h-[400px]"
                    />

                    {/* RIGHT COLUMN: Submission */}
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0 }}
                        className="flex flex-col h-full justify-center"
                    >
                        <h3 className="text-3xl font-black uppercase mb-2 text-white">Enter the Arena</h3>
                        <p className="text-white/40 text-sm font-light mb-10 max-w-md">
                            Submissions are now open. Upload your designs directly via the competition form.
                        </p>

                        <div className="space-y-8">
                            {/* Google Form Button */}
                            <a
                                href="https://forms.gle/UGVeEezb3sajVc9P6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full max-w-md py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 bg-[#8a3dff] text-white hover:bg-[#7a32e5] border border-white/10 relative overflow-hidden hover:shadow-[-4px_4px_10px_rgba(255,255,255,0.2)] cursor-pointer"
                            >
                                {/* Top Border Shine */}
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)',
                                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
                                    }}
                                />
                                <span>Submit via Google Form</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>

                            <div className="w-full max-w-md text-center">
                                <p className="text-white/50 text-[10px] uppercase tracking-widest">
                                    Results Announcement
                                </p>
                                <p className="text-white font-bold text-sm mt-1 uppercase tracking-wide">
                                    April 30th, 2026
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* BOTTOM SECTION: Timer & Competitions List */}
                <div className="mt-auto flex flex-col items-center w-full">

                    {/* Timer with Camera Background - PILL SHAPED */}
                    <div className="flex flex-col items-center w-full mb-16">
                        <motion.div
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0 }}
                            className="relative w-full max-w-3xl rounded-full overflow-hidden border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15),_0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl group"
                        >
                            {/* Glass Shine Effect */}
                            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-70"></div>
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>

                            {/* Video Background - Grayscale */}
                            <div className="absolute inset-0 z-0">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover grayscale opacity-70"
                                />
                                {/* Overlay to ensure text readability */}
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                            </div>

                            {/* Timer Content */}
                            <div className="relative z-10 w-full flex flex-col items-center justify-center py-8 px-12">
                                <div className="flex justify-center items-center w-full">
                                    {timerComponents.length ? timerComponents : <span className="text-xl text-white/50" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Competition Closed</span>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Time Remaining Text - OUTSIDE */}
                        <p className="mt-6 text-white text-[10px] uppercase tracking-[0.3em] font-bold drop-shadow-md" style={{ textShadow: "0 2px 4px rgba(0,0,0,1)" }}>
                            Time Remaining
                        </p>
                    </div>

                    {/* Ongoing & Upcoming Competitions */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0 }}
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
                                        <span className="text-white/40 text-[10px] uppercase tracking-wider group-hover:text-white transition-colors">Ends April 30th</span>
                                        <span className="text-white font-bold uppercase tracking-wide group-hover:text-[#8a3dff] transition-colors">Cafe Website Design</span>
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
                                        <span className="text-white font-bold uppercase tracking-wide group-hover:text-[#8a3dff] transition-colors">Vexamo UI Challenge</span>
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
