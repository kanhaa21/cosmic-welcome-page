"use client";

import { WelcomeText } from "@/components/space/WelcomeText";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import dynamic from "next/dynamic";

import { useSmoothScroll } from "@/components/space/SmoothScroll";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });
const StoryTeller = dynamic(() => import("@/components/space/StoryTeller").then(mod => mod.StoryTeller), { ssr: false });
const RealisticEarth = dynamic(() => import("@/components/space/RealisticEarth").then(mod => mod.RealisticEarth), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [isNexusActive, setIsNexusActive] = useState(false);
  const { scroll: locoScroll } = useSmoothScroll();
  const lastScrollTime = useRef(0);
  const currentSectionIndex = useRef(0);
  const sectionIds = ["hero", "earth", "story", "explore", "footer"];
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const starSpeed = useTransform(scrollYProgress, [0, 1], [1.5, 10]);

  useEffect(() => {
    if (!locoScroll) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1500) return;
      if (Math.abs(e.deltaY) < 30) return; // Threshold

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, currentSectionIndex.current + direction));
      
      if (nextIndex !== currentSectionIndex.current) {
        lastScrollTime.current = now;
        currentSectionIndex.current = nextIndex;
        
        const target = sectionIds[nextIndex] === "footer" ? "footer" : `#${sectionIds[nextIndex]}`;
        locoScroll.scrollTo(target, {
          duration: 1200,
          easing: [0.22, 1, 0.36, 1]
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [locoScroll]);

  useEffect(() => {
    const handleHashChange = () => {
      const active = window.location.hash === "#nexus";
      setIsNexusActive(active);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    const initAnimations = (q: gsap.utils.SelectorFunc) => {
      const scroller = document.querySelector(".smooth-scroll");
      if (!scroller) return;

      const rawTitles = q(".reveal-text");
      if (!rawTitles) return;

      const titles = (gsap.utils.toArray(rawTitles) as HTMLElement[]).filter(el => 
        el && 
        el instanceof HTMLElement && 
        document.body.contains(el)
      );

      if (titles.length === 0) return;
      
      titles.forEach((title) => {
        if (!title) return;
        gsap.fromTo(
          title,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: title,
              scroller: scroller,
              start: "top 95%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          }
        );
      });
    };

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      
      ctx = gsap.context((self) => {
        if (self.selector) {
          initAnimations(self.selector);
        }
      }, containerRef);
      
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <SmoothScroll
        fixedChildren={
          <>
            <CustomCursor />
            <Taskbar />
            <div className="fixed inset-0 z-[-3] bg-black pointer-events-none" />
            <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-black/60 via-black/20 to-[#030014] pointer-events-none opacity-90" />
            <GSAPStars speed={starSpeed} count={800} />
          </>
        }
    >
      <div ref={containerRef} data-scroll-section className="relative min-h-screen selection:bg-purple-500/30 will-change-transform">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10">
          <AnimatePresence mode="wait">
            {!isNexusActive ? (
              <motion.div
                key="hero-content"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                style={{ opacity, scale, willChange: "transform, opacity" }}
                className="text-center w-full max-w-5xl mx-auto"
              >
                <div className="relative inline-block w-full">
                  <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full" />
                  <WelcomeText />
                </div>
                <p className="mt-8 text-zinc-300 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] reveal-text px-4 font-[family-name:var(--font-space-grotesk)]">
                  Venture into the cosmic abyss where galaxies dance and stars tell stories of eternity. 
                  The universe is not just above us, it is within us.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="nexus-content"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(100px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(100px)" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="relative"
              >
                <h1 className="text-[15vw] font-black text-white tracking-[0.5em] uppercase font-[family-name:var(--font-orbitron)] bg-gradient-to-b from-white via-purple-300 to-zinc-500 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(168,85,247,0.5)]">
                  Nexus
                </h1>
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "80%", opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {!isNexusActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
            )}
          </AnimatePresence>
        </section>

        {/* Earth Feature */}
        <section id="earth" className="relative min-h-screen flex items-center py-20 md:py-32 px-4 md:px-20 z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group order-1"
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
                <div className="h-1 w-10 md:w-12 bg-gradient-to-r from-blue-600 to-transparent" />
                <div className="h-1 w-2 md:w-3 bg-zinc-800" />
              </div>
            </div>
          </div>
        </section>

        {/* Storytelling Section */}
        <div id="story" className="min-h-screen flex items-center">
          <StoryTeller />
        </div>

        {/* Infinite Wonders */}
        <section id="explore" className="relative min-h-screen flex items-center py-24 px-4 md:px-20 z-10 bg-black/40 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16 reveal-text">
              <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] mb-3 block">
                Exploration
              </span>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
                Infinite Wonders <span className="text-zinc-700">Await</span>
              </h2>
              <div className="w-12 h-1 bg-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Nebulae", 
                  desc: "Celestial nurseries where new stars are born from dust and gas, creating stunning tapestries of cosmic color.",
                  icon: "✧",
                  color: "border-purple-500/30",
                  link: null
                },
                { 
                  title: "Black Holes", 
                  desc: "Regions of spacetime where gravity is so strong that nothing, not even light, can escape their grasp.",
                  icon: "⦿",
                  color: "border-blue-500/30",
                  link: "/black-holes"
                },
                { 
                  title: "Exoplanets", 
                  desc: "Distant worlds orbiting other stars, some potentially habitable, waiting to be discovered by our curiosity.",
                  icon: "🪐",
                  color: "border-emerald-500/30",
                  link: null
                }
                ].map((item, i) => {
                  const CardContent = (
                    <div
                      key={item.title}
                      className={`group relative p-8 rounded-[2rem] glass-card ${item.color} transition-all duration-500 hover:bg-white/[0.06] reveal-text h-full`}
                    >
                      <div className="text-3xl mb-5 opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                    <p className="text-zinc-400 text-base leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                );

                return item.link ? (
                  <Link key={item.title} href={item.link}>
                    {CardContent}
                  </Link>
                ) : (
                  <div key={item.title}>
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer id="footer" className="relative py-16 px-4 text-center border-t border-white/5 z-10">
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
