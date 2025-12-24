"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";

const PlanetSphere = dynamic(() => import("./PlanetSphere").then(mod => mod.PlanetSphere), { 
  ssr: false,
  loading: () => <div className="w-[300px] md:w-[450px] lg:w-[500px] aspect-square rounded-full bg-white/5 animate-pulse" />
});

interface PlanetData {
  name: string;
  tagline: string;
  description: string;
  details: { label: string; value: string }[];
  color: string;
  textureUrl: string;
  cloudUrl?: string;
  rotationDuration: number;
}

const planetData: PlanetData[] = [
  {
    name: "Mercury",
    tagline: "The Swift Planet",
    description: "The smallest and innermost planet in the Solar System. It orbits the Sun every 88 Earth days, the quickest of all the Sun's planets.",
    details: [
      { label: "Diameter", value: "4,879 km" },
      { label: "Distance", value: "57.9M km" },
      { label: "Gravity", value: "3.7 m/s²" }
    ],
    color: "#9ca3af",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/Solarsystemscope_texture_2k_mercury.jpg",
    rotationDuration: 40
  },
  {
    name: "Venus",
    tagline: "The Veiled Planet",
    description: "Second planet from the Sun and Earth's closest planetary neighbor. Often called Earth's twin because it's similar in size and density.",
    details: [
      { label: "Diameter", value: "12,104 km" },
      { label: "Distance", value: "108.2M km" },
      { label: "Gravity", value: "8.87 m/s²" }
    ],
    color: "#fbbf24",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Solarsystemscope_texture_2k_venus_surface.jpg",
    rotationDuration: 60
  },
  {
    name: "Earth",
    tagline: "Our Blue Marble",
    description: "The third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is made up of the ocean.",
    details: [
      { label: "Diameter", value: "12,742 km" },
      { label: "Distance", value: "149.6M km" },
      { label: "Gravity", value: "9.8 m/s²" }
    ],
    color: "#3b82f6",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Solarsystemscope_texture_2k_earth_daymap.jpg",
    cloudUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Earth_Cloud_Map.jpg/2560px-Earth_Cloud_Map.jpg",
    rotationDuration: 30
  },
  {
    name: "Mars",
    tagline: "The Red Planet",
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. It is a frozen desert where life as we know it would struggle.",
    details: [
      { label: "Diameter", value: "6,779 km" },
      { label: "Distance", value: "227.9M km" },
      { label: "Gravity", value: "3.71 m/s²" }
    ],
    color: "#ef4444",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Solarsystemscope_texture_2k_mars.jpg",
    rotationDuration: 32
  },
  {
    name: "Jupiter",
    tagline: "King of Planets",
    description: "The largest planet in our solar system – more than twice as massive as all the other planets combined. It is a massive gas giant.",
    details: [
      { label: "Diameter", value: "139,820 km" },
      { label: "Distance", value: "778.6M km" },
      { label: "Gravity", value: "24.79 m/s²" }
    ],
    color: "#d97706",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_Texture.jpg",
    rotationDuration: 15
  },
  {
    name: "Saturn",
    tagline: "The Jewel of the Solar System",
    description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. It is a giant composed mostly of hydrogen.",
    details: [
      { label: "Diameter", value: "116,460 km" },
      { label: "Distance", value: "1.4B km" },
      { label: "Gravity", value: "10.44 m/s²" }
    ],
    color: "#eab308",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Solarsystemscope_texture_2k_saturn.jpg",
    rotationDuration: 18
  },
  {
    name: "Uranus",
    tagline: "The Sideways Planet",
    description: "Uranus is the seventh planet from the Sun, and has the third-largest diameter. It orbits at a nearly 90-degree angle from the plane of its orbit.",
    details: [
      { label: "Diameter", value: "50,724 km" },
      { label: "Distance", value: "2.9B km" },
      { label: "Gravity", value: "8.69 m/s²" }
    ],
    color: "#22d3ee",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Solarsystemscope_texture_2k_uranus.jpg",
    rotationDuration: 25
  },
  {
    name: "Neptune",
    tagline: "The Windiest World",
    description: "Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant major planet orbiting our Sun.",
    details: [
      { label: "Diameter", value: "49,244 km" },
      { label: "Distance", value: "4.5B km" },
      { label: "Gravity", value: "11.15 m/s²" }
    ],
    color: "#6366f1",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Solarsystemscope_texture_2k_neptune.jpg",
    rotationDuration: 22
  }
];

function PlanetSection({ planet, idx }: { planet: PlanetData; idx: number }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: "200px 0px" });

  return (
    <section 
      ref={sectionRef}
      className="planet-section min-h-screen flex items-center justify-center px-6 py-32"
    >
      <div className={`max-w-7xl w-full flex flex-col lg:flex-row gap-16 lg:gap-32 items-center justify-between ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        {/* Info Box */}
        <div className="planet-info w-full max-w-xl p-10 md:p-16 rounded-[4rem] border border-white/5 bg-white/[0.01] backdrop-blur-[60px] relative group overflow-hidden">
          <div className="flex items-center gap-6 mb-12 opacity-50">
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-white whitespace-nowrap">
              Designation // {planet.name.substring(0, 3)}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <h3 className="text-7xl md:text-9xl font-bold text-white tracking-[-0.05em] mb-6 font-[family-name:var(--font-orbitron)]">
            {planet.name}
          </h3>
          <p className="text-[11px] font-bold text-purple-400 uppercase tracking-[0.5em] mb-12 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,1)]" />
            {planet.tagline}
          </p>
          
          <p className="text-xl text-zinc-400 font-light leading-relaxed mb-16 tracking-wide">
            {planet.description}
          </p>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
            {planet.details.map((detail) => (
              <div key={detail.label} className="flex flex-col gap-2">
                <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-bold">
                  {detail.label}
                </span>
                <span className="text-white font-medium text-lg tracking-tight">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Revolving Sphere Container */}
        <div className="planet-sphere-container relative flex justify-center items-center flex-1 min-h-[400px]">
          {isInView ? (
            <PlanetSphere 
              textureUrl={planet.textureUrl} 
              cloudUrl={planet.cloudUrl}
              color={planet.color}
              rotationDuration={planet.rotationDuration}
              size="w-[350px] md:w-[500px] lg:w-[600px]"
            />
          ) : (
            <div className="w-[350px] md:w-[500px] lg:w-[600px] aspect-square rounded-full bg-white/5 animate-pulse" />
          )}
          
          {/* Subtle Ring for aesthetic */}
          <div className="absolute inset-0 border border-white/5 rounded-full scale-125 opacity-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export function PlanetDetailSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Texture preloading for smoother scrolling
    planetData.forEach(planet => {
      const img = new Image();
      img.src = planet.textureUrl;
      if (planet.cloudUrl) {
        const cloudImg = new Image();
        cloudImg.src = planet.cloudUrl;
      }
    });

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".planet-section");
      
      sections.forEach((section: any) => {
        const info = section.querySelector(".planet-info");
        const sphere = section.querySelector(".planet-sphere-container");
        
        gsap.fromTo(info, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(sphere,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10">
      {planetData.map((planet, idx) => (
        <PlanetSection key={planet.name} planet={planet} idx={idx} />
      ))}
    </div>
  );
}
