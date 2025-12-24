"use client";

import { TwinklingStars } from "@/components/space/TwinklingStars";
import { CustomCursor } from "@/components/space/CustomCursor";
import { Taskbar } from "@/components/space/Taskbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DATA_POINTS = [
  {
    title: "The Event Horizon",
    description: "The point of no return. Beyond this boundary, the escape velocity exceeds the speed of light. Nothing, not even radiation, can escape the gravitational pull.",
    stat: "Velocity: > 299,792 km/s",
    color: "from-purple-500/20"
  },
  {
    title: "The Accretion Disk",
    description: "A swirling structure of gas, dust, and stars spiraling inward. Friction and magnetic forces heat the material to millions of degrees, emitting intense X-rays.",
    stat: "Temp: 10^7 Kelvin",
    color: "from-amber-500/20"
  },
  {
    title: "Singularity",
    description: "At the very center, matter is crushed into an infinitely small, infinitely dense point. Here, our understanding of physics and space-time completely breaks down.",
    stat: "Density: Infinite",
    color: "from-indigo-500/20"
  }
];

export default function BlackHolePage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const infoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
      });

      // Data points staggered entrance
      gsap.from(".data-card", {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      // Stats counter animation
      const stats = document.querySelectorAll(".stat-value");
      stats.forEach(stat => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "back.out(1.7)"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-[300vh] bg-[#020202] text-white selection:bg-purple-500/30">
      <CustomCursor />
      <Taskbar />
      
      {/* Background Layer */}
      <motion.div 
        style={{ opacity: backgroundOpacity }}
        className="fixed inset-0 z-0"
      >
        <TwinklingStars />
      </motion.div>

      {/* Dark Overlay for Readability */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-black/40 backdrop-blur-[1px]" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "1em" }}
            transition={{ duration: 2 }}
            className="text-amber-400 font-black uppercase text-[10px] md:text-xs mb-8 block"
          >
            Cosmological Research Project
          </motion.span>
          <h1 className="hero-title flex flex-col text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.85] mb-12">
            <span className="block overflow-hidden">ULTRA</span>
            <span className="block overflow-hidden bg-gradient-to-r from-purple-400 via-amber-200 to-purple-400 bg-clip-text text-transparent">MASSIVE</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-zinc-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
          >
            Venture into the heart of a gravitational behemoth. Discover the physics of 
            extreme space-time curvature and the mysteries of the unobservable.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-col items-center gap-1"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="w-1 h-1 rounded-full bg-amber-400/60 blur-[0.5px]"
              />
            ))}
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-4 block">Scroll to Descend</span>
          </motion.div>
        </div>
      </section>

      {/* Information Section */}
      <section ref={infoRef} className="relative z-10 min-h-screen py-32 px-4 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DATA_POINTS.map((point, i) => (
              <div 
                key={i} 
                className="data-card group relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500"
              >
                {/* Star Corner Decals */}
                <div className="absolute top-4 right-4 w-1 h-1 bg-amber-400/40 rounded-full blur-[1px] group-hover:scale-150 transition-transform" />
                <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-purple-400/40 rounded-full blur-[0.5px] group-hover:scale-150 transition-transform" />
                
                <div className={`absolute inset-0 bg-gradient-to-br ${point.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.05)]`} />
                <span className="text-purple-400/50 font-mono text-sm mb-4 block">0{i + 1}</span>
                <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                <p className="text-zinc-300 font-light leading-relaxed mb-8">
                  {point.description}
                </p>
                <div className="stat-value pt-6">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Observation Data</span>
                  <span className="text-sm font-mono text-amber-400">{point.stat}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Beyond the <br />
                <span className="italic font-serif text-purple-400">Known Physics</span>
              </h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Black holes represent the most extreme laboratories in the universe. 
                They are where General Relativity and Quantum Mechanics collide—a conflict 
                yet to be resolved in our quest for a "Theory of Everything."
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/"
                  className="px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all"
                >
                  Return to Origin
                </Link>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-full flex items-center justify-center">
              <div className="absolute inset-0 animate-spin-slow">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 15}deg) translate(180px, 0)`,
                    }}
                  />
                ))}
              </div>
              <div className="w-3/4 h-3/4 rounded-full bg-purple-500/5 blur-3xl animate-pulse" />
              <div className="text-center z-10">
                <span className="text-6xl font-bold text-amber-400">∞</span>
                <p className="text-xs uppercase tracking-[0.5em] text-zinc-500 mt-2">Space-Time Curvature</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extreme Edge Distortion */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,1)] z-20" />
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
