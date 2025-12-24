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
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const [stars, setStars] = useState<{ top: string; left: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    setStars([...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.5 + 0.3
    })));
    
    // GSAP Font Animations
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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effect for stars using ScrollTrigger
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
      <div ref={containerRef} className="relative min-h-screen selection:bg-purple-500/30">
        <CustomCursor />
        <Taskbar />
        <MilkyWay />
        <GSAPStars />
        
        {/* Parallax Star Layers for "all around" feel */}
        <div className="star-layer fixed inset-0 z-[-1] pointer-events-none opacity-40" data-speed="0.05">
          {stars.map((star, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full blur-[1px]" 
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

        {/* Deep background overlay for readability */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-[#030014] pointer-events-none" />

        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10" data-scroll-section>
          <motion.div
            style={{ opacity, scale }}
            className="text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full" />
              <WelcomeText />
            </div>
            <p className="mt-8 text-zinc-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-2xl reveal-text">
              Venture into the cosmic abyss where galaxies dance and stars tell stories of eternity. 
              The universe is not just above us, it is within us.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-zinc-500 text-xs uppercase tracking-[0.4em] font-bold">Initiate Descent</span>
            <div className="w-px h-16 bg-gradient-to-b from-purple-500 to-transparent relative">
              <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[2px]" 
              />
            </div>
          </motion.div>
        </section>

        {/* Milky Way Feature */}
        <section className="relative py-40 px-4 md:px-20 z-10" data-scroll-section>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-text">
              <span className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-4 block">Cosmic Origins</span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
                The Milky Way <br />
                <span className="text-zinc-600">Our Infinite Cradle</span>
              </h2>
              <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-xl">
                Our galaxy is a vast spiral city of stars, spanning over 100,000 light-years. 
                It contains at least 100 billion planets and an equal number of stars, 
                all orbiting a supermassive black hole at its core.
              </p>
              <div className="flex gap-4">
                <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-transparent" />
                <div className="h-1 w-8 bg-zinc-800" />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group"
              data-scroll
              data-scroll-speed="1"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative glass-card aspect-video rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="text-center p-12">
                  <div className="text-8xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">13.8B</div>
                  <div className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold">Years Since the Big Bang</div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Storytelling Section */}
        <div data-scroll-section>
          <StoryTeller />
        </div>

        {/* Solar System Section */}
        <div data-scroll-section>
          <SolarSystem />
        </div>

        {/* Infinite Wonders */}
        <section className="relative py-40 px-4 md:px-20 z-10 bg-black/40 backdrop-blur-sm border-y border-white/5" data-scroll-section>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24 reveal-text">
              <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-xs mb-4 block">
                Exploration
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
                Infinite Wonders <span className="text-zinc-700">Await</span>
              </h2>
              <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  className={`group relative p-10 rounded-[2.5rem] glass-card ${item.color} transition-all duration-500 hover:bg-white/[0.06] reveal-text`}
                  data-scroll
                  data-scroll-speed={i * 0.2 + 0.5}
                >
                  <div className="text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">
                    {item.desc}
                  </p>
                  
                  {/* Hover Decoration */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative py-24 px-4 text-center border-t border-white/5 z-10" data-scroll-section>
          <p className="text-zinc-600 text-xs font-black tracking-[0.8em] uppercase mb-4">
            Cosmic Explorers Guild
          </p>
          <p className="text-zinc-500 text-sm italic">
            "The cosmos is within us. We are made of star-stuff." — Carl Sagan
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
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

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const [stars, setStars] = useState<{ top: string; left: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    setStars([...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.5 + 0.3
    })));
    
    // GSAP Font Animations
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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effect for stars using ScrollTrigger
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
      <div ref={containerRef} className="relative min-h-screen selection:bg-purple-500/30">
        <CustomCursor />
        <Taskbar />
        <MilkyWay />
        <GSAPStars />
        
        {/* Parallax Star Layers for "all around" feel */}
        <div className="star-layer fixed inset-0 z-[-1] pointer-events-none opacity-40" data-speed="0.05">
          {stars.map((star, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full blur-[1px]" 
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

        {/* Deep background overlay for readability */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-[#030014] pointer-events-none" />

        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10" data-scroll-section>
          <motion.div
            style={{ opacity, scale }}
            className="text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full" />
              <WelcomeText />
            </div>
            <p className="mt-8 text-zinc-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-2xl reveal-text">
              Venture into the cosmic abyss where galaxies dance and stars tell stories of eternity. 
              The universe is not just above us, it is within us.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-zinc-500 text-xs uppercase tracking-[0.4em] font-bold">Initiate Descent</span>
            <div className="w-px h-16 bg-gradient-to-b from-purple-500 to-transparent relative">
              <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[2px]" 
              />
            </div>
          </motion.div>
        </section>

        {/* Milky Way Feature */}
        <section className="relative py-40 px-4 md:px-20 z-10" data-scroll-section>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-text">
              <span className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-4 block">Cosmic Origins</span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
                The Milky Way <br />
                <span className="text-zinc-600">Our Infinite Cradle</span>
              </h2>
              <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-xl">
                Our galaxy is a vast spiral city of stars, spanning over 100,000 light-years. 
                It contains at least 100 billion planets and an equal number of stars, 
                all orbiting a supermassive black hole at its core.
              </p>
              <div className="flex gap-4">
                <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-transparent" />
                <div className="h-1 w-8 bg-zinc-800" />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group"
              data-scroll
              data-scroll-speed="1"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative glass-card aspect-video rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="text-center p-12">
                  <div className="text-8xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">13.8B</div>
                  <div className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold">Years Since the Big Bang</div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Storytelling Section */}
        <div data-scroll-section>
          <StoryTeller />
        </div>

        {/* Solar System Section */}
        <div data-scroll-section>
          <SolarSystem />
        </div>

        {/* Infinite Wonders */}
        <section className="relative py-40 px-4 md:px-20 z-10 bg-black/40 backdrop-blur-sm border-y border-white/5" data-scroll-section>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24 reveal-text">
              <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-xs mb-4 block">
                Exploration
              </span>
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
                Infinite Wonders <span className="text-zinc-700">Await</span>
              </h2>
              <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  className={`group relative p-10 rounded-[2.5rem] glass-card ${item.color} transition-all duration-500 hover:bg-white/[0.06] reveal-text`}
                  data-scroll
                  data-scroll-speed={i * 0.2 + 0.5}
                >
                  <div className="text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">
                    {item.desc}
                  </p>
                  
                  {/* Hover Decoration */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative py-24 px-4 text-center border-t border-white/5 z-10" data-scroll-section>
          <p className="text-zinc-600 text-xs font-black tracking-[0.8em] uppercase mb-4">
            Cosmic Explorers Guild
          </p>
          <p className="text-zinc-500 text-sm italic">
            "The cosmos is within us. We are made of star-stuff." — Carl Sagan
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
