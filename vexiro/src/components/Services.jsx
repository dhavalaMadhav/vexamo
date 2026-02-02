import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

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
      <div className="code-line-services code-comment-services">{'// Crafted by VIXORA'}</div>
    </div>
  </div>
);

const LogoDesignVisual = () => (
  <div className="visual-container-services">
    <div className="logo-design-visual-services">
      <div className="vixora-logo-services" />
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
        <div className="video-preview-services">
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

const ServiceLayer = ({ service, zIndex, clipPathStyle }) => {
  const Visual = useMemo(() => {
    switch (service.type) {
      case 'web-dev': return WebDevVisual;
      case 'logo-design': return LogoDesignVisual;
      case 'video-edit': return VideoEditVisual;
      default: return null;
    }
  }, [service.type]);

  return (
    <div 
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#050507]"
      style={{ zIndex, ...(clipPathStyle && { clipPath: clipPathStyle }) }}
    >
      <div className={`center-glow-services ${service.glowClass}`} />
      <div className="service-container-services">
        <motion.div 
          className="service-content-services"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <div className={`service-visual-services ${service.type}`}>
            <Circle3DBackground type={service.type} />
            <Visual />
          </div>
          <div className="service-details-services">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <ul className="service-features-services">
              {service.features.map((feature, idx) => (
                <li key={idx} className={`service-feature-li-services${idx >= 2 ? ' hide-mobile-services' : ''}`}>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className="service-link-services"
              onClick={() => window.location.href = `mailto:hello@vixora.com?subject=Inquiry: ${service.title}`}
            >
              Explore {service.title.split(' ')[0]} Services
            </button>
          </div>
        </motion.div>
      </div>
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

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  // Apply smooth spring to scroll progress for a cinematic, inertial feel
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 40, // Lowered for calmer motion
    damping: 25,   // More "weight" to the animation
    restDelta: 0.001
  });

  // Calculate maximum radius for the clip-path
  const maxRadius = typeof window !== 'undefined' ? Math.hypot(window.innerWidth, window.innerHeight) * 1.2 : 2000;

  const clipPath1 = useTransform(smoothScrollProgress, [0.05, 0.45], [`circle(0px at center)`, `circle(${maxRadius}px at center)`]);
  const clipPath2 = useTransform(smoothScrollProgress, [0.45, 0.85], [`circle(0px at center)`, `circle(${maxRadius}px at center)`]);

  // --- Curve Implementation ---

  // Track the entry of the section into the viewport
  const { scrollYProgress: entryProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start start"]
  });

  // Map scrolling to curve depth (0 -> max -> 0)
  // Direct mapping ensures 1:1 control with no physics lag/inconsistencies
  // Range decreased slightly to 0.12 for a balanced, premium feel
  const curveDepth = useTransform(
    entryProgress,
    [0, 0.5, 1],
    [0, 0.12, 0]
  );

  // Convex Curve Path (Hill/Bulge Up)
  // M 0 ${depth}   -> Start at top-left, pushed down by depth
  // Q 0.5 0        -> Curve UP to the very top center (0)
  // 1 ${depth}     -> End at top-right, pushed down by depth
  // L 1 1          -> Line to bottom-right
  // L 0 1          -> Line to bottom-left
  // Z              -> Close
  const curveD = useMotionTemplate`M 0 ${curveDepth} Q 0.5 0 1 ${curveDepth} L 1 1 L 0 1 Z`;

  return (
    <>
      <style>{`
        .vixora-services-wrapper {
          height: 250vh;
          background: transparent;
        }

        .vixora-services-section {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: rgba(5, 5, 7, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          /* Curve managed by Framer Motion only */
        }

        .vixora-services-section .section-header-container {
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 20;
          padding: 0 16px;
          pointer-events: none;
        }

        .vixora-services-section h2 {
          color: #ffffff;
          font-size: clamp(2.25rem, 6vw, 3.75rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          margin-bottom: 8px;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          line-height: 1;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .7; }
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

        .section-title-services {
          display: block;
          color: inherit;
        }

        .stage-services {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
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

        .glow-web-dev { background: radial-gradient(circle, rgba(255, 122, 61, 0.7) 0%, rgba(255, 122, 61, 0) 65%); }
        .glow-logo-design { background: radial-gradient(circle, rgba(138, 61, 255, 0.7) 0%, rgba(138, 61, 255, 0) 65%); }
        .glow-video-edit { background: radial-gradient(circle, rgba(64, 158, 255, 0.7) 0%, rgba(64, 158, 255, 0) 65%); }

        .service-container-services {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          margin-top: 200px;
          position: relative;
          z-index: 10;
        }

        .service-content-services {
          width: 90%;
          max-width: 1400px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 80px;
        }

        .service-visual-services {
          flex: 1;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
        }

        .service-details-services {
          flex: 1;
          padding: 40px 0;
        }

        .service-details-services h3 {
          font-size: 1.875rem; /* 30px to match Work header if it was h4 but here h3 is main title */
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.25;
          color: #ffffff;
          letter-spacing: -0.025em;
        }

        .service-details-services p {
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.625;
          margin-bottom: 2rem;
          font-size: 0.75rem;
          font-weight: 300;
          max-width: 480px;
        }

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
        }

        .circles-container-services {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .circle-3d-services {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.6;
          animation: float-services 15s infinite ease-in-out;
        }

        .circle-1-services { width: 300px; height: 300px; top: 10%; left: 10%; animation-delay: 0s; }
        .circle-2-services { width: 400px; height: 400px; bottom: 10%; right: 10%; animation-delay: 2s; }
        .circle-3-services { width: 250px; height: 250px; top: 40%; right: 20%; animation-delay: 4s; }
        .circle-4-services { width: 200px; height: 200px; bottom: 30%; left: 20%; animation-delay: 6s; }

        .web-dev .circle-1-services { background: radial-gradient(circle, #ff7a3d 0%, rgba(255, 122, 61, 0) 70%); }
        .web-dev .circle-2-services { background: radial-gradient(circle, #3d7aff 0%, rgba(61, 122, 255, 0) 70%); }
        .web-dev .circle-3-services { background: radial-gradient(circle, #3dffd6 0%, rgba(61, 255, 214, 0) 70%); }
        .web-dev .circle-4-services { background: radial-gradient(circle, #ff7a3d 0%, rgba(255, 122, 61, 0) 70%); }

        .logo-design .circle-1-services { background: radial-gradient(circle, #ff7a3d 0%, rgba(255, 122, 61, 0) 70%); }
        .logo-design .circle-2-services { background: radial-gradient(circle, #8a3dff 0%, rgba(138, 61, 255, 0) 70%); }
        .logo-design .circle-3-services { background: radial-gradient(circle, #3d7aff 0%, rgba(61, 122, 255, 0) 70%); }
        .logo-design .circle-4-services { background: radial-gradient(circle, #3dffd6 0%, rgba(61, 255, 214, 0) 70%); }

        .video-edit .circle-1-services { background: radial-gradient(circle, #8a3dff 0%, rgba(138, 61, 255, 0) 70%); }
        .video-edit .circle-2-services { background: radial-gradient(circle, #3d7aff 0%, rgba(61, 122, 255, 0) 70%); }
        .video-edit .circle-3-services { background: radial-gradient(circle, #3dffd6 0%, rgba(61, 255, 214, 0) 70%); }
        .video-edit .circle-4-services { background: radial-gradient(circle, #ff7a3d 0%, rgba(255, 122, 61, 0) 70%); }

        @keyframes float-services {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        .visual-container-services {
          width: 90%;
          max-width: 550px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 32px;
          overflow: hidden;
          position: relative;
          z-index: 10;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
        }

        .code-window-header-services { display: flex; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .window-dots-services { display: flex; gap: 8px; margin-right: 20px; }
        .dot-services { width: 12px; height: 12px; border-radius: 50%; }
        .dot-services.red-services { background: #ff5f56; }
        .dot-services.yellow-services { background: #ffbd2e; }
        .dot-services.green-services { background: #27ca3f; }
        .window-title-services { color: #7a7f89; font-size: 14px; font-weight: 500; }
        .code-content-services { font-family: 'Monaco', 'Menlo', monospace; font-size: 16px; color: #a1a1b3; line-height: 1.6; }
        .code-line-services { margin-bottom: 8px; }
        .code-comment-services { color: #5a5a7a; }
        .code-tag-services { color: #ff7a3d; }
        .code-attr-services { color: #8a3dff; }
        .code-value-services { color: #ffffff; }

        .logo-design-visual-services { display: flex; align-items: center; justify-content: flex-start; width: 100%; height: 100%; gap: 20px; }
        .vixora-logo-services {
          width: 180px; height: 180px; background: linear-gradient(135deg, rgba(255, 122, 61, 0.1), rgba(138, 61, 255, 0.1));
          border-radius: 20px; padding: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .vixora-logo-services::before {
          content: 'VIXORA'; font-size: 36px; font-weight: 900; letter-spacing: 0.1em;
          background: linear-gradient(135deg, #ff7a3d 0%, #8a3dff 50%, #3d7aff 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent; text-align: center;
        }
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
          .service-container-services { margin-top: 140px; padding: 30px 20px; }
          .service-content-services { flex-direction: column; gap: 40px; }
          .service-visual-services { height: 400px; width: 100%; justify-content: center; }
          .service-details-services h3 { font-size: 42px; }
        }

        @media (max-width: 768px) {
          .vixora-services-section .section-header-container { top: 40px; }
          .service-container-services { margin-top: 100px; padding: 20px 16px; }
          .service-content-services { width: 100%; gap: 30px; }
          .service-visual-services { height: 320px; }
          .service-feature-li-services.hide-mobile-services { display: none; }
        }
      `}</style>

      <div id="our-services" className="vixora-services-wrapper" ref={wrapperRef}>
        {/* SVG Definition for the Curve Mask */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <defs>
            <clipPath id="service-curve-mask" clipPathUnits="objectBoundingBox">
              <motion.path d={curveD} />
            </clipPath>
          </defs>
        </svg>

        <motion.section 
          className="vixora-services-section"
          style={{ clipPath: "url(#service-curve-mask)" }}
        >
          <div className="section-header-container">
            <h2>OUR SERVICES</h2>
            <div className="header-divider-services" />
            <p className="section-subtitle-services">
              Bespoke digital excellence for forward-thinking brands
            </p>
          </div>
          <div className="stage-services">
            {/* Base Layer: Web Dev (always visible behind) */}
            <ServiceLayer service={services[0]} zIndex={1} />
            
            {/* Reveal Layer 1: Logo Design (clips over Web Dev) */}
            <motion.div style={{ clipPath: clipPath1, position: 'absolute', inset: 0, zIndex: 2 }}>
              <ServiceLayer service={services[1]} />
            </motion.div>

            {/* Reveal Layer 2: Video Edit (clips over Logo Design) */}
            <motion.div style={{ clipPath: clipPath2, position: 'absolute', inset: 0, zIndex: 3 }}>
              <ServiceLayer service={services[2]} />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Services;
