"use client";

import { BlackHole } from "@/components/space/BlackHole";
import { CustomCursor } from "@/components/space/CustomCursor";
import { Taskbar } from "@/components/space/Taskbar";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlackHolePage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-orange-500/30">
      <CustomCursor />
      <Taskbar />
      
      {/* Moving Black Hole Background */}
      <BlackHole />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="text-orange-500 font-black uppercase tracking-[0.8em] text-[10px] md:text-xs mb-6 block">
            Singularity Detected
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
            THE VOID
          </h1>
          <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Where time stands still and physics as we know it ceases to exist. 
            Step into the gravitational embrace of the universe's most mysterious titan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/"
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-transform"
            >
              Return to Safety
            </Link>
            <button 
              className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-sm backdrop-blur-md hover:bg-white/5 transition-colors"
            >
              Study Event Horizon
            </button>
          </div>
        </motion.div>

        {/* Sensory Data Overlays */}
        <div className="absolute bottom-12 left-12 text-left hidden md:block">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-500/60 font-mono text-[10px] uppercase tracking-widest">Gravity: Infinite</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-purple-500/60 font-mono text-[10px] uppercase tracking-widest">Time Dilation: Max</span>
          </div>
        </div>
      </div>

      {/* Edge Distortion Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)] z-20" />
    </main>
  );
}
