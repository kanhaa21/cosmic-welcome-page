"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        scroller: ".smooth-scroll",
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) setIsVisible(true);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="planet-section min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className={`max-w-7xl w-full flex flex-col lg:flex-row gap-20 lg:gap-40 items-center justify-between ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        {/* Info Box - Sleek Redesign */}
        <div className="planet-info w-full max-w-xl relative">
          <div className="flex items-center gap-4 mb-8 opacity-40">
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white">
              S0{idx + 1}
            </span>
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-500">
              {planet.name.substring(0, 3)}
            </span>
          </div>

          <h3 className="text-6xl md:text-8xl font-light text-white tracking-tight mb-4 font-[family-name:var(--font-orbitron)]">
            {planet.name}
          </h3>
          
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-1 rounded-full bg-purple-500" />
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">
              {planet.tagline}
            </p>
          </div>
          
          <p className="text-lg text-zinc-400 font-light leading-relaxed mb-16 max-w-lg">
            {planet.description}
          </p>

          <div className="grid grid-cols-3 gap-12">
            {planet.details.map((detail) => (
              <div key={detail.label} className="flex flex-col gap-1.5">
                <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
                  {detail.label}
                </span>
                <span className="text-white font-light text-base tracking-tight">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Elegant Accents */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
        </div>

        {/* Sphere Container */}
        <div className="planet-sphere-container relative flex justify-center items-center flex-1">
          {isVisible ? (
            <PlanetSphere 
              textureUrl={planet.textureUrl} 
              cloudUrl={planet.cloudUrl}
              color={planet.color}
              rotationDuration={planet.rotationDuration}
              size="w-[300px] md:w-[450px] lg:w-[550px]"
            />
          ) : (
            <div className="w-[300px] md:w-[450px] lg:w-[550px] aspect-square rounded-full bg-white/[0.02]" />
          )}
          
          {/* Orbital Path Line (Aesthetic) */}
          <div className="absolute inset-0 border border-white/5 rounded-full scale-[1.3] opacity-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export function PlanetDetailSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".planet-section");
      
      sections.forEach((section: any) => {
        const info = section.querySelector(".planet-info");
        const sphere = section.querySelector(".planet-sphere-container");
        
        gsap.fromTo(info, 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              scroller: ".smooth-scroll",
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(sphere,
          { opacity: 0, scale: 0.9, filter: "blur(20px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              scroller: ".smooth-scroll",
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 bg-[#020108]">
      {planetData.map((planet, idx) => (
        <PlanetSection key={planet.name} planet={planet} idx={idx} />
      ))}
    </div>
  );
}
