"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const planets = [
  { 
    name: "Mercury", 
    color: "#A5A5A5", 
    size: 6, 
    distance: 80, 
    speed: 1.5,
    description: "The smallest planet and closest to the Sun. A scarred rock of extreme temperatures."
  },
  { 
    name: "Venus", 
    color: "#E3BB76", 
    size: 10, 
    distance: 120, 
    speed: 1.2,
    description: "Earth's toxic twin. Hidden beneath thick sulfuric clouds with a crushing atmosphere."
  },
  { 
    name: "Earth", 
    color: "#2271B3", 
    size: 11, 
    distance: 170, 
    speed: 1.0,
    description: "Our blue sanctuary. The only known world teeming with life and liquid oceans."
  },
  { 
    name: "Mars", 
    color: "#E27B58", 
    size: 8, 
    distance: 220, 
    speed: 0.8,
    description: "The Red Planet. A dusty, cold desert world with a thin atmosphere and vast canyons."
  },
  { 
    name: "Jupiter", 
    color: "#D39C7E", 
    size: 26, 
    distance: 300, 
    speed: 0.5,
    description: "King of the planets. A massive gas giant with a Great Red Spot twice the size of Earth."
  },
  { 
    name: "Saturn", 
    color: "#C5AB6E", 
    size: 22, 
    distance: 380, 
    speed: 0.4,
    description: "The jewel of the solar system. Adorned with a spectacular and complex system of rings."
  },
  { 
    name: "Uranus", 
    color: "#BBE1E4", 
    size: 15, 
    distance: 440, 
    speed: 0.3,
    description: "The ice giant. An odd world that rotates on its side, tilted nearly 90 degrees."
  },
  { 
    name: "Neptune", 
    color: "#6081FF", 
    size: 15, 
    distance: 500, 
    speed: 0.2,
    description: "The dark, cold, and whipped by supersonic winds. The most distant major planet."
  },
];

export function SolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(0);

    useEffect(() => {
      const ctx = gsap.context((self) => {
        const q = self.selector!;
        planets.forEach((planet, i) => {
          const rawTarget = q(`.planet-${i}`);
          const targets = gsap.utils.toArray(rawTarget).filter(el => el && el instanceof HTMLElement) as HTMLElement[];
          
          if (targets.length === 0) return;
          
          // Orbit animation
          gsap.to(targets, {
            rotation: 360,
            duration: 20 / planet.speed,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
          });
        });
      }, containerRef);

      return () => ctx.revert();
    }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 flex flex-col items-start justify-center z-10 bg-[#020108]">
      {/* Visibility Enhancer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-80" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-900/5 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="absolute top-20 text-center w-full reveal-text z-20">
        <span className="text-purple-500 font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Planetary System</span>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">COSMIC <span className="text-zinc-800">NAVIGATOR</span></h2>
      </div>

      <div className="relative w-full flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-12 px-4 md:px-12 mt-32 md:mt-40">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 z-30 flex flex-col gap-4 order-2 lg:order-1 lg:sticky lg:top-48">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-3">
            {planets.map((planet, i) => (
              <div key={planet.name} className="group">
                <button
                  onClick={() => setSelectedPlanet(i)}
                  className={`w-full text-left px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-500 flex flex-col gap-2 ${
                    selectedPlanet === i 
                    ? "bg-white/10 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                    : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] transition-colors ${
                      selectedPlanet === i ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                    }`}>
                      {planet.name}
                    </span>
                    <div 
                      className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full" 
                      style={{ backgroundColor: planet.color, boxShadow: `0 0 10px ${planet.color}` }} 
                    />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {selectedPlanet === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="hidden lg:block overflow-hidden"
                      >
                        <p className="text-[11px] leading-relaxed text-zinc-400 font-medium py-2">
                          {planet.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Solar System Visualization */}
        <div className="relative flex-1 h-[400px] sm:h-[600px] lg:h-[800px] flex items-center justify-center order-1 lg:order-2 w-full overflow-hidden">
          <div className="relative w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] flex items-center justify-center scale-[0.35] sm:scale-50 lg:scale-[0.75]">
            {/* Sun */}
            <div className="absolute w-24 h-24 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_100px_#fbbf24] z-20">
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse opacity-50" />
            </div>

            {/* Planets and Orbits */}
            {planets.map((planet, i) => (
                <div key={planet.name} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Orbit Ring */}
                  <div 
                    className={`absolute border rounded-full transition-all duration-700 ${
                      selectedPlanet === i ? "border-purple-500/40 border-2" : "border-white/5"
                    } will-change-[border-color,border-width]`}
                    style={{
                      width: planet.distance * 2,
                      height: planet.distance * 2,
                    }}
                  />
                  
                  {/* Planet Container (Rotated by GSAP) */}
                  <div 
                    className={`planet-${i} absolute will-change-transform`}
                    style={{
                      width: planet.distance * 2,
                      height: planet.distance * 2,
                    }}
                  >
                    {/* Actual Planet */}
                    <div 
                      className="absolute flex flex-col items-center group cursor-pointer pointer-events-auto"
                      style={{
                        top: "50%",
                        left: "100%",
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => setSelectedPlanet(i)}
                    >
                      <motion.div 
                        animate={{ 
                          scale: selectedPlanet === i ? 2.8 : 1,
                          boxShadow: selectedPlanet === i ? `0 0 40px ${planet.color}` : `0 0 20px ${planet.color}33`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ willChange: "transform, box-shadow" }}
                        className="rounded-full shadow-lg transition-colors z-30"
                        style={{
                          width: planet.size,
                          height: planet.size,
                          backgroundColor: planet.color,
                        }}
                      />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 w-full text-center reveal-text px-4 opacity-50">
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">
          Interactive Orbital Mapping Interface v2.0
        </p>
      </div>
    </section>
  );
}
