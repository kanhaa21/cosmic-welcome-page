"use client";

import { MilkyWay } from "@/components/space/MilkyWay";
import { GSAPStars } from "@/components/space/GSAPStars";
import { WelcomeText } from "@/components/space/WelcomeText";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { StoryTeller } from "@/components/space/StoryTeller";
import { SolarSystem } from "@/components/space/SolarSystem";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DashboardStat = ({ label, value, sub }: { label: string, value: string, sub: string }) => (
  <div className="relative p-6 glass-card border-white/5 overflow-hidden group">
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-500/50" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-500/50" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-purple-500/50" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-500/50" />
    
    <div className="text-[10px] text-purple-500 font-black tracking-[0.3em] uppercase mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
      {label}
    </div>
    <div className="text-3xl font-black text-white tracking-tighter mb-1">
      {value}
    </div>
    <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
      {sub}
    </div>
  </div>
);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [stars, setStars] = useState<{ top: string; left: string; size: string; opacity: number }[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    setStars([...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.5 + 0.3
    })));

    const titles = document.querySelectorAll(".reveal-text");
    titles.forEach((title) => {
      gsap.fromTo(
        title,
        { opacity: 0, y: 30, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.to(".star-layer", {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * (target.dataset.speed || 0.1),
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });
  }, []);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-[#02000a] selection:bg-purple-500/30 overflow-x-hidden">
        <CustomCursor />
        <Taskbar />
        <MilkyWay />
        <GSAPStars />
        
        {/* Parallax Star Background */}
        <div className="star-layer fixed inset-0 z-[-1] pointer-events-none opacity-30" data-speed="0.03">
          {stars.map((star, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full blur-[0.5px]" 
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                opacity: star.opacity
              }}
            />
          ))}
        </div>

        {/* Global HUD Overlays */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-[1px] bg-gradient-to-r from-purple-500/20 to-transparent" />
          <div className="absolute top-10 left-10 w-[1px] h-40 bg-gradient-to-b from-purple-500/20 to-transparent" />
          <div className="absolute bottom-10 right-10 w-40 h-[1px] bg-gradient-to-l from-purple-500/20 to-transparent" />
          <div className="absolute bottom-10 right-10 w-[1px] h-40 bg-gradient-to-t from-purple-500/20 to-transparent" />
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center px-4 z-10" data-scroll-section>
          <motion.div
            style={{ opacity, scale }}
            className="text-center relative"
          >
            <div className="absolute -inset-20 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
            <WelcomeText />
            <p className="mt-6 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide reveal-text">
              An interactive odyssey through the known universe. <br />
              <span className="text-zinc-600 italic">"The cosmos is within us. We are made of star-stuff."</span>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="text-[10px] text-white/20 uppercase tracking-[0.8em] font-black">Scroll to Initialize</div>
            <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500/50 to-transparent" />
          </motion.div>
        </section>

        {/* Dashboard / Quick Intel Section */}
        <section className="relative py-20 px-4 md:px-20 z-10" data-scroll-section>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 reveal-text">
              <DashboardStat label="Universal Age" value="13.8B" sub="Years Since Origin" />
              <DashboardStat label="Galaxies" value="2T+" sub="Observable Universe" />
              <DashboardStat label="Exoplanets" value="5.5K" sub="Confirmed Worlds" />
              <DashboardStat label="Human Reach" value="24B km" sub="Voyager 1 Distance" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="reveal-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-purple-400 font-black uppercase tracking-[0.4em] text-[10px]">Sector // 001 // Milky Way</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                  Our Infinite <br />
                  <span className="text-zinc-800">Cradle</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl font-light">
                  A vast spiral city of 400 billion stars. Spanning over 100,000 light-years, 
                  it contains at least 100 billion planets, all orbiting a supermassive 
                  black hole named Sagittarius A*.
                </p>
                <div className="flex flex-wrap gap-8 items-center">
                  <div className="text-center">
                    <div className="text-2xl font-black text-white tracking-tighter">100K</div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Light Years</div>
                  </div>
                  <div className="w-px h-8 bg-white/5" />
                  <div className="text-center">
                    <div className="text-2xl font-black text-white tracking-tighter">250M</div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Solar Orbit (Yr)</div>
                  </div>
                </div>
              </div>
              
              <div className="relative group reveal-text" data-scroll data-scroll-speed="1">
                <div className="absolute -inset-4 bg-purple-500/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative glass-card aspect-video rounded-[3rem] border-white/5 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                  <div className="text-center relative z-10">
                    <div className="text-8xl font-black text-white/5 tracking-tighter mb-4 scale-150 group-hover:scale-100 transition-transform duration-1000">GALAXY</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Storytelling - Milestones */}
        <div className="py-20" data-scroll-section>
          <StoryTeller />
        </div>

        {/* Solar System - Interaction */}
        <div className="py-20" data-scroll-section>
          <SolarSystem />
        </div>

        {/* Exploratory Grid */}
        <section className="relative py-32 px-4 md:px-20 z-10" data-scroll-section>
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 reveal-text">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Deep Space <span className="text-zinc-800">Phenomena</span>
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-purple-500 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Nebulae", 
                  desc: "Celestial nurseries where new stars are born from dust and gas, creating stunning tapestries of color.",
                  code: "NEB-774"
                },
                { 
                  title: "Black Holes", 
                  desc: "Regions of spacetime where gravity is so strong that nothing, not even light, can escape.",
                  code: "SING-01"
                },
                { 
                  title: "Exoplanets", 
                  desc: "Distant worlds orbiting other stars, some potentially habitable, waiting to be discovered.",
                  code: "EXO-PR"
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative p-10 rounded-[2.5rem] glass-card border-white/5 hover:border-purple-500/20 transition-all duration-500 hover:bg-white/[0.02] reveal-text"
                >
                  <div className="text-[10px] text-zinc-700 font-mono mb-6 tracking-widest">{item.code}</div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                  <p className="text-zinc-500 text-base leading-relaxed font-light mb-8">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-purple-500 font-black uppercase tracking-widest">Access Data</span>
                    <div className="h-[1px] w-8 bg-purple-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative py-20 px-4 text-center border-t border-white/5 z-10 bg-black/20" data-scroll-section>
          <div className="max-w-xl mx-auto">
            <div className="text-zinc-800 text-[10px] font-black tracking-[1.5em] uppercase mb-8">
              Cosmic Interface v2.4
            </div>
            <p className="text-zinc-600 text-sm font-light italic mb-10">
              "Equipped with his five senses, man explores the universe around him and calls the adventure Science."
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <div className="w-1 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        </footer>
      </div>
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </SmoothScroll>
  );
}
