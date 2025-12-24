"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlanetSphere } from "./PlanetSphere";
import { useInView } from "framer-motion";

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

// ... existing planetData ...

function PlanetSection({ planet, idx }: { planet: PlanetData; idx: number }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: "200px 0px" });

  return (
    <section 
      ref={sectionRef}
      key={planet.name} 
      className="planet-section min-h-screen flex items-center justify-center px-4 py-24 md:py-0"
    >
        <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
          {/* Info Box */}
          <div className={`planet-info order-2 ${idx % 2 === 1 ? 'lg:order-2 lg:ml-auto' : 'lg:order-1'} w-full max-w-xl p-8 md:p-14 rounded-[3rem] border border-white/10 bg-white/[0.01] backdrop-blur-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7),inset_0_0_20px_rgba(255,255,255,0.02)] relative group overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40 whitespace-nowrap">
                Terran Designation
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 uppercase italic">
              {planet.name}
            </h3>
            <p className="text-[11px] font-black text-purple-400/80 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              {planet.tagline}
            </p>
            
            <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed mb-12 first-letter:text-4xl first-letter:font-black first-letter:text-white first-letter:mr-2">
              {planet.description}
            </p>

            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
              {planet.details.map((detail) => (
                <div key={detail.label} className="group/detail">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-black mb-2 block group-hover/detail:text-purple-400 transition-colors">
                    {detail.label}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-mono text-xl md:text-3xl font-light tracking-tight">
                      {detail.value.split(' ')[0]}
                    </span>
                    <span className="text-zinc-600 font-black text-[10px] uppercase">
                      {detail.value.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
          </div>


        {/* Revolving Sphere */}
        <div className={`planet-sphere-container order-1 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} flex justify-center items-center min-h-[300px] md:min-h-[500px]`}>
          {isInView ? (
            <PlanetSphere 
              textureUrl={planet.textureUrl} 
              cloudUrl={planet.cloudUrl}
              color={planet.color}
              rotationDuration={planet.rotationDuration}
              size="w-[300px] md:w-[450px] lg:w-[500px]"
            />
          ) : (
            <div className="w-[300px] md:w-[450px] lg:w-[500px] aspect-square rounded-full bg-white/5 animate-pulse" />
          )}
        </div>
      </div>
    </section>
  );
}

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
        <PlanetSection key={planet.name} planet={planet} idx={idx} />
      ))}
    </div>
  );
}
