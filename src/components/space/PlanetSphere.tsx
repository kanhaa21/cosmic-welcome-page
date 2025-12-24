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
      x: "-50%",
      duration: rotationDuration,
      repeat: -1,
      ease: "none",
    });

    if (cloudRef.current) {
      // Animate Clouds rotation
      gsap.to(cloudRef.current, {
        x: "-50%",
        duration: rotationDuration * 1.5,
        repeat: -1,
        ease: "none",
      });
    }

    // Subtle floating animation
    gsap.to([planetRef.current, cloudRef.current].filter(Boolean), {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true
    });
  }, [rotationDuration]);

  return (
    <div className={`relative w-full aspect-square ${size} mx-auto flex items-center justify-center group`}>
      {/* Outer Glow / Atmosphere */}
      <div 
        className="absolute inset-0 rounded-full blur-[60px] opacity-20 transition-all duration-1000 group-hover:opacity-40 will-change-[filter,background-color]" 
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute inset-4 rounded-full border border-white/5 shadow-[0_0_50px_rgba(255,255,255,0.05)]" 
      />
      
      {/* The Planet Sphere */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8),inset_20px_20px_50px_rgba(255,255,255,0.1)] bg-black">
        {/* Surface Texture */}
        <div 
          ref={planetRef}
          className="absolute top-0 left-0 h-full w-[200%] scale-[1.1] will-change-transform"
          style={{
            backgroundImage: `url('${textureUrl}')`,
            backgroundSize: "50% 100%",
            backgroundRepeat: "repeat-x",
          }}
        />
        
        {/* Cloud Layer if exists */}
        {cloudUrl && (
          <div 
            ref={cloudRef}
            className="absolute top-0 left-0 h-full w-[200%] opacity-40 mix-blend-screen scale-[1.05] will-change-transform"
            style={{
              backgroundImage: `url('${cloudUrl}')`,
              backgroundSize: "50% 100%",
              backgroundRepeat: "repeat-x",
            }}
          />
        )}

        {/* Lighting Overlays */}
        <div className="absolute inset-0 shadow-[inset_10px_10px_20px_rgba(255,255,255,0.1),inset_-20px_-20px_40px_rgba(0,0,0,0.9)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* Surface Detail Enhancer */}
      <div 
        className="absolute inset-0 rounded-full mix-blend-overlay pointer-events-none opacity-20" 
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
