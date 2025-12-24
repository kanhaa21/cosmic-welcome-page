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
        <div className="relative z-10">
          <SolarSystem />
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
