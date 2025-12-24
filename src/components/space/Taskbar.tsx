"use client";

import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sections = [
  { name: "Nexus", id: "nexus" },
  { name: "Home", id: "hero" },
  { name: "Earth", id: "earth" },
  { name: "Story", id: "story" },
  { name: "Solar", id: "solar" },
  { name: "Explore", id: "explore" },
];

const agencies = [
  { name: "NASA", path: "/agencies/nasa" },
  { name: "ISRO", path: "/agencies/isro" },
  { name: "ESA", path: "/agencies/esa" },
  { name: "SpaceX", path: "/agencies/spacex" }
];

export function Taskbar() {
  const { scroll } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    // Only run on home page
    if (window.location.pathname !== "/") return;

    // Use a cleaner ScrollTrigger approach for active state
    sections.forEach((section) => {
      const element = document.querySelector(`#${section.id}`);
      if (!element) return;

      ScrollTrigger.create({
        trigger: element,
        scroller: ".smooth-scroll",
        start: "top 20%",
        end: "bottom 20%",
        onUpdate: (self) => {
          if (self.isActive) {
            setActiveSection(section.id);
            setSectionProgress(self.progress);
          }
        },
        onToggle: (self) => {
          if (self.isActive) setActiveSection(section.id);
        },
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });

    // Special case for top of page
    const heroElement = document.querySelector("#hero");
    if (heroElement) {
      ScrollTrigger.create({
        trigger: heroElement,
        scroller: ".smooth-scroll",
        start: "top top",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActiveSection("hero");
        },
        onEnterBack: () => setActiveSection("hero"),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger && typeof st.vars.trigger === 'string' && sections.some(s => st.vars.trigger === `#${s.id}`)) {
          st.kill();
        }
      });
    };
  }, [scroll]);

  const handleScroll = (id: string) => {
    if (scroll) {
      const target = document.querySelector(`#${id}`);
      if (target) {
        scroll.scrollTo(target, {
          offset: 0,
          duration: 1.5,
          easing: [0.25, 0.00, 0.35, 1.00]
        });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/5 bg-[#030014]/40 backdrop-blur-2xl flex items-center gap-3 md:gap-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/10 w-[98%] md:w-auto justify-between md:justify-center overflow-hidden"
    >
      {/* Home Navigation */}
        <div className="flex items-center gap-2 md:gap-6 relative z-[2]">
            {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      if (section.id !== "nexus") {
                        if (window.location.hash === "#nexus") window.location.hash = "";
                        handleScroll(section.id);
                      }
                    }}
                  className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative px-3 py-1.5 rounded-full whitespace-nowrap ${
                    activeSection === section.id 
                      ? (section.name === "Nexus" ? "bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "text-white")
                      : (section.name === "Nexus" ? "bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-transparent hover:from-white hover:to-white" : "text-zinc-500 hover:text-zinc-300")
                  } ${section.name === "Nexus" ? "font-[family-name:var(--font-orbitron)] font-black text-[12px] md:text-[14px] tracking-[0.4em] scale-110" : ""}`}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="nav-scroll-segment"
                      className="absolute -bottom-[12px] md:-bottom-[16px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-white to-purple-500 origin-left"
                      style={{ scaleX: sectionProgress }}
                      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                    />
                  )}
                </button>
            ))}
        </div>
      
      <div className="hidden sm:block h-4 w-px bg-white/10" />
      
      {/* Agency Links */}
      <div className="hidden lg:flex items-center gap-8">
        {agencies.map((agency) => (
          <Link
            key={agency.name}
            href={agency.path}
            className="text-zinc-500 text-[13px] font-black uppercase tracking-[0.3em] hover:text-purple-400 transition-all relative group whitespace-nowrap"
          >
            {agency.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
