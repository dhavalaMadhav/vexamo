import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CurvedDivider = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const startOffset = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div className="relative w-full h-[150px] md:h-[200px] overflow-hidden -mt-1 -mb-1 z-20 pointer-events-none">
             {/* Background Gradient for Smooth Blend */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent z-0" />

            <motion.svg
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="w-full h-full block relative z-10"
                style={{ opacity }}
            >
                {/* 
                  Clean Band with Parallel Edges:
                  Using a single path with a thick stroke ensures the edges are mathematically parallel.
                */}
                <path
                    id="curvePath"
                    d="M-50,200 C300,380 1000,-100 1500,150"
                    fill="none"
                    stroke="rgba(255,255,255,0.03)" // Very subtle stroke
                    strokeWidth="140"
                />

                <text width="100%" dy="10">
                    <motion.textPath
                        xlinkHref="#curvePath"
                        startOffset={startOffset}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[30px] md:text-[50px] font-black uppercase tracking-tighter"
                        fill="rgba(255,255,255,0.1)" // Subtle Text fill
                    >
                        DELIVERED PROJECTS • SELECTED WORK • VEXAMO STUDIO • DELIVERED PROJECTS • SELECTED WORK •
                    </motion.textPath>
                </text>
            </motion.svg>
        </div>
    );
};

export default CurvedDivider;