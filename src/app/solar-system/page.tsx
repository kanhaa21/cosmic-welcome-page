"use client";

import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/components/space/SmoothScroll";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });
const PlanetDetailSection = dynamic(() => import("@/components/space/PlanetDetailSection").then(mod => mod.PlanetDetailSection), { ssr: false });

import { useParallax } from "@/hooks/useParallax";

export default function SolarSystemPage() {
  const containerRef = useRef(null);
  const { scroll: locoScroll } = useSmoothScroll();
  const parallax = useParallax(15);
  const currentSection = useRef(0);

  useEffect(() => {
    if (!locoScroll) return;

    const interval = setInterval(() => {
      currentSection.current = (currentSection.current + 1) % totalSections;
      
      let target;
      if (currentSection.current === 0) {
        target = "top";
      } else if (currentSection.current === totalSections - 1) {
        target = "footer";
      } else {
        const planetSections = document.querySelectorAll(".planet-section");
        target = planetSections[currentSection.current - 1] as HTMLElement;
      }

      if (target) {
        locoScroll.scrollTo(target, {
          duration: 2500,
          easing: [0.16, 1, 0.3, 1]
        });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [locoScroll]);
  
  return (
    <SmoothScroll
      fixedChildren={
        <>
          <CustomCursor />
          <Taskbar />
          <div className="fixed inset-0 z-[-2] bg-[#020108] pointer-events-none" />
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.8)_0%,transparent_80%)] pointer-events-none" />
          <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-transparent via-transparent to-[#020108] pointer-events-none" />
          <GSAPStars count={2000} />
        </>
      }
    >
      <div ref={containerRef} className="relative min-h-screen selection:bg-purple-500/30 overflow-hidden">
        {/* Hero Section - Refined & Elegant */}
        <div id="top" className="relative z-10 pt-64 pb-32 px-6 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, x: parallax.x, y: parallax.y }}
            transition={{ 
              opacity: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 0.1, ease: "linear" },
              y: { duration: 0.1, ease: "linear" }
            }}
            className="text-center max-w-6xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.3 }}
              className="inline-flex items-center gap-4 mb-10"
            >
              <div className="h-px w-8 bg-purple-500/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-purple-400/80 pl-[0.8em]">
                System Directory 01
              </span>
              <div className="h-px w-8 bg-purple-500/40" />
            </motion.div>

            <h1 className="text-7xl md:text-[10rem] font-light text-white tracking-[-0.04em] leading-[0.8] mb-16 font-[family-name:var(--font-orbitron)]">
              SOLAR<br />
              <span className="font-bold bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent">SYSTEM</span>
            </h1>

            <div className="flex flex-col items-center gap-12 max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed tracking-wide">
                A definitive survey of the local planetary neighborhood, rendered through the lens of modern celestial observation.
              </p>
              
              <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </motion.div>

          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />
        </div>

        {/* Planet Detail Sections */}
        <PlanetDetailSection />

        <footer id="footer" className="relative py-48 px-6 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-20" />
            
            <p className="text-zinc-600 text-[9px] font-bold tracking-[1.2em] uppercase mb-12 pl-[1.2em]">
              Finality // Deep Space
            </p>
            
            <h4 className="text-3xl md:text-5xl font-light text-white/40 tracking-tight italic mb-16 font-[family-name:var(--font-orbitron)]">
              "The cosmos is within us."
            </h4>
            
            <div className="inline-flex items-center gap-4 text-zinc-700">
              <span className="text-[8px] font-bold tracking-[0.5em] uppercase">Nexus Protocol</span>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <span className="text-[8px] font-bold tracking-[0.5em] uppercase">v2.0.4</span>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
