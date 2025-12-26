"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PlanetSphereProps {
  textureUrl: string;
  cloudUrl?: string;
  color?: string;
  rotationDuration?: number;
  size?: string;
}

export function PlanetSphere({ 
  textureUrl, 
  cloudUrl, 
  color = "#3b82f6", 
  rotationDuration = 30,
  size = "max-w-[400px]"
}: PlanetSphereProps) {
  const planetRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!planetRef.current) return;

    // Animate Planet rotation
    gsap.to(planetRef.current, {
      backgroundPosition: "200% 0",
      duration: rotationDuration,
      repeat: -1,
      ease: "none",
    });

    if (cloudRef.current) {
      // Animate Clouds rotation slightly faster
      gsap.to(cloudRef.current, {
        backgroundPosition: "200% 0",
        duration: rotationDuration * 0.8,
        repeat: -1,
        ease: "none",
      });
    }

    // Subtle floating animation
    gsap.to([planetRef.current, cloudRef.current].filter(Boolean), {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true
    });
  }, [rotationDuration]);

  return (
    <div className={`relative w-full aspect-square ${size} mx-auto flex items-center justify-center group`}>
      {/* Dynamic Atmospheric Glow - Multiple layers for realism */}
      <div 
        className="absolute inset-[-10%] rounded-full blur-[80px] opacity-10 transition-all duration-1000 group-hover:opacity-20" 
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute inset-[-5%] rounded-full blur-[40px] opacity-20 transition-all duration-1000 group-hover:opacity-30" 
        style={{ backgroundColor: color }}
      />
      
      {/* Primary Planet Body */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5">
        
        {/* Surface Texture with enhanced mapping */}
        <div 
          ref={planetRef}
          className="absolute inset-0 scale-[1.1] will-change-[background-position]"
          style={{
            backgroundImage: `url('${textureUrl}')`,
            backgroundSize: "200% 100%",
            backgroundRepeat: "repeat-x",
            filter: "contrast(1.1) brightness(0.9)",
          }}
        />
        
        {/* Cloud Layer - Sophisticated blending */}
        {cloudUrl && (
          <div 
            ref={cloudRef}
            className="absolute inset-0 opacity-30 mix-blend-screen scale-[1.05] will-change-[background-position]"
            style={{
              backgroundImage: `url('${cloudUrl}')`,
              backgroundSize: "200% 100%",
              backgroundRepeat: "repeat-x",
              filter: "blur(0.5px)",
            }}
          />
        )}

        {/* Global Lighting & Shadowing (Realistic Sunlight) */}
        {/* Main Shadow (The Dark Side) */}
        <div className="absolute inset-0 shadow-[inset_-60px_-40px_100px_40px_rgba(0,0,0,0.95)] pointer-events-none z-10" />
        
        {/* Rim Light / Atmospheric Scattering */}
        <div 
          className="absolute inset-0 border-[20px] border-transparent rounded-full shadow-[inset_0_0_40px_rgba(255,255,255,0.15)] pointer-events-none z-20" 
          style={{ boxShadow: `inset 0 0 60px 10px ${color}33, inset 20px 20px 40px rgba(255,255,255,0.1)` }}
        />

        {/* Specular Highlight (The Sun's reflection) */}
        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-white/10 blur-[40px] rounded-full pointer-events-none z-30" />
        
        {/* Terminal Line (Transition between light and dark) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/5 pointer-events-none z-0" />
      </div>

      {/* Outer Rim Bloom */}
      <div 
        className="absolute inset-0 rounded-full border border-white/10 opacity-40 scale-[1.005] pointer-events-none z-40"
        style={{ borderColor: `${color}44` }}
      />
    </div>
  );
}
