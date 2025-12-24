"use client";

import { BlackHole } from "@/components/space/BlackHole";
import { CustomCursor } from "@/components/space/CustomCursor";
import { Taskbar } from "@/components/space/Taskbar";
import { motion } from "framer-motion";
import Link from "next/link";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BlackHolePage() {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(titleRef.current, {
        duration: 2,
        y: 100,
        opacity: 0,
        ease: "expo.out",
        delay: 0.5
      });

      // Subtle float animation for the entire content
      gsap.to(contentRef.current, {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Glitch effect for stats
      const stats = document.querySelectorAll(".stat-item");
      stats.forEach((stat) => {
        gsap.to(stat, {
          opacity: 0.4,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          repeatDelay: Math.random() * 5,
          ease: "none"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-orange-500/30">
      <CustomCursor />
      <Taskbar />
      
      <BlackHole />

      <div ref={contentRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <span className="text-orange-500 font-black uppercase tracking-[0.8em] text-[10px] md:text-xs mb-6 block">
            Galactic Devourer Detected
          </span>
          <h1 ref={titleRef} className="text-6xl md:text-[10rem] font-black text-white tracking-tighter mb-8 leading-none bg-gradient-to-b from-white via-orange-100 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(255,69,0,0.5)]">
            GALACTIC VOID
          </h1>
          <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto backdrop-blur-sm bg-black/10 rounded-xl p-4">
            A supermassive singularity currently engulfing the Milky Way. 
            Witness the final moments of our galaxy as stars are torn apart by the ultimate cosmic predator.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/"
              className="px-10 py-5 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-500 hover:scale-110 active:scale-95"
            >
              Return to Safety
            </Link>
            <button 
              className="px-10 py-5 rounded-full border border-white/20 text-white font-black text-xs uppercase tracking-widest backdrop-blur-md hover:bg-white/10 transition-all duration-500 group"
            >
              <span className="group-hover:text-orange-400 transition-colors">Study Event Horizon</span>
            </button>
          </div>
        </div>

        {/* Sensory Data Overlays */}
        <div ref={statsRef} className="absolute bottom-12 left-12 text-left hidden md:block border-l border-orange-500/30 pl-6 py-2">
          <div className="flex items-center gap-3 mb-4 stat-item">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <div className="flex flex-col">
              <span className="text-orange-500/40 font-mono text-[8px] uppercase tracking-[0.3em]">Gravitational Force</span>
              <span className="text-white font-mono text-xs">∞ G-UNITS</span>
            </div>
          </div>
          <div className="flex items-center gap-3 stat-item">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <div className="flex flex-col">
              <span className="text-blue-500/40 font-mono text-[8px] uppercase tracking-[0.3em]">Temporal Dilation</span>
              <span className="text-white font-mono text-xs">0.000001s / YEAR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Edge Distortion */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,1)] z-20" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-40 z-20" />
    </main>
  );
}
