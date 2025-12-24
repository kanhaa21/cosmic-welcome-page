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
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);
  const [rotations, setRotations] = useState<number[]>(planets.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      planets.forEach((planet, i) => {
        // Orbit animation
        gsap.to(`.planet-${i}`, {
          rotation: 360,
          duration: 20 / planet.speed,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
          onUpdate: function() {
            const currentRotation = gsap.getProperty(`.planet-${i}`, "rotation") as number;
            setRotations(prev => {
              const next = [...prev];
              next[i] = currentRotation;
              return next;
            });
          }
        });

        // Initial entry animation for names
        gsap.fromTo(`.name-${i}`, 
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom center",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] py-20 flex flex-col items-center justify-center overflow-hidden z-10 bg-[#020108]">
      {/* Visibility Enhancer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-80" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="absolute top-10 text-center reveal-text">
        <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] mb-2 block">The Solar Neighborhood</span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Celestial <span className="text-zinc-700">Harmony</span></h2>
      </div>

      <div className="relative w-[800px] h-[800px] flex items-center justify-center scale-75 md:scale-90">
        {/* Sun */}
        <div className="absolute w-16 h-16 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_80px_#fbbf24] z-20">
          <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse opacity-50" />
        </div>

        {/* Planets and Orbits */}
        {planets.map((planet, i) => (
          <div key={planet.name} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Orbit Ring */}
            <div 
              className="absolute border border-white/5 rounded-full"
              style={{
                width: planet.distance * 2,
                height: planet.distance * 2,
              }}
            />
            
            {/* Planet Container (Rotated by GSAP) */}
            <div 
              className={`planet-${i} absolute`}
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
                    boxShadow: hoveredPlanet === i ? `0 0 30px ${planet.color}` : `0 0 20px ${planet.color}44`
                  }}
                  className="rounded-full shadow-lg transition-colors z-30"
                  style={{
                    width: planet.size,
                    height: planet.size,
                    backgroundColor: planet.color,
                  }}
                />

                <AnimatePresence>
                  {hoveredPlanet === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      style={{
                        transform: `rotate(${-rotations[i]}deg)`,
                        transformOrigin: "center bottom"
                      }}
                      className="absolute bottom-full mb-8 z-50 pointer-events-none"
                    >
                      <div className="bg-black/90 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl w-60 shadow-2xl relative">
                        <div className="text-purple-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{planet.name}</div>
                        <div className="text-zinc-300 text-[11px] leading-relaxed font-medium">
                          {planet.description}
                        </div>
                        {/* Little tail for the speech bubble */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black/90" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <span 
                  className={`name-${i} absolute -bottom-6 text-[9px] font-bold text-white uppercase tracking-widest whitespace-nowrap opacity-40 transition-opacity group-hover:opacity-100`}
                  style={{
                    transform: `rotate(${-rotations[i]}deg)`
                  }}
                >
                  {planet.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-10 max-w-lg text-center reveal-text px-4">
        <p className="text-zinc-500 text-[11px] leading-relaxed font-medium">
          Eight worlds dancing in a mathematical waltz around a single star. 
          Each one a unique testament to the laws of physics and the beauty of creation.
        </p>
      </div>
    </section>
  );
}
