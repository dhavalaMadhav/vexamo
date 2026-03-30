import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CurvedDivider = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const startOffset = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden -mt-1 -mb-1 z-20 pointer-events-none">
            <svg
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="w-full h-full block"
            >
                {/* 
                  Milder Curve & Larger Band:
                  Thicker stroke (200) and less amplitude in the curve coordinates.
                */}
                <path
                    id="curvePath"
                    d="M-50,160 C450,230 990,90 1490,160"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="200"
                />

                <text width="100%" dy="20">
                    <motion.textPath
                        xlinkHref="#curvePath"
                        startOffset={startOffset}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[60px] md:text-[100px] font-black uppercase tracking-tighter"
                        fill="#000000"
                    >
                        DELIVERED PROJECTS • SELECTED WORK • VEXAMO STUDIO • DELIVERED PROJECTS • SELECTED WORK •
                    </motion.textPath>
                </text>
            </svg>
        </div>
    );
};

export default CurvedDivider;
