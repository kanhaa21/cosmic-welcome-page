"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const planets = [
  { name: "Mercury", color: "#A5A5A5", size: 4, distance: 80, speed: 1.5 },
  { name: "Venus", color: "#E3BB76", size: 8, distance: 120, speed: 1.2 },
  { name: "Earth", color: "#2271B3", size: 9, distance: 170, speed: 1.0 },
  { name: "Mars", color: "#E27B58", size: 6, distance: 220, speed: 0.8 },
  { name: "Jupiter", color: "#D39C7E", size: 22, distance: 300, speed: 0.5 },
  { name: "Saturn", color: "#C5AB6E", size: 18, distance: 380, speed: 0.4 },
  { name: "Uranus", color: "#BBE1E4", size: 12, distance: 440, speed: 0.3 },
  { name: "Neptune", color: "#6081FF", size: 12, distance: 500, speed: 0.2 },
];

export function SolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

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
        });

        // Hover effect for planet name
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
    <section ref={containerRef} className="relative min-h-screen py-40 flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="absolute top-20 text-center reveal-text">
        <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-xs mb-4 block">The Solar Neighborhood</span>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Celestial <span className="text-zinc-700">Harmony</span></h2>
      </div>

      <div className="relative w-[1000px] h-[1000px] flex items-center justify-center">
        {/* Sun */}
        <div className="absolute w-20 h-20 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_100px_#fbbf24] z-20">
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
              >
                <div 
                  className="rounded-full shadow-lg transition-transform group-hover:scale-150"
                  style={{
                    width: planet.size,
                    height: planet.size,
                    backgroundColor: planet.color,
                    boxShadow: `0 0 20px ${planet.color}44`,
                  }}
                />
                <span className={`name-${i} absolute -bottom-6 text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100`}>
                  {planet.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-20 max-w-xl text-center reveal-text">
        <p className="text-zinc-500 text-sm leading-relaxed font-medium">
          Eight worlds dancing in a mathematical waltz around a single star. 
          Each one a unique testament to the laws of physics and the beauty of creation.
        </p>
      </div>
    </section>
  );
}
