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
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center z-10 bg-[#020108] overflow-hidden">
      {/* Visibility Enhancer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-80" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-900/5 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="absolute top-20 text-center w-full reveal-text z-20">
        <span className="text-purple-500 font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Planetary System</span>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Cosmic <span className="text-zinc-800 tracking-[0.2em]">Navigator</span></h2>
      </div>

      {/* Background Solar System Visualization */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40 lg:opacity-60">
        <div className="relative w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[1000px] lg:h-[1000px] flex items-center justify-center scale-[0.35] sm:scale-50 lg:scale-[0.85]">
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

      {/* Foreground Interactive UI */}
      <div className="relative z-30 w-full max-w-7xl px-6 flex flex-col items-center gap-12 mt-12">
        {/* Glass Info Box */}
        <AnimatePresence mode="wait">
          {selectedPlanet !== null && (
            <motion.div
              key={planets[selectedPlanet].name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col items-center text-center group"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full mb-8 relative"
                style={{ backgroundColor: planets[selectedPlanet].color, boxShadow: `0 0 60px ${planets[selectedPlanet].color}44` }}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
              </motion.div>

              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase italic">
                {planets[selectedPlanet].name}
              </h3>
              
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
              
              <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed max-w-md">
                {planets[selectedPlanet].description}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black">Orbit Velocity</span>
                  <span className="text-white font-mono text-xl">{(planets[selectedPlanet].speed * 47.4).toFixed(1)} km/s</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black">Relative Size</span>
                  <span className="text-white font-mono text-xl">{planets[selectedPlanet].size * 100} units</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Planet Selector Strip */}
        <div className="flex flex-wrap justify-center gap-3">
          {planets.map((planet, i) => (
            <button
              key={planet.name}
              onClick={() => setSelectedPlanet(i)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-3 ${
                selectedPlanet === i 
                  ? "bg-white/10 border-white/20 text-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                  : "bg-black/20 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10"
              }`}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: planet.color }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{planet.name}</span>
            </button>
          ))}
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
