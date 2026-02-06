import React from 'react';
import { motion } from 'framer-motion';

// Import logos
import tatvLogo from '../assets/logos/tatv.png';
import magicswirllLogo from '../assets/logos/magicswirll.png';
import unipickLogo from '../assets/logos/unipick.png';
import magicClickzzLogo from '../assets/logos/magic clickzz.png';

const projects = [
    {
        name: 'Unipick',
        category: 'UNIVERSITY ADMISSION PORTAL',
        description: 'A visually rich university admission portal crafted with custom design and smooth interactions.',
        color: '#FF7A3D', // Brown/Orange
        link: 'https://www.unipick.org/'
    },
    {
        name: 'Swaminarayan University',
        category: 'ADMISSION PORTAL',
        description: 'Comprehensive educational platform for student enrollment and academic management.',
        color: '#8A3DFF', // Violet
        link: 'https://swaminarayan-foundation.onrender.com/'
    },
    {
        name: 'Swarrnim University',
        category: 'ADMISSION PORTAL',
        description: 'A modern e-commerce style platform for university admissions with secure admin panel.',
        color: '#409EFF', // Blue
        color: '#409EFF', // Blue
        link: 'https://swarrnim.vercel.app/'
    }
];

// Moving Stars Component
// Stars component removed

// Custom Corner Button Component (The "Visit Site" button in the curve)
const CornerButton = ({ link }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 right-0 w-[120px] h-[60px] flex items-center justify-center bg-transparent z-20 group/btn"
    >
        {/* The Button connecting to the curve */}
        <div className="relative w-full h-full flex items-center justify-center">
            {/* SVG for the Inverted Corner Shape logic if needed, but for now just the button placed in the void */}
            <div className="bg-white text-black px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase hover:scale-105 transition-transform">
                Visit ↗
            </div>
        </div>
    </a>
);

const ProjectCard = ({ project }) => {
    return (
        <div className="relative w-full md:w-[340px] h-[320px] flex-shrink-0 group/card">

            {/* Main Card Body with Cutout */}
            <div
                className="relative w-full h-full bg-transparent rounded-[2rem] p-8 border border-white/10 transition-all duration-500 group-hover/card:border-white/30 overflow-hidden flex flex-col"
                style={{
                    // Cutout mask concentric with the 56px button (radius 28px).
                    // Button center is at (28px, 28px) from bottom-right.
                    // To be concentric with a gap, the hole radius needs to be larger than 28px (e.g., 34px).
                    // Mask center: calc(100% - 28px) calc(100% - 28px)
                    maskImage: 'radial-gradient(circle at calc(100% - 28px) calc(100% - 28px), transparent 34px, black 35px)',
                    WebkitMaskImage: 'radial-gradient(circle at calc(100% - 28px) calc(100% - 28px), transparent 34px, black 35px)',
                }}
            >
                {/* SVG Border for Cutout - Positioned exactly on the hole */}
                <div className="absolute right-[28px] bottom-[28px] translate-x-1/2 translate-y-1/2 w-[68px] h-[68px] z-20 pointer-events-none">
                    <svg width="68" height="68" viewBox="0 0 68 68" className="w-full h-full rotate-[-90deg]">
                        {/* Border Circle - radius 34px (matching mask hole) */}
                        <circle
                            cx="34"
                            cy="34"
                            r="33.5" // Slightly inset to sit on edge
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                            strokeDasharray="53 200" // Only show arc on the card side, not closing the button side
                            strokeDashoffset="-25"
                        />
                    </svg>
                </div>
                {/* Hover Color Glow */}
                <div
                    className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover/card:opacity-10 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at bottom, ${project.color}, transparent 70%)` }}
                />

                <div className="flex flex-col h-full relative z-10">
                    {/* Category Tag */}
                    <div className="mb-6">
                        <span className="bg-black/80 border border-white/10 px-4 py-1.5 rounded-full text-[8px] font-bold tracking-[0.2em] text-[#ff4d29] uppercase">
                            {project.category}
                        </span>
                    </div>

                    {/* Project Title */}
                    <h4 className="text-white text-3xl font-bold mb-4 tracking-tight">
                        {project.name}
                    </h4>

                    {/* Project Description */}
                    <p className="text-white/40 text-xs leading-relaxed mb-8 font-light">
                        {project.description}
                    </p>

                    {/* Footer Section (Modified for Cutout) */}
                    <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between pr-24">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border border-white/20 rounded-full flex items-center justify-center">
                                <div className="w-1 h-1 border-t border-r border-white/40 rotate-[135deg]" />
                            </div>
                            <span className="text-white/20 text-[9px] font-medium tracking-[0.1em]">
                                LIVE PROJECT
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* The "Noida" Button placed in the cutout void - Gear Shape */}
            <div className="absolute bottom-0 right-0 w-[56px] h-[56px] flex items-center justify-center pointer-events-auto z-30">
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 flex items-center justify-center group/btn"
                >
                    {/* Gear Shape SVG with Rotation */}
                    <svg
                        className="w-10 h-10 text-white/50 animate-[spin_4s_linear_infinite] group-hover/btn:[animation-play-state:paused] transition-all duration-300 group-hover/btn:text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    {/* Tooltip Text - Appearing on Hover */}
                    <div className="absolute right-full mr-3 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        <span className="text-white text-[10px] uppercase tracking-widest font-bold">Visit Site</span>
                    </div>
                </a>
            </div>

        </div >
    );
};

const LogoPill = ({ title, desc, color, logo, index }) => {
    return (
        <div
            className="relative flex items-center justify-end px-3 py-2 rounded-full overflow-hidden w-[160px] hover:w-[360px] flex-shrink-0 -ml-12 first:ml-0 group transition-all duration-500 shadow-2xl"
            style={{
                background: `linear-gradient(90deg, ${color}33 0%, ${color}11 100%)`,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                zIndex: 100 - index
            }}
        >
            {/* Text hidden initially, revealed on hover */}
            <div className="flex flex-col gap-0.5 pr-6 text-right flex-1 opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-500 overflow-hidden whitespace-nowrap">
                <h4 className="text-white text-xl font-black tracking-tighter" style={{ color: color }}>{title}</h4>
                <p className="text-white/50 text-[8px] font-bold uppercase tracking-[0.2em] leading-tight">{desc}</p>
            </div>

            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center relative bg-transparent">
                <img
                    src={logo}
                    alt={title}
                    className={`w-full h-full object-contain scale-90 relative z-10 drop-shadow-lg ${index === 3 ? 'rounded-full' : ''}`}
                />
            </div>
        </div>
    );
};

const WorkSection = () => {
    return (
        <section id="projects" className="relative w-full min-h-screen bg-transparent py-16 flex flex-col items-center">

            {/* Background Atmosphere - Removed White Shade */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" /> */}

            {/* Main Header Content - Centered */}
            <div className="relative z-20 text-center px-4 mb-24 w-full max-w-4xl">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    Delivered Projects
                    {/* SVG Underline */}
                    <div className="absolute -bottom-2 left-0 w-full h-4 -z-10">
                        <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path d="M2.00025 7.00001C35.9529 3.01602 125.792 -2.12693 197.994 3.00631" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                </h3>
                {/* Removed Separator Line */}
                {/* <div className="h-[1px] w-24 bg-white/20 mx-auto mb-4" /> */}
                <p className="text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mt-4 bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/50">
                    Showcasing excellence in digital solutions
                </p>
            </div>

            {/* Websites Sub-heading */}
            <div className="relative z-20 px-8 md:px-16 w-full max-w-7xl mb-12">
                <div className="flex flex-col items-start">
                    <h4 className="text-white text-3xl md:text-5xl font-bold tracking-tighter uppercase">Websites</h4>
                    <p className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mt-2">
                        Bespoke digital experiences / Performance engineering
                    </p>
                    <div className="h-[1px] w-24 bg-white/20 mt-4" />
                </div>
            </div>

            {/* Static Grid of Cards */}
            <div className="relative z-20 flex flex-wrap justify-center lg:justify-start gap-10 px-8 md:px-16 max-w-7xl w-full mb-16">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
            </div>

            {/* Logos Sub-heading */}
            <div className="relative z-20 px-8 md:px-16 w-full max-w-7xl mb-12">
                <div className="flex flex-col items-start">
                    <h4 className="text-white text-3xl md:text-5xl font-bold tracking-tighter uppercase">Logos</h4>
                    <p className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mt-2">
                        Visual Identities / Brand Strategy
                    </p>
                    <div className="h-[1px] w-24 bg-white/20 mt-4" />
                </div>
            </div>

            {/* Logo Pill Layout - Reduced Bottom Spacing */}
            <div className="relative z-20 flex w-full overflow-x-auto pb-4 scrollbar-hide px-8 md:px-16 mb-8 justify-center">
                <div className="flex flex-row items-center">
                    <LogoPill
                        index={0}
                        title="TATV"
                        desc="natural food products"
                        color="#FF7A3D"
                        logo={tatvLogo}
                    />
                    <LogoPill
                        index={1}
                        title="MAGIC SWIRLL"
                        desc="icecream and desert shop"
                        color="#8A3DFF"
                        logo={magicswirllLogo}
                    />
                    <LogoPill
                        index={2}
                        title="UNIPICK"
                        desc="university admission conpany"
                        color="#409EFF"
                        logo={unipickLogo}
                    />
                    <LogoPill
                        index={3}
                        title="MAGIC CLICKZZ"
                        desc="digital photography"
                        color="#ffffff"
                        logo={magicClickzzLogo}
                    />
                </div>
            </div>



            {/* Bottom Info */}
            {/* Bottom Info Removed */}

            {/* Gradient Overlay Removed to prevent partition look */}
        </section>
    );
};

export default WorkSection;