"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlanetSphere } from "./PlanetSphere";

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
    description: "The smallest and innermost planet in the Solar System. It orbits the Sun every 88 Earth days, the quickest of all the Sun's planets. Mercury is a rocky world, with a surface scarred by craters from impacts by comets and asteroids.",
    details: [
      { label: "Diameter", value: "4,879 km" },
      { label: "Distance from Sun", value: "57.9M km" },
      { label: "Day Length", value: "59 Earth days" },
      { label: "Gravity", value: "3.7 m/s²" }
    ],
    color: "#9ca3af",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/Solarsystemscope_texture_2k_mercury.jpg",
    rotationDuration: 40
  },
  {
    name: "Venus",
    tagline: "The Veiled Planet",
    description: "Second planet from the Sun and Earth's closest planetary neighbor. It is one of the four inner, terrestrial planets, and it's often called Earth's twin because it's similar in size and density. These are not identical twins, however – there are radical differences between the two worlds.",
    details: [
      { label: "Diameter", value: "12,104 km" },
      { label: "Distance from Sun", value: "108.2M km" },
      { label: "Day Length", value: "243 Earth days" },
      { label: "Gravity", value: "8.87 m/s²" }
    ],
    color: "#fbbf24",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Solarsystemscope_texture_2k_venus_surface.jpg",
    rotationDuration: 60
  },
  {
    name: "Earth",
    tagline: "Our Blue Marble",
    description: "The third planet from the Sun and the only astronomical object known to harbor life. While large amounts of water can be found throughout the Solar System, only Earth sustains liquid surface water. About 71% of Earth's surface is made up of the ocean.",
    details: [
      { label: "Diameter", value: "12,742 km" },
      { label: "Distance from Sun", value: "149.6M km" },
      { label: "Day Length", value: "24 hours" },
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
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was – billions of years ago – much wetter and warmer, with a thicker atmosphere. Today, it is a frozen desert where life as we know it would struggle.",
    details: [
      { label: "Diameter", value: "6,779 km" },
      { label: "Distance from Sun", value: "227.9M km" },
      { label: "Day Length", value: "24.6 hours" },
      { label: "Gravity", value: "3.71 m/s²" }
    ],
    color: "#ef4444",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Solarsystemscope_texture_2k_mars.jpg",
    rotationDuration: 32
  },
  {
    name: "Jupiter",
    tagline: "King of Planets",
    description: "The largest planet in our solar system – more than twice as massive as all the other planets combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth. It is a gas giant and lacks an Earth-like surface.",
    details: [
      { label: "Diameter", value: "139,820 km" },
      { label: "Distance from Sun", value: "778.6M km" },
      { label: "Day Length", value: "9.9 hours" },
      { label: "Gravity", value: "24.79 m/s²" }
    ],
    color: "#d97706",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_Texture.jpg",
    rotationDuration: 15
  },
  {
    name: "Saturn",
    tagline: "The Jewel of the Solar System",
    description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's. It is a gas giant composed mostly of hydrogen and helium.",
    details: [
      { label: "Diameter", value: "116,460 km" },
      { label: "Distance from Sun", value: "1.4B km" },
      { label: "Day Length", value: "10.7 hours" },
      { label: "Gravity", value: "10.44 m/s²" }
    ],
    color: "#eab308",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Solarsystemscope_texture_2k_saturn.jpg",
    rotationDuration: 18
  },
  {
    name: "Uranus",
    tagline: "The Sideways Planet",
    description: "Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope. Uranus is very cold and windy, often referred to as an 'ice giant'.",
    details: [
      { label: "Diameter", value: "50,724 km" },
      { label: "Distance from Sun", value: "2.9B km" },
      { label: "Day Length", value: "17.2 hours" },
      { label: "Gravity", value: "8.69 m/s²" }
    ],
    color: "#22d3ee",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Solarsystemscope_texture_2k_uranus.jpg",
    rotationDuration: 25
  },
  {
    name: "Neptune",
    tagline: "The Windiest World",
    description: "Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant major planet orbiting our Sun. More than 30 times as far from the Sun as Earth, Neptune is the only planet in our solar system not visible to the naked eye.",
    details: [
      { label: "Diameter", value: "49,244 km" },
      { label: "Distance from Sun", value: "4.5B km" },
      { label: "Day Length", value: "16.1 hours" },
      { label: "Gravity", value: "11.15 m/s²" }
    ],
    color: "#6366f1",
    textureUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Solarsystemscope_texture_2k_neptune.jpg",
    rotationDuration: 22
  }
];

export function PlanetDetailSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".planet-section");
      
      sections.forEach((section: any) => {
        const info = section.querySelector(".planet-info");
        const sphere = section.querySelector(".planet-sphere-container");
        
        gsap.fromTo(info, 
          { opacity: 0, x: -100, scale: 0.9 },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            }
          }
        );

        gsap.fromTo(sphere,
          { opacity: 0, x: 100, rotate: 20 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
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
        <section 
          key={planet.name} 
          className="planet-section min-h-screen flex items-center justify-center px-4 py-24 md:py-0"
        >
          <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Info Box */}
            <div className={`planet-info order-2 ${idx % 2 === 1 ? 'lg:order-2 lg:ml-auto' : 'lg:order-1'} w-full max-w-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]`}>
              <span className="text-xs font-black uppercase tracking-[0.6em] mb-4 block" style={{ color: planet.color }}>
                Planetary Profile
              </span>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 uppercase">
                {planet.name}
              </h3>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 italic">
                {planet.tagline}
              </p>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
              
              <p className="text-lg text-zinc-300 font-medium leading-relaxed mb-10">
                {planet.description}
              </p>

              <div className="grid grid-cols-2 gap-6">
                {planet.details.map((detail) => (
                  <div key={detail.label} className="group">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black mb-1 block group-hover:text-white transition-colors">
                      {detail.label}
                    </span>
                    <span className="text-white font-mono text-lg md:text-xl border-l-2 border-white/5 pl-3 block group-hover:border-purple-500 transition-all">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revolving Sphere */}
            <div className={`planet-sphere-container order-1 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} flex justify-center items-center`}>
              <PlanetSphere 
                textureUrl={planet.textureUrl} 
                cloudUrl={planet.cloudUrl}
                color={planet.color}
                rotationDuration={planet.rotationDuration}
                size="w-[300px] md:w-[450px] lg:w-[500px]"
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
