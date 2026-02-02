import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform, useSpring } from 'framer-motion';

// --- Utility: Custom Glow Texture ---
function useGlowTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);
}

// --- Persistent Particles Component ---
function PersistentParticles({ scrollYProgress, isMobile }) {
  const mesh = useRef();
  const texture = useGlowTexture();
  const { mouse, viewport } = useThree();
  const count = isMobile ? 600 : 1800;

  // Transform scroll progress to background properties
  // 0 -> Hero, 0.5 -> Transition/Start of Services, 1.0 -> Fully in Services
  const zOffset = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -5, -12]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -4]);
  // Fade in only after scrolling away from Hero
  const opacityFactor = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0, 0.1, 0.6, 0.4]);
  const parallaxFactor = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);

  // Use springs for smooth interpolation
  const springZ = useSpring(zOffset, { stiffness: 40, damping: 20 });
  const springY = useSpring(yOffset, { stiffness: 40, damping: 20 });
  const springOpacity = useSpring(opacityFactor, { stiffness: 60, damping: 25 });
  const springParallax = useSpring(parallaxFactor, { stiffness: 60, damping: 25 });

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      let tier = 1;
      if (r > 0.96) tier = 3; 
      else if (r > 0.75) tier = 2;

      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 16;

      let baseOpacity = 0.4; 
      let baseSize = 0.7;
      let baseSpeed = 0.01;
      
      if (tier === 2) {
        baseOpacity = 0.6; 
        baseSize = 1.0;
        baseSpeed = 0.02;
      } else if (tier === 3) {
        baseOpacity = 0.85;
        baseSize = 1.4;
        baseSpeed = 0.03;
      }

      temp.push({ 
        x, y, z, 
        initialX: x, initialY: y, initialZ: z,
        speed: Math.random() * 0.008 + baseSpeed,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '#4da0ff' : '#4dffeb',
        alpha: baseOpacity,
        size: baseSize,
        tier,
        pulseSpeed: Math.random() * 2 + 1
      });
    }
    return temp;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    particles.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      const c = new THREE.Color(p.color);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = p.size;
      alphas[i] = p.alpha;
    });

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    return geo;
  }, [particles, count]);

  const onBeforeCompile = useMemo(() => (shader) => {
    shader.vertexShader = `
      attribute float alpha;
      varying float vAlpha;
      ${shader.vertexShader}
    `.replace(
      `#include <color_vertex>`,
      `#include <color_vertex>
      vAlpha = alpha;`
    );
    shader.fragmentShader = `
      varying float vAlpha;
      ${shader.fragmentShader}
    `.replace(
      `#include <color_fragment>`,
      `#include <color_fragment>
      diffuseColor.a *= vAlpha;`
    );
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position.array;
    const sizes = mesh.current.geometry.attributes.size.array;
    const alphas = mesh.current.geometry.attributes.alpha.array;
    const currentZ = springZ.get();
    const currentY = springY.get();
    const currentP = springParallax.get();
    const currentOpacity = springOpacity.get();

    // THREE PHASES LOGIC (Arrival)
    const arrivalEase = Math.max(0, 3 - time) / 3; 

    // Calculate "Services Intensity" (0 when in Hero, 1 when deep in Services)
    const servicesIntensity = THREE.MathUtils.smoothstep(scrollYProgress.get(), 0.3, 0.8);

    particles.forEach((p, i) => {
      const i3 = i * 3;
      
      // Ambient Floating + Arrival Z-push
      positions[i3 + 1] += Math.sin(time * p.speed + p.phase) * 0.001;
      positions[i3] += Math.cos(time * p.speed + p.phase) * 0.001;
      positions[i3 + 2] += arrivalEase * 0.08; 

      // Section-specific Hovering (intensified in Services)
      const hoverIntensity = p.tier > 1 ? (0.001 + servicesIntensity * 0.004) : 0.001;
      positions[i3 + 1] += Math.sin(time * p.pulseSpeed * 0.5) * hoverIntensity;

      // Mouse Parallax (attenuated by scroll)
      const targetX = (mouse.x * viewport.width) / 100 * currentP;
      const targetY = (mouse.y * viewport.height) / 100 * currentP;
      
      positions[i3] += (targetX + p.initialX - positions[i3]) * 0.01; 
      positions[i3 + 1] += (targetY + p.initialY - positions[i3 + 1]) * 0.01;

      // Glow/Size Boost for Tier 2/3 in Services
      const pulse = 1 + Math.sin(time * p.pulseSpeed) * (0.2 + servicesIntensity * 0.3);
      if (p.tier > 1) {
        const sizeBoost = 1 + servicesIntensity * (p.tier === 3 ? 1.0 : 0.5);
        sizes[i] = p.size * sizeBoost * pulse;
        
        // Alpha Boost for intense glow in Services
        alphas[i] = THREE.MathUtils.lerp(p.alpha, 1.0, servicesIntensity);
      } else {
        sizes[i] = p.size * pulse;
        alphas[i] = p.alpha;
      }
    });

    mesh.current.position.z = currentZ;
    mesh.current.position.y = currentY;
    mesh.current.material.opacity = currentOpacity;

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.size.needsUpdate = true;
    mesh.current.geometry.attributes.alpha.needsUpdate = true;
    mesh.current.rotation.y = time * 0.015;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial 
        map={texture}
        size={0.35}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        onBeforeCompile={onBeforeCompile}
      />
    </points>
  );
}

const BackgroundSystem = () => {
  const { scrollYProgress } = useScroll();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050507]">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance" 
        }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050507', 1);
        }}
      >
        <ambientLight intensity={0.4} />
        <PersistentParticles scrollYProgress={scrollYProgress} isMobile={isMobile} />
        <Environment preset="city" />
      </Canvas>
      
      {/* Cinematic Overlays */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507] opacity-60 pointer-events-none" />
    </div>
  );
};

export default BackgroundSystem;
