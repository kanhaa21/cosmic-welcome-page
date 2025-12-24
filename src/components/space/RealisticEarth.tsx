"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function RealisticEarth() {
  const earthRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!earthRef.current || !cloudRef.current) return;

    // Animate Earth rotation
    gsap.to(earthRef.current, {
      backgroundPositionX: "100%",
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    // Animate Clouds rotation (slightly different speed for realism)
    gsap.to(cloudRef.current, {
      backgroundPositionX: "100%",
      duration: 45,
      repeat: -1,
      ease: "none",
    });

    // Subtle floating animation
    gsap.to([earthRef.current, cloudRef.current], {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center group">
      {/* Outer Glow / Atmosphere */}
      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-[60px] group-hover:bg-blue-500/20 transition-colors duration-1000" />
      <div className="absolute inset-4 rounded-full border border-blue-400/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]" />
      
      {/* The Earth Sphere */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8),inset_20px_20px_50px_rgba(255,255,255,0.1)] bg-black">
        {/* Surface Texture */}
        <div 
          ref={earthRef}
          className="absolute inset-0 scale-[1.1]"
          style={{
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/c/c3/Solarsystemscope_texture_2k_earth_daymap.jpg')",
            backgroundSize: "200% 100%",
            backgroundRepeat: "repeat-x",
          }}
        />
        
        {/* Cloud Layer */}
        <div 
          ref={cloudRef}
          className="absolute inset-0 opacity-40 mix-blend-screen scale-[1.05]"
          style={{
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Earth_Cloud_Map.jpg/2560px-Earth_Cloud_Map.jpg')",
            backgroundSize: "200% 100%",
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* Lighting Overlays */}
        <div className="absolute inset-0 shadow-[inset_10px_10px_20px_rgba(255,255,255,0.1),inset_-20px_-20px_40px_rgba(0,0,0,0.9)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* Surface Detail Enhancer */}
      <div className="absolute inset-0 rounded-full bg-blue-500/5 mix-blend-overlay pointer-events-none" />
    </div>
  );
}
