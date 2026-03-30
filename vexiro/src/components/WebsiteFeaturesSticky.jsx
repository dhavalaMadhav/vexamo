import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WebsiteFeaturesSticky = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Features list
    const features = [
        "SEO Optimised",
        "Responsive Design",
        "High Performance",
        "Custom Analytics",
        "Dynamic Content",
        "Secure Hosting",
        "24/7 Support",
        "CMS Integration",
        "Social Media Links",
        "Contact Forms"
    ];

    return (
        <motion.div
            className="fixed right-0 top-[25%] -translate-y-1/2 z-50 flex items-start md:hidden"
            initial={false}
            animate={{ x: isOpen ? '0%' : 'calc(100% - 48px)' }} // Adjusted width for icon tag
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Tag (Visible Handle) */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer bg-white border border-white border-r-0 rounded-l-2xl py-4 px-3 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] relative h-auto"
                style={{ width: '48px', minHeight: '48px' }}
            >
                {/* Icons instead of Text */}
                <div className="text-black">
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    )}
                </div>

                {/* Connector visual to make it look attached */}
                <div className="absolute right-[-1px] top-0 bottom-0 w-[1px] bg-transparent z-10" />
            </div>

            {/* Content Box */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 w-72 shadow-2xl overflow-hidden relative rounded-bl-xl border-l-0">
                {/* Top Shine Effect */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8) 50%, transparent)',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                />

                <div className="p-5">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                        What We Provide
                    </h3>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#8a3dff]/20 flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8a3dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-white/80 text-xs font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">VEXAMO SOLUTIONS</span>
                    </div>
                </div>
            </div>

            {/* Backdrop to close when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-transparent -z-10"
                    style={{ marginLeft: '-100vw', width: '200vw', height: '200vh', marginTop: '-50vh' }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </motion.div>
    );
};

export default WebsiteFeaturesSticky;
