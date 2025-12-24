"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

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
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);

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
      
      <div className="absolute top-24 text-center w-full reveal-text z-20 px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-purple-500 font-black uppercase tracking-[0.8em] text-[10px] mb-4 block"
        >
          Planetary Orbits
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none"
        >
          Solar <span className="text-zinc-800 tracking-[0.1em]">System</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-zinc-500 text-[11px] font-bold uppercase tracking-[0.4em] mt-6 max-w-sm mx-auto leading-relaxed"
        >
          Scroll to explore the celestial bodies of our neighborhood
        </motion.p>
      </div>

      {/* Background Solar System Visualization */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="relative w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[1000px] lg:h-[1000px] flex items-center justify-center scale-[0.4] sm:scale-75 lg:scale-100">
          {/* Sun */}
          <div className="absolute w-32 h-32 bg-yellow-400 rounded-full blur-[1px] shadow-[0_0_120px_#fbbf24] z-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse opacity-40" />
            <div className="w-28 h-28 bg-gradient-to-br from-yellow-200 to-orange-600 rounded-full blur-[1px]" />
          </div>

          {/* Planets and Orbits */}
          {planets.map((planet, i) => (
              <div key={planet.name} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Orbit Ring */}
                <div 
                  className={`absolute border rounded-full transition-all duration-1000 ${
                    hoveredPlanet === i ? "border-purple-500/40 border-2" : "border-white/5"
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
                    onMouseEnter={() => setHoveredPlanet(i)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                  >
                    <motion.div 
                      animate={{ 
                        scale: hoveredPlanet === i ? 2.5 : 1,
                        boxShadow: hoveredPlanet === i ? `0 0 40px ${planet.color}` : `0 0 20px ${planet.color}33`
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="rounded-full shadow-lg transition-colors z-30 relative"
                      style={{
                        width: planet.size,
                        height: planet.size,
                        backgroundColor: planet.color,
                        willChange: "transform, box-shadow"
                      }}
                    >
                      {hoveredPlanet === i && (
                        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white bg-black/80 px-2 py-1 rounded border border-white/10 backdrop-blur-md">
                            {planet.name}
                          </span>
                        </div>
                      )}
                    </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />
        <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-bold">Scroll Down</span>
      </motion.div>
    </section>
  );
}
