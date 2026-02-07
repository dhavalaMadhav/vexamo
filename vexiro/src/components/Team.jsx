import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, useInView } from 'framer-motion';
import TextReveal from './TextReveal';

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(1);
    
    // OPTIMIZATION: Only run animation frame when in view
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "100px" });

    useAnimationFrame((t, delta) => {
        if (!isInView) return; // Stop loop if off-screen

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div ref={containerRef} className="parallax-text-wrap overflow-hidden whitespace-nowrap flex flex-nowrap m-0 leading-[0.8]">
            <motion.div className="flex whitespace-nowrap flex-nowrap items-center text-4xl md:text-7xl font-black uppercase tracking-tighter" style={{ x }}>
                {/* Repeat children for infinite effect */}
                {[...Array(8)].map((_, i) => (
                    <span key={i} className="block mr-8 md:mr-16">
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

const Team = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

//     const smoothProgress = useSpring(scrollYProgress, { ... }); // Removed for performance unification with Lenis

    // Modified animations for a more "cinematic window" feel
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]); // Reduced scale for less jarring effect
    
    // Morph from rectangle to a cinematic pill/window shape
    const borderRadius = useTransform(scrollYProgress, [0.1, 0.5], ["0px", "160px"]); 
    
    // Text Reveal logic
    const textOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const topTextY = useTransform(scrollYProgress, [0.35, 0.55], [100, 0]);
    const bottomTextY = useTransform(scrollYProgress, [0.35, 0.55], [-100, 0]);

    // Header fade out as image shrinks
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <section
            id="team"
            ref={targetRef}
            className="relative h-[250vh] bg-transparent" // Reduced height slightly to optimize scroll
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">

                {/* Main Heading - Classic Style */}
                 <motion.div 
                    className="absolute top-[15%] z-30 text-center"
                    style={{ opacity: headerOpacity }}
                >
                     <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2 relative inline-block text-white">
                        <TextReveal>OUR TEAM</TextReveal>
                    </h2>
                     <p className="text-[10px] md:text-xs tracking-[0.3em] font-light uppercase text-white/50">
                        The minds behind the magic
                    </p>
                </motion.div>


                {/* Background Text */}
                <motion.div
                    className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    <motion.div className="w-full relative bg-transparent py-4 mix-blend-overlay" style={{ y: topTextY }}>
                        <ParallaxText baseVelocity={-1.5}>
                            <span className="text-white/20 font-black">CREATIVE • DEVELOPERS •</span>
                        </ParallaxText>
                    </motion.div>

                    <div className="h-[20px] w-full" />

                    <motion.div className="w-full relative bg-transparent py-4 mix-blend-overlay" style={{ y: bottomTextY }}>
                        <ParallaxText baseVelocity={1.5}>
                            <span className="text-white/20 font-black">DESIGNERS • STRATEGISTS •</span>
                        </ParallaxText>
                    </motion.div>
                </motion.div>

                {/* Foreground Image - Cinematic Shape */}
                <motion.div
                    className="relative z-20 overflow-hidden shadow-2xl"
                    style={{
                        scale,
                        width: 'clamp(300px, 85vw, 900px)', // Wider cinematic aspect
                        height: 'clamp(200px, 60vh, 500px)',
                        borderRadius
                    }}
                >
                    <div className="w-full h-full bg-neutral-900 absolute inset-0 border border-white/10" /> {/* Base background to prevent glitching */}
                    <img
                        src={`/vexamo-team.jpeg`}
                        alt="Visual of Team Vexiro"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                         onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-800');
                            e.target.parentElement.innerHTML += '<div class="text-center"><span class="text-white/20 font-bold uppercase tracking-widest text-xl block mb-2">Team Vexamo</span><span class="text-white/10 text-xs tracking-widest uppercase">Visual Loading...</span></div>';
                        }}
                    />
                    {/* Cinematic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                    
                    {/* Names Overlay on Image - Revealed when rounded */}
                    <motion.div 
                        className="absolute bottom-10 left-0 right-0 text-center z-30 flex flex-col gap-2"
                        style={{ opacity: textOpacity }}
                    > 
                         <div className="flex justify-center gap-8 text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 uppercase">
                             <span>Madhav Dhavala</span>
                             <span>•</span>
                             <span>Prabha</span>
                         </div>
                         <div className="flex justify-center gap-8 text-[10px] md:text-xs tracking-[0.2em] font-medium text-white/80 uppercase">
                             <span>Baradhwaj</span>
                             <span>•</span>
                             <span>Uday Vamsi</span>
                         </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};
export default Team;