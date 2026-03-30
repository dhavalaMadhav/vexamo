import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Sub-Components for Services Visuals ---

const WebDevVisual = () => (
  <div className="visual-container-services">
    <div className="code-window-header-services">
      <div className="window-dots-services">
        <div className="dot-services red-services" />
        <div className="dot-services yellow-services" />
        <div className="dot-services green-services" />
      </div>
      <div className="window-title-services">website.jsx</div>
    </div>
    <div className="code-content-services">
      <div className="code-line-services"><span className="code-tag-services">&lt;Website</span> <span className="code-attr-services">performance</span>=<span className="code-value-services">"optimal"</span></div>
      <div className="code-line-services">  <span className="code-attr-services">scalability</span>=<span className="code-value-services">"unlimited"</span></div>
      <div className="code-line-services">  <span className="code-attr-services">technology</span>=<span className="code-value-services">"next-gen"</span><span className="code-tag-services">&gt;</span></div>
      <div className="code-line-services">  <span className="code-tag-services">&lt;UserExperience</span> <span className="code-attr-services">quality</span>=<span className="code-value-services">"exceptional"</span><span className="code-tag-services">/&gt;</span></div>
      <div className="code-line-services">  <span className="code-tag-services">&lt;BusinessResults</span> <span className="code-attr-services">growth</span>=<span className="code-value-services">"accelerated"</span><span className="code-tag-services">/&gt;</span></div>
      <div className="code-line-services"><span className="code-tag-services">&lt;/Website&gt;</span></div>
      <div className="code-line-services code-comment-services">{'// Crafted by VEXAMO'}</div>
    </div>
  </div>
);

const LogoDesignVisual = () => (
  <div className="visual-container-services">
    <div className="logo-design-visual-services">
      <img
        src="/vexamo.svg"
        alt="Vexamo Logo"
        className="w-[180px] h-[180px] object-contain flex-shrink-0 invert brightness-0"
      />
      <div className="logo-info-services">
        <h4>Brand Identity System</h4>
        <p>Scalable vector logo with full visual identity guidelines. Perfect for all applications and screen sizes.</p>
      </div>
    </div>
  </div>
);

const VideoEditVisual = () => {
  const waveformBars = useMemo(() => [...Array(50)].map((_, i) => (
    <div key={i} className="waveform-bar-services" style={{ '--i': i }} />
  )), []);

  return (
    <div className="visual-container-services">
      <div className="video-editor-container-services">
        <div className="video-preview-services" style={{ boxShadow: '0 4px 20px rgba(64, 158, 255, 0.15)' }}>
          <div className="video-preview-screen-services">
            <div className="video-waveform-services">
              {waveformBars}
            </div>
          </div>
          <div className="video-controls-services">
            <div className="control-btn-services skip-back-services" />
            <div className="control-btn-services rewind-services" />
            <div className="control-btn-services play-services" />
            <div className="control-btn-services forward-services" />
            <div className="control-btn-services skip-forward-services" />
          </div>
        </div>
        <div className="video-timeline-services">
          <div className="timeline-track-services">
            <div className="timeline-progress-services" />
            <div className="timeline-clips-services">
              <div className="timeline-clip-services" style={{ background: 'linear-gradient(45deg, rgba(64,158,255,0.4), rgba(64,158,255,0.1))' }} />
              <div className="timeline-clip-services" style={{ background: 'linear-gradient(45deg, rgba(138,61,255,0.4), rgba(138,61,255,0.1))' }} />
              <div className="timeline-clip-services" style={{ background: 'linear-gradient(45deg, rgba(61,122,255,0.4), rgba(61,122,255,0.1))' }} />
              <div className="timeline-clip-services" style={{ background: 'linear-gradient(45deg, rgba(61,255,214,0.4), rgba(61,255,214,0.1))' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Circle3DBackground = ({ type }) => (
  <div className={`circles-container-services ${type}`}>
    <div className="circle-3d-services circle-1-services" />
    <div className="circle-3d-services circle-2-services" />
    <div className="circle-3d-services circle-3-services" />
    <div className="circle-3d-services circle-4-services" />
  </div>
);

// --- Main Component ---

// --- Connector Line Component ---
const ServicesConnector = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none w-full h-full hidden lg:block">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* 
                  Path Logic:
                  1. Starts at approx 25% X (Left Visual Center) near top.
                  2. curves to 75% X (Right Visual Center) in middle.
                  3. curves back to 25% X (Left Visual Center) near bottom.
                  
                  Coordinates (Percentage based):
                  M 25,15 (Visual 1)
                  C 25,30 75,40 75,50 (Curve to Visual 2)
                  C 75,60 25,70 25,85 (Curve to Visual 3)
                */}
        <motion.path
          d="M 20,15 C 20,35 80,35 80,50 C 80,65 20,65 20,85"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
            opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1])
          }}
        />
      </svg>
    </div>
  );
};

// --- Main Component ---

const Services = () => {
  const wrapperRef = useRef(null);

  const services = useMemo(() => [
    {
      title: 'Website Development',
      desc: 'High-performance, scalable, modern websites engineered for real-world businesses.',
      type: 'web-dev',
      dotColor: '#ff7a3d', // Matching visual colors
      glowClass: 'glow-web-dev',
      features: [
        'Custom responsive web applications',
        'E-commerce solutions with seamless checkout',
        'CMS integration and content strategy',
        'Performance optimization and SEO',
        'Ongoing maintenance and support'
      ]
    },
    {
      title: 'Logo & Brand Identity',
      desc: 'Minimal, memorable brand identities crafted with precision and strategy.',
      type: 'logo-design',
      dotColor: '#8a3dff',
      glowClass: 'glow-logo-design',
      features: [
        'Strategic brand discovery and positioning',
        'Logo design with conceptual depth',
        'Complete visual identity systems',
        'Brand guidelines and implementation',
        'Adaptive logos for various applications'
      ]
    },
    {
      title: 'Video Editing & Motion',
      desc: 'Cinematic edits and motion visuals designed to capture attention instantly.',
      type: 'video-edit',
      dotColor: '#409eff',
      glowClass: 'glow-video-edit',
      features: [
        'Commercial and promotional video editing',
        '2D/3D motion graphics and animation',
        'Social media video content creation',
        'Color grading and visual effects',
        'Sound design and audio enhancement'
      ]
    }
  ], []);

  // --- Curve Implementation ---





  return (
    <>
      <style>{`
        .vixora-services-wrapper {
          position: relative;
          background: transparent;
        }

        /* Styling from user snippet */
        .vixora-services-section {
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          padding: 64px 0;
          position: relative;
          overflow: hidden;
        }

        .section-header-container {
          text-align: center;
          margin-bottom: 100px;
          padding: 0 16px;
          position: relative;
          z-index: 20;
        }

        .section-title-services {
            display: block;
            color: inherit;
        }



        .header-divider-services {
          height: 1px;
          width: 64px;
          background: rgba(255, 255, 255, 0.2);
          margin: 0 auto 16px;
        }

        .section-subtitle-services {
          color: rgba(255, 255, 255, 0.4);
          font-size: clamp(10px, 2vw, 12px);
          letter-spacing: 0.3em;
          font-weight: 300;
          text-transform: uppercase;
        }

        /* Original Vertical Stack Layout */
        .services-stack {
          display: flex;
          flex-direction: column;
          gap: 60px;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative; /* Essential for absolute connector */
        }

        .service-block {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 80px;
          z-index: 10;
        }

        .service-block.layout-normal { flex-direction: row; }
        .service-block.layout-reverse { flex-direction: row-reverse; }

        .service-visual-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          position: relative;
        }
        
        .service-visual-container {
           width: 100%;
           max-width: 550px;
           position: relative;
        }

        .service-details-wrapper {
          flex: 1;
          padding: 40px 0;
        }

        .service-index {
          font-size: 14px;
          letter-spacing: 0.4em;
          opacity: 0.3;
          margin-bottom: 12px;
          display: block;
          font-weight: 600;
          transition: all 0.5s ease;
        }
        
        .service-index.active {
          opacity: 1;
          text-shadow: 0 0 20px currentColor;
        }

        .service-details-wrapper h3 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #ffffff;
          letter-spacing: -0.025em;
        }

        .service-details-wrapper p {
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.625;
          margin-bottom: 2rem;
          font-size: 1rem;
          font-weight: 400;
          max-width: 480px;
        }

        @media (min-width: 768px) {
            .service-details-wrapper p {
                font-size: 0.75rem; /* text-xs */
            }
        }

        /* Features List */
        .service-features-services {
          list-style: none;
          margin-bottom: 40px;
          padding: 0;
        }

        .service-feature-li-services {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 16px;
          font-weight: 300;
          position: relative;
          padding-left: 28px;
        }

        .service-feature-li-services::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 10px;
          height: 16px;
          border-right: 2.5px solid #ffffff;
          border-bottom: 2.5px solid #ffffff;
          border-radius: 1px;
        }

        /* Right Alignment for Reverse Layout (Logo & Brand Identity) */
        .layout-reverse { gap: 40px; } /* Closer gap */
        
        .layout-reverse .service-details-wrapper {
          text-align: left; /* Changed to left */
          align-items: flex-start; /* Changed to start */
          display: flex;
          flex-direction: column;
          padding-left: 10%; /* Indent to match visual card alignment */
        }

        .layout-reverse .service-details-wrapper p {
          margin-left: 0;
          margin-right: auto;
        }

        .layout-reverse .service-features-services {
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Changed to start */
        }

        .layout-reverse .service-feature-li-services {
          padding-left: 28px; /* Reverted padding */
          padding-right: 0;
          flex-direction: row; /* Reverted direction */
          text-align: left;
        }

        .layout-reverse .service-feature-li-services::before {
          left: 0; /* Reverted position */
          right: auto;
          transform: translateY(-50%) rotate(45deg); /* Standard rotation */
        }

        .service-link-services {
          display: inline-flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.1em;
          font-size: 12px;
          text-transform: uppercase;
          padding: 12px 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .service-link-services:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          box-shadow: -4px 4px 10px rgba(255, 255, 255, 0.2);
        }

        /* Visuals & Glows from Snippet/Original */
        .visual-container-services {
          width: 100%;
          background: radial-gradient(circle at top left, rgba(255,255,255,0.15), transparent 40%), rgba(255, 255, 255, 0.03); /* Corner Shine + Glass Base */
          backdrop-filter: blur(25px); /* Stronger Blur */
          -webkit-backdrop-filter: blur(25px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1); /* Slightly more visible border */
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle depth */
          padding: 32px;
          overflow: hidden;
          position: relative;
          z-index: 10;
        }

        .center-glow-services {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 600px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        .glow-web-dev { background: radial-gradient(circle, rgba(255, 122, 61, 0.9) 0%, rgba(255, 122, 61, 0) 65%); }
        .glow-logo-design { background: radial-gradient(circle, rgba(138, 61, 255, 0.9) 0%, rgba(138, 61, 255, 0) 65%); }
        .glow-video-edit { background: radial-gradient(circle, rgba(64, 158, 255, 0.9) 0%, rgba(64, 158, 255, 0) 65%); }
        
        /* Floating Circles */
        .circles-container-services { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
        .circle-3d-services { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.6; animation: float-services 15s infinite ease-in-out; }
        .circle-1-services { width: 300px; height: 300px; top: 10%; left: 10%; animation-delay: 0s; }
        .circle-2-services { width: 400px; height: 400px; bottom: 10%; right: 10%; animation-delay: 2s; }
        .circle-3-services { width: 250px; height: 250px; top: 40%; right: 20%; animation-delay: 4s; }
        .circle-4-services { width: 200px; height: 200px; bottom: 30%; left: 20%; animation-delay: 6s; }
        .web-dev .circle-1-services { background: radial-gradient(circle, #ff7a3d 0%, rgba(255, 122, 61, 0) 70%); }
        .web-dev .circle-2-services { background: radial-gradient(circle, #3d7aff 0%, rgba(61, 122, 255, 0) 70%); }
        .web-dev .circle-3-services { background: radial-gradient(circle, #3dffd6 0%, rgba(61, 255, 214, 0) 70%); }
        .web-dev .circle-4-services { background: radial-gradient(circle, #ff7a3d 0%, rgba(255, 122, 61, 0) 70%); }
        /* Add other color mappings as needed */
        
        @keyframes float-services {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* SVG Components Styles */
        /* Visuals Colors from Reference */
        .code-window-header-services { display: flex; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .window-dots-services { display: flex; gap: 8px; margin-right: 20px; }
        .dot-services { width: 12px; height: 12px; border-radius: 50%; }
        .dot-services.red-services { background: #ff5f56; }
        .dot-services.yellow-services { background: #ffbd2e; }
        .dot-services.green-services { background: #27ca3f; }
        .window-title-services { color: #7a7f89; font-size: 14px; font-weight: 500; }
        .code-content-services { font-family: 'Monaco', 'Menlo', monospace; font-size: 16px; color: #a1a1b3; line-height: 1.6; }
        .code-line-services { margin-bottom: 8px; }
        .code-comment-services { color: #b0b0c0; text-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
        .code-tag-services { color: #ff7a3d; text-shadow: 0 0 10px rgba(255, 122, 61, 0.4); font-weight: 600; }
        .code-attr-services { color: #b388ff; text-shadow: 0 0 10px rgba(179, 136, 255, 0.4); font-style: italic; }
        .code-value-services { color: #29ffc6; text-shadow: 0 0 10px rgba(41, 255, 198, 0.4); font-weight: 600; }
        
        /* Web Dev Specific Overrides for "Bold Modern" Look */
        .web-dev .visual-container-services {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        
        .web-dev .code-window-header-services {
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(0, 0, 0, 0.2);
            margin: -32px -32px 24px -32px;
            padding: 16px 32px;
        }

        .logo-design-visual-services { display: flex; align-items: center; justify-content: flex-start; width: 100%; height: 100%; gap: 20px; }

        .logo-info-services { color: #a1a1b3; font-size: 14px; line-height: 1.6; }
        .logo-info-services h4 { color: #ffffff; font-size: 18px; margin-bottom: 12px; font-weight: 600; }

        .video-editor-container-services { width: 100%; height: 450px; display: flex; flex-direction: column; position: relative; z-index: 1; }
        .video-preview-services { flex: 1; background: rgba(10, 10, 20, 0.9); border-radius: 12px 12px 0 0; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .video-preview-screen-services { width: 90%; height: 80%; background: rgba(0, 0, 0, 0.8); border-radius: 8px; position: relative; overflow: hidden; }
        .video-waveform-services { position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: rgba(255, 255, 255, 0.05); display: flex; align-items: flex-end; padding: 0 10px; }
        .waveform-bar-services { flex: 1; margin: 0 1px; background: linear-gradient(to top, #409eff, #8a3dff); height: 20px; animation: waveform-services 1.5s infinite ease-in-out; animation-delay: calc(var(--i) * 0.1s); }
        @keyframes waveform-services { 0%, 100% { height: 20px; } 50% { height: 40px; } }
        .video-timeline-services { height: 80px; background: rgba(30, 30, 40, 0.8); border-radius: 0 0 12px 12px; padding: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
        .timeline-track-services { height: 100%; position: relative; background: rgba(0, 0, 0, 0.3); border-radius: 8px; overflow: hidden; }
        .timeline-progress-services { position: absolute; left: 0; top: 0; height: 100%; width: 45%; background: linear-gradient(90deg, rgba(64, 158, 255, 0.4), rgba(138, 61, 255, 0.2)); border-right: 2px solid #409eff; }
        .timeline-clips-services { position: absolute; inset: 0; display: flex; padding: 10px; gap: 10px; }
        .timeline-clip-services { height: 100%; border-radius: 4px; flex: 1; background: rgba(255, 255, 255, 0.1); position: relative; overflow: hidden; }
        .video-controls-services { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 16px; align-items: center; background: rgba(0, 0, 0, 0.7); padding: 10px 20px; border-radius: 999px; backdrop-filter: blur(10px); }
        .control-btn-services { width: 40px; height: 40px; border-radius: 50%; background: rgba(15, 15, 25, 0.9); border: 1px solid rgba(255, 255, 255, 0.18); display: flex; align-items: center; justify-content: center; position: relative; color: #ffffff; }
        .control-btn-services::before, .control-btn-services::after { content: ""; position: absolute; }
        .control-btn-services.skip-back-services::before { width: 3px; height: 14px; background: #ffffff; left: 12px; top: 50%; transform: translateY(-50%); border-radius: 2px; }
        .control-btn-services.skip-back-services::after { border-style: solid; border-width: 7px 8px 7px 0; border-color: transparent #ffffff transparent transparent; right: 10px; top: 50%; transform: translateY(-50%); }
        .control-btn-services.rewind-services::before { border-style: solid; border-width: 7px 8px 7px 0; border-color: transparent #ffffff transparent transparent; left: 10px; top: 50%; transform: translateY(-50%); }
        .control-btn-services.rewind-services::after { border-style: solid; border-width: 7px 8px 7px 0; border-color: transparent #ffffff transparent transparent; right: 10px; top: 50%; transform: translateY(-50%); }
        .control-btn-services.play-services::before { border-style: solid; border-width: 8px 0 8px 14px; border-color: transparent transparent transparent #ffffff; left: 50%; top: 50%; transform: translate(-40%, -50%); }
        .control-btn-services.forward-services::before { border-style: solid; border-width: 7px 0 7px 8px; border-color: transparent transparent transparent #ffffff; left: 10px; top: 50%; transform: translateY(-50%); }
        .control-btn-services.forward-services::after { border-style: solid; border-width: 7px 0 7px 8px; border-color: transparent transparent transparent #ffffff; right: 10px; top: 50%; transform: translateY(-50%); }
        .control-btn-services.skip-forward-services::before { border-style: solid; border-width: 7px 0 7px 8px; border-color: transparent transparent transparent #ffffff; left: 10px; top: 50%; transform: translateY(-50%); }
        .control-btn-services.skip-forward-services::after { width: 3px; height: 14px; background: #ffffff; right: 12px; top: 50%; transform: translateY(-50%); border-radius: 2px; }

        @media (max-width: 1024px) {
          .service-block.layout-normal,
          .service-block.layout-reverse {
            flex-direction: column; /* Changed from column-reverse to column */
            gap: 16px; /* Reduced gap between internal elements */
            text-align: left;
            padding: 12px 0; /* Reduced from 24px */
            min-height: auto;
            justify-content: center;
            align-items: flex-start;
          }
          
           /* Reduce Stack Gap & Matching Hero Padding */
           .services-stack {
             gap: 12px; 
             padding: 0 24px; /* px-6 equivalent */
           }
           @media (min-width: 768px) {
             .services-stack { padding: 0 48px; } /* px-12 equivalent */
           }
           
            /* Ordering Logic for Mobile */
            .service-details-wrapper { order: 1; width: 100%; }
            .service-visual-wrapper { order: 2; width: 100%; }
            /* Mobile Button is duplicated in JSX, handled there */

            .service-details-wrapper h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
            .service-details-wrapper p { 
              margin: 0 0 1rem 0; 
              font-size: 0.8rem; 
              line-height: 1.4; 
              font-weight: 300; /* Match list items */
              color: rgba(255, 255, 255, 0.4); /* Match list items */
            }
            
            /* Show 3 points instead of 2 */
            .service-features-services li:nth-child(n+4) {
              display: none;
            }
            
            .service-features-services { text-align: left; display: block; width: 100%; font-size: 0.8rem; margin-bottom: 1rem; }
            
            /* Gap Reduction */
            .section-header-container {
              margin-bottom: 20px; /* Reduced from 40px */
            }
            
            .service-feature-item-services { margin-bottom: 4px; padding-left: 16px; }
           .service-link-services { margin: 0; }
           
           /* Reset specific reverse alignments for mobile */
           .layout-reverse .service-details-wrapper {
             align-items: flex-start;
             padding-left: 0;
             text-align: left;
           }
           .layout-reverse .service-features-services { align-items: flex-start; }
           .layout-reverse .service-feature-li-services { padding-left: 28px; padding-right: 0; flex-direction: row; text-align: left; }
           .layout-reverse .service-feature-li-services::before { left: 0; right: auto; transform: translateY(-50%) rotate(45deg); }
           
           /* Compact Visuals for Mobile */
           .service-visual-wrapper {
             width: 100%;
             display: flex;
             justify-content: center;
             margin-bottom: 20px;
           }
           
           .visual-container-services {
             padding: 16px;
             width: 100%;
           }

           /* Video Edit: Refined for Mobile */
           .video-editor-container-services {
             height: auto;
             width: 100%;
             transform: none;
             aspect-ratio: 16/9;
             margin: 0;
           }
           /* Ensure internal video elements scale with width */
           .video-preview-services { flex: 1; min-height: 150px; }
           .video-timeline-services { height: 60px; min-height: 60px; }

           /* Logo Design: Column layout */
           .logo-design-visual-services {
             flex-direction: column;
             justify-content: center;
             gap: 16px;
             text-align: center;
           }
           
           /* Web Dev Specific */
           .web-dev .service-visual-container {
             max-height: 45vh;
             display: flex;
             align-items: center;
             justify-content: center;
           }
           
           
           /* Remove box/background for Web Dev on Mobile - RESTORED to Standard but ensured no double layering */
           .web-dev .visual-container-services {
             /* User said: "behind the box... there's a light box seen behind... i want it clean"
                Then in Round 5: "nontext card in wesite development should have proper padding and border radius"
                So I will use the standard .visual-container-services styles but ensure no double-background on inner elements.
             */
             padding: 16px;
             border-radius: 24px;
             /* Ensure standard glass settings from .visual-container-services apply */
             background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
             overflow: hidden;
           }
            .web-dev .code-window-header-services {
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              margin: -16px -16px 12px -16px;
              padding: 12px 16px;
              display: flex; /* Ensure flex for alignment */
            }
           .web-dev .visual-container-services {
             max-height: 100%;
             overflow: hidden;
           }
           .web-dev .code-content-services {
             font-size: 11px; /* Smaller font */
             text-align: left !important; /* Force left align */
             line-height: 1.4;
           }
        }
      `}</style>

      <div id="our-services" className="vixora-services-wrapper bg-transparent" ref={wrapperRef}>
        <motion.section
          className="vixora-services-section bg-transparent"
        >
          <motion.div
            className="section-header-container"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
          >
            <h2 className="text-[clamp(1.5rem,8vw,3.5rem)] md:text-6xl font-black tracking-tighter uppercase mb-4 relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              OUR SERVICES
              <div className="absolute -bottom-2 left-0 w-full h-4 -z-10">
                <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M2.00025 7.00001C35.9529 3.01602 125.792 -2.12693 197.994 3.00631" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </h2>
            {/* <div className="header-divider-services" /> */}
            <p className="section-subtitle-services mt-4 bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/50">
              Bespoke digital excellence for forward-thinking brands
            </p>
          </motion.div>

          <div className="services-stack">
            {/* Connector Line absolute to stack */}
            <ServicesConnector />

            {services.map((service, idx) => {
              const Visual = service.type === 'web-dev' ? WebDevVisual :
                service.type === 'logo-design' ? LogoDesignVisual :
                  VideoEditVisual;

              const layoutClass = idx % 2 === 0 ? 'layout-normal' : 'layout-reverse';

              return (
                <motion.div
                  key={idx}
                  className={`service-block ${layoutClass} ${service.type}`}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0 }}
                >

                  {/* Visual Side */}
                  <div className="service-visual-wrapper">
                    <div className="service-visual-container">
                      <div className={`center-glow-services ${service.glowClass}`} />
                      <Circle3DBackground type={service.type} />
                      <Visual />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="service-details-wrapper">
                    <span
                      className="service-index"
                      style={{ color: '#ffffff' }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">{service.title}</h3>
                    <p>{service.desc}</p>
                    <ul className="service-features-services">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="service-feature-li-services">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {/* Main Button - Visible on Mobile (under text) and Desktop */}
                    <button
                      className="service-link-services relative overflow-hidden w-auto lg:w-auto justify-center lg:justify-start mt-4 lg:mt-0"
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      {/* Top Border Shine */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)',
                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
                        }}
                      />
                      Explore {service.title.split(' ')[0]} Services
                    </button>
                  </div>



                  {/* Mobile Partition Line - Centered in Gap */}
                  <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent lg:hidden" />

                </motion.div >
              );
            })}
          </div >
        </motion.section >
      </div >
    </>
  );
};

export default Services;
