"use client";

import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });
const PlanetDetailSection = dynamic(() => import("@/components/space/PlanetDetailSection").then(mod => mod.PlanetDetailSection), { ssr: false });

export default function SolarSystemPage() {
  const containerRef = useRef(null);
  
  return (
    <SmoothScroll
      fixedChildren={
        <>
          <CustomCursor />
          <Taskbar />
        </>
      }
    >
      <div ref={containerRef} className="relative min-h-screen selection:bg-purple-500/30 bg-[#020108] overflow-hidden">
        <GSAPStars count={1200} />
        
        {/* Subtle Background Overlays */}
        <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,10,40,0.3),transparent_70%)] pointer-events-none" />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-[#030014] pointer-events-none" />

        {/* Hero Section - Sleek and Aesthetic */}
        <div className="relative z-10 pt-48 pb-32 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="text-[10px] font-medium uppercase tracking-[1em] text-purple-400/60 pl-[1em]">
                Nexus Celestial Division
              </span>
            </motion.div>

            <h1 className="text-8xl md:text-[12rem] font-light text-white tracking-[-0.04em] leading-[0.85] mb-12 font-[family-name:var(--font-orbitron)]">
              SOLAR<br />
              <span className="font-bold bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">SYSTEM</span>
            </h1>

            <div className="flex items-center justify-center gap-12 mb-16">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/10" />
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">
                System Survey 01 // Core Worlds
              </p>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-20 tracking-wide">
              A cinematic exploration of our celestial neighborhood. From the scorched inner worlds to the frozen giants of the outer rim.
            </p>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center gap-6 opacity-30"
            >
              <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
              <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-white">Initiate Descent</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Detailed Planet Information Section */}
        <PlanetDetailSection />

        <footer className="relative py-32 px-4 text-center border-t border-white/5 z-10 bg-black/40 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <p className="text-zinc-500 text-[10px] font-bold tracking-[1em] uppercase mb-8 pl-[1em]">
              The Horizon Awaits
            </p>
            <p className="text-zinc-400 text-lg font-light italic tracking-wide">
              "Somewhere, something incredible is waiting to be known."
            </p>
            <div className="mt-12 h-px w-24 bg-white/10 mx-auto" />
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
