import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';

// Import logos
import tatvLogo from '../assets/logos/tatv.png';
import magicswirllLogo from '../assets/logos/magicswirll.png';
import unipickLogo from '../assets/logos/unipick.png';

const projects = [
    {
        name: 'Unpick',
        category: 'UNIVERSITY ADMISSION PORTAL',
        description: 'A visually rich university admission portal crafted with custom design and smooth interactions.',
        color: '#FF7A3D', // Brown/Orange
        link: 'https://www.unipick.org/'
    },
    {
        name: 'Swaminarayana University',
        category: 'ADMISSION PORTAL',
        description: 'Comprehensive educational platform for student enrollment and academic management.',
        color: '#8A3DFF', // Violet
        link: 'https://swaminarayan-foundation.onrender.com/'
    },
    {
        name: 'Swarrinm University',
        category: 'ADMISSION PORTAL',
        description: 'A modern e-commerce style platform for university admissions with secure admin panel.',
        color: '#409EFF', // Blue
        link: 'https://swarrnim.vercel.app/'
    }
];

// Moving Stars Component
const AnimatedStars = () => {
    const starsRef = useRef();
    useFrame((state) => {
        if (!starsRef.current) return;
        starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    });
    return <Stars ref={starsRef} radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />;
};

const ProjectCard = ({ project }) => {
    return (
        <div className="group relative w-full md:w-[340px] bg-black/40 backdrop-blur-3xl rounded-[2rem] p-9 border border-white/[0.01] transition-all duration-500 hover:border-white/20 hover:-translate-y-2 overflow-hidden shadow-2xl flex flex-col">
            {/* Hover Color Glow */}
            <div
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
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

                {/* Footer Section */}
                <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-white/20 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 border-t border-r border-white/40 rotate-[135deg]" />
                        </div>
                        <span className="text-white/20 text-[9px] font-medium tracking-[0.1em]">
                            LIVE PROJECT
                        </span>
                    </div>

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/[0.03] border border-white/5 py-1.5 px-6 rounded-full text-white text-[9px] font-bold uppercase tracking-[0.1em] transition-all hover:bg-white hover:text-black no-underline"
                    >
                        VISIT SITE ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

const LogoPill = ({ title, desc, color, logo, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            className="relative flex items-center justify-end px-6 py-4 rounded-full overflow-hidden w-[480px] flex-shrink-0 -ml-16 first:ml-0 group transition-all duration-500 hover:z-30 hover:-translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ 
                background: `linear-gradient(90deg, ${color}33 0%, ${color}11 100%)`,
                border: '10px solid #000000',
                backdropFilter: 'blur(15px)',
                zIndex: 100 - index
            }}
        >
            <div className="flex flex-col gap-0.5 pr-8 text-right flex-1">
                <h4 className="text-white text-2xl font-black tracking-tighter whitespace-nowrap" style={{ color: color }}>{title}</h4>
                <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.2em] leading-tight">{desc}</p>
            </div>
            
            <div className="w-32 h-32 rounded-full flex-shrink-0 flex items-center justify-center border-4 border-white/10 overflow-hidden relative shadow-inner bg-transparent">
                <img 
                    src={logo} 
                    alt={title} 
                    className="w-full h-full object-contain p-2 relative z-10 transition-transform duration-500 group-hover:scale-110"
                />
            </div>
        </motion.div>
    );
};

const WorkSection = () => {
    return (
        <section id="projects" className="relative w-full min-h-screen bg-[#050507] py-32 flex flex-col items-center">
            
            {/* Background Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                    <AnimatedStars />
                    <Sparkles count={50} scale={20} size={2} color="#ffffff" />
                </Canvas>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

            {/* Main Header Content - Centered */}
            <div className="relative z-20 text-center px-4 mb-24 w-full max-w-4xl">
                <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 animate-pulse">
                    Delivered Projects
                </h3>
                <div className="h-[1px] w-24 bg-white/20 mx-auto mb-4" />
                <p className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase">
                    Showcasing excellence in digital solutions
                </p>
            </div>

            {/* Websites Sub-heading - Left Aligned */}
            <div className="relative z-20 px-8 md:px-16 w-full max-w-7xl mb-12">
                <div className="flex flex-col items-start">
                    <h4 className="text-white text-3xl md:text-5xl font-bold tracking-tighter uppercase">Websites</h4>
                    <p className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mt-2">
                        Bespoke digital experiences / Performance engineering
                    </p>
                    <div className="h-[2px] w-16 bg-[#ff4d29] mt-4" />
                </div>
            </div>

            {/* Static Grid of Cards - Left Aligned on Desktop */}
            <div className="relative z-20 flex flex-wrap justify-center lg:justify-start gap-10 px-8 md:px-16 max-w-7xl w-full mb-16">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
            </div>

            {/* Logos Sub-heading - Left Aligned */}
            <div className="relative z-20 px-8 md:px-16 w-full max-w-7xl mb-12">
                <div className="flex flex-col items-start">
                    <h4 className="text-white text-3xl md:text-5xl font-bold tracking-tighter uppercase">Logos</h4>
                    <p className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase mt-2">
                        Visual Identities / Brand Strategy
                    </p>
                    <div className="h-[2px] w-16 bg-[#8a3dff] mt-4" />
                </div>
            </div>

            {/* Logo Pill Layout - Single Row Overlapping */}
            <div className="relative z-20 flex w-full overflow-x-auto pb-12 scrollbar-hide px-8 md:px-16 mb-20 justify-center">
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
                </div>
            </div>

            {/* Capability Message (Slightly Bigger) */}
            <div className="absolute left-8 bottom-8 z-20 max-w-[320px] hidden lg:block">
                <div className="p-6 border-l-2 border-white/10 backdrop-blur-sm bg-white/[0.01]">
                    <h5 className="text-white text-lg font-bold mb-2 uppercase tracking-tight">Versatile Capability</h5>
                    <p className="text-white/30 text-xs leading-relaxed">
                        We deliver complex digital challenges with technical depth and precision, ensuring high-scale solutions for every need.
                    </p>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="relative z-20 text-center mt-auto pb-4">
                <p className="text-white/50 text-[8px] tracking-[0.4em] font-bold uppercase">
                    Interactive Project Showcase • Vexamo
                </p>
            </div>

            {/* Gradient Overlay for Fade Out */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#050507] to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default WorkSection;