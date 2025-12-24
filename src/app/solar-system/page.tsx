"use client";

import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });
const SolarSystem = dynamic(() => import("@/components/space/SolarSystem").then(mod => mod.SolarSystem), { ssr: false });
const PlanetDetailSection = dynamic(() => import("@/components/space/PlanetDetailSection").then(mod => mod.PlanetDetailSection), { ssr: false });

export default function SolarSystemPage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const starSpeed = useTransform(scrollYProgress, [0, 1], [1.5, 10]);

  return (
    <SmoothScroll
      fixedChildren={
        <>
          <CustomCursor />
          <Taskbar />
        </>
      }
    >
      <div ref={containerRef} className="relative min-h-screen selection:bg-purple-500/30 will-change-transform bg-[#020108]">
        <GSAPStars speed={starSpeed} count={1500} />
        
        <div className="fixed inset-0 z-0 bg-black/60 pointer-events-none" />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-[#030014] pointer-events-none" />

        {/* Hero Section - Solar System Overview */}
        <div className="relative z-10 pt-48 pb-24 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 uppercase italic">
              The Solar <br />
              <span className="bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent">System</span>
            </h1>
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-px w-12 bg-white/20" />
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40">
                Celestial Survey / v1.0.4
              </p>
              <div className="h-px w-12 bg-white/20" />
            </div>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              Embark on a voyage through our cosmic neighborhood. From the scorched plains of Mercury to the frozen depths of Neptune, explore the worlds that orbit our home star.
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center gap-4 opacity-40"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Scroll to Explore</span>
              <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Detailed Planet Information Section */}
        <PlanetDetailSection />

        <footer className="relative py-16 px-4 text-center border-t border-white/5 z-10 bg-black/40 backdrop-blur-sm">
          <p className="text-zinc-600 text-[10px] font-black tracking-[0.8em] uppercase mb-3">
            Cosmic Explorers Guild
          </p>
          <p className="text-zinc-500 text-xs italic">
            "The cosmos is within us. We are made of star-stuff." — Carl Sagan
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
