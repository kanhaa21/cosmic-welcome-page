"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const planets = [
  {
    name: "Mercury",
    description: "The smallest planet in our solar system and closest to the Sun.",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=400",
    color: "from-zinc-400"
  },
  {
    name: "Venus",
    description: "The hottest planet in our solar system with a thick, toxic atmosphere.",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=400",
    color: "from-orange-400"
  },
  {
    name: "Earth",
    description: "Our home planet, the only known world to harbor life.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=400",
    color: "from-blue-400"
  },
  {
    name: "Mars",
    description: "The Red Planet, home to the largest volcano in the solar system.",
    image: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&q=80&w=400",
    color: "from-red-500"
  },
  {
    name: "Jupiter",
    description: "A gas giant twice as massive as all other planets combined.",
    image: "https://images.unsplash.com/photo-1630839437035-dac17da580d0?auto=format&fit=crop&q=80&w=400",
    color: "from-orange-600"
  },
  {
    name: "Saturn",
    description: "Famous for its dazzling and complex system of icy rings.",
    image: "https://images.unsplash.com/photo-1614314107768-6018061b5b72?auto=format&fit=crop&q=80&w=400",
    color: "from-yellow-600"
  },
  {
    name: "Uranus",
    description: "An ice giant that rotates on its side at nearly a 90-degree angle.",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=400",
    color: "from-cyan-400"
  },
  {
    name: "Neptune",
    description: "The most distant planet, dark, cold, and whipped by supersonic winds.",
    image: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&q=80&w=400",
    color: "from-blue-600"
  }
];

export function StoryTeller() {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate planets for seamless loop
  const displayPlanets = [...planets, ...planets, ...planets];

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-20 bg-transparent">
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .marquee-content {
          animation: marquee 60s linear infinite;
          animation-play-state: ${isPaused ? 'paused' : 'running'};
        }
      `}</style>

      <div className="absolute top-10 text-center z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-purple-500 text-[10px] font-black uppercase tracking-[1em] mb-2 block"
        >
          Planetary Voyage
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tighter"
        >
          Cosmic <span className="text-zinc-700">Milestones</span>
        </motion.h2>
      </div>

      <div className="relative w-full mt-20">
        {/* Fades */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-64 bg-gradient-to-r from-[#030014] via-[#030014]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-64 bg-gradient-to-l from-[#030014] via-[#030014]/80 to-transparent z-20 pointer-events-none" />

        <div 
          className="marquee-content flex gap-8 px-4"
          style={{ width: "fit-content" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayPlanets.map((planet, i) => (
            <motion.div
              key={`${planet.name}-${i}`}
              className="relative w-64 h-80 md:w-80 md:h-[450px] group flex-shrink-0 cursor-pointer"
              onHoverStart={() => setHoveredPlanet(planet.name + i)}
              onHoverEnd={() => setHoveredPlanet(null)}
            >
              <div className={`absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br ${planet.color} to-black/80 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-purple-500/50`}>
                <img 
                  src={planet.image} 
                  alt={planet.name}
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-2 group-hover:text-purple-400 transition-colors">
                    {planet.name}
                  </h3>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredPlanet === planet.name + i ? "auto" : 0,
                      opacity: hoveredPlanet === planet.name + i ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light italic">
                      {planet.description}
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Decorative Number */}
              <div className="absolute -top-4 -right-4 text-6xl md:text-8xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.07] transition-colors">
                {(i % planets.length) + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 flex gap-4">
        <div className="w-12 h-0.5 bg-purple-500/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-purple-500"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
