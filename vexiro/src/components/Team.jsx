import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

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
    useAnimationFrame((t, delta) => {
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
        <div className="parallax-text-wrap overflow-hidden whitespace-nowrap flex flex-nowrap m-0 leading-[0.8]">
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
    // Ref to track scroll progress of this specific section
    const targetRef = useRef(null);

    // Track scroll progress: 0 when top enters viewport, 1 when bottom leaves
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Smooth the scroll progress for fluid easing
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Animations based on scroll progress
    // Phase 1: Image Shrink (0% -> 50% scroll)
    // Starts at scale 1.5 (reduced per request), shrinks to 1.
    const scale = useTransform(smoothProgress, [0, 0.5], [1.5, 1]);

    // Image Border Radius: Square -> Rounded
    const borderRadius = useTransform(smoothProgress, [0.2, 0.5], ["0px", "60px"]);

    // Phase 2: Text Reveal (40% -> 60% scroll)
    const textOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
    const topTextY = useTransform(smoothProgress, [0.4, 0.6], [100, 0]);
    const bottomTextY = useTransform(smoothProgress, [0.4, 0.6], [-100, 0]);

    return (
        <section
            id="team"
            ref={targetRef}
            className="relative h-[300vh] bg-transparent" // Tall container for scroll distance
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">

                {/* 
                   Background Content (Text Rows)
                   These are logically "behind" the image interaction but visually around it.
                   They fade in as the image shrinks to reveal them.
                */}
                <motion.div
                    className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none"
                    style={{ opacity: textOpacity }}
                >
                    {/* Row 1 */}
                    <motion.div className="w-full relative bg-transparent py-2" style={{ y: topTextY }}>
                        <ParallaxText baseVelocity={-2}>
                            <span className="text-white/20 font-black">BARADHWAJ • UDAY VAMSI •</span>
                        </ParallaxText>
                    </motion.div>

                    {/* Spacer for Image - Minimal height */}
                    <div className="h-[10px] w-full" />

                    {/* Row 2 */}
                    <motion.div className="w-full relative bg-transparent py-2" style={{ y: bottomTextY }}>
                        <ParallaxText baseVelocity={2}>
                            <span className="text-white/20 font-black">CHARAN SAI • MADHAV DHAVALA •</span>
                        </ParallaxText>
                    </motion.div>
                </motion.div>

                {/* 
                   Foreground Content (The Image)
                   Centered via Flexbox (parent has justify-center items-center).
                   Z-index 20 to ensure it stays on top.
                */}
                <motion.div
                    className="relative z-20 overflow-hidden shadow-2xl group"
                    style={{
                        scale,
                        width: 'clamp(300px, 80vw, 600px)',
                        height: 'clamp(250px, 50vh, 400px)',
                        borderRadius
                    }}
                >
                    <div className="w-full h-full bg-neutral-900/50 backdrop-blur-sm border-2 border-white/30 relative">
                        <img
                            src={`/vexamo-team.jpeg`}
                            alt="Visual of Team Vexamo"
                            className="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-800');
                                e.target.parentElement.innerHTML += '<span class="text-white/20 font-bold uppercase tracking-widest">Team Vexamo</span>';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                        {/* Start Title Overlay */}
                        <div className="absolute top-6 left-0 w-full text-center z-30 pointer-events-none">
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                                OUR TEAM
                            </h3>
                            <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] mt-1 font-light drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                The Minds Behind Vexamo
                            </p>
                        </div>

                        {/* End Names Overlay */}
                        <div className="absolute bottom-6 left-0 w-full text-center z-30 pointer-events-none px-4">
                            <p className="text-white text-xs md:text-sm uppercase tracking-widest font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-relaxed">
                                Baradhwaj • Uday Vamsi • Charan Sai • Madhav Dhavala
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
export default Team;
