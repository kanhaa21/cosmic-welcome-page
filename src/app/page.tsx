"use client";

import { MilkyWay } from "@/components/space/MilkyWay";
import { GSAPStars } from "@/components/space/GSAPStars";
import { WelcomeText } from "@/components/space/WelcomeText";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { StoryTeller } from "@/components/space/StoryTeller";
import { SolarSystem } from "@/components/space/SolarSystem";
import { RealisticEarth } from "@/components/space/RealisticEarth";
import { CustomCursor } from "@/components/space/CustomCursor";
import { SectionDivider } from "@/components/space/SectionDivider";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const initAnimations = () => {
      const titles = document.querySelectorAll(".reveal-text");
      titles.forEach((title) => {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50, skewY: 7 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: title,
              scroller: ".smooth-scroll",
              start: "top 90%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      });
    };

    // Refresh ScrollTrigger after a delay to ensure proxy is ready
    const timer = setTimeout(() => {
      initAnimations();
      ScrollTrigger.refresh();
      // Force a scroll event to trigger initial checks
      window.dispatchEvent(new Event('resize'));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen selection:bg-purple-500/30">
        <CustomCursor />
        <Taskbar />
        <MilkyWay />
        <GSAPStars />
        
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-[#030014] pointer-events-none" />

        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10" data-scroll-section>
          <motion.div
            style={{ opacity, scale }}
            className="text-center w-full max-w-5xl mx-auto"
          >
            <div className="relative inline-block w-full">
              <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full" />
              <WelcomeText />
            </div>
            <p className="mt-8 text-zinc-300 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-2xl reveal-text px-4">
              Venture into the cosmic abyss where galaxies dance and stars tell stories of eternity. 
              The universe is not just above us, it is within us.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-zinc-500 text-[8px] md:text-xs uppercase tracking-[0.4em] font-bold">Initiate Descent</span>
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-purple-500 to-transparent relative">
              <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[2px]" 
              />
            </div>
          </motion.div>
        </section>

        <SectionDivider label="Planetary Interface" color="blue-400" />

        {/* Earth Feature */}
        <section id="earth" className="relative py-20 md:py-32 px-4 md:px-20 z-10" data-scroll-section>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group order-1"
              data-scroll
              data-scroll-speed="1"
            >
              <RealisticEarth />
            </motion.div>

            <div className="reveal-text order-2">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3 block">Our Home Planet</span>
              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                The Earth <br />
                <span className="text-zinc-600">A Pale Blue Dot</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Earth is the only known world to harbor life. A fragile sanctuary protected by a thin atmosphere, 
                it is a masterpiece of complex ecosystems and liquid oceans, suspended in the vast 
                silence of the cosmic arena.
              </p>
              <div className="flex gap-4">
                <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-600 to-transparent" />
                <div className="h-1 w-4 md:w-6 bg-zinc-800" />
              </div>
            </div>
          </div>
        </section>

        <SectionDivider label="Celestial Narratives" color="purple-500" />

        {/* Storytelling Section */}
        <div id="story" data-scroll-section>
          <StoryTeller />
        </div>

        <SectionDivider label="Orrery Simulation" color="orange-500" />

        {/* Solar System Section */}
        <div id="solar" className="-mt-12" data-scroll-section>
          <SolarSystem />
        </div>

        <SectionDivider label="Cosmic Horizon" color="indigo-500" />

        {/* Infinite Wonders */}
        <section id="explore" className="relative py-24 px-4 md:px-20 z-10 bg-black/40 backdrop-blur-sm border-y border-white/5" data-scroll-section>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal-text">
              <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] mb-3 block">
                Exploration
              </span>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
                Infinite Wonders <span className="text-zinc-700">Await</span>
              </h2>
              <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Nebulae", 
                  desc: "Celestial nurseries where new stars are born from dust and gas, creating stunning tapestries of cosmic color.",
                  icon: "✧",
                  color: "border-purple-500/30"
                },
                { 
                  title: "Black Holes", 
                  desc: "Regions of spacetime where gravity is so strong that nothing, not even light, can escape their grasp.",
                  icon: "⦿",
                  color: "border-blue-500/30"
                },
                { 
                  title: "Exoplanets", 
                  desc: "Distant worlds orbiting other stars, some potentially habitable, waiting to be discovered by our curiosity.",
                  icon: "🪐",
                  color: "border-emerald-500/30"
                }
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`group relative p-8 rounded-[2rem] glass-card ${item.color} transition-all duration-500 hover:bg-white/[0.06] reveal-text`}
                  data-scroll
                  data-scroll-speed={i * 0.1 + 0.3}
                >
                  <div className="text-3xl mb-5 opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                  <p className="text-zinc-400 text-base leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative py-16 px-4 text-center border-t border-white/5 z-10" data-scroll-section>
          <p className="text-zinc-600 text-[10px] font-black tracking-[0.8em] uppercase mb-3">
            Cosmic Explorers Guild
          </p>
          <p className="text-zinc-500 text-xs italic">
            "The cosmos is within us. We are made of star-stuff." — Carl Sagan
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
