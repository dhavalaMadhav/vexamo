import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';

const projects = [
    {
        name: 'Unipick',
        category: 'UNIVERSITY ADMISSION PORTAL',
        description: 'A visually rich university admission portal crafted with custom design and smooth interactions.',
        color: '#ff4d4d',
        link: 'https://www.unipick.org/'
    },
    {
        name: 'Swaminarayana University',
        category: 'ADMISSION PORTAL',
        description: 'Comprehensive educational platform for student enrollment and academic management.',
        color: '#ffaa00',
        link: 'https://swaminarayan-foundation.onrender.com/'
    },
    {
        name: 'Swarrnim University',
        category: 'ADMISSION PORTAL',
        description: 'A modern e-commerce style platform for university admissions with secure admin panel.',
        color: '#00ccff',
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
        <div className="group relative w-full md:w-[340px] bg-black/40 backdrop-blur-3xl rounded-[2rem] p-9 border border-white/[0.03] transition-all duration-500 hover:border-white/20 hover:-translate-y-2 overflow-hidden shadow-2xl flex flex-col">
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

const WorkSection = () => {
    return (
        <section className="relative w-full h-screen bg-[#050507] overflow-hidden flex flex-col items-center justify-center py-10">
            {/* Starry Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 1]} />
                    <AnimatedStars />
                    <Sparkles count={50} scale={10} size={1} speed={0.3} opacity={0.1} color="#fff" />
                </Canvas>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

            {/* Header Content */}
            <div className="relative z-20 text-center px-4 mb-12 w-full max-w-4xl">
                <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2 animate-pulse">
                    Delivered Projects
                </h3>
                <div className="h-[1px] w-16 bg-white/20 mx-auto mb-4" />
                <p className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] font-light uppercase">
                    Showcasing excellence in digital solutions
                </p>
            </div>

            {/* Static Grid of Cards - Reduced Size */}
            <div className="relative z-20 flex flex-wrap justify-center gap-6 px-4 max-w-7xl w-full mb-12">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
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
                    Interactive Project Showcase • Vexiro
                </p>
            </div>

            {/* Gradient Overlay for Fade Out */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#050507] to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default WorkSection;
