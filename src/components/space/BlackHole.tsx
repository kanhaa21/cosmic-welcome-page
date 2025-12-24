"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export function BlackHole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ring1Ref.current || !ring2Ref.current || !ring3Ref.current) return;

    // Accretion disk rotation
    gsap.to(ring1Ref.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ring2Ref.current, {
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ring3Ref.current, {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    // Subtle breathing/pulse effect
    gsap.to(".event-horizon", {
      scale: 1.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black z-0">
      {/* Background Star Field (Optional, but adds depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] opacity-30" />
      
      <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center">
        {/* Gravitational Lensing (Outer Distortion) */}
        <div className="absolute inset-0 rounded-full border-[40px] border-white/5 blur-[100px] animate-pulse" />
        
        {/* Accretion Disk Layers */}
        <div 
          ref={ring1Ref}
          className="absolute inset-0 rounded-full border-[1px] border-orange-500/20 blur-[2px]"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(251, 146, 60, 0.4), transparent, rgba(168, 85, 247, 0.4), transparent)",
            boxShadow: "0 0 100px rgba(251, 146, 60, 0.1)",
          }}
        />
        
        <div 
          ref={ring2Ref}
          className="absolute inset-[20px] rounded-full border-[1px] border-purple-500/20 blur-[5px]"
          style={{
            background: "conic-gradient(from 120deg, transparent, rgba(168, 85, 247, 0.3), transparent, rgba(59, 130, 246, 0.3), transparent)",
          }}
        />
        
        <div 
          ref={ring3Ref}
          className="absolute inset-[-40px] rounded-full opacity-30 blur-[20px]"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(251, 146, 60, 0.6) 50%, transparent 60%)",
            transform: "rotateX(75deg)",
          }}
        />

        {/* The Photon Sphere (Bright Inner Edge) */}
        <div className="absolute inset-[25%] rounded-full bg-transparent border-[4px] border-white/20 blur-[10px] shadow-[0_0_80px_rgba(255,255,255,0.4)]" />
        <div className="absolute inset-[25%] rounded-full bg-transparent border-[1px] border-white/40 blur-[1px]" />

        {/* The Event Horizon (The Void) */}
        <div className="event-horizon absolute inset-[25%] rounded-full bg-black shadow-[inset_0_0_100px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,1)] z-10 overflow-hidden">
            {/* Inner Void Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/5 opacity-50" />
        </div>

        {/* Distortion Glow */}
        <div className="absolute inset-0 rounded-full bg-orange-500/5 blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-purple-500/5 blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      {/* Extreme Distortion Overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.8)_100%)]" />
      </div>
    </div>
  );
}
